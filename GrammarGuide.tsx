import React, { useState } from 'react';
import { grammarCheatSheet } from './data';
import { BookOpen, Calendar, Settings, AlertCircle, ChevronRight, Check } from 'lucide-react';

export default function GrammarGuide() {
  const [activeTense, setActiveTense] = useState<'perfecto' | 'imperfecto' | 'indefinido'>('perfecto');

  const guide = grammarCheatSheet[activeTense];

  return (
    <div id="grammar-guide" className="bento-card bg-white overflow-hidden shadow-md max-w-4xl mx-auto border border-gray-200">
      {/* Tense selector header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 text-white border-b border-slate-705">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-yellow-400" />
          <h2 className="text-lg md:text-xl font-black tracking-tight">Քերականական Ուղեցույց (Guía Gramatical)</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {(['perfecto', 'imperfecto', 'indefinido'] as const).map((key) => (
            <button
              key={key}
              id={`tense-btn-${key}`}
              onClick={() => setActiveTense(key)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeTense === key
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {grammarCheatSheet[key].title}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {/* Intro */}
        <div className="space-y-2">
          <span className="text-xs font-black text-blue-600 uppercase tracking-widest block">Օգտագործումը / Uso</span>
          <p className="text-slate-700 text-sm md:text-base leading-relaxed font-semibold">
            {guide.usecase}
          </p>
        </div>

        {/* Time markers and Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bento-card bg-gradient-to-br from-white to-orange-50/15 p-5 border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-orange-800 font-black text-xs uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-orange-500" />
              <span>ԺԱՄԱՆԱԿԱՅԻՆ ՑՈՒՑԻՉՆԵՐ (Marcadores)</span>
            </div>
            <p className="text-slate-700 text-xs font-mono leading-relaxed bg-white/70 p-3 rounded-lg border border-orange-100">
              {guide.marker}
            </p>
          </div>

          <div className="bento-card bg-gradient-to-br from-white to-blue-50/15 p-5 border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-blue-900 font-black text-xs uppercase tracking-wider">
              <Settings className="w-4 h-4 text-blue-400" />
              <span>ԿԱՌՈՒՑՎԱԾՔԸ (Estructura)</span>
            </div>
            <p className="text-emerald-900 text-xs font-mono font-bold bg-white/70 p-3 rounded-lg border border-blue-105">
              {guide.formula}
            </p>
          </div>
        </div>

        {/* Conjugation Details */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest">Խոնարհում (Conjugación)</h3>
          
          {activeTense === 'perfecto' ? (
            <div className="bento-card bg-gray-50/50 p-5 border border-gray-200 shadow-xs space-y-4 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2.5">1. Haber բայի խոնարհումը ներկայում</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {guide.conjugationHaber?.map((item, idx) => (
                      <div key={idx} className="bg-white px-3 py-2 rounded-xl border border-gray-200 text-slate-750 font-mono text-xs flex justify-between">
                        <span className="text-slate-400">{item.split(' ')[0]}</span>
                        <span className="font-bold text-slate-800">{item.split(' ')[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2.5">2. Դերբայի կազմությունը (Participio)</h4>
                  <ul className="space-y-2">
                    {guide.participioRegular.map((item, idx) => (
                      <li key={idx} className="flex gap-2 items-start text-xs text-slate-600 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="font-mono">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <span className="text-xs font-bold text-red-650 uppercase flex items-center gap-1.5 mb-2 font-mono">
                  <AlertCircle className="w-3.5 h-3.5" /> Անկանոն դերբայներ (Participios Irregulares)
                </span>
                <p className="text-xs text-slate-700 font-mono bg-red-50/50 p-3 rounded-xl border border-red-100 leading-relaxed">
                  {guide.irregular}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bento-card bg-blue-50/15 p-5 border border-blue-100 shadow-xs">
                <h4 className="text-xs font-black text-blue-900 uppercase tracking-wider mb-3">-AR խմբի բայեր</h4>
                <div className="space-y-1.5">
                  {guide.conjugationAr?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs border-b border-blue-50/80 py-1.5 last:border-0 font-mono">
                      <span className="text-slate-505">{item.split(' ')[0]}</span>
                      <span className="font-bold text-blue-900">{item.split(' ')[1]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bento-card bg-indigo-50/15 p-5 border border-indigo-100 shadow-xs">
                <h4 className="text-xs font-black text-indigo-900 uppercase tracking-wider mb-3">-ER / -IR խմբի բայեր</h4>
                <div className="space-y-1.5">
                  {guide.conjugationErIr?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs border-b border-indigo-50/80 py-1.5 last:border-0 font-mono">
                      <span className="text-slate-505">{item.split(' ')[0]}</span>
                      <span className="font-bold text-indigo-900">{item.split(' ')[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTense !== 'perfecto' && (
            <div className="bento-card bg-red-50/25 p-5 border border-red-100/60 shadow-xs">
              <span className="text-xs font-bold text-red-905 uppercase flex items-center gap-1.5 mb-2 font-mono">
                <AlertCircle className="w-3.5 h-3.5 text-red-500" /> ԱՆԿԱՆՈՆ ԲԱՅԵՐ (Verbos Irregulares)
              </span>
              <p className="text-slate-800 font-mono text-xs leading-relaxed">
                {guide.irregular}
              </p>
            </div>
          )}
        </div>

        {/* Tip section */}
        <div className="bento-card bg-gray-50 p-4 border border-gray-200 text-xs text-slate-500 flex items-start gap-2.5 shadow-5xs">
          <AlertCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-black block mb-0.5 text-slate-800 uppercase tracking-wide text-[10px]">Օգտակար խորհուրդ (Consejo Útil)</span>
            Իսպաներենում սուբյեկտի դերանունները (yo, tú, él/ella և այլն) սովորաբար բաց են թողնվում, քանի որ բայի վերջավորությունն արդեն հստակ ցույց է տալիս, թե ով է կատարում գործողությունը:
          </div>
        </div>
      </div>
    </div>
  );
}
