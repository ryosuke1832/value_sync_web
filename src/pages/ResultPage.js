import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

function ResultPage() {
  const navigate = useNavigate();
  const { userAnswer, correctOrder, resetGame, resetGameKeepPlayers } = useGame();
  const [checkedIndices, setCheckedIndices] = useState([]);
  const [showResultModal, setShowResultModal] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (userAnswer && userAnswer.length > 0) {
      startResultAnimation();
    }
  }, [userAnswer]);

  const checkAllAnswersCorrect = () => {
    return userAnswer.every((answer, index) => 
      answer.number === correctOrder[index].number
    );
  };

  useEffect(() => {
    if (animationComplete) {
      const allCorrect = checkAllAnswersCorrect();
      setIsAllCorrect(allCorrect);
      setShowResultModal(true);
    }
  }, [animationComplete]);

  const startResultAnimation = () => {
    userAnswer.forEach((_, index) => {
      setTimeout(() => {
        setCheckedIndices(prev => [...prev, index]);
      }, index * 1000);
    });

    setTimeout(() => {
      setAnimationComplete(true);
    }, userAnswer.length * 1000);
  };

  const isCorrectAnswer = (index) => {
    return userAnswer[index].number === correctOrder[index].number;
  };

  const handleRestartSameMembers = () => {
    resetGameKeepPlayers();
    navigate('/theme-select');
  };

  const handleReturnHome = () => {
    resetGame();
    navigate('/');
  };

  // 結果モーダル
  const ResultModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full text-center">
        <h3 className="text-3xl font-bold text-blue-500 mb-4">
          {isAllCorrect ? '全問正解！' : '残念...'}
        </h3>
        <p className="text-lg mb-8">
          {isAllCorrect 
            ? 'おめでとうございます！\n素晴らしい成績です！'
            : '次回は全問正解を目指して\nがんばりましょう！'}
        </p>
        <div className="space-y-4">
          <button
            onClick={handleRestartSameMembers}
            className="w-full py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors"
          >
            同じメンバーでもう一度
          </button>
          <button
            onClick={handleReturnHome}
            className="w-full py-3 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600 transition-colors"
          >
            Homeに戻る
          </button>
        </div>
      </div>
    </div>
  );

  if (!userAnswer || userAnswer.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 text-lg">データがありません</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-center mb-8">結果発表</h1>

      <div className="space-y-4">
        {userAnswer.map((player, index) => {
          const isChecked = checkedIndices.includes(index);
          const correct = isChecked && isCorrectAnswer(index);

          return (
            <div
              key={player.name}
              className={`
                transform transition-all duration-300
                ${isChecked ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                ${isChecked && (correct ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500')}
                border rounded-lg p-4
              `}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg">{player.name}</p>
                  {isChecked && (
                    <p className="text-gray-600 mt-1">
                      あなたの数字: {player.number}
                    </p>
                  )}
                </div>
                {isChecked && (
                  <div className={`w-8 h-8 ${correct ? 'text-green-500' : 'text-red-500'}`}>
                    {correct ? (
                      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showResultModal && <ResultModal />}
    </div>
  );
}

export default ResultPage;