import React, { useEffect } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, Home, Sparkles, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react';
import { CurrentView } from '../components/Navbar';
import { TTSAudioController } from '../components/TTSAudioController';
import { ttsService } from '../utils/ttsService';
import { ElementMastery } from '../types/math';

interface ResultsViewProps {
  finalPercentage: number;
  completedCount: number;
  correctCount: number;
  wrongCount: number;
  getElementMastery: (elem: any) => ElementMastery;
  onNavigate: (view: CurrentView) => void;
  onResetProgress: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  finalPercentage,
  completedCount,
  correctCount,
  wrongCount,
  getElementMastery,
  onNavigate,
  onResetProgress,
}) => {
  const closingScript = `Hebat! Kamu sudah menyelesaikan latihan bersama Mister Jo. Ingat, kemampuan matematika tidak terbentuk dalam satu malam. Teruslah berlatih, pahami prosesnya, dan jangan takut menghadapi soal yang sulit. Setiap kesalahan adalah kesempatan untuk memperbaiki cara berpikir. Sampai bertemu di latihan berikutnya!`;

  useEffect(() => {
    const timer = setTimeout(() => {
      ttsService.speak(closingScript, 'Pesan Penutup Mister Jo');
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const aljabar = getElementMastery('Aljabar');
  const geometri = getElementMastery('Geometri dan Pengukuran');
  const kalkulus = getElementMastery('Kalkulus');

  // Compute strongest and weakest elements
  const masteries = [aljabar, geometri, kalkulus].sort((a, b) => b.percentage - a.percentage);
  const strongest = masteries[0];
  const weakest = masteries[2];

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto">
      {/* Celebration Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <Award className="w-4 h-4 text-emerald-600" />
          <span>Laporan Evaluasi Hasil Belajar TKA 2026</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
          LUAR BIASA! KAMU TELAH MENYELESAIKAN LATIHAN <br />
          <span className="text-blue-600">TKA MATEMATIKA TINGKAT LANJUT</span> BERSAMA MISTER JO.
        </h1>

        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Berikut adalah rekapitulasi capaian, analisis penguasaan 3 pilar matematika, dan rekomendasi personal untuk meningkatkan skor ujianmu.
        </p>
      </div>

      {/* Mister Jo Closing Narrator Player */}
      <TTSAudioController
        currentText={closingScript}
        label="Pesan Motivasi Penutup Mister Jo"
        className="max-w-3xl mx-auto"
      />

      {/* Score Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Final Score */}
        <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 shadow-md flex flex-col justify-between">
          <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Nilai Akhir</span>
          <div className="my-2">
            <span className="text-5xl font-black">{Math.round(finalPercentage)}</span>
            <span className="text-xl font-bold text-blue-200"> / 100</span>
          </div>
          <span className="text-xs text-blue-100">
            {finalPercentage >= 80 ? 'Sangat Memuaskan' : finalPercentage >= 65 ? 'Baik & Siap Ujian' : 'Perlu Pendalaman Konsep'}
          </span>
        </div>

        {/* Total Selesai */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Soal Dikerjakan</span>
          <div className="my-2">
            <span className="text-4xl font-black text-slate-900">{completedCount}</span>
            <span className="text-lg font-bold text-slate-400"> / 30</span>
          </div>
          <span className="text-xs font-medium text-blue-600">
            {Math.round((completedCount / 30) * 100)}% Terselesaikan
          </span>
        </div>

        {/* Jawaban Benar */}
        <div className="rounded-3xl bg-white border border-emerald-200/90 p-6 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Jawaban Benar
          </span>
          <div className="my-2">
            <span className="text-4xl font-black text-emerald-600">{correctCount}</span>
            <span className="text-lg font-bold text-slate-400"> Soal</span>
          </div>
          <span className="text-xs font-medium text-emerald-700">Skor tinggi tercapai</span>
        </div>

        {/* Jawaban Salah */}
        <div className="rounded-3xl bg-white border border-red-200/90 p-6 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-red-700 uppercase tracking-wider flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" /> Perlu Ditinjau
          </span>
          <div className="my-2">
            <span className="text-4xl font-black text-red-500">{wrongCount}</span>
            <span className="text-lg font-bold text-slate-400"> Soal</span>
          </div>
          <span className="text-xs font-medium text-red-600">Peluang belajar evaluatif</span>
        </div>
      </div>

      {/* 3 Pillars Mastery Breakdown */}
      <div className="rounded-3xl bg-white border border-blue-200/90 shadow-md p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Tingkat Penguasaan Tiga Elemen Materi</h2>
            <p className="text-xs text-slate-500 mt-0.5">Analisis persentase keberhasilan per 10 soal di tiap cabang materi</p>
          </div>
          <TrendingUp className="w-5 h-5 text-blue-600" />
        </div>

        <div className="space-y-6">
          {/* Aljabar Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-slate-800">1. Aljabar (Matriks, Polinomial, Fungsi)</span>
              <span className="font-mono font-bold text-blue-600">
                {aljabar.correct}/{aljabar.total} Benar ({aljabar.percentage}%)
              </span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${aljabar.percentage}%` }}
              />
            </div>
          </div>

          {/* Geometri Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-slate-800">2. Geometri dan Pengukuran (Vektor, Lingkaran, Transformasi)</span>
              <span className="font-mono font-bold text-emerald-600">
                {geometri.correct}/{geometri.total} Benar ({geometri.percentage}%)
              </span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                style={{ width: `${geometri.percentage}%` }}
              />
            </div>
          </div>

          {/* Kalkulus Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-slate-800">3. Kalkulus (Limit Aljabar & Trigonometri)</span>
              <span className="font-mono font-bold text-indigo-600">
                {kalkulus.correct}/{kalkulus.total} Benar ({kalkulus.percentage}%)
              </span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${kalkulus.percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Strength & Weakness Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strength Card */}
        <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200 space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>Materi Paling Dikuasai</span>
          </div>
          <h3 className="text-xl font-extrabold text-emerald-950">
            {strongest.element} ({strongest.percentage}%)
          </h3>
          <p className="text-sm text-emerald-900 leading-relaxed">
            Logika dan pemahaman konseptualmu pada materi {strongest.element} sangat kokoh! Pertahankan ketelitian perhitungan dan efisiensi waktu pada hari ujian.
          </p>
        </div>

        {/* Weakness & Study Recommendation Card */}
        <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <span>Rekomendasi Pendalaman Belajar</span>
          </div>
          <h3 className="text-xl font-extrabold text-amber-950">
            {weakest.element} ({weakest.percentage}%)
          </h3>
          <p className="text-sm text-amber-900 leading-relaxed">
            Perluas latihan dan pelajari kembali pembuktian rumus pada materi {weakest.element}. Buka tab Pembahasan Lengkap dan dengarkan arahan Mister Jo agar konsep semakin matang.
          </p>
        </div>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <button
          onClick={() => onNavigate('practice')}
          className="flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-md transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>TINJAU & ULANGI SOAL</span>
        </button>

        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-2xl transition-all cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>KEMBALI KE BERANDA</span>
        </button>
      </div>
    </div>
  );
};
