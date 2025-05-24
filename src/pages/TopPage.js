import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

// Manual Modal Component
const ManualModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-blue-600">遊び方</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-6">
            <section className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-blue-700 mb-3">ゲーム概要</h3>
              <p className="text-gray-700 leading-relaxed">
                このゲームは、各自に配られた数字の大きさを、お題に沿った会話の中でうまく伝えるゲームです。
                プレイヤーは自分の持つ数字をお題に沿って表現し、全員で協力して正しい順番を目指します。
              </p>
            </section>

            <div className="space-y-4">
              {[
                { title: "1. プレイ人数を選ぼう", content: "3人から10人までのプレイ可能です" },
                { title: "2. プレイヤー名を決めよう", content: "各プレイヤーの名前を入力しよう" },
                { title: "3. テーマを選ぼう", content: "用意されたテーマから選ぶか、オリジナルのテーマを作成できます" },
                { title: "4. 数字の確認", content: "各プレイヤーは1から100までの数字をランダムで与えられます" },
                { title: "5. ディスカッション", content: "テーマに沿って、プレイヤー同士で議論します" },
                { title: "6. 順位を決める", content: "議論が終わったら、プレイヤーたちで相談して全員の順番を決めます" },
              ].map((step, index) => (
                <div key={index}>
                  <h4 className="font-bold text-lg text-blue-600">{step.title}</h4>
                  <p className="text-gray-700">{step.content}</p>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-blue-700 mb-3">遊ぶコツ！</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>数字を直接言わず、テーマに沿った表現を工夫しましょう</li>
                <li>他のプレイヤーの発言をよく聞いて、数字の大小を推測しましょう</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// シンボルアイコンのSVGコンポーネント
const SyncIcon = () => (
  <svg 
    className="w-16 h-16 text-blue-600"
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      {/* 外側の円 */}
      <circle 
        cx="12" 
        cy="12" 
        r="11" 
        stroke="currentColor" 
        strokeWidth="2"
        className="animate-[spin_10s_linear_infinite]"
      />
      
      {/* 内側の円と矢印 */}
      <g className="animate-[spin_8s_linear_infinite_reverse]">
        <circle 
          cx="12" 
          cy="12" 
          r="5" 
          stroke="currentColor" 
          strokeWidth="2"
        />
        
        {/* 上向き矢印 */}
        <path 
          d="M12 3L9 7H15L12 3Z" 
          fill="currentColor"
        />
        
        {/* 下向き矢印 */}
        <path 
          d="M12 21L15 17H9L12 21Z" 
          fill="currentColor"
        />
        
        {/* 左向き矢印 */}
        <path 
          d="M3 12L7 15V9L3 12Z" 
          fill="currentColor"
        />
        
        {/* 右向き矢印 */}
        <path 
          d="M21 12L17 9V15L21 12Z" 
          fill="currentColor"
        />
      </g>
      
      {/* 中心の点 */}
      <circle 
        cx="12" 
        cy="12" 
        r="2" 
        fill="currentColor"
      />
    </g>
  </svg>
);

// Main Component
export default function TopPage() {
  const navigate = useNavigate();
  const [isManualOpen, setIsManualOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setIsManualOpen(true)}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <QuestionMarkCircleIcon className="w-8 h-8 text-white" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-12 p-4">
        {/* Logo */}
        <div className="bg-white/90 p-6 rounded-full shadow-lg">
          <SyncIcon />
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-wide">
            ValueSync
          </h1>
          <p className="text-lg text-white/80">
            言葉で表現し、価値を同期させよう
          </p>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/member-number')}
            className="bg-white rounded-full p-8 shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <div className="flex flex-col items-center">
              <svg
                className="w-8 h-8 text-blue-600 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xl font-semibold text-blue-600">Play</span>
            </div>
          </button>
          <p className="text-white/80 mt-4 text-sm">
            タップしてゲームを開始
          </p>
        </div>
      </div>

      {/* Manual Modal */}
      <ManualModal
        isOpen={isManualOpen}
        onClose={() => setIsManualOpen(false)}
      />
    </div>
  );
}