import React, { useState } from 'react';
import { dialoguesData } from './data';
import { Volume2, HelpCircle, Sparkles, BookOpen, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Dialogues() {
  const [selectedDialogueId, setSelectedDialogueId] = useState<string>('d1');
  const [revealedLines, setRevealedLines] = useState<Record<string, boolean>>({});
  const [allRevealed, setAllRevealed] = useState<boolean>(false);

  const activeDialogue = dialoguesData.find((d) => d.id === selectedDialogueId) || dialoguesData[0];

  const toggleLine = (index: number) => {
    const key = `${selectedDialogueId}-${index}`;
    setRevealedLines((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleAll = () => {
    const newState = !allRevealed;
    setAllRevealed(newState);
    const updatedRevealed: Record<string, boolean> = {};
    activeDialogue.lines.forEach((_, idx) => {
      updatedRevealed[`${selectedDialogueId}-${idx}`] = newState;
    });
    setRevealedLines(updatedRevealed);
  };

  const selectDialogue = (id: string) => {
    setSelectedDialogueId(id);
    setAllRevealed(false);
    // don't clear all line states, but we can reset or keep them. Let's keep them or auto close.
  };

  // Text-To-Speech function using browser tool if available (Spanish)
  const speakSpanish = (text: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent toggling the translation
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const sentenceClean = text.replace(/Կառլոս|Լուսիա|—|:/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(sentenceClean);
      utterance.lang = 'es-ES';
      utterance.pitch = 1.0;
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div id="dialogues-container" className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto items-stretch">
      {/* Dialogue Selector List - Left Column */}
      <div className="lg:col-span-4 space-y-5 flex flex-col justify-start">
        <div className="bento-card p-5 bg-white flex flex-col">
          <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span>Երկխոսություններ</span>
          </h3>
          <div className="space-y-2.5">
            {dialoguesData.map((d) => {
              const isActive = d.id === selectedDialogueId;
              return (
                <button
                  key={d.id}
                  id={`dialogue-select-btn-${d.id}`}
                  onClick={() => selectDialogue(d.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md transform scale-[1.01]'
                      : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'
                  }`}
                >
                  <div className="font-bold text-sm mb-1">{d.title}</div>
                  <div className="flex justify-between items-center text-xs">
                    <span className={isActive ? 'text-yellow-300 font-bold' : 'text-slate-500 font-medium'}>
                      {d.tenseName}
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-yellow-300' : 'text-slate-400'}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Info Box */}
        <div className="bento-card bg-gradient-to-br from-white to-blue-50/50 p-6 space-y-3 border border-gray-200">
          <div className="flex items-center gap-1.5 font-bold text-blue-900 text-sm">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Ինչպե՞ս սովորել</span>
          </div>
          <p className="leading-relaxed text-xs text-slate-600 space-y-2">
            <span className="block">1. Սեղմիր յուրաքանչյուր նախադասության վրա՝ բացելու դրա <strong>հայերեն թարգմանությունը</strong> 🇦🇲:</span>
            <span className="block">2. Օգտագործիր բարձրախոսի կոճակը 🔊՝ իսպաներեն <strong>ճիշտ արտասանությունը</strong> լսելու համար:</span>
            <span className="block">3. Ուշադրություն դարձրու անցյալ ժամանակների գործածությանը:</span>
          </p>
        </div>
      </div>

      {/* Interactive Reader Area - Right Column */}
      <div className="lg:col-span-8 flex flex-col">
        <div className="bento-card bg-white flex-1 flex flex-col overflow-hidden">
          {/* Active dialogue header info */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 text-white border-b border-slate-700">
            <div className="flex justify-between items-start gap-4 flex-wrap">
              <div>
                <span className="text-xs font-bold text-yellow-300 uppercase tracking-widest bg-yellow-400/10 px-2.5 py-1 rounded-full border border-yellow-400/20">
                  {activeDialogue.tenseName}
                </span>
                <h2 className="text-xl md:text-2xl font-black tracking-tight mt-3">
                  {activeDialogue.title}
                </h2>
                <div className="text-slate-300 text-xs italic mt-1 font-serif">
                  {activeDialogue.subTitle}
                </div>
              </div>
              <button
                id="toggle-all-translations"
                onClick={toggleAll}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 text-white py-1.5 px-3.5 rounded-full text-xs font-semibold cursor-pointer transition-colors"
              >
                {allRevealed ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Թաքցնել բոլորը</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Թարգմանել բոլորը</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed mt-4 pt-4 border-t border-white/10">
              {activeDialogue.description}
            </p>
          </div>

          {/* Dialogue Lines container */}
          <div className="p-6 md:p-8 space-y-4 flex-1 overflow-y-auto max-h-[500px]">
            {activeDialogue.lines.map((line, index) => {
              const key = `${selectedDialogueId}-${index}`;
              const isRevealed = revealedLines[key] || allRevealed;
              const isCarlos = line.speaker === 'Carlos';

              return (
                <div
                  key={index}
                  id={`dialogue-line-${index}`}
                  onClick={() => toggleLine(index)}
                  className={`group relative flex flex-col gap-1.5 p-4 rounded-2xl transition-all duration-200 cursor-pointer select-none border border-slate-100 ${
                    isCarlos
                      ? 'bg-amber-50/20 hover:bg-amber-50/40 border-l-4 border-l-amber-500'
                      : 'bg-sky-50/15 hover:bg-sky-50/30 border-l-4 border-l-sky-500'
                  }`}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex items-start gap-2.5">
                      {/* Speaker Badge */}
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          isCarlos
                            ? 'bg-amber-100 text-amber-900 border border-amber-200/50'
                            : 'bg-sky-100 text-sky-900 border border-sky-200/50'
                        }`}
                      >
                        {line.speaker}
                      </span>
                      {/* Spanish sentence */}
                      <span className="text-slate-800 font-medium text-sm md:text-base leading-relaxed">
                        {line.spanish}
                      </span>
                    </div>

                    {/* Audio Player Icon */}
                    <button
                      id={`speak-btn-${index}`}
                      onClick={(e) => speakSpanish(line.spanish, e)}
                      title="Արտասանել"
                      className="p-1.5 rounded-full hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 transition-colors shrink-0 cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Armenian translation - shown interactively */}
                  <AnimatePresence initial={false}>
                    {isRevealed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden mt-1.5"
                      >
                        <div
                          className={`text-sm py-2 px-3.5 rounded-xl border leading-relaxed ${
                            isCarlos
                              ? 'bg-amber-100/40 text-amber-950 border-amber-200/30'
                              : 'bg-sky-100/40 text-sky-950 border-sky-200/30'
                          }`}
                        >
                          {line.armenian}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Tiny instruction indicator on hover when not revealed */}
                  {!isRevealed && (
                    <div className="absolute right-3 bottom-2 opacity-0 group-hover:opacity-100 text-[10px] text-slate-400 transition-opacity hidden sm:block">
                      Սեղմեք՝ թարգմանելու
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
