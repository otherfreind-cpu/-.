
import React, { useState } from 'react';
import Header from './components/Header';
import GameCard from './components/GameCard';
import MemoryGame from './components/MemoryGame';
import ReactionTimeGame from './components/ReactionTimeGame';
import WordScrambleGame from './components/WordScrambleGame';
import MathChallengeGame from './components/MathChallengeGame';
import StroopTestGame from './components/StroopTestGame';
import FindTheOddGame from './components/FindTheOddGame';
import WordPuzzleGame from './components/WordPuzzleGame';
import PatternRecognitionGame from './components/PatternRecognitionGame';
import VisualSearchGame from './components/VisualSearchGame';
import DifficultySelector from './components/DifficultySelector';
import { GameType, Difficulty } from './types';
import useSound from './components/useSound';

const GAME_TITLES: Record<GameType, string> = {
  [GameType.Memory]: "لعبة الذاكرة",
  [GameType.Reaction]: "سرعة الاستجابة",
  [GameType.WordScramble]: "تخمين الكلمات",
  [GameType.MathChallenge]: "تحدي الحساب",
  [GameType.StroopTest]: "اختبار ستروب",
  [GameType.FindTheOdd]: "العثور على المختلف",
  [GameType.WordPuzzle]: "ألغاز الكلمات",
  [GameType.PatternRecognition]: "التعرف على الأنماط",
  [GameType.VisualSearch]: "البحث البصري",
};

const App: React.FC = () => {
  const [screen, setScreen] = useState<'menu' | 'difficulty' | 'game'>('menu');
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const playSound = useSound(isMuted);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const handleGameSelect = (gameType: GameType) => {
    playSound('start');
    setSelectedGame(gameType);
    if (gameType === GameType.Memory) {
        setScreen('difficulty');
    } else {
        setScreen('game');
    }
  };
  
  const handleDifficultySelect = (difficulty: Difficulty) => {
    playSound('click');
    setSelectedDifficulty(difficulty);
    setScreen('game');
  }

  const handleBackToMenu = () => {
    playSound('click');
    setScreen('menu');
    setSelectedGame(null);
    setSelectedDifficulty(null);
  };

  const handleTitleClick = () => {
    if (screen !== 'menu') {
      handleBackToMenu();
    }
  };

  const renderContent = () => {
    // FIX: The `onBackToMenu` shorthand property was used without a corresponding variable in scope.
    // Assign `handleBackToMenu` to the `onBackToMenu` property.
    const gameProps = { onBackToMenu: handleBackToMenu, isMuted };
    switch (screen) {
      case 'game':
        if (!selectedGame) return renderGameMenu();
        switch (selectedGame) {
          case GameType.Memory:
            return <MemoryGame {...gameProps} difficulty={selectedDifficulty || 'medium'} />;
          case GameType.Reaction:
            return <ReactionTimeGame {...gameProps} />;
          case GameType.WordScramble:
            return <WordScrambleGame {...gameProps} />;
          case GameType.MathChallenge:
            return <MathChallengeGame {...gameProps} />;
          case GameType.StroopTest:
            return <StroopTestGame {...gameProps} />;
          case GameType.FindTheOdd:
            return <FindTheOddGame {...gameProps} />;
          case GameType.WordPuzzle:
            return <WordPuzzleGame {...gameProps} />;
          case GameType.PatternRecognition:
            return <PatternRecognitionGame {...gameProps} />;
          case GameType.VisualSearch:
            return <VisualSearchGame {...gameProps} />;
          default:
            return renderGameMenu();
        }
      case 'difficulty':
         if (!selectedGame) return renderGameMenu();
         return <DifficultySelector 
                    gameTitle={GAME_TITLES[selectedGame]}
                    onSelectDifficulty={handleDifficultySelect}
                    onBack={handleBackToMenu}
                    isMuted={isMuted}
                />
      case 'menu':
      default:
        return renderGameMenu();
    }
  };

  const renderGameMenu = () => (
    <div className="p-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-teal-800 mb-8">اختر لعبة لتبدأ</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <GameCard
          title="لعبة الذاكرة"
          description="تقوي الذاكرة قصيرة المدى والتركيز."
          emoji="🧠"
          onClick={() => handleGameSelect(GameType.Memory)}
        />
        <GameCard
          title="سرعة الاستجابة"
          description="تزيد من سرعة الاستجابة وردود الفعل."
          emoji="⚡️"
          onClick={() => handleGameSelect(GameType.Reaction)}
        />
        <GameCard
          title="تخمين الكلمات"
          description="تنشط المهارات اللغوية وسرعة التفكير."
          emoji="🔡"
          onClick={() => handleGameSelect(GameType.WordScramble)}
        />
        <GameCard
          title="تحدي الحساب"
          description="تحسن القدرة على الحساب الذهني السريع."
          emoji="🧮"
          onClick={() => handleGameSelect(GameType.MathChallenge)}
        />
        <GameCard
          title="اختبار ستروب"
          description="تعزز التركيز لمعالجة المعلومات المتضاربة."
          emoji="🎨"
          onClick={() => handleGameSelect(GameType.StroopTest)}
        />
         <GameCard
          title="العثور على المختلف"
          description="تشحذ قوة الملاحظة والانتباه للتفاصيل."
          emoji="🧐"
          onClick={() => handleGameSelect(GameType.FindTheOdd)}
        />
        <GameCard
          title="ألغاز الكلمات"
          description="تطور مهارات حل المشكلات والمفردات."
          emoji="🧩"
          onClick={() => handleGameSelect(GameType.WordPuzzle)}
        />
         <GameCard
          title="التعرف على الأنماط"
          description="تقوي التفكير المنطقي والقدرة على التنبؤ."
          emoji="✨"
          onClick={() => handleGameSelect(GameType.PatternRecognition)}
        />
         <GameCard
          title="البحث البصري"
          description="تحسن الانتباه البصري وسرعة البحث."
          emoji="🎯"
          onClick={() => handleGameSelect(GameType.VisualSearch)}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-amber-50 text-slate-800 flex flex-col">
      <Header onTitleClick={handleTitleClick} isMuted={isMuted} toggleMute={toggleMute} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <footer className="text-center py-4 text-gray-500">
        <p>صُنع بحب لكبارنا الأعزاء ❤️</p>
      </footer>
    </div>
  );
};

export default App;
