import React, { useState } from 'react';
import { TabType } from './types';
import Dialogues from './Dialogues';
import Quizzes from './Quizzes';
import DualGame from './DualGame';
import GrammarGuide from './GrammarGuide';
import { Sparkles, BookOpen, HelpCircle, Gamepad2, GraduationCap, Languages, ScrollText } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dialogues');

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-slate-900 font-sans flex flex-col selection:bg-blue-100 selection:text-slate-950">
      {/* Visual background atmospheric lights - styled professionally */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-blue-300/[0.08] via-transparent to-transparent pointer-events-none"></div>

      {/* Hero Header */}
      <header className="h-16 flex items-center border-b border-gray-200 bg-white sticky top-0 z-50 shadow-xs">
        <div className="max-w-6xl mx-auto w-full px-6 flex justify-between items-center">
          
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg text-slate-900 shadow-sm shrink-0">
              ES
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-extrabold tracking-tight text-gray-800 flex items-center gap-1.5 leading-none">
                <span>Իսպաներենի Ուսուցում</span>
                <span className="text-gray-400 font-normal">|</span>
                <span className="text-blue-500 font-black">Spanish Lab</span>
              </h1>
              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest hidden sm:block">
                AprendePasado (A1-A2 Level)
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <nav className="flex items-center gap-2 text-xs">
            {/* Dialogues Tab */}
            <button
              id="tab-dialogues-btn"
              onClick={() => setActiveTab('dialogues')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeTab === 'dialogues'
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'bg-gray-100/80 hover:bg-gray-200 text-gray-650'
              }`}
            >
              <span>Ընթերցանություն</span>
            </button>

            {/* Quizzes Tab */}
            <button
              id="tab-quizzes-btn"
              onClick={() => setActiveTab('quizzes')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeTab === 'quizzes'
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'bg-gray-100/80 hover:bg-gray-200 text-gray-650'
              }`}
            >
              <span>Վիկտորինա</span>
            </button>

            {/* PVP Duel Tab */}
            <button
              id="tab-duel-btn"
              onClick={() => setActiveTab('duel')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'duel'
                  ? 'bg-orange-500 text-white shadow-xs font-black'
                  : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
              }`}
            >
              <span>2-Խաղացող</span>
            </button>

            {/* Cheat Sheet / Grammar */}
            <button
              id="tab-guide-btn"
              onClick={() => setActiveTab('guide')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeTab === 'guide'
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'bg-gray-100/80 hover:bg-gray-200 text-gray-650'
              }`}
            >
              <span>Քերականություն</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 md:py-12">
        {activeTab === 'dialogues' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
              <span className="text-xxs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/50 inline-block font-mono">
                Երկխոսություններ և թարգմանություն
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight">
                Անցյալ Ժամանակների Ընթերցարան
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Սեղմեք յուրաքանչյուր իսպաներեն արտահայտության վրա՝ բացելու դրա հայերեն զուգահեռ թարգմանությունը: Ուսումնասիրեք տարբեր անցյալ ժամանակների կիրառությունը:
              </p>
            </div>
            <Dialogues />
          </div>
        )}

        {activeTab === 'quizzes' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
              <span className="text-xxs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/50 inline-block font-mono">
                Ստուգեք ձեր ուժերը
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight">
                Ինտերակտիվ Վիկտորինաներ
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Յուրաքանչյուր երկխոսության համար պատրաստված է 6 թեմատիկ հարց: Կարողանո՞ւմ եք ստանալ առավելագույն միավորները և կատարյալ հասկանալ քերականական կանոնները:
              </p>
            </div>
            <Quizzes />
          </div>
        )}

        {activeTab === 'duel' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
              <span className="text-xxs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200/50 inline-block font-mono">
                Մրցակցային հարթակ
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight">
                2 Խաղացողների Ակտիվ Դաշտ
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-bold">
                5 տարբեր հետաքրքիր խաղեր անցյալ ժամանակների մասին: Խաղացեք ձեր ընկերոջ հետ նույն համակարգչով՝ ստեղնաշարի տառերի կամ սեղմումների միջոցով:
              </p>
            </div>
            <DualGame />
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
              <span className="text-xxs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200/50 inline-block font-mono">
                Հուշաթերթիկ
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight">
                Քերականական Շտեմարան
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Խորացված տեղեկություններ Pretérito Perfecto-ի, Imperfecto-ի և Indefinido-ի կանոնների, օգտագործման դեպքերի և անկանոն բայերի վերաբերյալ:
              </p>
            </div>
            <GrammarGuide />
          </div>
        )}
      </main>

      {/* Styled Human Footer (no tech-larp indicators) */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-400 font-medium">
        <p>© 2026 AprendePasado — Իսպաներեն սովորենք միասին: 🇦🇲 🇪🇸</p>
      </footer>
    </div>
  );
}
