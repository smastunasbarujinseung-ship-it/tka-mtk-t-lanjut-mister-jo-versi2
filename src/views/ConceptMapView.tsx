import React, { useState } from 'react';
import { Compass, BookOpen, CheckCircle, ShieldAlert, Sparkles, ChevronRight } from 'lucide-react';
import { CurrentView } from '../components/Navbar';
import { TTSAudioController } from '../components/TTSAudioController';
import { ttsService } from '../utils/ttsService';

interface ConceptMapViewProps {
  onNavigateToPractice: () => void;
}

export const ConceptMapView: React.FC<ConceptMapViewProps> = ({ onNavigateToPractice }) => {
  const [activeCategory, setActiveCategory] = useState<'Aljabar' | 'Geometri' | 'Kalkulus'>('Aljabar');

  const conceptNarration = `Peta Materi TKA Matematika Tingkat Lanjut SMA 2026 mencakup tiga pilar utama: Pertama, Aljabar yang memuat Matriks hingga ordo 3 kali 3, Polinomial derajat maksimal 4, serta Fungsi rasional, eksponen, dan trigonometri. Kedua, Geometri dan Pengukuran yang memuat Vektor 2 dimensi dan 3 dimensi, Geometri Lingkaran dengan garis singgung dan tembereng, serta Matriks Transformasi Geometri. Ketiga, Kalkulus yang berfokus penuh pada konsep Limit fungsi aljabar dan trigonometri dengan teknik pemfaktoran, perkalian sekawan, dan identitas trigonometri murni tanpa Teorema L'Hopital.`;

  return (
    <div className="space-y-8 py-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" />
          <span>Kurikulum Resmi TKA Matematika Tingkat Lanjut 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Peta Materi & Standar Batasan Kompetensi
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto">
          Pelajari struktur hierarki submateri dan batasan kisi-kisi resmi agar fokus belajar menjadi optimal dan terarah.
        </p>
      </div>

      {/* TTS Narrator */}
      <TTSAudioController
        currentText={conceptNarration}
        label="Penjelasan Peta Materi Bersama Mister Jo"
        className="max-w-3xl mx-auto"
      />

      {/* Element Selector Tabs */}
      <div className="flex items-center justify-center gap-3">
        {(['Aljabar', 'Geometri', 'Kalkulus'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              ttsService.speak(
                `Membuka rincian submateri untuk elemen ${cat}.`,
                `Peta Materi ${cat}`
              );
            }}
            className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat === 'Geometri' ? 'Geometri & Pengukuran' : cat}
          </button>
        ))}
      </div>

      {/* Dynamic Content based on Active Category */}
      <div className="bg-white rounded-3xl border border-blue-200/90 shadow-md p-6 sm:p-10 space-y-8">
        {activeCategory === 'Aljabar' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                ELEMEN A · 10 SOAL LATIHAN
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Aljabar Tingkat Lanjut</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Subtopic 1 */}
              <div className="p-5 rounded-2xl bg-blue-50/40 border border-blue-100 space-y-3">
                <h3 className="text-base font-bold text-blue-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  1. MATRIKS
                </h3>
                <ul className="text-sm text-slate-700 space-y-1.5 leading-relaxed">
                  <li>• Operasi penjumlahan, pengurangan, & perkalian</li>
                  <li>• Determinan matriks ordo 2 × 2 dan 3 × 3</li>
                  <li>• Invers matriks ordo 2 × 2 dan sifat singularitas</li>
                  <li>• Pemodelan SPLDV & sistem distribusi persediaan</li>
                  <li>• Program linear dan pertidaksamaan mutlak</li>
                </ul>
              </div>

              {/* Subtopic 2 */}
              <div className="p-5 rounded-2xl bg-blue-50/40 border border-blue-100 space-y-3">
                <h3 className="text-base font-bold text-blue-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  2. POLINOMIAL (SUKU BANYAK)
                </h3>
                <ul className="text-sm text-slate-700 space-y-1.5 leading-relaxed">
                  <li>• Operasi suku banyak aljabar</li>
                  <li>• Algoritma pembagian & skema Horner</li>
                  <li>• Teorema Sisa dan Teorema Faktor</li>
                  <li>• Teorema Vieta akar-akar polinomial</li>
                  <li>• Maksimal derajat 4 (bikuadratik)</li>
                </ul>
              </div>

              {/* Subtopic 3 */}
              <div className="p-5 rounded-2xl bg-blue-50/40 border border-blue-100 space-y-3">
                <h3 className="text-base font-bold text-blue-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  3. FUNGSI
                </h3>
                <ul className="text-sm text-slate-700 space-y-1.5 leading-relaxed">
                  <li>• Domain, kodomain, dan range alami</li>
                  <li>• Grafik fungsi rasional & asimtot datar</li>
                  <li>• Fungsi akar dan fungsi nilai mutlak</li>
                  <li>• Fungsi eksponensial (waktu paruh radioaktif)</li>
                  <li>• Karakteristik fungsi gelombang trigonometri</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeCategory === 'Geometri' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                ELEMEN B · 10 SOAL LATIHAN
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Geometri dan Pengukuran</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Subtopic 1 */}
              <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-100 space-y-3">
                <h3 className="text-base font-bold text-emerald-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  1. VEKTOR
                </h3>
                <ul className="text-sm text-slate-700 space-y-1.5 leading-relaxed">
                  <li>• Vektor bidang 2D dan vektor ruang 3D</li>
                  <li>• Komponen vektor i, j, k</li>
                  <li>• Panjang atau magnitudo vektor</li>
                  <li>• Perkalian skalar (dot product) & sudut</li>
                  <li>• Proyeksi skalar ortogonal & vektor proyeksi</li>
                </ul>
              </div>

              {/* Subtopic 2 */}
              <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-100 space-y-3">
                <h3 className="text-base font-bold text-emerald-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  2. LINGKARAN
                </h3>
                <ul className="text-sm text-slate-700 space-y-1.5 leading-relaxed">
                  <li>• Bentuk umum x² + y² + Ax + By + C = 0</li>
                  <li>• Menentukan titik pusat P(a, b) dan jari-jari r</li>
                  <li>• Persamaan garis singgung di titik singgung</li>
                  <li>• Kedudukan titik dan kedudukan garis</li>
                  <li>• Luas juring, luas tembereng, dan panjang busur</li>
                </ul>
              </div>

              {/* Subtopic 3 */}
              <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-100 space-y-3">
                <h3 className="text-base font-bold text-emerald-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  3. TRANSFORMASI GEOMETRI
                </h3>
                <ul className="text-sm text-slate-700 space-y-1.5 leading-relaxed">
                  <li>• Translasi vektor perpindahan T(a, b)</li>
                  <li>• Refleksi sumbu X, sumbu Y, garis y = x</li>
                  <li>• Rotasi 90° dan 180° terhadap titik pusat</li>
                  <li>• Dilatasi [O, k] dan pengaruh luas (k²)</li>
                  <li>• Komposisi matriks transformasi</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeCategory === 'Kalkulus' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                ELEMEN C · 10 SOAL LATIHAN
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Kalkulus: Limit Fungsi</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Subtopic 1 */}
              <div className="p-5 rounded-2xl bg-indigo-50/40 border border-indigo-100 space-y-3">
                <h3 className="text-base font-bold text-indigo-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                  1. KONSEP & LIMIT ALJABAR
                </h3>
                <ul className="text-sm text-slate-700 space-y-2 leading-relaxed">
                  <li>• Konsep limit kiri, limit kanan, dan eksistensi limit</li>
                  <li>• Metode substitusi langsung pada nilai terdefinisi</li>
                  <li>• Bentuk tak tentu 0/0 pada fungsi pecahan</li>
                  <li>• Pemfaktoran aljabar pembuat nol (x - c)</li>
                  <li>• Perkalian sekawan pada fungsi irasional bentuk akar</li>
                </ul>
              </div>

              {/* Subtopic 2 */}
              <div className="p-5 rounded-2xl bg-indigo-50/40 border border-indigo-100 space-y-3">
                <h3 className="text-base font-bold text-indigo-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                  2. LIMIT TRIGONOMETRI & GRAFIK
                </h3>
                <ul className="text-sm text-slate-700 space-y-2 leading-relaxed">
                  <li>• Teorema dasar limit sin(ax)/bx dan tan(ax)/bx</li>
                  <li>• Pengubahan identitas sudut rangkap 1 - cos(kx)</li>
                  <li>• Identitas selisih kosinus cos A - cos B</li>
                  <li>• Membaca eksistensi limit dari stimulus grafik piecewise</li>
                  <li>• Analisis diskontinuitas loncat dan lubang terdefinisi</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Official Scope Boundaries Notice */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
            <ShieldAlert className="w-4 h-4 text-blue-600" />
            <span>BATASAN RESMI KISI-KISI TKA MATEMATIKA TINGKAT LANJUT 2026</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-slate-600 leading-relaxed">
            <div className="p-2.5 bg-white rounded-xl border border-slate-200">
              <strong className="text-slate-800">Matriks:</strong> Maksimal ordo 3 × 3. Determinan dan invers hanya 2 × 2 dan 3 × 3.
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-slate-200">
              <strong className="text-slate-800">Polinomial & Fungsi:</strong> Maksimal polinomial derajat 4.
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-slate-200">
              <strong className="text-slate-800">Vektor:</strong> Maksimal 3 komponen koordinat ruang.
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-slate-200">
              <strong className="text-slate-800">Limit:</strong> Tanpa Teorema L'Hopital (Gunakan aljabar murni).
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-slate-200">
              <strong className="text-slate-800">Kalkulus Terbatas:</strong> Turunan dan integral TIDAK diujikan.
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-slate-200">
              <strong className="text-slate-800">Tipe Soal:</strong> 12 PG Biasa, 6 Kecukupan, 6 PG Kompleks, 6 Benar-Salah.
            </div>
          </div>
        </div>

        {/* CTA to practice */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={onNavigateToPractice}
            className="flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-md transition-all cursor-pointer"
          >
            <span>Lanjut Latihan Soal Sekarang</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
