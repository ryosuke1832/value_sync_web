import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

function DiscussionPage() {
  const navigate = useNavigate();
  const { selectedTheme } = useGame();
  const [timeLeft, setTimeLeft] = useState(180); // 3分
  const [isRunning, setIsRunning] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const timerRef = useRef(null);

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    if (!isRunning && timeLeft > 0) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setShowEndModal(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeLeft(180);
  };

  const adjustTime = (minutes) => {
    if (!isRunning) {
      setTimeLeft(prevTime => {
        const newTime = prevTime + (minutes * 60);
        return Math.min(Math.max(newTime, 0), 59 * 60);
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* テーマ表示 */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">テーマ</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-bold text-lg mb-2">{selectedTheme?.theme}</p>
          <p className="text-gray-600">{selectedTheme?.evaluation_metric}</p>
        </div>
      </div>

      {/* タイマー */}
      <div className="mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <div className="text-6xl font-mono font-bold mb-6 text-blue-500">
            {minutes}:{seconds}
          </div>

          {/* タイマーコントロール */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => adjustTime(-1)}
              disabled={isRunning}
              className={`p-2 rounded-full ${
                isRunning ? 'text-gray-400' : 'text-blue-500 hover:bg-blue-50'
              }`}
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>

            <div className="flex space-x-4">
              <button
                onClick={resetTimer}
                className="p-2 rounded-full text-blue-500 hover:bg-blue-50"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                  />
                </svg>
              </button>
              <button
                onClick={isRunning ? stopTimer : startTimer}
                className="p-4 rounded-full bg-blue-500 text-white hover:bg-blue-600"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isRunning ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
                    />
                  )}
                </svg>
              </button>
            </div>

            <button
              onClick={() => adjustTime(1)}
              disabled={isRunning}
              className={`p-2 rounded-full ${
                isRunning ? 'text-gray-400' : 'text-blue-500 hover:bg-blue-50'
              }`}
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 結果入力ボタン */}
      <div className="flex justify-center">
        <button
          onClick={() => navigate('/result-input')}
          className="bg-blue-500 text-white px-12 py-3 rounded-lg font-bold text-lg shadow-lg transition-all duration-200 hover:bg-blue-600 active:scale-95"
        >
          結果を入力する
        </button>
      </div>

      {/* 終了モーダル */}
      {showEndModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
            <h3 className="text-2xl font-bold text-blue-500 mb-4">議論終了</h3>
            <p className="mb-6">結果の入力に進みましょう</p>
            <button
              onClick={() => {
                setShowEndModal(false);
                navigate('/result-input');
              }}
              className="w-full py-3 bg-blue-500 text-white rounded-lg font-bold"
            >
              結果を入力する
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DiscussionPage;