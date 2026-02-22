import React from 'react';
import { Play, Star, ExternalLink, ChevronLeft } from 'lucide-react';

export default function ClipCard({ clip, onClick, t, isFavorite, onToggleFavorite }) {
  return (
    <div 
      onClick={onClick}
      className={`${t.card} rounded-[2rem] p-4 shadow-sm hover:shadow-xl transition-all cursor-pointer group relative flex flex-col`}
    >
      <div className="relative w-full h-48 rounded-[1.5rem] overflow-hidden mb-4 bg-gray-100">
        <img src={clip.thumbnail} alt={clip.character} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
           <div className={`w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center ${t.textMain}`}>
             <Play fill="currentColor" size={20} className="ml-1" />
           </div>
        </div>

        <button 
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors z-10"
        >
          <Star size={14} fill={isFavorite ? '#FFD700' : 'none'} className={isFavorite ? 'text-[#FFD700]' : ''} />
        </button>

        {clip.tags && clip.tags[0] && (
          <div className={`absolute bottom-3 left-3 ${t.accent} ${t.accentText} text-xs font-bold px-3 py-1.5 rounded-full shadow-sm`}>
            {clip.tags[0]}
          </div>
        )}
      </div>
      <div className="px-2 pb-2">
        <h3 className={`font-extrabold text-lg ${t.textMain} leading-tight mb-1 truncate`}>{clip.character}</h3>
        <p className={`text-sm font-medium ${t.textMuted} mb-3 truncate`}>{clip.anime} • S{clip.season} E{clip.episode}</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <span className={`bg-gray-100/50 ${t.textMuted} text-[11px] font-bold px-2.5 py-1 rounded-md border border-gray-100`}>{clip.res}</span>
            <span className={`bg-gray-100/50 ${t.textMuted} text-[11px] font-bold px-2.5 py-1 rounded-md border border-gray-100`}>{clip.type}</span>
          </div>
          <div className={`w-8 h-8 ${t.dark} rounded-full flex items-center justify-center ${t.highlight} shadow-md`}>
             <ChevronLeft size={14} className="rotate-180" />
          </div>
        </div>
      </div>
    </div>
  );
}
