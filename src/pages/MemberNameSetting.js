import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import DOMPurify from 'dompurify';

function MemberNameSetting() {
  const navigate = useNavigate();
  const { playerNames, setPlayerNames } = useGame();

  useEffect(() => {
    const defaultNames = playerNames.map((name, index) => 
      name.trim() === '' ? `ユーザー${index + 1}` : name
    );
    setPlayerNames(defaultNames);
  }, []);

  // 入力値のバリデーション
  const validateInput = (input) => {
    // 特殊文字をチェック
    if (/[<>'"\/\\&;()]/.test(input)) return false;
    
    // 空白文字のみの入力を禁止
    if (input.trim().length === 0) return false;
    
    return true;
  };

  const handleNameChange = (index, newName) => {
    // 入力値のバリデーション
    if (!validateInput(newName)) {
      // 不正な文字が含まれている場合は除去
      newName = newName.replace(/[<>'"\/\\&;()]/g, '');
    }

    const newNames = [...playerNames];
    newNames[index] = newName.trim() === '' ? `ユーザー${index + 1}` : newName;
    setPlayerNames(newNames);
  };

  const handleSubmit = () => {
    const finalNames = playerNames.map((name, index) => 
      name.trim() === '' ? `ユーザー${index + 1}` : name.replace(/[<>'"\/\\&;()]/g, '')
    );
    setPlayerNames(finalNames);
    navigate('/theme-select');
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-center mb-8">
        プレイヤーの名前を入力してください
      </h1>

      <div className="space-y-4 mb-8">
        {playerNames.map((name, index) => (
          <div key={index} className="space-y-2">
            <label className="block text-gray-700 font-medium">
              プレイヤー {index + 1}
            </label>
            <div className="relative">
              <input
                type="text"
                value={name === `ユーザー${index + 1}` ? '' : name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder={`ユーザー${index + 1}`}
                maxLength={20}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onBlur={() => {
                  if (!playerNames[index] || playerNames[index].trim() === '') {
                    handleNameChange(index, `ユーザー${index + 1}`);
                  }
                }}
              />
              {name !== `ユーザー${index + 1}` && name.length > 0 && (
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                  {`${name.length}/20`}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-12 py-3 rounded-lg font-bold text-lg shadow-lg transition-all duration-200 hover:bg-blue-600 active:scale-95"
        >
          決定
        </button>
      </div>
    </div>
  );
}

export default MemberNameSetting;