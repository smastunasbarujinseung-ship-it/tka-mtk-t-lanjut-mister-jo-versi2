import React from 'react';
import { HelpCircle, CheckCircle2, Volume2, Sparkles, BookOpen, RotateCcw, Play, Layers, Compass } from 'lucide-react';
import { CurrentView } from '../components/Navbar';
import { TTSAudioController } from '../components/TTSAudioController';
import { ttsService } from '../utils/ttsService';

interface GuideViewProps {
  onNavigateToPractice: () => void;
}

export const GuideView: React.FC<GuideViewProps> = ({ onNavigateToPractice }) => {
  const guideNarration = `Selamat datang di Panduan Aplikasi TKA Matematika Tingkat Lanjut bersama Mister Jo. Aplikasi ini dirancang khusus untuk membantu teman-teman menguasai 30 soal HOTS penalaran dengan sembilan manfaat utama: Melatih berpikir kritis, memahami konsep lewat stimulus nyata, membaca grafik dan tabel data, menguasai rumus ilmiah, mempelajari strategi pengerjaan, mendapatkan pembahasan 12 langkah terstruktur, menguasai trik cara cepat tanpa kehilangan konsep, memantau progres otomatis secara offline, serta belajar mandiri sesuai kecepatan masing-masing. Gunakan tombol dengarkan untuk mendengarkan arahan saya di setiap soal, periksa jawaban untuk penilaian instan, dan buka tab cara cepat setelah memahami pembahasan lengkap.`;

  const benefits = [
    {
      num: 1,
      title: 'Melatih Berpikir Kritis & Penalaran Tingkat Tinggi',
      desc: 'Setiap soal bukan sekadar substitusi rumus mekanis, melainkan menuntut pemodelan, deduksi logis, dan pengambilan kesimpulan matematis teruji.',
    },
    {
      num: 2,
      title: 'Memahami Konsep Lewat Stimulus Kontekstual',
      desc: 'Dilengkapi stimulus nyata seperti radar navigasi maritim, farmakokinetik konsentrasi obat, deformasi struktur, dan distribusi logistik.',
    },
    {
      num: 3,
      title: 'Membaca Grafik, Diagram Koordinat & Tabel Data',
      desc: 'Melatih ketajaman visual dalam menafsirkan grafik fungsi rasional, gelombang trigonometri, lingkaran analitik, dan diagram vektor 3D.',
    },
    {
      num: 4,
      title: 'Menguasai Penggunaan Rumus Secara Tepat',
      desc: 'Setiap rumus disajikan dengan notasi KaTeX standar jurnal ilmiah lengkap dengan keterangan makna simbol dan batasan penerapannya.',
    },
    {
      num: 5,
      title: 'Mempelajari Arahan Strategi Berpikir',
      desc: 'Sebelum menjawab, dengarkan arahan berpikir Mister Jo yang mengarahkan fokus tanpa membocorkan kunci jawaban.',
    },
    {
      num: 6,
      title: 'Pembahasan 12 Langkah Terstruktur',
      desc: 'Membedah langkah demi langkah: memahami masalah, data diketahui, model matematika, perhitungan, hingga analisis opsi pengecoh.',
    },
    {
      num: 7,
      title: 'Trik Cara Cepat (Fast Trick) Berakar Konsep',
      desc: 'Disajikan langsung berdampingan dengan pembahasan lengkap agar siswa memahami efisiensi waktu tanpa jalan pintas yang keliru.',
    },
    {
      num: 8,
      title: 'Pemantauan Hasil & Penyimpanan Otomatis Offline',
      desc: 'Seluruh progres, skor, dan jawaban tersimpan otomatis di localStorage peramban tanpa memerlukan koneksi backend atau akun login.',
    },
    {
      num: 9,
      title: 'Belajar Mandiri Sesuai Kecepatan Masing-masing',
      desc: 'Dapat diakses fleksibel pada layar laptop, tablet, smartphone, maupun Interactive Flat Panel (IFP) di ruang kelas.',
    },
  ];

  return (
    <div className="space-y-8 py-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Panduan Penggunaan & Manfaat Belajar</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Panduan Belajar Bersama Mister Jo
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto">
          Pahami cara kerja fitur interaktif, narator suara Web Speech API, dan 9 keunggulan metode belajar TKA 2026.
        </p>
      </div>

      {/* Guide Narrator Audio Player */}
      <TTSAudioController
        currentText={guideNarration}
        label="Panduan Interaktif Suara Mister Jo"
        className="max-w-3xl mx-auto"
      />

      {/* 9 Manfaat Utama Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 text-center sm:text-left">
          9 Manfaat Utama Platform TKA Matematika Tingkat Lanjut
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {benefits.map((b) => (
            <div
              key={b.num}
              className="p-5 rounded-2xl bg-white border border-blue-100 shadow-xs hover:border-blue-300 transition-all space-y-2"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                  {b.num}
                </span>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">{b.title}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-9.5">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Controls Tutorial */}
      <div className="rounded-3xl bg-white border border-blue-200/90 shadow-md p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          Petunjuk Praktis Penggunaan Tombol & Fitur
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-slate-700">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Mendengarkan TTS Narator</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Klik tombol <strong>Dengarkan</strong> pada kartu stimulus, pertanyaan, atau arahan strategi. Gunakan tombol Jeda, Lanjutkan, atau Ulangi sesuai kenyamanan belajarmu.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Memeriksa Jawaban & Penilaian</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Setelah memilih jawaban, klik <strong>PERIKSA JAWABAN</strong>. Sistem akan langsung mengalkulasi skor secara matematis dan membuka pembahasan lengkap.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Palet Daftar Soal (1–30)</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Buka menu <strong>Daftar Soal</strong> untuk melihat status warna hijau (benar), merah (salah), atau kuning (sudah terisi) dan berpindah nomor secara cepat.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Reset Progres Offline</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Ingin memulai simulasi ujian dari awal dengan kondisi bersih? Klik tombol <strong>Reset</strong> di pojok kanan atas dan konfirmasi dialog.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-center">
          <button
            onClick={onNavigateToPractice}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-md transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Mulai Berlatih Bersama Mister Jo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
