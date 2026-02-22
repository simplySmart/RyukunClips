import { Leaf, Flower2 } from 'lucide-react';

export const THEMES = {
  lime: {
    name: "Hidden Leaf",
    bg: "bg-[#F4F5F0]",
    card: "bg-white",
    textMain: "text-gray-900",
    textMuted: "text-gray-500",
    accent: "bg-[#D4F84B]",
    accentText: "text-[#1C1C1E]", 
    dark: "bg-[#1C1C1E]",
    darkText: "text-white",       
    highlight: "text-[#D4F84B]",  
    icon: Leaf
  },
  sakura: {
    name: "Sakura Blossom",
    bg: "bg-[#FFF0F5]",           
    card: "bg-white",
    textMain: "text-[#2D1B22]",   
    textMuted: "text-[#8A6A77]",  
    accent: "bg-[#FFB7C5]",       
    accentText: "text-[#4A1525]", 
    dark: "bg-[#4A1525]",         
    darkText: "text-[#FFF0F5]",
    highlight: "text-[#FFB7C5]",
    icon: Flower2
  }
};
