import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

function ConfirmationPage() {
  const navigate = useNavigate();
  const { 
    playerNames, 
    selectedTheme, 
    assignNumbersToPlayers, 
    playersData 
  } = useGame();

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showNumber, setShowNumber] = useState(false);

  useEffect(() => {
    console.log('Assigning numbers to players');
    assignNumbersToPlayers();
  }, []);

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    setShowNumber(false);
  };

  const handleConfirmPlayer = () => {
    setShowNumber(true);
  };

  const handleNext = () => {
    navigate('/discussion');
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-center mb-8">確認</h1>

      {/* テーマ表示 */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">テーマ</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-bold text-lg mb-2">{selectedTheme?.theme}</p>
          <p className="text-gray-600">{selectedTheme?.evaluation_metric}</p>
        </div>
      </div>

      {/* プレイヤー一覧 */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          ひとりずつ番号を確認してください
        </h2>
        <div className="space-y-3">
          {playersData.map((player, index) => (
            <button
              key={index}
              onClick={() => handlePlayerClick(player)}
              className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-between"
            >
              <div className="flex items-center">
                <span className="text-blue-500 font-bold mr-4">{index + 1}</span>
                <span className="font-medium">{player.name}</span>
              </div>
              <span className="text-gray-500">タップして数字を確認</span>
            </button>
          ))}
        </div>
      </div>

      {/* 次へボタン */}
      <div className="flex justify-center">
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-12 py-3 rounded-lg font-bold text-lg shadow-lg transition-all duration-200 hover:bg-blue-600 active:scale-95"
        >
          次へ
        </button>
      </div>

      {/* プレイヤー確認モーダル */}
      {selectedPlayer && !showNumber && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">確認</h3>
            <p className="mb-6">
              あなたは"{selectedPlayer.name}"ですか？
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedPlayer(null)}
                className="flex-1 py-2 px-4 bg-gray-200 rounded-lg font-bold"
              >
                いいえ
              </button>
              <button
                onClick={handleConfirmPlayer}
                className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg font-bold"
              >
                はい
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 数字表示モーダル */}
      {showNumber && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
            <h3 className="text-xl font-bold mb-4">あなたの数字</h3>
            <p className="text-5xl font-bold text-blue-500 mb-6">
              {selectedPlayer.number}
            </p>
            <button
              onClick={() => {
                setSelectedPlayer(null);
                setShowNumber(false);
              }}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg font-bold"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfirmationPage;