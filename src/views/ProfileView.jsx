import React, { useState } from 'react';
import { ChevronLeft, Leaf, Flower2, Check } from 'lucide-react';

export default function ProfileView({ userName, currentTheme, onSave, onBack, t }) {
  const [editName, setEditName] = useState(userName);
  const [editTheme, setEditTheme] = useState(currentTheme);

  const handleSave = () => {
    onSave(editName.trim() || "Editor", editTheme);
    onBack();
  };

  return (
    <div className={`min-h-screen ${t.bg} flex flex-col ${t.textMain} font-sans transition-colors duration-500`}>
      <div className="px-6 pt-12 pb-6 max-w-md mx-auto md:max-w-4xl w-full flex items-center z-10">
        <button onClick={onBack} className={`w-12 h-12 ${t.card} rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow`}>
          <ChevronLeft size={24} className={`${t.textMain} pr-1`} />
        </button>
        <h2 className="text-xl font-bold ml-4">My Profile</h2>
      </div>

      <div className="px-6 flex-1 max-w-md mx-auto md:max-w-4xl w-full flex flex-col mt-4">
        <div className="flex flex-col items-center mb-8">
          <div className={`w-24 h-24 ${t.accent} rounded-full flex items-center justify-center font-extrabold text-4xl ${t.accentText} shadow-lg mb-4 transition-colors`}>
             {editName.charAt(0).toUpperCase() || "U"}
          </div>
          <p className={`text-sm font-bold ${t.textMuted}`}>Avatar is auto-generated</p>
        </div>

        <div className={`${t.card} p-6 rounded-[2rem] shadow-sm mb-6`}>
          <label className={`block text-xs font-bold ${t.textMuted} uppercase tracking-wider mb-2`}>Display Name</label>
          <input 
            type="text" 
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className={`w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2`}
            style={{ '--tw-ring-color': t.accent.replace('bg-[', '').replace(']', '') }}
          />
        </div>

        <div className={`${t.card} p-6 rounded-[2rem] shadow-sm mb-8`}>
          <label className={`block text-xs font-bold ${t.textMuted} uppercase tracking-wider mb-4`}>App Theme</label>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setEditTheme('lime')}
              className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${editTheme === 'lime' ? 'border-[#D4F84B] bg-[#D4F84B]/10' : 'border-gray-100 opacity-60'}`}
            >
              <div className="flex gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-[#1C1C1E]"></div>
                <div className="w-6 h-6 rounded-full bg-[#D4F84B]"></div>
              </div>
              <span className="text-sm font-bold text-gray-900 flex items-center gap-1">
                <Leaf size={14} /> Hidden Leaf
              </span>
            </button>
            
            <button 
              onClick={() => setEditTheme('sakura')}
              className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${editTheme === 'sakura' ? 'border-[#FFB7C5] bg-[#FFB7C5]/10' : 'border-gray-100 opacity-60'}`}
            >
              <div className="flex gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-[#4A1525]"></div>
                <div className="w-6 h-6 rounded-full bg-[#FFB7C5]"></div>
              </div>
              <span className="text-sm font-bold text-gray-900 flex items-center gap-1">
                <Flower2 size={14} /> Sakura
              </span>
            </button>
          </div>
        </div>

        <button 
          onClick={handleSave}
          className={`w-full ${t.dark} ${t.darkText} text-lg font-extrabold py-5 rounded-full flex items-center justify-center gap-3 shadow-lg transition-transform hover:scale-[1.02] mt-auto mb-8`}
        >
          Save Preferences
          <Check size={20} />
        </button>
      </div>
    </div>
  );
}
