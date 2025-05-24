import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

function MemberNumberSetting() {
  const navigate = useNavigate();
  const { numberOfPlayers, setNumberOfPlayers, setPlayerNames } = useGame();
  const numbers = Array.from({ length: 8 }, (_, i) => i + 3); // 3から10までの数字の配列

  const handleNext = () => {
    // プレイヤー数に応じて空の名前配列を初期化
    setPlayerNames(new Array(numberOfPlayers).fill(''));
    navigate('/member-names');
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-center mb-8">
        プレイ人数を選択してください
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {numbers.map((number) => (
          <button
            key={number}
            onClick={() => setNumberOfPlayers(number)}
            className={`
              aspect-[3/2] rounded-lg font-bold text-xl
              transition-all duration-200
              ${numberOfPlayers === number
                ? 'bg-blue-500 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {number}人
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleNext}
          className="
            bg-blue-500 text-white px-12 py-3 rounded-lg
            font-bold text-lg shadow-lg
            transition-all duration-200
            hover:bg-blue-600 active:scale-95
          "
        >
          決定
        </button>
      </div>
    </div>
  );
}

export default MemberNumberSetting;