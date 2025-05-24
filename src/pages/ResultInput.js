import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
// または
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function ResultInput() {
  const navigate = useNavigate();
  const { selectedTheme, playersData, submitUserAnswer } = useGame();
  
  const [items, setItems] = useState(playersData.map((player, index) => ({
    ...player,
    id: String(index)  // idを文字列として設定
  })));

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    
    setItems(newItems);
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-center mb-8">順位入力</h1>

      {/* テーマ表示 */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">テーマ</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-bold text-lg mb-2">{selectedTheme?.theme}</p>
          <p className="text-gray-600">{selectedTheme?.evaluation_metric}</p>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3 mb-8"
            >
              {items.map((item, index) => (
                <Draggable 
                  key={item.id} 
                  draggableId={item.id} 
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`
                        p-4 bg-white rounded-lg border 
                        ${snapshot.isDragging ? 'border-blue-500 shadow-lg' : 'border-gray-200'}
                      `}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                          {index + 1}
                        </div>
                        <span className="font-medium flex-1">{item.name}</span>
                        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                        </svg>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="flex justify-center">
        <button
          onClick={() => {
            submitUserAnswer(items);
            navigate('/result');
          }}
          className="bg-blue-500 text-white px-12 py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-blue-600 active:scale-95"
        >
          決定
        </button>
      </div>
    </div>
  );
}

export default ResultInput;