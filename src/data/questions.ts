import { QuestionData, ElementCategory } from '../types/math';
import { aljabarQuestions } from './questions/aljabarQuestions';
import { geometriQuestions } from './questions/geometriQuestions';
import { kalkulusQuestions } from './questions/kalkulusQuestions';

export const allQuestions: QuestionData[] = [
  ...aljabarQuestions,
  ...geometriQuestions,
  ...kalkulusQuestions,
];

export function getQuestionById(id: number): QuestionData | undefined {
  return allQuestions.find((q) => q.id === id);
}

export function getQuestionsByElement(element: ElementCategory): QuestionData[] {
  return allQuestions.filter((q) => q.element === element);
}

export const TOTAL_QUESTIONS = allQuestions.length; // Exactly 30
