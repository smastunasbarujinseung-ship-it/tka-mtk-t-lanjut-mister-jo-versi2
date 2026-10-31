import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  BookOpen,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Lightbulb,
  Award,
  Layers,
  ArrowRight,
  Volume2,
} from 'lucide-react';
import { QuestionData, ElementCategory, QuestionType } from '../types/math';
import { allQuestions } from '../data/questions';
import { MathView, MathText } from '../components/MathView';
import { InteractiveStimulus } from '../components/InteractiveStimulus';
import { TTSAudioController } from '../components/TTSAudioController';
import { ttsService } from '../utils/ttsService';

interface PracticeViewProps {
  progress: any;
  setAnswer: (id: number, answer: any) => void;
  submitQuestion: (id: number, score: number) => void;
  toggleReviewFlag: (id: number) => void;
  openDiscussion: (id: number) => void;
  initialQuestionId?: number;
  onFinishPractice: () => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  progress,
  setAnswer,
  submitQuestion,
  toggleReviewFlag,
  openDiscussion,
  initialQuestionId = 1,
  onFinishPractice,
}) => {
  const [currentId, setCurrentId] = useState<number>(progress.activeQuestionId || initialQuestionId);
  const [filterElement, setFilterElement] = useState<'Semua' | ElementCategory>('Semua');
  const [activeTab, setActiveTab] = useState<'soal' | 'pembahasan' | 'rumus_kunci' | 'cara_cepat'>('soal');
  const [showQuestionPalette, setShowQuestionPalette] = useState(false);

  const question: QuestionData = allQuestions.find((q) => q.id === currentId) || allQuestions[0];
  const isSubmitted = !!progress.submitted[question.id];
  const currentAnswer = progress.answers[question.id];
  const isFlagged = !!progress.reviewed[question.id];
  const discussionOpened = !!progress.discussionOpened[question.id];

  // Stop previous speech whenever question ID changes to prevent overlapping audio
  useEffect(() => {
    ttsService.stop();
  }, [currentId]);

  const handleNext = () => {
    if (currentId < 30) {
      setCurrentId(currentId + 1);
      setActiveTab('soal');
    }
  };

  const handlePrev = () => {
    if (currentId > 1) {
      setCurrentId(currentId - 1);
      setActiveTab('soal');
    }
  };

  const handleSelectOption = (key: string) => {
    if (isSubmitted) return;
    setAnswer(question.id, key);
  };

  const handleToggleComplexOption = (key: string) => {
    if (isSubmitted) return;
    const currentKeys: string[] = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
    const index = currentKeys.indexOf(key);
    if (index > -1) {
      currentKeys.splice(index, 1);
    } else {
      currentKeys.push(key);
    }
    setAnswer(question.id, currentKeys);
  };

  const handleSelectTrueFalse = (stmtIndex: number, value: boolean) => {
    if (isSubmitted) return;
    const currentList: (boolean | null)[] = Array.isArray(currentAnswer)
      ? [...currentAnswer]
      : [null, null, null];
    currentList[stmtIndex] = value;
    setAnswer(question.id, currentList);
  };

  const handleSubmit = () => {
    let score = 0;

    if (question.type === 'pg_biasa' || question.type === 'kecukupan_pernyataan') {
      if (currentAnswer === question.correctAnswerKey) {
        score = 1.0;
      }
    } else if (question.type === 'pg_kompleks') {
      const selected = Array.isArray(currentAnswer) ? (currentAnswer as string[]) : [];
      const correct = question.correctAnswerKeys || [];
      const truePositives = selected.filter((k) => correct.includes(k)).length;
      const falsePositives = selected.filter((k) => !correct.includes(k)).length;
      if (falsePositives === 0 && truePositives === correct.length) {
        score = 1.0;
      } else if (falsePositives === 0 && truePositives > 0) {
        score = Math.round((truePositives / correct.length) * 100) / 100;
      } else {
        score = Math.max(0, Math.round(((truePositives - falsePositives * 0.5) / correct.length) * 100) / 100);
      }
    } else if (question.type === 'benar_salah') {
      const answers = Array.isArray(currentAnswer) ? (currentAnswer as boolean[]) : [];
      const correct = question.correctTrueFalseAnswers || [];
      let matchCount = 0;
      for (let i = 0; i < correct.length; i++) {
        if (answers[i] === correct[i]) {
          matchCount++;
        }
      }
      score = Math.round((matchCount / correct.length) * 100) / 100;
    }

    submitQuestion(question.id, score);
    openDiscussion(question.id);

    if (score >= 0.99) {
      ttsService.speak(
        `Luar biasa, jawabanmu tepat sekali! Skor penuh untuk soal nomor ${question.number}. Mari kita pelajari pembahasan lengkap dan trik cepatnya bersama Mister Jo.`,
        'Pemeriksaan Jawaban: Sempurna'
      );
    } else {
      ttsService.speak(
        `Jawaban telah diperiksa. Jangan berkecil hati, mari kita pelajari konsep dan pembahasannya bersama Mister Jo agar logika berpikirmu semakin tajam.`,
        'Pemeriksaan Jawaban: Evaluasi'
      );
    }
  };

  const getQuestionStatus = (qId: number) => {
    if (progress.submitted[qId]) {
      const sc = progress.scores[qId] || 0;
      return sc >= 0.8 ? 'correct' : 'incorrect';
    }
    if (progress.answers[qId] !== undefined) {
      return 'answered';
    }
    return 'unanswered';
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Filter & Palette Bar */}
      <div className="bg-white border border-blue-100 rounded-2xl p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Element Filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto max-w-full">
            {(['Semua', 'Aljabar', 'Geometri dan Pengukuran', 'Kalkulus'] as const).map((elem) => (
              <button
                key={elem}
                onClick={() => setFilterElement(elem)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  filterElement === elem
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {elem === 'Geometri dan Pengukuran' ? 'Geometri' : elem}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleReviewFlag(question.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                isFlagged
                  ? 'bg-amber-50 border-amber-300 text-amber-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Tandai soal ini untuk ditinjau kembali"
            >
              <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-current text-amber-500' : ''}`} />
              <span>{isFlagged ? 'Ditandai' : 'Tandai Soal'}</span>
            </button>

            <button
              onClick={() => setShowQuestionPalette(!showQuestionPalette)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Daftar Soal ({currentId}/30)</span>
            </button>
          </div>
        </div>

        {/* Collapsible Question Palette (1–30) */}
        {showQuestionPalette && (
          <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
              <span className="font-bold text-slate-700">Pilih Nomor Soal:</span>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Benar
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Salah
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Terisi
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span> Belum
                </span>
              </div>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-15 gap-1.5">
              {allQuestions.map((q) => {
                const status = getQuestionStatus(q.id);
                const isCurrent = q.id === currentId;

                let badgeColor = 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200';
                if (status === 'correct') {
                  badgeColor = 'bg-emerald-500 text-white border-emerald-600';
                } else if (status === 'incorrect') {
                  badgeColor = 'bg-red-500 text-white border-red-600';
                } else if (status === 'answered') {
                  badgeColor = 'bg-amber-400 text-slate-900 border-amber-500';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentId(q.id);
                      setActiveTab('soal');
                    }}
                    className={`h-9 rounded-xl font-bold text-xs flex items-center justify-center border transition-all cursor-pointer ${badgeColor} ${
                      isCurrent ? 'ring-2 ring-blue-600 ring-offset-2 scale-105' : ''
                    }`}
                  >
                    {q.number}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl border border-blue-200 shadow-md p-6 sm:p-8 lg:p-10 space-y-6">
        {/* Header Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl font-black text-blue-700 font-mono tracking-tight">
              SOAL NO. {question.number}
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
              {question.element}
            </span>
            <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
              {question.subtopic}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs px-3 py-1 rounded-full font-bold ${
                question.difficulty === 'Sangat Sulit'
                  ? 'bg-purple-50 text-purple-700 border border-purple-200'
                  : question.difficulty === 'Sulit'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}
            >
              HOTS {question.difficulty}
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold">
              {question.type === 'pg_biasa'
                ? 'Pilihan Ganda Biasa'
                : question.type === 'kecukupan_pernyataan'
                ? 'Analisis Kecukupan Pernyataan'
                : question.type === 'pg_kompleks'
                ? 'Pilihan Ganda Kompleks'
                : 'Benar atau Salah'}
            </span>
          </div>
        </div>

        {/* Audio TTS Controllers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TTSAudioController
            currentText={question.narratorStimulus}
            label={`Pembacaan Stimulus Soal ${question.number}`}
          />
          <TTSAudioController
            currentText={question.narratorStrategy}
            label={`Arahan Berpikir Mister Jo`}
          />
        </div>

        {/* STIMULUS CONTAINER (Min 18-20px text) */}
        <div className="bg-slate-50/90 rounded-2xl p-6 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
            <span className="text-xs font-black uppercase tracking-widest text-blue-700">
              STIMULUS SOAL
            </span>
            <button
              onClick={() => ttsService.speak(question.narratorStimulus, `Stimulus Soal ${question.number}`)}
              className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Dengarkan Stimulus</span>
            </button>
          </div>

          <div className="text-[19px] sm:text-[20px] text-slate-900 leading-relaxed font-normal">
            <MathText text={question.stimulusText} />
          </div>

          {/* Diagram / Graph / Table */}
          <InteractiveStimulus
            visualId={question.stimulusVisualId}
            visualType={question.stimulusVisualType}
            tableData={question.stimulusTableData}
          />
        </div>

        {/* PERTANYAAN (Min 21-24px font) */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">
              PERTANYAAN
            </span>
            <button
              onClick={() => ttsService.speak(question.narratorQuestion, `Pertanyaan Soal ${question.number}`)}
              className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Dengarkan Pertanyaan</span>
            </button>
          </div>

          <div className="text-[21px] sm:text-[23px] font-bold text-slate-900 leading-relaxed">
            <MathText text={question.questionText} />
          </div>

          {/* Kecukupan Pernyataan (1) & (2) */}
          {question.type === 'kecukupan_pernyataan' && question.statement1 && question.statement2 && (
            <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3 text-[19px] sm:text-[20px] text-slate-900">
              <div className="flex items-start gap-2">
                <span className="font-bold text-blue-700 shrink-0">(1)</span>
                <MathText text={question.statement1} />
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-blue-700 shrink-0">(2)</span>
                <MathText text={question.statement2} />
              </div>
            </div>
          )}
        </div>

        {/* PILIHAN JAWABAN (Min 19-20px font) */}
        <div className="space-y-3 pt-2">
          {/* TYPE 1: PG BIASA & TYPE 2: KECUKUPAN PERNYATAAN */}
          {(question.type === 'pg_biasa' || question.type === 'kecukupan_pernyataan') && question.options && (
            <div className="space-y-3">
              {question.options.map((opt) => {
                const isSelected = currentAnswer === opt.key;
                const isCorrect = question.correctAnswerKey === opt.key;

                let optionStyle =
                  'bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 text-slate-900';
                if (isSelected && !isSubmitted) {
                  optionStyle = 'bg-blue-50 border-blue-600 text-blue-900 ring-2 ring-blue-500/25 shadow-xs';
                }
                if (isSubmitted) {
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-2 ring-emerald-500/25';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'bg-red-50 border-red-500 text-red-950 ring-2 ring-red-500/25';
                  }
                }

                return (
                  <button
                    key={opt.key}
                    disabled={isSubmitted}
                    onClick={() => handleSelectOption(opt.key)}
                    className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all cursor-pointer ${optionStyle}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base shrink-0 border ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-100 text-slate-700 border-slate-300'
                      }`}
                    >
                      {opt.key}
                    </div>
                    <div className="text-[19px] sm:text-[20px] leading-relaxed pt-1 flex-1">
                      <MathText text={opt.text} />
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* TYPE 3: PILIHAN GANDA KOMPLEKS (Kotak Centang) */}
          {question.type === 'pg_kompleks' && question.options && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">
                Pilih seluruh opsi yang bernilai BENAR (dapat memilih lebih dari satu jawaban):
              </div>
              {question.options.map((opt) => {
                const selectedArr: string[] = Array.isArray(currentAnswer) ? currentAnswer : [];
                const isChecked = selectedArr.includes(opt.key);
                const isCorrect = (question.correctAnswerKeys || []).includes(opt.key);

                let cardStyle =
                  'bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 text-slate-900';
                if (isChecked && !isSubmitted) {
                  cardStyle = 'bg-blue-50 border-blue-600 text-blue-900 ring-2 ring-blue-500/25 shadow-xs';
                }
                if (isSubmitted) {
                  if (isCorrect) {
                    cardStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/25 font-medium';
                  } else if (isChecked && !isCorrect) {
                    cardStyle = 'bg-red-50 border-red-500 text-red-950 ring-2 ring-red-500/25';
                  }
                }

                return (
                  <button
                    key={opt.key}
                    disabled={isSubmitted}
                    onClick={() => handleToggleComplexOption(opt.key)}
                    className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all cursor-pointer ${cardStyle}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-base shrink-0 border mt-0.5 ${
                        isChecked
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white border-slate-300 text-transparent'
                      }`}
                    >
                      ✓
                    </div>
                    <div className="text-[19px] sm:text-[20px] leading-relaxed flex-1">
                      <span className="font-bold mr-2 text-blue-700">{opt.key}.</span>
                      <MathText text={opt.text} />
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* TYPE 4: BENAR ATAU SALAH */}
          {question.type === 'benar_salah' && question.trueFalseStatements && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wide">
                Evaluasi setiap pernyataan berikut sebagai BENAR atau SALAH:
              </div>
              {question.trueFalseStatements.map((stmt, idx) => {
                const userChoice = Array.isArray(currentAnswer) ? currentAnswer[idx] : null;
                const isEvaluatedCorrect = isSubmitted && userChoice === stmt.isCorrect;

                return (
                  <div
                    key={stmt.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isSubmitted
                        ? isEvaluatedCorrect
                          ? 'bg-emerald-50/70 border-emerald-300'
                          : 'bg-red-50/70 border-red-300'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="text-[19px] text-slate-900 leading-relaxed flex-1">
                        <span className="font-bold text-blue-700 mr-2">Pernyataan {idx + 1}:</span>
                        <MathText text={stmt.statement} />
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          disabled={isSubmitted}
                          onClick={() => handleSelectTrueFalse(idx, true)}
                          className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition-colors cursor-pointer ${
                            userChoice === true
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          BENAR
                        </button>
                        <button
                          disabled={isSubmitted}
                          onClick={() => handleSelectTrueFalse(idx, false)}
                          className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition-colors cursor-pointer ${
                            userChoice === false
                              ? 'bg-red-600 text-white border-red-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          SALAH
                        </button>
                      </div>
                    </div>

                    {isSubmitted && (
                      <div className="mt-3 pt-3 border-t border-slate-200 text-sm text-slate-700">
                        <span className="font-bold text-slate-900">Kunci Jawaban: </span>
                        <span className={stmt.isCorrect ? 'text-emerald-700 font-bold' : 'text-red-700 font-bold'}>
                          {stmt.isCorrect ? 'BENAR' : 'SALAH'}
                        </span>
                        <span className="mx-2">·</span>
                        <MathText text={stmt.explanation} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Submit Action & Scoring Bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={currentAnswer === undefined}
                className={`px-6 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all ${
                  currentAnswer !== undefined
                    ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transform hover:-translate-y-0.5'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                PERIKSA JAWABAN
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <div
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold ${
                    (progress.scores[question.id] || 0) >= 0.8
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}
                >
                  {(progress.scores[question.id] || 0) >= 0.8 ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span>
                    {(progress.scores[question.id] || 0) >= 0.8 ? 'Jawaban Benar!' : 'Jawaban Belum Tepat'}
                  </span>
                </div>

                <button
                  onClick={() => openDiscussion(question.id)}
                  className="px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 font-bold text-sm border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  Lihat Pembahasan Lengkap
                </button>
              </div>
            )}
          </div>

          {/* Navigation Prev & Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentId <= 1}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-colors ${
                currentId > 1
                  ? 'border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer'
                  : 'border-slate-100 text-slate-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            {currentId < 30 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-xs cursor-pointer"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onFinishPractice}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-colors shadow-xs cursor-pointer"
              >
                <span>Selesai & Lihat Skor</span>
                <Award className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* PEMBAHASAN LENGKAP & RUMUS KUNCI & CARA CEPAT */}
        {(isSubmitted || discussionOpened) && (
          <div className="mt-8 pt-6 border-t-2 border-blue-100 space-y-6 animate-in fade-in duration-300">
            {/* Discussion Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('soal')}
                className={`px-4 py-2 text-sm font-bold rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === 'soal'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Pembahasan Lengkap (12 Langkah)
              </button>
              <button
                onClick={() => setActiveTab('rumus_kunci')}
                className={`px-4 py-2 text-sm font-bold rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === 'rumus_kunci'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Rumus Kunci KaTeX
              </button>
              <button
                onClick={() => setActiveTab('cara_cepat')}
                className={`px-4 py-2 text-sm font-bold rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === 'cara_cepat'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Cara Cepat Alternatif
              </button>
            </div>

            {/* TAB CONTENT 1: PEMBAHASAN LENGKAP (12 LANGKAH) */}
            {activeTab === 'soal' && (
              <div className="space-y-6">
                <TTSAudioController
                  currentText={question.narratorDiscussion}
                  label={`Pembahasan Lengkap Soal ${question.number}`}
                />

                <div className="rounded-2xl bg-blue-50/40 border border-blue-200 p-6 space-y-6 text-[18px] text-slate-800 leading-relaxed">
                  <div className="flex items-center gap-2 text-blue-800 font-extrabold text-base border-b border-blue-200 pb-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span>STRUKTUR PEMBAHASAN MATEMATIS MISTER JO</span>
                  </div>

                  <div className="space-y-5">
                    {/* Langkah 1 */}
                    <div className="p-4 bg-white rounded-xl border border-blue-100 shadow-2xs space-y-2">
                      <h4 className="font-bold text-blue-900 text-base">1. Memahami Masalah & Data Diketahui</h4>
                      <p><MathText text={question.fullDiscussion.understanding} /></p>
                      <p className="text-slate-600 text-base">
                        <strong className="text-slate-800">Informasi Diketahui: </strong>
                        <MathText text={question.fullDiscussion.knownInfo} />
                      </p>
                    </div>

                    {/* Langkah 2 */}
                    <div className="p-4 bg-white rounded-xl border border-blue-100 shadow-2xs space-y-2">
                      <h4 className="font-bold text-blue-900 text-base">2. Target Pertanyaan & Konsep Matematika</h4>
                      <p>
                        <strong className="text-slate-800">Hal yang dicari: </strong>
                        <MathText text={question.fullDiscussion.targetQuestion} />
                      </p>
                      <p>
                        <strong className="text-slate-800">Konsep Relevan: </strong>
                        <MathText text={question.fullDiscussion.mathConcept} />
                      </p>
                    </div>

                    {/* Langkah 3 */}
                    <div className="p-4 bg-white rounded-xl border border-blue-100 shadow-2xs space-y-2">
                      <h4 className="font-bold text-blue-900 text-base">3. Rumus Kunci & Model Matematika</h4>
                      <div className="my-2 p-3 bg-blue-50/60 rounded-xl border border-blue-200 text-center">
                        <MathText text={question.fullDiscussion.keyFormula} />
                      </div>
                      <div className="mt-2 text-slate-700">
                        <MathText text={question.fullDiscussion.mathModel} />
                      </div>
                    </div>

                    {/* Langkah 4 */}
                    <div className="p-4 bg-white rounded-xl border border-blue-100 shadow-2xs space-y-2">
                      <h4 className="font-bold text-blue-900 text-base">4. Substitusi, Perhitungan & Penyederhanaan</h4>
                      <div className="text-slate-700">
                        <MathText text={question.fullDiscussion.substitutions} />
                      </div>
                      <div className="mt-2 font-medium text-slate-800">
                        <MathText text={question.fullDiscussion.simplification} />
                      </div>
                    </div>

                    {/* Langkah 5 */}
                    <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-300 text-emerald-950 space-y-2">
                      <h4 className="font-extrabold text-emerald-950 text-base">5. Hasil Akhir & Alasan Kebenaran Jawaban</h4>
                      <div className="font-black text-xl text-emerald-700">
                        <MathText text={question.fullDiscussion.finalResult} />
                      </div>
                      <div className="text-base text-emerald-900">
                        <MathText text={question.fullDiscussion.correctReason} />
                      </div>
                    </div>

                    {/* Pengecoh */}
                    {question.fullDiscussion.distractorNotes && (
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-700">
                        <strong className="text-slate-900">Analisis Kesalahan Pilihan Pengecoh: </strong>
                        <MathText text={question.fullDiscussion.distractorNotes} />
                      </div>
                    )}
                  </div>
                </div>

                {/* CARA CEPAT (Directly after discussion on the same page) */}
                <div className="rounded-2xl bg-amber-50/80 border border-amber-300 p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-900 font-extrabold text-base">
                      <Zap className="w-5 h-5 text-amber-600 fill-current" />
                      <span>CARA CEPAT & EFEKTIF (TRIK MISTER JO)</span>
                    </div>
                    <button
                      onClick={() => ttsService.speak(question.narratorFastTrick, `Cara Cepat Soal ${question.number}`)}
                      className="text-xs text-amber-900 hover:text-amber-950 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Dengarkan Trik</span>
                    </button>
                  </div>
                  <h5 className="font-bold text-slate-900 text-lg">{question.fastTrick.title}</h5>
                  <div className="text-[18px] text-slate-800 leading-relaxed">
                    <MathText text={question.fastTrick.explanation} />
                  </div>
                  {question.fastTrick.formula && (
                    <div className="my-2 p-3 bg-white rounded-xl border border-amber-300 text-center">
                      <MathView math={question.fastTrick.formula} display={true} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: RUMUS KUNCI */}
            {activeTab === 'rumus_kunci' && (
              <div className="space-y-4">
                <div className="text-sm font-semibold text-slate-600">
                  Rumus-rumus kunci yang digunakan untuk menyelesaikan Soal No. {question.number}:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {question.keyFormulas.map((item, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white border border-blue-200 shadow-xs space-y-3">
                      <div className="text-sm font-bold text-blue-800">{item.name}</div>
                      <div className="py-2 px-3 bg-blue-50/50 rounded-xl overflow-x-auto text-center">
                        <MathView math={item.latex} display={true} />
                      </div>
                      <div className="text-sm text-slate-600 leading-relaxed">
                        <MathText text={item.explanation} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: CARA CEPAT STANDALONE */}
            {activeTab === 'cara_cepat' && (
              <div className="rounded-2xl bg-amber-50/80 border border-amber-300 p-6 space-y-4">
                <TTSAudioController
                  currentText={question.narratorFastTrick}
                  label={`Cara Cepat Alternatif Soal ${question.number}`}
                />
                <div className="flex items-center gap-2 text-amber-900 font-extrabold text-lg">
                  <Zap className="w-5 h-5 text-amber-600 fill-current" />
                  <span>{question.fastTrick.title}</span>
                </div>
                <div className="text-[18px] text-slate-800 leading-relaxed">
                  <MathText text={question.fastTrick.explanation} />
                </div>
                {question.fastTrick.formula && (
                  <div className="p-4 bg-white rounded-xl border border-amber-300 text-center">
                    <MathView math={question.fastTrick.formula} display={true} />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
