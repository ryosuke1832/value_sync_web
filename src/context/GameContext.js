import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [numberOfPlayers, setNumberOfPlayers] = useState(3);
  const [playerNames, setPlayerNames] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [playersData, setPlayersData] = useState([]);
  const [userAnswer, setUserAnswer] = useState(null);
  const [correctOrder, setCorrectOrder] = useState(null);
  const [customTheme, setCustomTheme] = useState({
    theme: "",
    evaluation_metric: "1:低い-100:高い"
  });

  // 1-100の重複しない乱数を生成する関数
  const generateUniqueNumbers = (count) => {
    const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers.slice(0, count);
  };

  // プレイヤーに数字を割り当てる関数
  const assignNumbersToPlayers = () => {
    const uniqueNumbers = generateUniqueNumbers(playerNames.length);
    const newPlayersData = playerNames.map((name, index) => ({
      name,
      number: uniqueNumbers[index]
    }));
    setPlayersData(newPlayersData);
  };

  // ユーザーの回答を提出する関数
  const submitUserAnswer = (finalOrder) => {
    setUserAnswer(finalOrder);
    const correct = [...playersData].sort((a, b) => a.number - b.number);
    setCorrectOrder(correct);
  };

  // 完全リセット
  const resetGame = () => {
    setNumberOfPlayers(3);
    setPlayerNames([]);
    setSelectedTheme(null);
    setPlayersData([]);
    setUserAnswer(null);
    setCorrectOrder(null);
    setCustomTheme({
      theme: "",
      evaluation_metric: "1:低い-100:高い"
    });
  };

  // プレイヤー情報を保持したまま再プレイするためのリセット
  const resetGameKeepPlayers = () => {
    setSelectedTheme(null);
    setPlayersData([]);
    setUserAnswer(null);
    setCorrectOrder(null);
    setCustomTheme({
      theme: "",
      evaluation_metric: "1:低い-100:高い"
    });
  };

  const value = {
    numberOfPlayers,
    setNumberOfPlayers,
    playerNames,
    setPlayerNames,
    selectedTheme,
    setSelectedTheme,
    playersData,
    setPlayersData,
    assignNumbersToPlayers,
    userAnswer,
    correctOrder,
    submitUserAnswer,
    resetGame,
    resetGameKeepPlayers,
    customTheme,
    setCustomTheme,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}