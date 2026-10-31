import React from 'react';
import { MathView } from './MathView';

interface InteractiveStimulusProps {
  visualId?: string;
  visualType?: 'svg_diagram' | 'table_data' | 'matrix_display' | 'none';
  tableData?: {
    headers: string[];
    rows: (string | number)[][];
  };
}

export const InteractiveStimulus: React.FC<InteractiveStimulusProps> = ({
  visualId,
  visualType,
  tableData,
}) => {
  if (visualType === 'none' && !tableData && !visualId) {
    return null;
  }

  if (visualType === 'table_data' && tableData) {
    return (
      <div className="my-4 overflow-x-auto rounded-2xl border border-blue-200/80 bg-white shadow-xs">
        <table className="w-full text-left text-base">
          <thead className="bg-blue-600 text-white font-bold">
            <tr>
              {tableData.headers.map((header, idx) => (
                <th key={idx} className="px-5 py-3.5 whitespace-nowrap text-sm tracking-wide">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {tableData.rows.map((row, rowIdx) => (
              <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="px-5 py-3 whitespace-nowrap text-sm">
                    {String(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Visual SVG Diagram rendering
  return (
    <div className="my-4 p-4 rounded-2xl bg-white border border-blue-200 shadow-xs flex flex-col items-center justify-center">
      <div className="w-full max-w-xl aspect-[16/10] relative flex items-center justify-center overflow-hidden">
        {renderSvgContent(visualId)}
      </div>
    </div>
  );
};

function renderSvgContent(id?: string) {
  switch (id) {
    // SOAL 1: Matriks Distribusi Stok
    case 'matrix_inventory':
      return (
        <svg viewBox="0 0 460 220" className="w-full h-full select-none">
          <rect width="460" height="220" rx="14" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <text x="230" y="26" textAnchor="middle" fill="#1E3A8A" fontSize="13" fontWeight="bold">
            Model Matriks Kesamaan Distribusi Stok Unit (Gudang ke Cabang)
          </text>
          <path d="M 60 48 L 48 48 L 48 165 L 60 165" stroke="#0052FF" strokeWidth="3" fill="none" />
          <path d="M 190 48 L 202 48 L 202 165 L 190 165" stroke="#0052FF" strokeWidth="3" fill="none" />
          <text x="100" y="88" textAnchor="middle" fill="#0F172A" fontSize="17" fontWeight="bold">x + 2y</text>
          <text x="165" y="88" textAnchor="middle" fill="#0F172A" fontSize="17" fontWeight="bold">5</text>
          <text x="100" y="140" textAnchor="middle" fill="#0F172A" fontSize="17" fontWeight="bold">3</text>
          <text x="165" y="140" textAnchor="middle" fill="#0F172A" fontSize="17" fontWeight="bold">2x - y</text>
          <text x="230" y="115" textAnchor="middle" fill="#0052FF" fontSize="28" fontWeight="bold">=</text>
          <path d="M 260 48 L 248 48 L 248 165 L 260 165" stroke="#0052FF" strokeWidth="3" fill="none" />
          <path d="M 390 48 L 402 48 L 402 165 L 390 165" stroke="#0052FF" strokeWidth="3" fill="none" />
          <text x="300" y="88" textAnchor="middle" fill="#0052FF" fontSize="18" fontWeight="bold">11</text>
          <text x="365" y="88" textAnchor="middle" fill="#0F172A" fontSize="18" fontWeight="bold">5</text>
          <text x="300" y="140" textAnchor="middle" fill="#0F172A" fontSize="18" fontWeight="bold">3</text>
          <text x="365" y="140" textAnchor="middle" fill="#0052FF" fontSize="18" fontWeight="bold">7</text>
          <text x="230" y="196" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="600">
            Elemen seletak: x + 2y = 11 dan 2x - y = 7 ⟹ Nilai x = 5, y = 3
          </text>
        </svg>
      );

    // SOAL 2: Polinomial Aerodinamika
    case 'poly_aerodynamic_drone':
      return (
        <svg viewBox="0 0 460 220" className="w-full h-full select-none">
          <rect width="460" height="220" rx="14" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <text x="230" y="26" textAnchor="middle" fill="#1E3A8A" fontSize="13" fontWeight="bold">
            Kurva Kontur Suku Banyak Derajat 3: P(x) = 2x³ - 5x² + ax + b
          </text>
          <line x1="40" y1="110" x2="420" y2="110" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="230" y1="35" x2="230" y2="195" stroke="#94A3B8" strokeWidth="1.5" />
          <path d="M 120 180 C 160 50, 200 140, 260 70 S 340 40, 380 40" fill="none" stroke="#0052FF" strokeWidth="3" />
          <circle cx="170" cy="155" r="5" fill="#EF4444" />
          <text x="160" y="175" textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="bold">P(-1) = -6</text>
          <circle cx="280" cy="75" r="5" fill="#10B981" />
          <text x="280" y="60" textAnchor="middle" fill="#059669" fontSize="11" fontWeight="bold">P(1) = 6</text>
          <circle cx="340" cy="55" r="5" fill="#0052FF" />
          <text x="355" y="45" fill="#0052FF" fontSize="12" fontWeight="bold">P(2) = 9</text>
          <text x="230" y="205" textAnchor="middle" fill="#64748B" fontSize="12">
            Teorema Sisa: Pembagi (x - c) menghasilkan sisa tepat P(c)
          </text>
        </svg>
      );

    // SOAL 3: Grafik Konsentrasi Obat
    case 'rational_drug_curve':
      return (
        <svg viewBox="0 0 460 220" className="w-full h-full select-none">
          <rect width="460" height="220" rx="14" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="50" y1="180" x2="420" y2="180" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="50" y1="30" x2="50" y2="180" stroke="#94A3B8" strokeWidth="1.5" />
          <text x="425" y="184" fill="#475569" fontSize="12" fontWeight="bold">t (jam)</text>
          <text x="45" y="22" fill="#475569" fontSize="12" fontWeight="bold">C(t) mg/L</text>
          <line x1="50" y1="180" x2="420" y2="180" stroke="#EF4444" strokeDasharray="4 4" strokeWidth="1.5" />
          <text x="360" y="172" fill="#EF4444" fontSize="11" fontWeight="bold">Asimtot: y = 0</text>
          <path d="M 50 180 Q 80 80, 120 90 T 200 130 T 300 160 T 410 174" fill="none" stroke="#0052FF" strokeWidth="3" />
          <circle cx="120" cy="90" r="5" fill="#0052FF" stroke="#FFFFFF" strokeWidth="2" />
          <text x="120" y="74" textAnchor="middle" fill="#0052FF" fontSize="13" fontWeight="bold">
            Puncak: t = 2 jam, C = 2 mg/L
          </text>
          <text x="240" y="45" textAnchor="middle" fill="#1E3A8A" fontSize="13" fontWeight="bold">
            Fungsi Rasional: C(t) = 8t / (t² + 4)
          </text>
        </svg>
      );

    // SOAL 4: Peluruhan Radioaktif
    case 'radioactive_decay_curve':
      return (
        <svg viewBox="0 0 460 220" className="w-full h-full select-none">
          <rect width="460" height="220" rx="14" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <text x="230" y="26" textAnchor="middle" fill="#1E3A8A" fontSize="13" fontWeight="bold">
            Peluruhan Waktu Paruh Teknesium-99m (T = 6 jam)
          </text>
          <line x1="60" y1="180" x2="420" y2="180" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="60" y1="35" x2="60" y2="180" stroke="#94A3B8" strokeWidth="1.5" />
          <path d="M 60 50 Q 120 120, 200 155 T 320 173 T 400 177" fill="none" stroke="#0052FF" strokeWidth="3" />
          <circle cx="60" cy="50" r="4" fill="#0052FF" />
          <text x="95" y="55" fill="#0F172A" fontSize="11" fontWeight="bold">800 MBq (0 jam)</text>
          <circle cx="140" cy="115" r="4" fill="#0052FF" />
          <text x="165" y="115" fill="#64748B" fontSize="10">200 MBq (12 jam)</text>
          <circle cx="320" cy="173" r="5" fill="#EF4444" />
          <text x="320" y="160" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="bold">
            25 MBq (t = 30 jam)
          </text>
          <text x="230" y="202" textAnchor="middle" fill="#64748B" fontSize="12">
            Rasio: 800 / 25 = 32 = 2⁵ ⟹ 5 × 6 jam = 30 jam
          </text>
        </svg>
      );

    // SOAL 5: Matriks 3x3 Singular
    case 'matrix_3x3_determinant':
      return (
        <svg viewBox="0 0 460 220" className="w-full h-full select-none">
          <rect width="460" height="220" rx="14" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <text x="230" y="28" textAnchor="middle" fill="#1E3A8A" fontSize="13" fontWeight="bold">
            Analisis Determinan Matriks M (Ordo 3 × 3)
          </text>
          <path d="M 130 50 L 115 50 L 115 165 L 130 165" stroke="#0052FF" strokeWidth="2.5" fill="none" />
          <path d="M 330 50 L 345 50 L 345 165 L 330 165" stroke="#0052FF" strokeWidth="2.5" fill="none" />
          <text x="160" y="80" textAnchor="middle" fill="#0F172A" fontSize="17" fontWeight="bold">1</text>
          <text x="230" y="80" textAnchor="middle" fill="#0F172A" fontSize="17" fontWeight="bold">2</text>
          <text x="300" y="80" textAnchor="middle" fill="#0052FF" fontSize="17" fontWeight="bold">k</text>
          <text x="160" y="115" textAnchor="middle" fill="#0F172A" fontSize="17" fontWeight="bold">0</text>
          <text x="230" y="115" textAnchor="middle" fill="#0052FF" fontSize="17" fontWeight="bold">x</text>
          <text x="300" y="115" textAnchor="middle" fill="#0F172A" fontSize="17" fontWeight="bold">3</text>
          <text x="160" y="150" textAnchor="middle" fill="#0F172A" fontSize="17" fontWeight="bold">2</text>
          <text x="230" y="150" textAnchor="middle" fill="#0F172A" fontSize="17" fontWeight="bold">4</text>
          <text x="300" y="150" textAnchor="middle" fill="#0F172A" fontSize="17" fontWeight="bold">6</text>
          <text x="230" y="195" textAnchor="middle" fill="#1E3A8A" fontSize="13" fontWeight="bold">
            det(M) = 2x(3 - k) ⟹ Bernilai 0 jika k = 3 ATAU x = 0
          </text>
        </svg>
      );

    // SOAL 6: Polinomial Derajat 4 Bikuadratik
    case 'biquadratic_bridge_curve':
      return (
        <svg viewBox="0 0 460 220" className="w-full h-full select-none">
          <rect width="460" height="220" rx="14" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <text x="230" y="26" textAnchor="middle" fill="#1E3A8A" fontSize="13" fontWeight="bold">
            Profil Balok Jembatan: f(x) = x⁴ - 6x² + c
          </text>
          <line x1="40" y1="120" x2="420" y2="120" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="230" y1="30" x2="230" y2="195" stroke="#94A3B8" strokeWidth="1.5" />
          <path d="M 90 40 Q 140 185, 175 160 Q 230 75, 285 160 Q 320 185, 370 40" fill="none" stroke="#0052FF" strokeWidth="3" />
          <circle cx="175" cy="160" r="4.5" fill="#EF4444" />
          <circle cx="285" cy="160" r="4.5" fill="#EF4444" />
          <text x="230" y="180" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="bold">
            Titik Minimum: x² = 3 ⟹ Nilai Min = c - 9
          </text>
          <text x="230" y="204" textAnchor="middle" fill="#64748B" fontSize="11">
            Bentuk Kuadrat Sempurna: f(x) = (x² - 3)² + (c - 9)
          </text>
        </svg>
      );

    // SOAL 7: Program Linear
    case 'linear_programming_region':
      return (
        <svg viewBox="0 0 460 220" className="w-full h-full select-none">
          <rect width="460" height="220" rx="14" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <text x="230" y="26" textAnchor="middle" fill="#1E3A8A" fontSize="13" fontWeight="bold">
            Daerah Feasible Program Linear: 2x + 3y ≤ 18, x + y ≥ 4, |x - y| ≤ 2
          </text>
          <line x1="60" y1="180" x2="400" y2="180" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="80" y1="30" x2="80" y2="190" stroke="#94A3B8" strokeWidth="1.5" />
          {/* Feasible polygon */}
          <polygon points="170,120 220,70 250,90 200,140" fill="#93C5FD" fillOpacity="0.45" stroke="#0052FF" strokeWidth="2.5" />
          <circle cx="205" cy="105" r="4" fill="#0052FF" />
          <text x="205" y="95" textAnchor="middle" fill="#0052FF" fontSize="11" fontWeight="bold">Titik (3, 3) Feasible</text>
          <text x="330" y="80" fill="#64748B" fontSize="11">y = x + 2</text>
          <text x="330" y="150" fill="#64748B" fontSize="11">y = x - 2</text>
          <text x="230" y="202" textAnchor="middle" fill="#475569" fontSize="12">
            Titik potong optimum menghasilkan nilai Z_maks = 24.8 &gt; 20
          </text>
        </svg>
      );

    // SOAL 8: Grafik Gelombang Trigonometri
    case 'trig_wave':
      return (
        <svg viewBox="0 0 460 220" className="w-full h-full select-none">
          <rect width="460" height="220" rx="14" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="40" y1="110" x2="420" y2="110" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="70" y1="20" x2="70" y2="195" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="70" y1="95" x2="420" y2="95" stroke="#CBD5E1" strokeDasharray="3 3" />
          <path d="M 70 95 Q 110 35, 150 95 T 230 95 T 310 95 T 390 95" fill="none" stroke="#0052FF" strokeWidth="3" />
          <text x="45" y="42" fill="#0052FF" fontSize="11" fontWeight="bold">y = 4</text>
          <text x="45" y="98" fill="#64748B" fontSize="11">y = 1</text>
          <text x="40" y="160" fill="#EF4444" fontSize="11" fontWeight="bold">y = -2</text>
          <circle cx="110" cy="40" r="4.5" fill="#0052FF" />
          <text x="110" y="28" textAnchor="middle" fill="#0052FF" fontSize="12" fontWeight="bold">Puncak (π/4, 4)</text>
          <text x="230" y="204" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="600">
            f(x) = 3 sin(2x) + 1: Amplitudo = 3, Periode = π, Rentang [-2, 4]
          </text>
        </svg>
      );

    // SOAL 11: Vektor Proyeksi Ortogonal
    case 'vector_projection':
      return (
        <svg viewBox="0 0 460 220" className="w-full h-full select-none">
          <rect width="460" height="220" rx="14" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <circle cx="90" cy="160" r="4" fill="#0F172A" />
          <text x="75" y="175" fill="#0F172A" fontSize="12" fontWeight="bold">O(0,0,0)</text>
          <line x1="90" y1="160" x2="380" y2="160" stroke="#64748B" strokeWidth="2.5" />
          <polygon points="380,160 370,155 370,165" fill="#64748B" />
          <text x="385" y="165" fill="#475569" fontSize="13" fontWeight="bold">vektor b</text>
          <line x1="90" y1="160" x2="250" y2="55" stroke="#0052FF" strokeWidth="3" />
          <polygon points="250,55 238,59 245,68" fill="#0052FF" />
          <text x="245" y="45" fill="#0052FF" fontSize="14" fontWeight="bold">a = (4, -4, 7)</text>
          <line x1="250" y1="55" x2="250" y2="160" stroke="#EF4444" strokeDasharray="4 4" strokeWidth="1.8" />
          <rect x="238" y="148" width="12" height="12" fill="none" stroke="#EF4444" strokeWidth="1.5" />
          <line x1="90" y1="160" x2="250" y2="160" stroke="#10B981" strokeWidth="4" />
          <polygon points="250,160 240,155 240,165" fill="#10B981" />
          <text x="170" y="186" textAnchor="middle" fill="#059669" fontSize="14" fontWeight="bold">
            Panjang Proyeksi: |p| = (a · b) / |b| = 18 / 3 = 6 kN
          </text>
        </svg>
      );

    // SOAL 12: Lingkaran & Garis Singgung
    case 'circle_tangent':
      return (
        <svg viewBox="0 0 460 220" className="w-full h-full select-none">
          <rect width="460" height="220" rx="14" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <circle cx="160" cy="115" r="55" fill="#EFF6FF" stroke="#0052FF" strokeWidth="2.5" />
          <circle cx="160" cy="115" r="4" fill="#0052FF" />
          <text x="155" y="135" fill="#1E40AF" fontSize="12" fontWeight="bold">Pusat P(2, -3)</text>
          <line x1="160" y1="115" x2="205" y2="78" stroke="#64748B" strokeDasharray="3 3" strokeWidth="1.5" />
          <circle cx="205" cy="78" r="4.5" fill="#EF4444" />
          <text x="215" y="75" fill="#EF4444" fontSize="12" fontWeight="bold">T(5, 1)</text>
          <line x1="150" y1="20" x2="370" y2="105" stroke="#2563EB" strokeWidth="2.5" />
          <text x="290" y="42" textAnchor="middle" fill="#0052FF" fontSize="13" fontWeight="bold">
            Garis Singgung: 3x + 4y - 19 = 0
          </text>
          <text x="230" y="202" textAnchor="middle" fill="#64748B" fontSize="12">
            Gradien garis tegak lurus dengan jari-jari PT: (x₁ - a)x + (y₁ - b)y = konstanta
          </text>
        </svg>
      );

    // SOAL 13: Transformasi Geometri (Rotasi & Refleksi)
    case 'transform_grid':
      return (
        <svg viewBox="0 0 460 220" className="w-full h-full select-none">
          <rect width="460" height="220" rx="14" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="230" y1="20" x2="230" y2="200" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="20" y1="110" x2="440" y2="110" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="50" y1="190" x2="410" y2="30" stroke="#F59E0B" strokeDasharray="4 4" strokeWidth="1.5" />
          <text x="400" y="25" fill="#D97706" fontSize="12" fontWeight="bold">y = x</text>
          <polygon points="280,95 320,95 300,50" fill="#93C5FD" fillOpacity="0.45" stroke="#0052FF" strokeWidth="2" />
          <text x="300" y="80" textAnchor="middle" fill="#0052FF" fontSize="12" fontWeight="bold">A(3, 1)</text>
          <polygon points="215,145 215,185 170,165" fill="#86EFAC" fillOpacity="0.45" stroke="#059669" strokeWidth="2" />
          <text x="195" y="165" textAnchor="middle" fill="#059669" fontSize="12" fontWeight="bold">A''(3, -1)</text>
          <text x="230" y="208" textAnchor="middle" fill="#64748B" fontSize="12">
            Komposisi Matriks: M_{`y=x`} ∘ R(90°) = Refleksi terhadap Sumbu X
          </text>
        </svg>
      );

    // SOAL 14: Radar Maritim Juring
    case 'radar_circle_segment':
      return (
        <svg viewBox="0 0 460 220" className="w-full h-full select-none">
          <rect width="460" height="220" rx="14" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <circle cx="230" cy="110" r="80" fill="none" stroke="#CBD5E1" strokeWidth="1.5" />
          <circle cx="230" cy="110" r="4" fill="#0F172A" />
          <text x="225" y="128" fill="#0F172A" fontSize="12" fontWeight="bold">O</text>
          <path d="M 230 110 L 299.3 70 A 80 80 0 0 0 230 30 Z" fill="#DBEAFE" stroke="#0052FF" strokeWidth="2" />
          <path d="M 299.3 70 A 80 80 0 0 0 230 30 L 299.3 70 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
          <text x="280" y="45" fill="#1E3A8A" fontSize="12" fontWeight="bold">Tembereng</text>
          <text x="245" y="85" fill="#1D4ED8" fontSize="11" fontWeight="bold">θ = 60°</text>
          <text x="160" y="90" fill="#64748B" fontSize="12">r = 14 km</text>
          <text x="230" y="205" textAnchor="middle" fill="#1E3A8A" fontSize="12" fontWeight="bold">
            Busur = 14,67 km · Luas Juring = 102,67 km²
          </text>
        </svg>
      );

    // SOAL 28: Limit Grafik Piecewise
    case 'limit_piecewise_graph':
      return (
        <svg viewBox="0 0 460 220" className="w-full h-full select-none">
          <rect width="460" height="220" rx="14" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="40" y1="140" x2="420" y2="140" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="180" y1="20" x2="180" y2="200" stroke="#94A3B8" strokeWidth="1.5" />
          <text x="180" y="156" textAnchor="middle" fill="#64748B" fontSize="11">0</text>
          <text x="260" y="156" textAnchor="middle" fill="#0052FF" fontSize="12" fontWeight="bold">c = 2</text>
          <path d="M 60 130 Q 170 110, 255 62" fill="none" stroke="#0052FF" strokeWidth="3" />
          <circle cx="260" cy="60" r="5" fill="#FFFFFF" stroke="#0052FF" strokeWidth="2.5" />
          <text x="270" y="55" fill="#0052FF" fontSize="12" fontWeight="bold">Limit Kiri = 3</text>
          <path d="M 265 32 Q 320 45, 390 80" fill="none" stroke="#10B981" strokeWidth="3" />
          <circle cx="260" cy="30" r="5" fill="#FFFFFF" stroke="#10B981" strokeWidth="2.5" />
          <text x="270" y="30" fill="#059669" fontSize="12" fontWeight="bold">Limit Kanan = 5</text>
          <circle cx="260" cy="115" r="4.5" fill="#0F172A" />
          <text x="270" y="120" fill="#0F172A" fontSize="11">f(2) = 1</text>
          <text x="230" y="196" textAnchor="middle" fill="#DC2626" fontSize="13" fontWeight="bold">
            Limit Kiri (3) ≠ Limit Kanan (5) ⟹ Limit x→2 f(x) TIDAK ADA
          </text>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 460 220" className="w-full h-full select-none">
          <rect width="460" height="220" rx="14" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <circle cx="230" cy="90" r="45" fill="#EFF6FF" stroke="#0052FF" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 190 90 L 270 90 M 230 50 L 230 130" stroke="#0052FF" strokeWidth="2" />
          <text x="230" y="95" textAnchor="middle" fill="#0052FF" fontSize="14" fontWeight="bold">f(x, y)</text>
          <text x="230" y="165" textAnchor="middle" fill="#1E3A8A" fontSize="13" fontWeight="bold">
            Diagram Analitis Pemodelan Masalah Matematika
          </text>
          <text x="230" y="188" textAnchor="middle" fill="#64748B" fontSize="11">
            Gunakan informasi numerik dan aljabar pada stimulus untuk membangun model penyelesaian
          </text>
        </svg>
      );
  }
}
