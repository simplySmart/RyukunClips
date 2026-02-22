import React, { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';

import appData from './data/clips.json';
import { THEMES } from './utils/themes';

import ClipCard from './components/ClipCard';
import ProfileView from './views/ProfileView';
import AboutView from './views/AboutView';
import ClipDetailView from './views/ClipDetailView';

const PROFILE_DATA = appData.profile;
const CLIPS_DATABASE = appData.clips;

export default function App() {
  const [userName, setUserName] = useState("Editor");
  const [activeThemeKey, setActiveThemeKey] = useState("lime");
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [activeCategory, setActiveCategory] = useState("All");
  const [activeEpisode, setActiveEpisode] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState('home');
  const [selectedClip, setSelectedClip] = useState(null);

  useEffect(() => {
    const savedName = localStorage.getItem('ryukun_user');
    const savedTheme = localStorage.getItem('ryukun_theme');
    const savedFavs = localStorage.getItem('ryukun_favorites');
    
    if (savedName) setUserName(savedName);
    if (savedTheme && THEMES[savedTheme]) setActiveThemeKey(savedTheme);
    if (savedFavs) {
      try { setFavorites(JSON.parse(savedFavs)); } catch (e) {}
    }
    setIsLoaded(true);
  }, []);

  const savePreferences = (newName, newTheme) => {
    setUserName(newName);
    setActiveThemeKey(newTheme);
    localStorage.setItem('ryukun_user', newName);
    localStorage.setItem('ryukun_theme', newTheme);
  };

  const toggleFavorite = (clipId) => {
    let newFavs;
    if (favorites.includes(clipId)) {
      newFavs = favorites.filter(id => id !== clipId);
    } else {
      newFavs = [...favorites, clipId];
    }
    setFavorites(newFavs);
    localStorage.setItem('ryukun_favorites', JSON.stringify(newFavs));
  };

  const t = THEMES[activeThemeKey];
  const MenuIcon = t.icon;

  const dynamicCategories = useMemo(() => {
    const uniqueAnimes = [...new Set(CLIPS_DATABASE.map(clip => clip.anime))];
    return ["All", "Favorites ⭐", ...uniqueAnimes];
  }, []);

  const dynamicEpisodes = useMemo(() => {
    if (activeCategory === "All" || activeCategory === "Favorites ⭐") return [];
    const episodesForAnime = CLIPS_DATABASE.filter(clip => clip.anime === activeCategory).map(clip => clip.episode);
    const uniqueEpisodes = [...new Set(episodesForAnime)].sort((a, b) => parseInt(a) - parseInt(b));
    return ["All", ...uniqueEpisodes];
  }, [activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveEpisode("All");
  };

  const filteredClips = CLIPS_DATABASE.filter(clip => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      clip.character.toLowerCase().includes(q) || 
      clip.anime.toLowerCase().includes(q) ||
      clip.episode.includes(q) ||
      clip.res.toLowerCase().includes(q) ||
      (clip.tags && clip.tags.some(tag => tag.toLowerCase().includes(q)));

    let matchesCategory = true;
    if (activeCategory === "Favorites ⭐") {
      matchesCategory = favorites.includes(clip.id);
    } else if (activeCategory !== "All") {
      matchesCategory = clip.anime === activeCategory;
    }

    const matchesEpisode = activeEpisode === "All" || clip.episode === activeEpisode;
    
    return matchesSearch && matchesCategory && matchesEpisode;
  });

  if (!isLoaded) return null;

  if (currentView === 'profile') {
    return <ProfileView userName={userName} currentTheme={activeThemeKey} onSave={savePreferences} onBack={() => setCurrentView('home')} t={t} />;
  }

  if (currentView === 'about') {
    return <AboutView profileData={PROFILE_DATA} onBack={() => setCurrentView('home')} t={t} />;
  }

  if (currentView === 'detail' && selectedClip) {
    return (
      <ClipDetailView 
        clip={selectedClip} 
        onBack={() => {setSelectedClip(null); setCurrentView('home');}} 
        t={t} 
        isFavorite={favorites.includes(selectedClip.id)}
        onToggleFavorite={() => toggleFavorite(selectedClip.id)}
      />
    );
  }

  return (
    <div className={`min-h-screen ${t.bg} ${t.textMain} font-sans pb-24 transition-colors duration-500`}>
      <header className="px-6 pt-12 pb-4 flex justify-between items-center max-w-7xl mx-auto">
        <button 
          onClick={() => setCurrentView('about')}
          className={`w-12 h-12 ${t.card} rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow transform hover:scale-105`}
        >
          <MenuIcon size={22} className={t.textMain} />
        </button>
        
        <div className="flex gap-3 items-center">
          <button 
            onClick={() => setCurrentView('profile')}
            className={`w-12 h-12 ${t.accent} rounded-full flex items-center justify-center font-extrabold ${t.accentText} shadow-sm hover:scale-105 transition-transform text-lg`}
          >
             {userName.charAt(0).toUpperCase()}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        <div className="mb-8 mt-4 max-w-3xl">
          <h1 className={`text-3xl md:text-5xl font-extrabold tracking-tight ${t.textMain} leading-tight`}>
            Find the best <br/>
            <span className={`${t.textMuted} font-medium`}>Anime Twixtors</span>
          </h1>
        </div>

        <div className="relative mb-6 max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search size={20} className={t.textMuted} />
          </div>
          <input
            type="text"
            placeholder="Search character, anime, episode, or quality..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`block w-full pl-12 pr-6 py-4 ${t.card} border-none rounded-full shadow-sm ${t.textMain} placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all font-medium`}
            style={{ '--tw-ring-color': t.accent.replace('bg-[', '').replace(']', '') }}
          />
        </div>

        <div className="flex overflow-x-auto gap-3 pb-2 mb-4 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {dynamicCategories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                activeCategory === category 
                  ? `${t.dark} ${t.darkText} shadow-lg` 
                  : `${t.card} ${t.textMain} border border-gray-300 shadow-sm opacity-100 hover:opacity-80`
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {activeCategory !== "All" && activeCategory !== "Favorites ⭐" && dynamicEpisodes.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2 mb-6 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <span className={`text-xs font-bold ${t.textMuted} uppercase tracking-wider pl-2`}>Episodes:</span>
            {dynamicEpisodes.map(ep => (
              <button
                key={ep}
                onClick={() => setActiveEpisode(ep)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeEpisode === ep 
                    ? `${t.accent} ${t.accentText} shadow-sm` 
                        : `${t.dark} opacity-60 ${t.darkText} hover:opacity-100`
}`}
style={activeEpisode !== ep ? { backgroundColor: 'transparent', border: '2px solid currentColor' } : {}}
              >
                {ep === "All" ? "All Episodes" : `EP ${ep}`}
              </button>
            ))}
          </div>
        )}

        {(activeCategory === "All" || activeCategory === "Favorites ⭐" || dynamicEpisodes.length <= 1) && <div className="mb-6"></div>}

        <div className="flex justify-between items-end mb-6">
          <h2 className={`text-xl font-bold ${t.textMain}`}>
            {activeCategory === "Favorites ⭐" ? "Your Saved Clips" : 
             activeEpisode !== "All" ? `Episode ${activeEpisode} Clips` : "Latest Uploads"}
          </h2>
          <span className={`text-sm font-bold ${t.textMuted}`}>{filteredClips.length} clips</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
          {filteredClips.map(clip => (
            <ClipCard 
              key={clip.id} 
              clip={clip} 
              t={t}
              isFavorite={favorites.includes(clip.id)}
              onToggleFavorite={(e) => {
                e.stopPropagation(); 
                toggleFavorite(clip.id);
              }}
              onClick={() => { setSelectedClip(clip); setCurrentView('detail'); }} 
            />
          ))}
          {filteredClips.length === 0 && (
            <div className={`col-span-full py-20 text-center ${t.textMuted} font-medium ${t.card} rounded-[2rem] shadow-sm flex flex-col items-center justify-center gap-4`}>
              <Search size={48} className="opacity-30" />
              <p className="text-lg">No clips found for this selection.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
