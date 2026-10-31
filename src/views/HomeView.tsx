import React, { useEffect } from 'react';
import { Play, BookOpen, Compass, RotateCcw, ArrowRight, ShieldCheck, CheckCircle2, Award, Zap, Sparkles } from 'lucide-react';
import { CurrentView } from '../components/Navbar';
import { TTSAudioController } from '../components/TTSAudioController';
import { ttsService } from '../utils/ttsService';

interface HomeViewProps {
  onNavigate: (view: CurrentView) => void;
  completedCount: number;
  lastActiveQuestionId: number;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  completedCount,
  lastActiveQuestionId,
}) => {
  const openingScript = `Halo, teman-teman! Selamat datang di TKA Matematika Tingkat Lanjut bersama Mister Jo. Di sini kita tidak hanya belajar menghafal rumus atau mengerjakan soal secara mekanis. Kita akan belajar bagaimana memahami masalah, menemukan pola, menyusun strategi, melakukan perhitungan, dan mengambil kesimpulan secara matematis. Ada 30 soal latihan yang sudah dirancang untuk mengasah kemampuan kalian dalam tiga elemen utama, yaitu Aljabar, Geometri dan Pengukuran, serta Kalkulus. Setiap soal dilengkapi stimulus, pembimbing narator, rumus kunci, pembahasan lengkap, dan cara cepat menyelesaikan soal. Jangan takut jika awalnya terasa sulit. Kita akan belajar langkah demi langkah, dari memahami informasi sampai menemukan jawaban yang tepat. Ingat, tujuan kita bukan hanya mendapatkan nilai tinggi, tetapi menjadi pribadi yang mampu berpikir logis dan bernalar tajam. Yuk, mulai perjalanan kita bersama Mister Jo!`;

  // Autoplay opening voice with natural safety on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      ttsService.speak(openingScript, 'Sambutan Pembuka Mister Jo');
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleAction = (view: CurrentView, customNarration: string) => {
    ttsService.speak(customNarration, `Membuka Menu ${view.toUpperCase()}`);
    onNavigate(view);
  };

  return (
    <div className="space-y-10 py-6 max-w-6xl mx-auto">
      {/* Hero Welcome Card */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-blue-700/50">
        {/* Subtle geometric grid background overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span>Standar Ujian TKA SMA 2026</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                SELAMAT DATANG DI <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-white">
                  TKA MATEMATIKA TINGKAT LANJUT
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 font-medium leading-relaxed max-w-2xl">
                "Tempat Mengasah Logika, Memperkuat Konsep, dan Menaklukkan Soal Penalaran Matematika."
              </p>
            </div>

            {/* Slogan & Mentor Badge */}
            <div className="p-4 rounded-2xl bg-blue-800/40 border border-blue-600/40 backdrop-blur-xs space-y-1">
              <div className="text-xs font-bold text-sky-300 uppercase tracking-widest">
                Pengajar & Pembimbing Virtual: MISTER JO
              </div>
              <p className="text-sm font-semibold text-white italic">
                "Berpikir Cerdas, Bernalar Tajam, Matematika Tak Lagi Sulit!"
              </p>
            </div>

            {/* Main Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() =>
                  handleAction(
                    'practice',
                    'Baik teman-teman! Kita langsung menuju lembar latihan 30 soal TKA Matematika Tingkat Lanjut. Kerjakan soal dengan teliti dan gunakan bimbingan narator jika diperlukan.'
                  )
                }
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-base shadow-lg hover:shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>MULAI BELAJAR</span>
              </button>

              <button
                onClick={() =>
                  handleAction(
                    'guide',
                    'Berikut adalah panduan lengkap cara belajar dan menggunakan fitur-fitur pembelajaran interaktif bersama Mister Jo.'
                  )
                }
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 backdrop-blur-xs transition-all"
              >
                <BookOpen className="w-5 h-5" />
                <span>PANDUAN APLIKASI</span>
              </button>

              <button
                onClick={() =>
                  handleAction(
                    'concept_map',
                    'Mari kita lihat peta materi TKA Matematika Tingkat Lanjut meliputi Aljabar, Geometri dan Pengukuran, serta Kalkulus.'
                  )
                }
                className="flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-xs transition-all"
              >
                <Compass className="w-4 h-4 text-sky-300" />
                <span>PETA MATERI</span>
              </button>

              <button
                onClick={() =>
                  handleAction(
                    'practice',
                    `Melanjutkan latihan sebelumnya. Kamu telah menyelesaikan ${completedCount} dari 30 soal latihan. Terus bersemangat!`
                  )
                }
                className="flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-blue-600/80 hover:bg-blue-600 text-white font-semibold text-sm border border-blue-400/40 backdrop-blur-xs transition-all"
              >
                <RotateCcw className="w-4 h-4 text-emerald-300" />
                <span>LANJUTKAN PROGRES ({completedCount}/30)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Mister Jo Avatar Portrait & Mathematical Accents */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-400 to-indigo-400 opacity-30 blur-lg group-hover:opacity-50 transition duration-500"></div>
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-2 border-white/30 shadow-2xl bg-blue-900">
                <img
                  src="/src/assets/images/mister_jo_avatar_1793404778310.jpg"
                  alt="Mister Jo Virtual Mentor"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating feature pills */}
              <div className="absolute -bottom-4 -left-4 bg-white text-slate-800 px-4 py-2 rounded-2xl shadow-lg border border-blue-100 flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>30 Soal HOTS Penalaran</span>
              </div>

              <div className="absolute -top-3 -right-3 bg-blue-600 text-white px-3.5 py-1.5 rounded-2xl shadow-lg border border-blue-400 flex items-center gap-1.5 text-xs font-bold">
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Audio TTS Interaktif</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TTS Narrator Audio Card for Home */}
      <TTSAudioController
        currentText={openingScript}
        label="Naskah Sambutan Pembuka Mister Jo"
        className="max-w-4xl mx-auto"
      />

      {/* 3 Core Curriculum Pillars Preview */}
      <section className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Tiga Elemen Kompetensi Utama TKA 2026
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Dirancang seimbang dengan masing-masing 10 soal HOTS berbobot penalaran tinggi, dilengkapi rumus kunci dan cara cepat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Element 1: Aljabar */}
          <div className="rounded-3xl bg-white p-6 border border-blue-200/80 shadow-xs hover:border-blue-400 hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 font-extrabold flex items-center justify-center text-lg border border-blue-200">
              A
            </div>
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Elemen 1 · 10 Soal</span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">Aljabar</h3>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                <span>Matriks: Operasi, Determinan, Invers 2x2 & 3x3</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                <span>Polinomial: Teorema Sisa, Horner & Vieta</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                <span>Fungsi: Rasional, Eksponen, Logaritma, Trigonometri</span>
              </li>
            </ul>
            <button
              onClick={() => {
                handleAction('practice', 'Membuka latihan elemen Aljabar.');
              }}
              className="w-full flex items-center justify-between text-xs font-bold text-blue-600 hover:text-blue-800 pt-2 border-t border-slate-100"
            >
              <span>Latihan Aljabar (Soal 1–10)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Element 2: Geometri & Pengukuran */}
          <div className="rounded-3xl bg-white p-6 border border-blue-200/80 shadow-xs hover:border-blue-400 hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 font-extrabold flex items-center justify-center text-lg border border-emerald-200">
              G
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Elemen 2 · 10 Soal</span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">Geometri & Pengukuran</h3>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>Vektor: 2D & 3D, Proyeksi Ortogonal, Sudut</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>Lingkaran: Persamaan, Garis Singgung, Juring, Tembereng</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>Transformasi: Matriks Komposisi, Rotasi, Refleksi, Dilatasi</span>
              </li>
            </ul>
            <button
              onClick={() => {
                handleAction('practice', 'Membuka latihan elemen Geometri dan Pengukuran.');
              }}
              className="w-full flex items-center justify-between text-xs font-bold text-emerald-600 hover:text-emerald-800 pt-2 border-t border-slate-100"
            >
              <span>Latihan Geometri (Soal 11–20)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Element 3: Kalkulus */}
          <div className="rounded-3xl bg-white p-6 border border-blue-200/80 shadow-xs hover:border-blue-400 hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 font-extrabold flex items-center justify-center text-lg border border-indigo-200">
              K
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Elemen 3 · 10 Soal</span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">Kalkulus (Limit Fungsi)</h3>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                <span>Limit Aljabar: Pemfaktoran Pembuat Nol Tak Tentu</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                <span>Limit Bentuk Akar: Perkalian Sekawan Aljabar</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                <span>Limit Trigonometri: Identitas Sudut Rangkap & Grafik</span>
              </li>
            </ul>
            <button
              onClick={() => {
                handleAction('practice', 'Membuka latihan elemen Kalkulus.');
              }}
              className="w-full flex items-center justify-between text-xs font-bold text-indigo-600 hover:text-indigo-800 pt-2 border-t border-slate-100"
            >
              <span>Latihan Kalkulus (Soal 21–30)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4 Question Types Summary Banner */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-200/80 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          <span>Format Variasi Soal Standar TKA 2026</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
            <div className="text-2xl font-black text-blue-700">12</div>
            <div className="text-xs font-bold text-slate-800 mt-1">Pilihan Ganda Biasa</div>
            <div className="text-[11px] text-slate-500">5 Opsi (A, B, C, D, E)</div>
          </div>
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
            <div className="text-2xl font-black text-blue-700">6</div>
            <div className="text-xs font-bold text-slate-800 mt-1">Kecukupan Pernyataan</div>
            <div className="text-[11px] text-slate-500">Analisis (1) dan (2)</div>
          </div>
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
            <div className="text-2xl font-black text-blue-700">6</div>
            <div className="text-xs font-bold text-slate-800 mt-1">Pilihan Ganda Kompleks</div>
            <div className="text-[11px] text-slate-500">Kotak Centang Multi-Select</div>
          </div>
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
            <div className="text-2xl font-black text-blue-700">6</div>
            <div className="text-xs font-bold text-slate-800 mt-1">Benar atau Salah</div>
            <div className="text-[11px] text-slate-500">3 Pernyataan Analitis</div>
          </div>
        </div>
      </section>
    </div>
  );
};
