/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * TKA MATEMATIKA TINGKAT LANJUT SMA 2026
 * Platform Pembelajaran & Latihan Mandiri bersama MISTER JO
 * Slogan: "Berpikir Cerdas, Bernalar Tajam, Matematika Tak Lagi Sulit!"
 */

import React, { useState } from 'react';
import { Navbar, CurrentView } from './components/Navbar';
import { BatikBorder } from './components/BatikBorder';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { AudioSettingsModal } from './components/AudioSettingsModal';
import { useProgress } from './utils/useProgress';
import { HomeView } from './views/HomeView';
import { PracticeView } from './views/PracticeView';
import { ConceptMapView } from './views/ConceptMapView';
import { FormulaBankView } from './views/FormulaBankView';
import { ResultsView } from './views/ResultsView';
import { GuideView } from './views/GuideView';
import { ttsService } from './utils/ttsService';

export default function App() {
  const [currentView, setCurrentView] = useState<CurrentView>('home');
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isAudioSettingsOpen, setIsAudioSettingsOpen] = useState(false);

  const {
    progress,
    setAnswer,
    submitQuestion,
    toggleReviewFlag,
    openDiscussion,
    setActiveQuestion,
    resetAllProgress,
    completedCount,
    correctCount,
    wrongCount,
    finalPercentage,
    getElementMastery,
  } = useProgress();

  const handleNavigate = (view: CurrentView) => {
    setCurrentView(view);
    // Menu change narration
    if (view === 'concept_map') {
      ttsService.speak('Membuka Peta Materi TKA Matematika Tingkat Lanjut 2026.', 'Menu Peta Materi');
    } else if (view === 'formulas') {
      ttsService.speak('Membuka Bank Rumus Kunci Ilmiah KaTeX.', 'Menu Rumus Kunci');
    } else if (view === 'results') {
      ttsService.speak('Membuka Hasil dan Evaluasi Latihan.', 'Menu Hasil');
    } else if (view === 'guide') {
      ttsService.speak('Membuka Panduan Belajar Interaktif.', 'Menu Panduan');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col relative selection:bg-blue-600 selection:text-white">
      {/* Subtle Indonesian Batik Ornament Gutters (Left & Right) */}
      <BatikBorder />

      {/* Top Bar Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenResetModal={() => setIsResetModalOpen(true)}
        onOpenAudioSettings={() => setIsAudioSettingsOpen(true)}
        completedCount={completedCount}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            completedCount={completedCount}
            lastActiveQuestionId={progress.activeQuestionId}
          />
        )}

        {currentView === 'practice' && (
          <PracticeView
            progress={progress}
            setAnswer={setAnswer}
            submitQuestion={submitQuestion}
            toggleReviewFlag={toggleReviewFlag}
            openDiscussion={openDiscussion}
            initialQuestionId={progress.activeQuestionId || 1}
            onFinishPractice={() => handleNavigate('results')}
          />
        )}

        {currentView === 'concept_map' && (
          <ConceptMapView onNavigateToPractice={() => handleNavigate('practice')} />
        )}

        {currentView === 'formulas' && <FormulaBankView />}

        {currentView === 'results' && (
          <ResultsView
            finalPercentage={finalPercentage}
            completedCount={completedCount}
            correctCount={correctCount}
            wrongCount={wrongCount}
            getElementMastery={getElementMastery}
            onNavigate={handleNavigate}
            onResetProgress={() => setIsResetModalOpen(true)}
          />
        )}

        {currentView === 'guide' && (
          <GuideView onNavigateToPractice={() => handleNavigate('practice')} />
        )}
      </main>

      {/* Clean Academic Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-6 text-center text-xs text-slate-500 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-blue-700">TKA MATEMATIKA TINGKAT LANJUT SMA 2026</span>
            <span aria-hidden="true">·</span>
            <span>Pembimbing Virtual: Mister Jo</span>
          </div>
          <div className="text-slate-400">
            "Berpikir Cerdas, Bernalar Tajam, Matematika Tak Lagi Sulit!"
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={resetAllProgress}
      />

      <AudioSettingsModal
        isOpen={isAudioSettingsOpen}
        onClose={() => setIsAudioSettingsOpen(false)}
      />
    </div>
  );
}
