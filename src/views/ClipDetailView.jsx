import React, { useState, useEffect } from 'react';
import { ChevronLeft, Star, Play, ExternalLink, Youtube, Clock, Lock, Unlock } from 'lucide-react';

export default function ClipDetailView({ clip, onBack, t, isFavorite, onToggleFavorite }) {
  const hasYoutubeId = Boolean(clip.youtubeId && clip.youtubeId.trim() !== "");
  
  const [hasClickedYoutube, setHasClickedYoutube] = useState(!hasYoutubeId);
  const [timeLeft, setTimeLeft] = useState(hasYoutubeId ? 10 : 0);
  const [isUnlocked, setIsUnlocked] = useState(!hasYoutubeId);

  useEffect(() => {
    let timerId;
    if (hasClickedYoutube && timeLeft > 0) {
      timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (hasClickedYoutube && timeLeft === 0) {
      setIsUnlocked(true);
    }
    return () => clearTimeout(timerId);
  }, [hasClickedYoutube, timeLeft]);

  const handleYoutubeClick = () => {
    setHasClickedYoutube(true);
    window.open(`https://youtu.be/${clip.youtubeId}`, '_blank');
  };

  return (
    <div className={`min-h-screen ${t.bg} flex flex-col font-sans transition-colors duration-500`}>
      <div className="px-6 pt-12 pb-6 max-w-7xl mx-auto w-full flex justify-between items-center z-10 relative">
        <button onClick={onBack} className={`w-12 h-12 ${t.card} rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow`}>
          <ChevronLeft size={24} className={`${t.textMain} pr-1`} />
        </button>
        <div className="flex gap-3">
          <button 
            onClick={onToggleFavorite}
            className={`w-12 h-12 ${t.card} rounded-full flex items-center justify-center shadow-sm ${t.textMain} hover:scale-105 transition-transform`}
          >
            <Star size={20} fill={isFavorite ? '#FFD700' : 'none'} className={isFavorite ? 'text-[#FFD700]' : ''} />
          </button>
        </div>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-stretch md:gap-8 md:px-6 md:pb-12">
        <div className="px-6 md:px-0 w-full md:w-1/2 relative -mt-4 md:mt-0 flex flex-col items-center justify-center">
          <div className="relative w-full aspect-square md:aspect-[4/3] max-h-[40vh] md:max-h-none rounded-full md:rounded-[3rem] shadow-2xl mb-8 md:mb-0">
             <img src={clip.thumbnail} alt={clip.character} className="w-full h-full object-cover rounded-[3rem]" />
             <div className={`absolute top-10 md:top-6 -left-4 md:-left-6 ${t.card} px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-gray-100 z-10`}>
               <div className={`w-2 h-2 ${t.accent} rounded-full`}></div>
               <span className={`text-sm font-bold ${t.textMain}`}>{clip.res}</span>
             </div>
             <div className={`absolute bottom-10 md:bottom-6 -right-4 md:-right-6 ${t.dark} px-4 py-2 rounded-full shadow-lg z-10`}>
               <span className={`text-sm font-bold ${t.darkText}`}>{clip.type}</span>
             </div>
          </div>
        </div>

        <div className={`${t.dark} rounded-t-[2.5rem] md:rounded-[2.5rem] w-full md:w-1/2 mt-auto md:mt-0 px-6 md:px-10 py-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-colors duration-500 flex flex-col`}>
          <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-8 md:hidden"></div>
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className={`${t.accent} ${t.accentText} text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block shadow-sm`}>
                High Quality Drive File
              </span>
              <h2 className={`text-3xl md:text-4xl font-extrabold ${t.darkText} leading-tight mb-2`}>{clip.character}</h2>
              <p className="text-white/60 font-medium md:text-lg">{clip.anime} • S{clip.season} E{clip.episode}</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end">
            {hasYoutubeId && (
              <div className="mb-6">
                <h4 className={`text-sm font-bold ${t.darkText} mb-3 flex items-center gap-2`}>
                   <span className={`w-6 h-6 rounded-full ${t.accent} ${t.accentText} flex items-center justify-center text-xs`}>1</span> 
                   Verify your view on YouTube
                </h4>
                <button 
                  onClick={handleYoutubeClick}
                  className="w-full bg-[#FF0000] text-white hover:bg-[#CC0000] text-lg font-extrabold py-4 rounded-[1.5rem] flex items-center justify-center gap-3 shadow-lg transition-transform hover:scale-[1.02]"
                >
                  <Youtube size={24} />
                  Watch Preview on YouTube
                </button>
              </div>
            )}

            <div>
              <h4 className={`text-sm font-bold ${t.darkText} mb-3 flex items-center gap-2`}>
                 <span className={`w-6 h-6 rounded-full bg-white/10 text-white/50 flex items-center justify-center text-xs`}>
                   {hasYoutubeId ? "2" : "1"}
                 </span> 
                 Download your Clip
              </h4>
              
              {!hasClickedYoutube ? (
                <div className="bg-white/5 border border-white/10 rounded-3xl p-5 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Lock size={18} className="text-white/30" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${t.darkText}`}>Link is Locked</h4>
                    <p className="text-xs text-white/50">Click the YouTube button above to unlock your clip.</p>
                  </div>
                </div>
              ) : !isUnlocked ? (
                 <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
                  <div className="flex items-center justify-between text-xs font-bold text-white/70 mb-3 px-1">
                    <span>Verifying your view...</span>
                    <span className="flex items-center gap-1"><Clock size={12}/> {timeLeft}s left</span>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${t.accent} transition-all duration-1000 ease-linear rounded-full`} 
                      style={{ width: `${((10 - timeLeft) / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                 <div className="animate-fade-in mt-2">
                  <a 
                    href={clip.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full ${t.accent} ${t.accentText} md:text-xl text-lg font-extrabold py-5 md:py-6 rounded-[1.5rem] flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(212,248,75,0.3)] transition-transform hover:scale-[1.02] no-underline`}
                  >
                    Open in Google Drive
                    <div className={`w-8 h-8 ${t.dark} rounded-full flex items-center justify-center ml-2`}>
                      <ExternalLink size={16} className={t.highlight} />
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
