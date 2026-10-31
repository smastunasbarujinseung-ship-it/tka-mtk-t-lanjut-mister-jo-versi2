import React, { useState } from 'react';
import { Menu, X, RotateCcw, Volume2, Sparkles, BookOpen, Award, Compass, HelpCircle } from 'lucide-react';

export type CurrentView = 'home' | 'practice' | 'concept_map' | 'formulas' | 'results' | 'guide';

interface NavbarProps {
  currentView: CurrentView;
  onNavigate: (view: CurrentView) => void;
  onOpenResetModal: () => void;
  onOpenAudioSettings: () => void;
  completedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenResetModal,
  onOpenAudioSettings,
  completedCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: CurrentView; label: string; icon: any }[] = [
    { id: 'home', label: 'Beranda', icon: Sparkles },
    { id: 'concept_map', label: 'Peta Materi', icon: Compass },
    { id: 'practice', label: 'Latihan Soal', icon: BookOpen },
    { id: 'formulas', label: 'Rumus Kunci', icon: BookOpen },
    { id: 'results', label: 'Hasil Latihan', icon: Award },
    { id: 'guide', label: 'Panduan Belajar', icon: HelpCircle },
  ];

  const handleLinkClick = (view: CurrentView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-lg shadow-sm group-hover:bg-blue-700 transition-colors">
              MJ
            </div>
            <div>
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-blue-900 whitespace-nowrap block">
                TKA MATEMATIKA TINGKAT LANJUT
              </span>
              <span className="text-xs text-blue-600 font-semibold tracking-wide block">
                MISTER JO · TKA SMA 2026
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`py-1.5 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  currentView === item.id
                    ? 'border-blue-600 text-blue-600 font-bold'
                    : 'border-transparent hover:text-blue-600 hover:border-blue-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Audio Settings Button */}
            <button
              onClick={onOpenAudioSettings}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
              title="Pengaturan Suara Narator"
            >
              <Volume2 className="w-5 h-5" />
            </button>

            {/* Reset Button */}
            <button
              onClick={onOpenResetModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl border border-slate-200 transition-colors"
              title="Reset Semua Progres"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            {/* Quick Practice CTA */}
            <button
              onClick={() => handleLinkClick('practice')}
              className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0"
            >
              <span>Mulai Belajar</span>
              <span className="bg-blue-800 text-[11px] px-1.5 py-0.5 rounded font-mono">
                {completedCount}/30
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200 shadow-lg">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-colors ${
                  currentView === item.id
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-5 h-5 text-blue-600" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenAudioSettings();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-semibold text-slate-600 p-2"
            >
              <Volume2 className="w-4 h-4 text-blue-600" />
              <span>Pengaturan Suara</span>
            </button>
            <button
              onClick={() => {
                onOpenResetModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-red-600 p-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Progres</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
