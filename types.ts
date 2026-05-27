export type TabType = 'dialogues' | 'quizzes' | 'duel' | 'guide';

export interface DialogueLine {
  speaker: string;
  spanish: string;
  armenian: string;
}

export interface DialogueData {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  tenseName: string;
  tenseCode: 'perfecto' | 'imperfecto' | 'indefinido';
  lines: DialogueLine[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  spanishQuestion?: string;
  spanishOptions?: string[];
  spanishExplanation?: string;
}

export interface QuizData {
  id: string;
  title: string;
  tenseCode: 'perfecto' | 'imperfecto' | 'indefinido';
  questions: QuizQuestion[];
}

export interface DuelPlayer {
  name: string;
  emoji: string;
  score: number;
  color: string;
  keyPrefix: string; // Left/Right key labels
}

export interface DuelGameInstance {
  id: number;
  name: string;
  description: string;
  rules: string;
}
