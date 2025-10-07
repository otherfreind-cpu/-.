export enum GameType {
  Memory = 'memory',
  Reaction = 'reaction',
  WordScramble = 'wordScramble',
  MathChallenge = 'mathChallenge',
  StroopTest = 'stroopTest',
  FindTheOdd = 'findTheOdd',
  WordPuzzle = 'wordPuzzle',
  PatternRecognition = 'patternRecognition',
  VisualSearch = 'visualSearch',
}

export interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export type Difficulty = 'easy' | 'medium' | 'hard';
