import React from 'react';
import { ChevronLeft, Youtube, Twitter, Instagram, Mail, Send, Link2 } from 'lucide-react';

export default function AboutView({ onBack, t, profileData }) {
  const getIcon = (platform) => {
    switch(platform.toLowerCase()) {
      case 'youtube': return <Youtube size={20} />;
      case 'instagram': return <Instagram size={20} />;
      case 'telegram': return <Send size={20} />;
      case 'twitter': return <Twitter size={20} />;
      default: return <Link2 size={20} />;
    }
  };

  return (
    <div className={`min-h-screen ${t.bg} flex flex-col font-sans transition-colors duration-500`}>
      <div className="px-6 pt-12 pb-6 max-w-md mx-auto md:max-w-4xl w-full flex items-center z-10">
        <button onClick={onBack} className={`w-12 h-12 ${t.card} rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow`}>
          <ChevronLeft size={24} className={`${t.textMain} pr-1`} />
        </button>
        <h2 className={`text-xl font-bold ${t.textMain} ml-4`}>Creator Profile</h2>
      </div>

      <div className="px-6 flex-1 max-w-md mx-auto md:max-w-4xl w-full">
        <div className={`${t.card} rounded-[2rem] p-8 shadow-sm flex flex-col items-center text-center mt-4 relative overflow-hidden`}>
          <div className={`absolute -top-20 -right-20 w-48 h-48 ${t.accent} opacity-20 rounded-full blur-3xl transition-colors`}></div>
          
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-xl z-10 border-4 border-white bg-gray-100">
            <img src={profileData.aboutImageLink} alt={profileData.name} className="w-full h-full object-cover" />
          </div>
          <h1 className={`text-2xl font-extrabold ${t.textMain} z-10`}>{profileData.name}</h1>
          <p className={`${t.textMuted} font-medium text-sm mt-2 mb-6 z-10 max-w-xs`}>
            {profileData.description}
          </p>
          
          <div className="flex gap-4 z-10">
            <span className={`bg-gray-100/80 px-4 py-2 rounded-full text-xs font-bold ${t.textMain}`}>Video Editor</span>
            <span className={`bg-gray-100/80 px-4 py-2 rounded-full text-xs font-bold ${t.textMain}`}>Content Creator</span>
          </div>
        </div>

        <h3 className={`text-sm font-bold ${t.textMuted} uppercase tracking-wider mt-10 mb-4 px-2`}>Social & Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profileData.socials.map((social, index) => (
            <SocialLink 
              key={index}
              icon={getIcon(social.platform)} 
              title={social.title} 
              desc={social.desc} 
              link={social.link} 
              color={social.color || t.textMain} 
              t={t} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SocialLink({ icon, title, desc, link, color, t }) {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`${t.card} p-4 rounded-[1.5rem] flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow group no-underline`}
    >
      <div className={`w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center ${color} group-hover:scale-110 transition-transform flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`font-bold ${t.textMain} truncate`}>{title}</h4>
        <p className={`text-xs ${t.textMuted} font-medium mt-0.5 truncate`}>{desc}</p>
      </div>
      <ChevronLeft size={20} className={`${t.textMuted} rotate-180 opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0`} />
    </a>
  );
}
