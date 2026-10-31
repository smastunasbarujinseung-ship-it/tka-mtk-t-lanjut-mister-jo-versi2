import React, { useState, useEffect } from 'react';
import { Volume2, Sliders, X, Play } from 'lucide-react';
import { ttsService, VoiceSettings } from '../utils/ttsService';

interface AudioSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AudioSettingsModal: React.FC<AudioSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [settings, setSettings] = useState<VoiceSettings>(ttsService.getSettings());
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (isOpen) {
      setSettings(ttsService.getSettings());
      setVoices(ttsService.getAvailableVoices());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRateChange = (rate: number) => {
    const updated = { ...settings, rate };
    setSettings(updated);
    ttsService.updateSettings(updated);
  };

  const handlePitchChange = (pitch: number) => {
    const updated = { ...settings, pitch };
    setSettings(updated);
    ttsService.updateSettings(updated);
  };

  const handleVoiceChange = (voiceURI: string) => {
    const updated = { ...settings, voiceURI };
    setSettings(updated);
    ttsService.updateSettings(updated);
  };

  const testVoice = () => {
    ttsService.speak(
      'Halo! Ini adalah suara bimbingan Mister Jo. Mari kita mengasah logika dan bernalar tajam bersama-sama!',
      'Uji Suara Mister Jo'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-blue-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Pengaturan Suara Narator Mister Jo
            </h3>
            <p className="text-xs text-slate-500">
              Konfigurasi kecepatan bicara dan suara Web Speech API
            </p>
          </div>
        </div>

        <div className="space-y-5 my-6">
          {/* Kecepatan Bicara */}
          <div>
            <div className="flex items-center justify-between text-sm font-semibold text-slate-800 mb-2">
              <span>Kecepatan Bicara (Rate)</span>
              <span className="font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-xs">
                {settings.rate.toFixed(2)}x
              </span>
            </div>
            <input
              type="range"
              min="0.75"
              max="1.25"
              step="0.05"
              value={settings.rate}
              onChange={(e) => handleRateChange(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>0.75x (Lambat)</span>
              <span>0.95x (Rekomendasi)</span>
              <span>1.25x (Cepat)</span>
            </div>
          </div>

          {/* Nada Suara (Pitch) */}
          <div>
            <div className="flex items-center justify-between text-sm font-semibold text-slate-800 mb-2">
              <span>Nada Suara (Pitch)</span>
              <span className="font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-xs">
                {settings.pitch.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              min="0.8"
              max="1.2"
              step="0.1"
              value={settings.pitch}
              onChange={(e) => handlePitchChange(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Pemilihan Voice */}
          {voices.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Pilihan Suara Browser
              </label>
              <select
                value={settings.voiceURI || ''}
                onChange={(e) => handleVoiceChange(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white text-slate-800"
              >
                <option value="">Otomatis (Paling Cocok / Bahasa Indonesia)</option>
                {voices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Test Voice Button */}
          <div className="pt-2">
            <button
              onClick={testVoice}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-sm rounded-xl transition-colors border border-blue-200"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Tes Suara Bimbingan Mister Jo</span>
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-xs"
          >
            Simpan & Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
