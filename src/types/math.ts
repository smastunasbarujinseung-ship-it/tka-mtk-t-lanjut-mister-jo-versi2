/**
 * Types definition for TKA Matematika Tingkat Lanjut SMA 2026
 * Platform Pembelajaran & Latihan Mandiri bersama Mister Jo
 */

export type ElementCategory = 'Aljabar' | 'Geometri dan Pengukuran' | 'Kalkulus';

export type QuestionType =
  | 'pg_biasa'
  | 'kecukupan_pernyataan'
  | 'pg_kompleks'
  | 'benar_salah';

export type Difficulty = 'Menengah' | 'Sulit' | 'Sangat Sulit';

export interface KeyFormulaItem {
  name: string;
  latex: string;
  explanation: string;
}

export interface TrueFalseStatement {
  id: string;
  statement: string;
  isCorrect: boolean; // true = BENAR, false = SALAH
  explanation: string;
}

export interface QuestionOption {
  key: string; // 'A' | 'B' | 'C' | 'D' | 'E'
  text: string;
  latex?: string;
  explanation?: string;
}

export interface FullDiscussionStep {
  understanding: string;       // 1. Memahami permasalahan
  knownInfo: string;           // 2. Mengidentifikasi informasi yang diketahui
  targetQuestion: string;      // 3. Menentukan hal yang ditanyakan
  mathConcept: string;         // 4. Menentukan konsep matematika
  keyFormula: string;          // 5. Menampilkan RUMUS KUNCI
  mathModel: string;           // 6. Menyusun model matematika
  substitutions: string;       // 7. Melakukan substitusi dan perhitungan
  simplification: string;      // 8. Menunjukkan proses penyederhanaan
  finalResult: string;         // 9. Menentukan hasil akhir
  correctReason: string;       // 10. Menjelaskan alasan jawaban benar
  distractorNotes?: string;    // 11. Menjelaskan kesalahan pada pilihan pengecoh
  fastTrickSummary: string;    // 12. Menyajikan cara cepat
}

export interface QuestionData {
  id: number; // 1 to 30
  number: number;
  element: ElementCategory;
  subtopic: string;
  difficulty: Difficulty;
  type: QuestionType;
  competenceIndicator: string;

  // Stimulus
  stimulusText: string;
  stimulusVisualType?: 'svg_diagram' | 'table_data' | 'matrix_display' | 'none';
  stimulusVisualId?: string;
  stimulusTableData?: {
    headers: string[];
    rows: (string | number)[][];
  };

  // Narrations for TTS
  narratorOpening: string;
  narratorStimulus: string;
  narratorQuestion: string;
  narratorStrategy: string;
  narratorDiscussion: string;
  narratorFastTrick: string;

  // Question content
  questionText: string;
  statement1?: string; // For kecukupan_pernyataan: Pernyataan (1)
  statement2?: string; // For kecukupan_pernyataan: Pernyataan (2)

  // Options & Answers
  options?: QuestionOption[]; // For pg_biasa, kecukupan_pernyataan, pg_kompleks
  trueFalseStatements?: TrueFalseStatement[]; // For benar_salah

  // Correct answer specification
  correctAnswerKey?: string; // 'A' | 'B' | 'C' | 'D' | 'E'
  correctAnswerKeys?: string[]; // For pg_kompleks, e.g. ['A', 'C', 'D']
  correctTrueFalseAnswers?: boolean[]; // For benar_salah, e.g. [true, false, true]

  // Discussion & Formulas
  keyFormulas: KeyFormulaItem[];
  fullDiscussion: FullDiscussionStep;
  fastTrick: {
    title: string;
    explanation: string;
    formula?: string;
  };
}

export interface UserProgressState {
  answers: Record<number, string | string[] | boolean[]>;
  submitted: Record<number, boolean>;
  scores: Record<number, number>; // Points out of (100 / 30) or percentage
  reviewed: Record<number, boolean>;
  discussionOpened: Record<number, boolean>;
  activeQuestionId: number;
  startTime: number;
  lastUpdated: number;
}

export interface ElementMastery {
  element: ElementCategory;
  total: number;
  completed: number;
  correct: number;
  percentage: number;
}
