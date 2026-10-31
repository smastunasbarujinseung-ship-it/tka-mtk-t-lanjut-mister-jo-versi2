import { useState, useEffect, useCallback } from 'react';
import { UserProgressState, ElementMastery, ElementCategory } from '../types/math';
import { allQuestions } from '../data/questions';

const STORAGE_KEY = 'tka_matematika_mister_jo_2026_progress';

const defaultState: UserProgressState = {
  answers: {},
  submitted: {},
  scores: {},
  reviewed: {},
  discussionOpened: {},
  activeQuestionId: 1,
  startTime: Date.now(),
  lastUpdated: Date.now(),
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgressState>(() => {
    if (typeof window === 'undefined') return defaultState;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to parse saved progress:', e);
    }
    return defaultState;
  });

  // Save to localStorage automatically on state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Failed to persist progress:', e);
    }
  }, [progress]);

  const setAnswer = useCallback((questionId: number, answer: string | string[] | boolean[]) => {
    setProgress((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
      lastUpdated: Date.now(),
    }));
  }, []);

  const submitQuestion = useCallback((questionId: number, score: number) => {
    setProgress((prev) => ({
      ...prev,
      submitted: { ...prev.submitted, [questionId]: true },
      scores: { ...prev.scores, [questionId]: score },
      lastUpdated: Date.now(),
    }));
  }, []);

  const toggleReviewFlag = useCallback((questionId: number) => {
    setProgress((prev) => ({
      ...prev,
      reviewed: { ...prev.reviewed, [questionId]: !prev.reviewed[questionId] },
    }));
  }, []);

  const openDiscussion = useCallback((questionId: number) => {
    setProgress((prev) => ({
      ...prev,
      discussionOpened: { ...prev.discussionOpened, [questionId]: true },
    }));
  }, []);

  const setActiveQuestion = useCallback((questionId: number) => {
    setProgress((prev) => ({
      ...prev,
      activeQuestionId: questionId,
      lastUpdated: Date.now(),
    }));
  }, []);

  const resetAllProgress = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear localStorage:', e);
    }
    const fresh: UserProgressState = {
      answers: {},
      submitted: {},
      scores: {},
      reviewed: {},
      discussionOpened: {},
      activeQuestionId: 1,
      startTime: Date.now(),
      lastUpdated: Date.now(),
    };
    setProgress(fresh);
  }, []);

  // Calculate overall metrics
  const completedCount = Object.keys(progress.submitted).filter((k) => progress.submitted[Number(k)]).length;
  const totalScore = Object.values(progress.scores).reduce((acc, curr) => acc + (curr || 0), 0);
  // Each question worth 100/30 points, so max is 100
  const finalPercentage = Math.round((totalScore / 30) * 100) / 100;

  // Calculate correct and wrong counts
  const correctCount = Object.keys(progress.submitted).filter((k) => (progress.scores[Number(k)] || 0) >= 0.8).length;
  const wrongCount = completedCount - correctCount;

  // Element Mastery breakdown
  const getElementMastery = useCallback((element: ElementCategory): ElementMastery => {
    const questionsInElement = allQuestions.filter((q) => q.element === element);
    const total = questionsInElement.length;
    let completed = 0;
    let correct = 0;

    questionsInElement.forEach((q) => {
      if (progress.submitted[q.id]) {
        completed++;
        if ((progress.scores[q.id] || 0) >= 0.8) {
          correct++;
        }
      }
    });

    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { element, total, completed, correct, percentage };
  }, [progress]);

  return {
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
  };
}
