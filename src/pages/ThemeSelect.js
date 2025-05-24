import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import themesData from '../data/themes.json';
import { CATEGORIES } from '../constants/category';

function ThemeSelect() {
  const navigate = useNavigate();
  const { setSelectedTheme } = useGame();
  const [customTheme, setCustomTheme] = useState({ 
    theme: '', 
    evaluation_metric: '1:低い-100:高い' 
  });
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [themes, setThemes] = useState(null);
  const [inputError, setInputError] = useState(null);

  useEffect(() => {
    setThemes(themesData);
  }, []);

  // 入力値のバリデーション
  const validateInput = (input) => {
    if (!input) return { isValid: false, message: '入力が必要です' };
    if (input.length > 50) return { isValid: false, message: '50文字以内で入力してください' };
    if (/[<>'"\/\\&;()]/.test(input)) return { isValid: false, message: '特殊文字は使用できません' };
    if (input.trim().length === 0) return { isValid: false, message: '空白のみの入力はできません' };
    return { isValid: true, message: '' };
  };

  const handleThemeChange = (value) => {
    // 特殊文字を除去
    const sanitizedValue = value.replace(/[<>'"\/\\&;()]/g, '');
    const validation = validateInput(sanitizedValue);
    
    if (!validation.isValid) {
      setInputError(validation.message);
    } else {
      setInputError(null);
    }

    setCustomTheme(prev => ({
      ...prev,
      theme: sanitizedValue
    }));
  };

  const handleMetricChange = (value) => {
    // 特殊文字を除去
    const sanitizedValue = value.replace(/[<>'"\/\\&;()]/g, '');
    setCustomTheme(prev => ({
      ...prev,
      evaluation_metric: sanitizedValue
    }));
  };

  const handleRandomSelect = () => {
    if (!themes) return;
    
    const allThemes = Object.values(themes).flat();
    const randomTheme = allThemes[Math.floor(Math.random() * allThemes.length)];
    handleThemeSelect(randomTheme);
  };

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    navigate('/confirmation');
  };

  const handleCustomThemeSubmit = () => {
    const themeValidation = validateInput(customTheme.theme);
    const metricValidation = validateInput(customTheme.evaluation_metric);

    if (!themeValidation.isValid || !metricValidation.isValid) {
      setInputError(themeValidation.message || metricValidation.message);
      return;
    }

    handleThemeSelect({
      number: 'custom',
      theme: customTheme.theme.trim(),
      evaluation_metric: customTheme.evaluation_metric.trim()
    });
  };

  if (!themes) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-center mb-8">テーマ設定</h1>

      {/* ランダム選択ボタン */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">ランダムでテーマを決める</h2>
        <button
          onClick={handleRandomSelect}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold shadow-lg hover:bg-blue-600 transition-colors"
        >
          ランダム選択
        </button>
      </div>

      {/* カテゴリー選択 */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">カテゴリーから選ぶ</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.values(CATEGORIES).map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setCurrentCategory(category);
                setShowThemeModal(true);
              }}
              className={`p-4 rounded-lg text-white font-bold flex flex-col items-center ${category.color}`}
            >
              <span className="text-2xl mb-2">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* カスタムテーマ入力 */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">オリジナルテーマを作成</h2>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={customTheme.theme}
              onChange={(e) => handleThemeChange(e.target.value)}
              placeholder="テーマを入力"
              maxLength={50}
              className={`w-full px-4 py-2 border rounded-lg ${
                inputError ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {inputError && (
              <p className="mt-1 text-sm text-red-500">{inputError}</p>
            )}
            <p className="mt-1 text-sm text-gray-500 text-right">
              {customTheme.theme.length}/50
            </p>
          </div>
          
          <input
            type="text"
            value={customTheme.evaluation_metric}
            onChange={(e) => handleMetricChange(e.target.value)}
            placeholder="評価基準を入力"
            maxLength={50}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          
          <button
            onClick={handleCustomThemeSubmit}
            disabled={!customTheme.theme.trim() || inputError}
            className={`w-full py-3 rounded-lg font-bold text-lg shadow-lg transition-all duration-200 
              ${!customTheme.theme.trim() || inputError
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 active:scale-95 text-white'
              }`}
          >
            作成して選択
          </button>
        </div>
      </div>

      {/* テーマ選択モーダル */}
      {showThemeModal && themes && currentCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{currentCategory.name}</h3>
                <button
                  onClick={() => setShowThemeModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-2">
                {themes[currentCategory.id]?.map((theme) => (
                  <button
                    key={theme.number}
                    onClick={() => handleThemeSelect(theme)}
                    className="w-full text-left p-4 hover:bg-gray-100 rounded-lg"
                  >
                    {theme.theme}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ThemeSelect;