/**
 * Enhanced Text-to-Speech (TTS) Service for Mister Jo
 * Solves browser cutoff via sentence chunking, properly initializes Indonesian voices,
 * and translates all LaTeX mathematical notation into natural spoken Indonesian.
 */

export interface VoiceSettings {
  rate: number;
  pitch: number;
  volume: number;
  voiceURI: string | null;
}

export interface TTSState {
  isSpeaking: boolean;
  isPaused: boolean;
  currentText: string;
  currentLabel: string;
  currentChunkIndex: number;
  totalChunks: number;
}

class TTSService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: Set<(state: TTSState) => void> = new Set();
  private settings: VoiceSettings = {
    rate: 0.95,
    pitch: 1.0,
    volume: 1.0,
    voiceURI: null,
  };
  private isPaused: boolean = false;
  private isSpeaking: boolean = false;
  private currentText: string = '';
  private currentLabel: string = '';
  private textChunks: string[] = [];
  private currentChunkIndex: number = 0;
  private availableVoices: SpeechSynthesisVoice[] = [];
  private isVoiceLoaded: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;

      // Load saved settings
      try {
        const saved = localStorage.getItem('tka_mister_jo_voice_settings');
        if (saved) {
          this.settings = { ...this.settings, ...JSON.parse(saved) };
        }
      } catch (e) {
        console.warn('Could not read voice settings:', e);
      }

      // Initialize voices with event listener
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (voices && voices.length > 0) {
      this.availableVoices = voices;
      this.isVoiceLoaded = true;
    }
  }

  public getSettings(): VoiceSettings {
    return { ...this.settings };
  }

  public updateSettings(newSettings: Partial<VoiceSettings>) {
    this.settings = { ...this.settings, ...newSettings };
    try {
      localStorage.setItem('tka_mister_jo_voice_settings', JSON.stringify(this.settings));
    } catch {
      // ignore
    }
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    if (!this.isVoiceLoaded || this.availableVoices.length === 0) {
      this.loadVoices();
    }
    return this.availableVoices;
  }

  /**
   * Find the best Indonesian voice available in the browser
   */
  public getBestIndonesianVoice(): SpeechSynthesisVoice | null {
    const voices = this.getAvailableVoices();
    if (voices.length === 0) return null;

    // Check user chosen voice first
    if (this.settings.voiceURI) {
      const userVoice = voices.find((v) => v.voiceURI === this.settings.voiceURI);
      if (userVoice) return userVoice;
    }

    // Priority 1: Exact id-ID voice
    const idExact = voices.find(
      (v) =>
        v.lang === 'id-ID' ||
        v.lang === 'id_ID' ||
        v.lang.toLowerCase() === 'id' ||
        v.name.toLowerCase().includes('indonesia')
    );
    if (idExact) return idExact;

    // Priority 2: In-ID (older Android/Java locale notation)
    const inLang = voices.find((v) => v.lang.startsWith('in') || v.lang.startsWith('id'));
    if (inLang) return inLang;

    // Priority 3: Natural / Neural voices
    const naturalVoice = voices.find((v) => v.name.includes('Natural') || v.name.includes('Google'));
    if (naturalVoice) return naturalVoice;

    return voices[0] || null;
  }

  public subscribe(listener: (state: TTSState) => void) {
    this.listeners.add(listener);
    this.notify();
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state: TTSState = {
      isSpeaking: this.isSpeaking,
      isPaused: this.isPaused,
      currentText: this.currentText,
      currentLabel: this.currentLabel,
      currentChunkIndex: this.currentChunkIndex,
      totalChunks: this.textChunks.length,
    };
    this.listeners.forEach((fn) => fn(state));
  }

  /**
   * Speak a text with automatic math translation and sentence-level queue chunking
   */
  public speak(rawText: string, label: string = 'Mister Jo Pembimbing', onComplete?: () => void) {
    if (!this.synth) return;

    // Cancel any active speech cleanly
    this.stop();

    if (!rawText || rawText.trim() === '') return;

    // Translate mathematical symbols and LaTeX to spoken Indonesian
    const spokenText = this.sanitizeForSpeech(rawText);

    // Split text into digestible sentence chunks (max 150-180 chars) to prevent Chrome timeout
    this.textChunks = this.splitIntoSentences(spokenText);
    this.currentChunkIndex = 0;
    this.currentText = spokenText;
    this.currentLabel = label;
    this.isSpeaking = true;
    this.isPaused = false;
    this.notify();

    // Start speaking the first chunk
    this.speakChunk(0, onComplete);
  }

  private speakChunk(index: number, onComplete?: () => void) {
    if (!this.synth || !this.isSpeaking) return;

    if (index >= this.textChunks.length) {
      // Completed all chunks
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentUtterance = null;
      this.notify();
      if (onComplete) onComplete();
      return;
    }

    const chunkText = this.textChunks[index].trim();
    if (!chunkText) {
      this.speakChunk(index + 1, onComplete);
      return;
    }

    this.currentChunkIndex = index;
    this.notify();

    const utterance = new SpeechSynthesisUtterance(chunkText);
    utterance.lang = 'id-ID';
    utterance.rate = Math.max(0.7, Math.min(1.3, this.settings.rate));
    utterance.pitch = Math.max(0.8, Math.min(1.2, this.settings.pitch));
    utterance.volume = this.settings.volume;

    const voice = this.getBestIndonesianVoice();
    if (voice) {
      utterance.voice = voice;
      // Some voices require setting lang explicitly from the voice
      utterance.lang = voice.lang || 'id-ID';
    }

    utterance.onend = () => {
      if (this.isSpeaking && !this.isPaused) {
        // Proceed to next sentence chunk with brief natural pause
        setTimeout(() => {
          this.speakChunk(index + 1, onComplete);
        }, 120);
      }
    };

    utterance.onerror = (e) => {
      // If user interrupted with stop or cancel, ignore
      if (e.error === 'interrupted' || e.error === 'canceled') {
        return;
      }
      console.warn(`TTS chunk error on index ${index}:`, e.error);
      // Try next chunk instead of crashing
      if (this.isSpeaking) {
        this.speakChunk(index + 1, onComplete);
      }
    };

    this.currentUtterance = utterance;

    try {
      // Chrome bug workaround: if synth was paused, resume it first
      if (this.synth.paused) {
        this.synth.resume();
      }
      this.synth.speak(utterance);
    } catch (err) {
      console.error('Error invoking speechSynthesis.speak:', err);
    }
  }

  public pause() {
    if (!this.synth || !this.isSpeaking || this.isPaused) return;
    try {
      this.synth.pause();
    } catch {
      // ignore
    }
    this.isPaused = true;
    this.notify();
  }

  public resume() {
    if (!this.synth || !this.isPaused) return;
    try {
      this.synth.resume();
    } catch {
      // ignore
    }
    this.isPaused = false;
    this.notify();
  }

  public replay() {
    if (this.currentText && this.currentLabel) {
      this.speak(this.currentText, this.currentLabel);
    }
  }

  public stop() {
    if (!this.synth) return;
    try {
      this.synth.cancel();
    } catch {
      // ignore
    }
    this.isSpeaking = false;
    this.isPaused = false;
    this.textChunks = [];
    this.currentChunkIndex = 0;
    this.currentUtterance = null;
    this.notify();
  }

  /**
   * Splits a long text into natural sentence chunks
   */
  private splitIntoSentences(text: string): string[] {
    if (!text) return [];

    // Split by punctuation followed by whitespace or line break
    const rawSentences = text
      .split(/(?<=[.?!;:])\s+|\n+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const chunks: string[] = [];

    rawSentences.forEach((sentence) => {
      // If a single sentence is still excessively long (> 160 characters), split by commas
      if (sentence.length > 160) {
        const subParts = sentence.split(/(?<=[,])\s+/);
        let temp = '';
        subParts.forEach((sub) => {
          if ((temp + ' ' + sub).length > 140 && temp.length > 0) {
            chunks.push(temp.trim());
            temp = sub;
          } else {
            temp = temp ? `${temp} ${sub}` : sub;
          }
        });
        if (temp.trim()) chunks.push(temp.trim());
      } else {
        chunks.push(sentence);
      }
    });

    return chunks.length > 0 ? chunks : [text];
  }

  /**
   * Sanitizes text and translates mathematical LaTeX notation into natural spoken Indonesian
   */
  public sanitizeForSpeech(raw: string): string {
    if (!raw) return '';

    let s = raw;

    // Convert common matrix notation
    s = s.replace(/\\begin\{pmatrix\}([\s\S]*?)\\end\{pmatrix\}/g, (_, inner) => {
      const rows = inner.split('\\\\');
      return 'matriks dengan baris ' + rows.map((r: string, idx: number) => `baris ke-${idx + 1}: ${r.replace(/&/g, ', ')}`).join('; ');
    });

    // Remove LaTeX delimiters
    s = s.replace(/\$\$(.*?)\$\$/g, ' $1 ');
    s = s.replace(/\$(.*?)\$/g, ' $1 ');

    // Specific limit expressions
    s = s.replace(/\\lim_\{x\s*\\to\s*([^}]+)\}/g, 'limit x mendekati $1 dari ');
    s = s.replace(/\\lim_\{t\s*\\to\s*([^}]+)\}/g, 'limit t mendekati $1 dari ');
    s = s.replace(/lim_\{x\\to\s*([^}]+)\}/g, 'limit x mendekati $1 dari ');

    // Fractions \frac{a}{b}
    s = s.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '$1 per $2');
    s = s.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '$1 per $2'); // second pass for nested fractions

    // Roots \sqrt{a}
    s = s.replace(/\\sqrt\{([^{}]+)\}/g, 'akar dari $1');
    s = s.replace(/\\sqrt\[(\d+)\]\{([^{}]+)\}/g, 'akar pangkat $1 dari $2');

    // Vectors
    s = s.replace(/\\vec\{([a-zA-Z])\}/g, 'vektor $1');
    s = s.replace(/\\hat\{i\}/g, 'i');
    s = s.replace(/\\hat\{j\}/g, 'j');
    s = s.replace(/\\hat\{k\}/g, 'k');

    // Determinant and absolute values
    s = s.replace(/\\det\(([a-zA-Z0-9]+)\)/g, 'determinan $1');
    s = s.replace(/\|([a-zA-Z0-9]+)\|/g, 'nilai mutlak $1');

    // Exponents & Superscripts
    s = s.replace(/\^2|\²|\\text\{²\}/g, ' kuadrat ');
    s = s.replace(/\^3|\³|\\text\{³\}/g, ' pangkat tiga ');
    s = s.replace(/\^4|\⁴|\\text\{⁴\}/g, ' pangkat empat ');
    s = s.replace(/\^5|\⁵/g, ' pangkat lima ');
    s = s.replace(/\^n/g, ' pangkat n ');
    s = s.replace(/\^\{([^{}]+)\}/g, ' pangkat $1 ');

    // Subscripts
    s = s.replace(/_1|_\{1\}/g, ' satu ');
    s = s.replace(/_2|_\{2\}/g, ' dua ');
    s = s.replace(/_3|_\{3\}/g, ' tiga ');
    s = s.replace(/_\{([^{}]+)\}/g, ' sub $1 ');

    // Trigonometric functions
    s = s.replace(/\\sin\^2/g, ' sinus kuadrat ');
    s = s.replace(/\\cos\^2/g, ' kosinus kuadrat ');
    s = s.replace(/\\tan\^2/g, ' tangen kuadrat ');
    s = s.replace(/\\sin/g, ' sinus ');
    s = s.replace(/\\cos/g, ' kosinus ');
    s = s.replace(/\\tan/g, ' tangen ');

    // Greek symbols
    s = s.replace(/\\alpha/g, ' alfa ');
    s = s.replace(/\\beta/g, ' beta ');
    s = s.replace(/\\theta/g, ' teta ');
    s = s.replace(/\\pi/g, ' pi ');
    s = s.replace(/\\infty/g, ' tak hingga ');

    // Relational operators
    s = s.replace(/\\implies|⟹/g, ' maka ');
    s = s.replace(/\\iff|⟺/g, ' jika dan hanya jika ');
    s = s.replace(/\\cdot|\\times|×/g, ' dikali ');
    s = s.replace(/\\pm|±/g, ' plus minus ');
    s = s.replace(/\\le|\\leq|≤/g, ' kurang dari atau sama dengan ');
    s = s.replace(/\\ge|\\geq|≥/g, ' lebih dari atau sama dengan ');
    s = s.replace(/\\neq|≠/g, ' tidak sama dengan ');
    s = s.replace(/\\approx|≈/g, ' mendekati ');
    s = s.replace(/\\in/g, ' anggota dari ');

    // Fractions written as numbers: 1/7, 3/16, 1/6, 2/7
    s = s.replace(/\b1\/7\b/g, 'satu per tujuh');
    s = s.replace(/\b2\/7\b/g, 'dua per tujuh');
    s = s.replace(/\b3\/7\b/g, 'tiga per tujuh');
    s = s.replace(/\b3\/16\b/g, 'tiga per enam belas');
    s = s.replace(/\b1\/8\b/g, 'satu per delapan');
    s = s.replace(/\b3\/8\b/g, 'tiga per delapan');
    s = s.replace(/\b1\/16\b/g, 'satu per enam belas');
    s = s.replace(/\b1\/6\b/g, 'satu per enam');
    s = s.replace(/\b44\/3\b/g, 'empat puluh empat per tiga');
    s = s.replace(/\b308\/3\b/g, 'tiga ratus delapan per tiga');
    s = s.replace(/\b22\/7\b/g, 'dua puluh dua per tujuh');

    // Units
    s = s.replace(/\bmg\/L\b/gi, 'miligram per liter');
    s = s.replace(/\bkm\b/gi, 'kilometer');
    s = s.replace(/\bkm²\b/gi, 'kilometer persegi');
    s = s.replace(/\bkN\b/g, 'kilonewton');
    s = s.replace(/\bMBq\b/g, 'Mega Becquerel');

    // Remaining LaTeX tokens & syntax characters
    s = s.replace(/\\text\{([^}]+)\}/g, '$1');
    s = s.replace(/[\\{}]/g, ' ');
    s = s.replace(/\s+/g, ' ');

    return s.trim();
  }
}

export const ttsService = new TTSService();
