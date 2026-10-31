import React, { useState } from 'react';
import { BookOpen, Search, Volume2, Sparkles, Copy, Check } from 'lucide-react';
import { formulaBank, FormulaItem } from '../data/formulas';
import { MathView } from '../components/MathView';
import { TTSAudioController } from '../components/TTSAudioController';
import { ttsService } from '../utils/ttsService';

export const FormulaBankView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['Semua', ...Object.keys(formulaBank)];

  // Filter formulas
  const allFormulas: FormulaItem[] = Object.values(formulaBank).flat();
  const filtered = allFormulas.filter((f) => {
    const matchCat = selectedCategory === 'Semua' || f.category === selectedCategory;
    const matchQuery =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.symbolMeaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  const handleCopyLatex = (latex: string, id: string) => {
    navigator.clipboard.writeText(latex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeakFormula = (f: FormulaItem) => {
    ttsService.speak(
      `Rumus: ${f.name}. ${f.narration} Keterangan simbol: ${f.symbolMeaning}`,
      `Penjelasan Rumus: ${f.name}`
    );
  };

  return (
    <div className="space-y-8 py-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Bank Rumus Kunci & KaTeX Ilmiah</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Bank Rumus Kunci TKA 2026
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto">
          Daftar formula lengkap terverifikasi dengan notasi KaTeX ilmiah, keterangan variabel simbol, contoh numerik, dan penjelasan audio narator Mister Jo.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="bg-white rounded-2xl border border-blue-100 p-4 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari rumus (misal: determinan, limit, sudut rangkap, vektor)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
            Ditemukan {filtered.length} rumus
          </span>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Formula Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-white border border-blue-200/90 shadow-xs hover:shadow-md transition-all p-6 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">{item.name}</h3>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleSpeakFormula(item)}
                    className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
                    title="Dengarkan penjelasan rumus dari Mister Jo"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleCopyLatex(item.latex, item.id)}
                    className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
                    title="Salin sintaks LaTeX rumus"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* KaTeX Math View */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-center overflow-x-auto my-2">
                <MathView math={item.latex} display={true} />
              </div>

              {/* Keterangan Simbol */}
              <div className="text-xs text-slate-600 leading-relaxed space-y-1">
                <strong className="text-slate-800">Keterangan Simbol: </strong>
                <span>{item.symbolMeaning}</span>
              </div>

              {/* Contoh Singkat */}
              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-xs text-blue-900 leading-relaxed">
                <strong>Contoh Penerapan: </strong>
                <span>{item.shortExample}</span>
              </div>
            </div>

            <button
              onClick={() => handleSpeakFormula(item)}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer mt-2"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Dengarkan Narator Rumus</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
