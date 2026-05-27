import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Swords, Trophy, Sparkles, Volume2, ShieldAlert, Award, ArrowLeft, ArrowRight, Keyboard, Timer, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Player presets
const AVATARS = ['🦁', '🦊', '🦅', '🐂', '⚽', '🚀', '🎭', '⚔️', '🐲', '🦉', '🎓', '💎'];

interface PlayerSetup {
  name: string;
  emoji: string;
}

export default function DualGame() {
  const [gameState, setGameState] = useState<'setup' | 'selection' | 'playing' | 'game-over'>('setup');
  
  // Players config
  const [p1, setP1] = useState<PlayerSetup>({ name: 'Խաղացող 1', emoji: '🦁' });
  const [p2, setP2] = useState<PlayerSetup>({ name: 'Խաղացող 2', emoji: '🦅' });
  
  // Scores
  const [score1, setScore1] = useState<number>(0);
  const [score2, setScore2] = useState<number>(0);
  
  // Current game mode index: 0 to 4 (representing 5 games requested!)
  const [activeGameIdx, setActiveGameIdx] = useState<number>(0);

  // Sub-game state variables
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [gameTimer, setGameTimer] = useState<number>(15);
  const [questionLocked, setQuestionLocked] = useState<boolean>(false);
  const [p1LockedOut, setP1LockedOut] = useState<boolean>(false);
  const [p2LockedOut, setP2LockedOut] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');
  const [highlightCorrect, setHighlightCorrect] = useState<boolean>(false);

  // For Whack-A-Match game (Game 5)
  const [whackActiveWord, setWhackActiveWord] = useState<{ word: string; isMatch: boolean }>({ word: 'Listo', isMatch: false });
  const [whackTargetTense, setWhackTargetTense] = useState<string>('Pretérito Imperfecto');
  const whackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [whackScoreCount, setWhackScoreCount] = useState<number>(0);
  const [whackTotalQuestions, setWhackTotalQuestions] = useState<number>(10);

  // Dynamic feedback visual states
  const [p1Flash, setP1Flash] = useState<'correct' | 'wrong' | null>(null);
  const [p2Flash, setP2Flash] = useState<'correct' | 'wrong' | null>(null);

  // Emojis customization modal or selectors
  const [modalPlayer, setModalPlayer] = useState<1 | 2 | null>(null);

  // List of games
  const gamesList = [
    {
      id: 1,
      name: 'Արագագնաց Բայեր (Conjugation Speed Racer)',
      description: 'Ճիշտ խոնարհեք բայը նշված ժամանակաձևով: Արագ արձագանքողը ստանում է միավորներ:',
      rules: 'Էկրանին հայտնվում է բայ, դեմք և ժամանակաձև: Ընտրեք ճիշտ տարբերակը ավելի արագ, քան ձեր հակառակորդը:',
    },
    {
      id: 2,
      name: 'Ճիշտ թե Սխալ (Grammar True/False)',
      description: 'Գնահատեք նախադասության քերականական ճշտությունը:',
      rules: 'Կարդացեք նախադասությունը և արագ որոշեք՝ արդյոք այն ճիշտ է կազմված: Սխալ պատասխանը զրկում է միավորներից:',
    },
    {
      id: 3,
      name: 'Թարգմանչական Մարտահրավեր (Translation Speed Fill)',
      description: 'Լրացրեք նախադասության բաց թողնված բայը՝ հայերեն թարգմանությանը համապատասխան:',
      rules: 'Տրվում է հայերեն տեքստը և իսպաներեն թարգմանությունը՝ բաց թողնված տեղով: Ընտրեք ճիշտ բայական ձևը:',
    },
    {
      id: 4,
      name: 'Ժամանակների Պատերազմ (Time Marker Battle)',
      description: 'Որոշեք, թե որ անցյալ ժամանակաձևն է պահանջում տրված ժամանակի ցուցիչը:',
      rules: 'Ցուցադրվում է անցյալի ցուցիչ (օրինակ՝ Ayer): Արագ որոշեք՝ այն պահանջում է Perfecto, Imperfecto, թե Indefinido:',
    },
    {
      id: 5,
      name: 'Ժամանակների Ուսանող (Conjugation Whack)',
      description: 'Արագության խաղ: Բռնեք նշված ժամանակաձևով բայերը:',
      rules: 'Կենտրոնում բայերը փոխվում են 1.5 վայրկյանը մեկ: Սեղմեք ձեր կոճակը միայն այն ժամանակ, երբ բայը համապատասխանում է նպատակային ժամանակաձևին:',
    }
  ];

  // GAME DATA
  const gameData = {
    g1: [
      { prompt: 'Hacer (nosotros) — Pretérito Perfecto', options: ['hemos hecho', 'hicimos', 'hacíamos', 'habéis hecho'], correct: 0 },
      { prompt: 'Vivir (tú) — Pretérito Imperfecto', options: ['viviste', 'vivías', 'has vivido', 'vivirás'], correct: 1 },
      { prompt: 'Ir (yo) — Pretérito Indefinido', options: ['he ido', 'fui', 'iba', 'voy'], correct: 1 },
      { prompt: 'Estudiar (ellos) — Pretérito Perfecto', options: ['estudiaron', 'han estudiado', 'estudiaban', 'estudian'], correct: 1 },
      { prompt: 'Comer (él) — Pretérito Indefinido', options: ['comía', 'comió', 'ha comido', 'come'], correct: 1 }
    ],
    g2: [
      { prompt: 'Ayer yo fui al parque con Ana.', options: ['Ճիշտ է (True)', 'Սխալ է (False)'], correct: 0, reason: 'Ayer (երեկ) ցուցիչը պահանջում է Pretérito Indefinido, ուստի «fui»-ն լիովին ճիշտ է:' },
      { prompt: 'De pequeña, Lucía era muy habladora.', options: ['Ճիշտ է (True)', 'Սխալ է (False)'], correct: 0, reason: 'Անցյալում մարդու բնավորության/բնութագրի նկարագրության համար օգտագործվում է Imperfecto («era»):' },
      { prompt: 'Hoy yo he hacido mis deberes españoles.', options: ['Ճիշտ է (True)', 'Սխալ է (False)'], correct: 1, reason: 'Սխալ է, քանի որ Hacer բայի դերբայը (participio) անկանոն է՝ «hecho» (ոչ թե hacido):' },
      { prompt: 'La semana pasada, Carlos ha leído un texto.', options: ['Ճիշտ է (True)', 'Սխալ է (False)'], correct: 1, reason: '«La semana pasada» (անցյալ շաբաթ) ցուցիչը պահանջում է Indefinido («leyó»), ոչ թե Perfecto:' },
      { prompt: 'Antes, nosotros teníamos más tiempo libre.', options: ['Ճիշտ է (True)', 'Սխալ է (False)'], correct: 0, reason: '«Antes» (առաջ) ցուցիչը նկարագրում է անցյալում տևական վիճակ, ուստի Imperfecto («teníamos») ճիշտ է:' }
    ],
    g3: [
      { prompt: '«Ես երեկ գնացի այգի» ➔ Ayer yo _____ al parque.', options: ['fui', 'iba', 'he ido', 'fueron'], correct: 0 },
      { prompt: '«Այսօր նրանք երկար են խաղացել» ➔ Hoy ellos _____ mucho.', options: ['jugaron', 'jugaban', 'han jugado', 'juegan'], correct: 2 },
      { prompt: '«Փոքր ժամանակ ես ապրում էի գյուղում» ➔ De pequeño yo _____ en un pueblo.', options: ['viví', 'vivía', 'he vivido', 'vivo'], correct: 1 },
      { prompt: '«Անցյալ շաբաթ մենք սովորեցինք մաթեմատիկա» ➔ La semana pasada nosotros _____ matemáticas.', options: ['hemos estudiado', 'estudiábamos', 'estudiamos', 'estudian'], correct: 2 },
      { prompt: '«Երբ փոքր էիր, դու ամաչկո՞տ էիր» ➔ ¿Cuando eras pequeño, _____ tímido?', options: ['fuiste', 'has sido', 'eras', 'eres'], correct: 2 }
    ],
    g4: [
      { prompt: 'Ժամանակի ցուցիչ՝ «Hoy» (Այսօր)', options: ['Pretérito Perfecto', 'Pretérito Imperfecto', 'Pretérito Indefinido'], correct: 0 },
      { prompt: 'Ժամանակի ցուցիչ՝ «Antes» (Առաջ / Նախկինում)', options: ['Pretérito Perfecto', 'Pretérito Imperfecto', 'Pretérito Indefinido'], correct: 1 },
      { prompt: 'Ժամանակի ցուցիչ՝ «Ayer» (Երեկ)', options: ['Pretérito Perfecto', 'Pretérito Imperfecto', 'Pretérito Indefinido'], correct: 2 },
      { prompt: 'Ժամանակի ցուցիչ՝ «Esta mañana» (Այս առավոտ)', options: ['Pretérito Perfecto', 'Pretérito Imperfecto', 'Pretérito Indefinido'], correct: 0 },
      { prompt: 'Ժամանակի ցուցիչ՝ «El lunes pasado» (Անցյալ երկուշաբթի)', options: ['Pretérito Perfecto', 'Pretérito Imperfecto', 'Pretérito Indefinido'], correct: 2 }
    ],
    g5_vocab: [
      // Imperfecto (Matches)
      { word: 'hablábamos', isMatch: true, tense: 'Pretérito Imperfecto' },
      { word: 'vivías', isMatch: true, tense: 'Pretérito Imperfecto' },
      { word: 'leía', isMatch: true, tense: 'Pretérito Imperfecto' },
      { word: 'íbamos', isMatch: true, tense: 'Pretérito Imperfecto' },
      { word: 'eran', isMatch: true, tense: 'Pretérito Imperfecto' },
      { word: 'jugaba', isMatch: true, tense: 'Pretérito Imperfecto' },
      // Perfecto (No matches)
      { word: 'he escrito', isMatch: false, tense: 'Pretérito Perfecto' },
      { word: 'has jugado', isMatch: false, tense: 'Pretérito Perfecto' },
      { word: 'hemos comido', isMatch: false, tense: 'Pretérito Perfecto' },
      { word: 'ha tenido', isMatch: false, tense: 'Pretérito Perfecto' },
      // Indefinido (No matches)
      { word: 'comí', isMatch: false, tense: 'Pretérito Indefinido' },
      { word: 'hicieron', isMatch: false, tense: 'Pretérito Indefinido' },
      { word: 'estudié', isMatch: false, tense: 'Pretérito Indefinido' },
      { word: 'fui', isMatch: false, tense: 'Pretérito Indefinido' },
      { word: 'habló', isMatch: false, tense: 'Pretérito Indefinido' }
    ]
  };

  const currentQuestions = activeGameIdx === 0 ? gameData.g1 :
                           activeGameIdx === 1 ? gameData.g2 :
                           activeGameIdx === 2 ? gameData.g3 :
                           activeGameIdx === 3 ? gameData.g4 : [];

  const currentQuestion = currentQuestions[currentQuestionIdx];

  // Whack-a-match routine
  useEffect(() => {
    if (gameState === 'playing' && activeGameIdx === 4) {
      // Start fast changing word
      setWhackScoreCount(0);
      setGameTimer(15);
      
      const changeWord = () => {
        const vocab = gameData.g5_vocab;
        const randomItem = vocab[Math.floor(Math.random() * vocab.length)];
        setWhackActiveWord({ word: randomItem.word, isMatch: randomItem.isMatch });
      };

      changeWord();
      whackIntervalRef.current = setInterval(changeWord, 1300);

      return () => {
        if (whackIntervalRef.current) clearInterval(whackIntervalRef.current);
      };
    }
  }, [gameState, activeGameIdx]);

  // General Timer decrement
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setGameTimer((prev) => {
          if (prev <= 1) {
            // Time out logic safely
            if (activeGameIdx === 4) {
              // Game 5 time out
              handleNextSubQuestion();
            } else {
              handleTimeOut();
            }
            return 15;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState, activeGameIdx, currentQuestionIdx, questionLocked]);

  const handleTimeOut = () => {
    setQuestionLocked(true);
    setHighlightCorrect(true);
    setFeedbackMsg('Ժամանակն սպառվեց: Ճիշտ պատասխանն է կարևորվածը:');
    setTimeout(() => {
      moveToNextOrFin();
    }, 2800);
  };

  const moveToNextOrFin = () => {
    setHighlightCorrect(false);
    setFeedbackMsg('');
    setP1LockedOut(false);
    setP2LockedOut(false);
    setQuestionLocked(false);
    setGameTimer(15);

    if (currentQuestionIdx + 1 < currentQuestions.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      // Game ended. Go back to index menu with results
      setGameState('selection');
      setCurrentQuestionIdx(0);
    }
  };

  const handleNextSubQuestion = () => {
    if (whackIntervalRef.current) clearInterval(whackIntervalRef.current);
    setGameState('selection');
    setCurrentQuestionIdx(0);
  };

  // ANSWER HANDLER FOR THE CURRENT QUESTION
  const submitAnswer = (playerKey: 1 | 2, optionIndex: number) => {
    if (questionLocked) return;
    
    // Check lockouts
    if (playerKey === 1 && p1LockedOut) return;
    if (playerKey === 2 && p2LockedOut) return;

    const isCorrect = optionIndex === currentQuestion.correct;

    if (isCorrect) {
      // Correct! Stop the timer, reward points
      setQuestionLocked(true);
      setHighlightCorrect(true);
      
      if (playerKey === 1) {
        setScore1((prev) => prev + 10);
        setP1Flash('correct');
        setFeedbackMsg(`Ճիշտ է։ ${p1.name}-ը ստացավ +10 միավոր:`);
      } else {
        setScore2((prev) => prev + 10);
        setP2Flash('correct');
        setFeedbackMsg(`Ճիշտ է։ ${p2.name}-ը ստացավ +10 միավոր:`);
      }

      // Clear flashes after moments
      setTimeout(() => {
        setP1Flash(null);
        setP2Flash(null);
      }, 1200);

      // transition after explanation showing
      setTimeout(() => {
        moveToNextOrFin();
      }, 2500);
    } else {
      // Incorrect! Deduct points and lock player
      if (playerKey === 1) {
        setScore1((prev) => Math.max(0, prev - 5));
        setP1LockedOut(true);
        setP1Flash('wrong');
        setFeedbackMsg(`Սխալ է։ ${p1.name}-ը կորցրեց 5 միավոր և արգելափակվեց այս փուլում:`);
      } else {
        setScore2((prev) => Math.max(0, prev - 5));
        setP2LockedOut(true);
        setP2Flash('wrong');
        setFeedbackMsg(`Սխալ է։ ${p2.name}-ը կորցրեց 5 միավոր և արգելափակվեց այս փուլում:`);
      }

      setTimeout(() => {
        setP1Flash(null);
        setP2Flash(null);
      }, 1000);

      // If both are locked out
      const otherLocked = playerKey === 1 ? p2LockedOut : p1LockedOut;
      if (otherLocked) {
        setQuestionLocked(true);
        setHighlightCorrect(true);
        setFeedbackMsg('Երկու խաղացողներն էլ սխալվեցին: Ճիշտ պատասխանն է կարևորվածը:');
        setTimeout(() => {
          moveToNextOrFin();
        }, 2800);
      }
    }
  };

  // WHACK GAME CLICK HANDLER (Game 5)
  const submitWhack = (playerKey: 1 | 2) => {
    const isMatch = whackActiveWord.isMatch;

    if (isMatch) {
      if (playerKey === 1) {
        setScore1((prev) => prev + 15);
        setP1Flash('correct');
      } else {
        setScore2((prev) => prev + 15);
        setP2Flash('correct');
      }
      // Instantly change word on positive hit to feel highly active
      const randomItem = gameData.g5_vocab[Math.floor(Math.random() * gameData.g5_vocab.length)];
      setWhackActiveWord({ word: randomItem.word, isMatch: randomItem.isMatch });
    } else {
      if (playerKey === 1) {
        setScore1((prev) => Math.max(0, prev - 10));
        setP1Flash('wrong');
      } else {
        setScore2((prev) => Math.max(0, prev - 10));
        setP2Flash('wrong');
      }
    }

    setTimeout(() => {
      setP1Flash(null);
      setP2Flash(null);
    }, 800);
  };

  // KEYBOARD CONTROLS FOR SINGLE SCREEN GAMING
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      const key = e.key.toLowerCase();

      // GAME 5 CONTROLS (Only Buzz/Whack button)
      if (activeGameIdx === 4) {
        if (key === 'a' || key === 's' || key === 'd' || key === 'w') {
          submitWhack(1);
        }
        if (key === 'j' || key === 'k' || key === 'l' || key === 'i') {
          submitWhack(2);
        }
        return;
      }

      // GAMES 1-4 CONTROLS
      if (questionLocked) return;

      // Player 1 options mapper
      // W/A/S/D matching indices
      if (!p1LockedOut) {
        if (key === 'a') submitAnswer(1, 0);
        else if (key === 's') submitAnswer(1, 1);
        else if (key === 'd' && currentQuestion.options.length > 2) submitAnswer(1, 2);
        else if (key === 'w' && currentQuestion.options.length > 3) submitAnswer(1, 3);
        // Special mapping for true false
        else if (key === 'w' && currentQuestion.options.length === 2) submitAnswer(1, 0); // True is w
        else if (key === 'x' && currentQuestion.options.length === 2) submitAnswer(1, 1); // False is x
      }

      // Player 2 options mapper
      // J/K/L/I matching indices
      if (!p2LockedOut) {
        if (key === 'j') submitAnswer(2, 0);
        else if (key === 'k') submitAnswer(2, 1);
        else if (key === 'l' && currentQuestion.options.length > 2) submitAnswer(2, 2);
        else if (key === 'i' && currentQuestion.options.length > 3) submitAnswer(2, 3);
        // Special mapping for true false
        else if (key === 'i' && currentQuestion.options.length === 2) submitAnswer(2, 0); // True is i
        else if (key === 'm' && currentQuestion.options.length === 2) submitAnswer(2, 1); // False is m
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState, activeGameIdx, currentQuestionIdx, p1LockedOut, p2LockedOut, questionLocked, p1, p2, whackActiveWord]);

  // RESET SCOREBOARD
  const resetScores = () => {
    setScore1(0);
    setScore2(0);
    setGameState('selection');
  };

  // STARTING GAME BY SELECTING MODE
  const startSubGame = (idx: number) => {
    setActiveGameIdx(idx);
    setCurrentQuestionIdx(0);
    setGameTimer(15);
    setQuestionLocked(false);
    setP1LockedOut(false);
    setP2LockedOut(false);
    setHighlightCorrect(false);
    setFeedbackMsg('');
    setGameState('playing');
  };

  return (
    <div id="dual-game-container" className="max-w-6xl mx-auto">
      
      {/* 1. SETUP STATE */}
      {gameState === 'setup' && (
        <div className="bento-card bg-gradient-to-br from-white to-blue-50/20 max-w-xl mx-auto p-6 md:p-8 space-y-6 text-center border border-gray-200 shadow-md">
          <div className="inline-flex p-3 bg-blue-50/60 rounded-full text-blue-600 border border-blue-100">
            <Swords className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">2 Խաղացողների Անցյալի Դուել</h2>
            <p className="text-gray-500 text-xs mt-1 font-semibold">Ով է ավելի լավ տիրապետում իսպաներենի անցյալ ժամանակներին:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {/* Player 1 card setup */}
            <div className="bento-card p-4 bg-white border border-gray-200/80 shadow-3xs space-y-3">
              <span className="text-[10px] font-black text-rose-600 tracking-wider uppercase">Խաղացող 1 (Կարմիր)</span>
              <div className="flex gap-2.5">
                <button
                  id="p1-emoji-btn"
                  onClick={() => setModalPlayer(1)}
                  className="text-2xl p-2 bg-slate-50 rounded-xl border border-gray-200 cursor-pointer shadow-sm hover:bg-slate-100 transition-colors"
                >
                  {p1.emoji}
                </button>
                <input
                  id="p1-name-input"
                  type="text"
                  maxLength={15}
                  value={p1.name}
                  onChange={(e) => setP1((prev) => ({ ...prev, name: e.target.value || 'Խաղացող 1' }))}
                  className="w-full bg-slate-50 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div className="text-[10px] text-gray-400 font-medium leading-relaxed font-mono">
                Կառավարում՝ <strong>W/A/S/D/X</strong>
              </div>
            </div>

            {/* Player 2 card setup */}
            <div className="bento-card p-4 bg-white border border-gray-200/80 shadow-3xs space-y-3">
              <span className="text-[10px] font-black text-blue-600 tracking-wider uppercase">Խաղացող 2 (Կապույտ)</span>
              <div className="flex gap-2.5">
                <button
                  id="p2-emoji-btn"
                  onClick={() => setModalPlayer(2)}
                  className="text-2xl p-2 bg-slate-50 rounded-xl border border-gray-200 cursor-pointer shadow-sm hover:bg-slate-100 transition-colors"
                >
                  {p2.emoji}
                </button>
                <input
                  id="p2-name-input"
                  type="text"
                  maxLength={15}
                  value={p2.name}
                  onChange={(e) => setP2((prev) => ({ ...prev, name: e.target.value || 'Խաղացող 2' }))}
                  className="w-full bg-slate-50 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="text-[10px] text-gray-400 font-medium leading-relaxed font-mono">
                Կառավարում՝ <strong>I/J/K/L/M</strong>
              </div>
            </div>
          </div>

          {/* Emojis selection overlay modal */}
          {modalPlayer !== null && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-55 flex items-center justify-center p-4 animate-fade-in">
              <div className="bento-card bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-gray-200">
                <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide">Անձնանիշ (Avatar)</h4>
                <div className="grid grid-cols-4 gap-2">
                  {AVATARS.map((emoji) => (
                    <button
                      key={emoji}
                      id={`emoji-${emoji}`}
                      onClick={() => {
                        if (modalPlayer === 1) setP1((prev) => ({ ...prev, emoji }));
                        else setP2((prev) => ({ ...prev, emoji }));
                        setModalPlayer(null);
                      }}
                      className="text-2xl p-2 hover:bg-slate-50 hover:scale-105 active:scale-95 rounded-xl transition-all cursor-pointer"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    id="close-emoji-modal"
                    onClick={() => setModalPlayer(null)}
                    className="text-2xs bg-slate-100 text-slate-700 font-extrabold px-3 py-2 rounded-full hover:bg-slate-200"
                  >
                    Չեղարկել
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick guide and start */}
          <div className="bento-card bg-gray-50/50 p-4 border border-gray-200/60 text-xs text-slate-500 flex items-start gap-2.5 text-left leading-normal font-medium">
            <Keyboard className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800 block uppercase tracking-wide text-[10px] mb-0.5">Մեկ համակարգչով խաղալու հմայքը</span>
              Խաղը կազմված է իսպաներենի անցյալ ժամանակների 5 տարբեր ինտերակտիվ խաղերից: Կարող եք օգտվել ստեղնաշարի նշված տառերից կամ էկրանին սեղմելու տարբերակներից։
            </div>
          </div>

          <button
            id="start-duel-arena-btn"
            onClick={() => setGameState('selection')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-6 rounded-full text-sm shadow-md transition-all shrink-0 cursor-pointer flex justify-center items-center gap-2 transform hover:scale-[1.01]"
          >
            <span>Մուտք Խաղահրապարակ</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* 2. SELECTION STATE */}
      {gameState === 'selection' && (
        <div className="space-y-6">
          {/* Current global scoreboard header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row justify-between items-center gap-6 border border-slate-700">
            <div className="flex items-center gap-3">
              <Swords className="w-6 h-6 text-yellow-400 animate-pulse" />
              <div>
                <h2 className="text-lg md:text-xl font-black">Իսպաներենի Դուել Ասպարեզ</h2>
                <p className="text-slate-400 text-2xs">Մարտահրավեր անցյալ ժամանակներում (5 Խաղ)</p>
              </div>
            </div>

            {/* Live Scores Display */}
            <div className="flex items-center gap-4 bg-slate-800 px-5 py-3 rounded-2xl border border-slate-700 shadow-inner">
              <div className="text-center">
                <div className="flex items-center gap-1.5 justify-center">
                  <span className="text-lg">{p1.emoji}</span>
                  <span className="text-xs font-bold text-red-300 truncate max-w-[80px]">{p1.name}</span>
                </div>
                <div className="text-2xl font-black text-white">{score1}</div>
              </div>
              <div className="text-slate-500 font-extrabold mx-2 text-[10px]">VS</div>
              <div className="text-center">
                <div className="flex items-center gap-1.5 justify-center">
                  <span className="text-lg">{p2.emoji}</span>
                  <span className="text-xs font-bold text-blue-350 truncate max-w-[80px]">{p2.name}</span>
                </div>
                <div className="text-2xl font-black text-white">{score2}</div>
              </div>
            </div>

            <button
              id="reset-scores-btn"
              onClick={resetScores}
              className="flex items-center gap-1.5 text-2xs bg-white/10 hover:bg-white/15 text-white py-2 px-4 rounded-full font-bold transition-all cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 text-yellow-400" />
              <span>Զրոյացնել</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gamesList.map((g, idx) => {
              return (
                <div
                  key={g.id}
                  className="bento-card bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase py-1 px-2.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-mono">
                        Խաղ {g.id}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-slate-800 text-sm leading-snug">{g.name}</h3>
                    <p className="text-[11px] text-gray-400 font-medium leading-normal">{g.description}</p>
                    <div className="text-[10px] text-slate-500 font-semibold italic bg-slate-50/75 p-3 rounded-xl border border-gray-150">
                      <strong>Կանոն՝</strong> {g.rules}
                    </div>
                  </div>

                  <div className="pt-4 mt-2">
                    <button
                      id={`start-subgame-btn-${idx}`}
                      onClick={() => startSubGame(idx)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-full text-xs transition-all cursor-pointer flex justify-center items-center gap-1 shadow-xs hover:scale-[1.01]"
                    >
                      <span>Խաղալ</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Final Duel Outcome Award */}
          <div className="bento-card p-6 bg-gradient-to-tr from-amber-50/50 to-orange-50/50 rounded-2xl border border-amber-100/60 text-center space-y-3 shadow-3xs">
            <Trophy className="w-10 h-10 text-yellow-500 mx-auto" />
            <div>
              <h4 className="font-black text-slate-800 text-sm">Ո՞վ է տանում հաղթանակը</h4>
              <p className="text-gray-500 text-xs font-medium">
                Խաղացեք բոլոր 5 խաղերը, կուտակեք առավելագույն իսպաներեն միավորները և հռչակվեք «Անցյալի Տիրակալ» 👑:
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. PLAYING STATE */}
      {gameState === 'playing' && (
        <div className="space-y-6">
          {/* Header area with navigation and time */}
          <div className="flex justify-between items-center bg-slate-900 border border-slate-700 p-4 rounded-2xl text-white shadow-md">
            <button
              id="back-to-lobby-btn"
              onClick={() => setGameState('selection')}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white cursor-pointer transition-colors font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Վերադառնալ նախասրահ</span>
            </button>

            <span className="text-xs font-mono font-black text-yellow-400 uppercase tracking-wider">
              {gamesList[activeGameIdx].name}
            </span>

            {/* Game timer */}
            <div className="flex items-center gap-1 bg-rose-900/55 text-rose-200 px-3 py-1 rounded-full border border-rose-700 font-mono text-xs font-black animate-pulse">
              <Timer className="w-3.5 h-3.5" />
              <span>{gameTimer}վ</span>
            </div>
          </div>

          {/* Split-screen Arena Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Player 1 Console - Left Side (Red) */}
            <div className={`lg:col-span-3 bg-red-500/5 border-2 rounded-2xl p-6 flex flex-col justify-between text-center transition-all duration-305 relative overflow-hidden bento-card ${
              p1Flash === 'correct' ? 'ring-4 ring-emerald-500 bg-emerald-50/10' :
              p1Flash === 'wrong' ? 'ring-4 ring-rose-500 bg-rose-50/10' :
              p1LockedOut ? 'opacity-50 border-rose-200 bg-slate-100' : 'border-rose-500/20'
            }`}>
              {p1LockedOut && (
                <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-rose-600 text-white rounded-full px-4 py-1.5 text-xs font-black flex items-center gap-1.5 shadow-sm">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Մեկուսացված է</span>
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                <div className="text-4xl hover:scale-110 transition-transform duration-200 cursor-default">{p1.emoji}</div>
                <div>
                  <h3 className="font-black text-gray-805 text-sm truncate">{p1.name}</h3>
                  <span className="text-rose-600 font-mono font-black text-xl">{score1} միավոր</span>
                </div>
              </div>

              {/* Player 1 interactive options (only visible if not Game 5) */}
              {activeGameIdx !== 4 ? (
                <div className="space-y-2.5 mt-6">
                  <span className="text-[10px] text-gray-400 block uppercase font-mono font-bold tracking-wider mb-2">Կառավարման վահանակ</span>
                  {currentQuestion.options.map((option, idx) => {
                    const keys = ['A', 'S', 'D', 'W'];
                    const specialKeys = currentQuestion.options.length === 2 ? ['W', 'X'] : keys;
                    return (
                      <button
                        key={idx}
                        id={`p1-opt-btn-${idx}`}
                        disabled={questionLocked || p1LockedOut}
                        onClick={() => submitAnswer(1, idx)}
                        className="w-full bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold py-2.5 px-3.5 rounded-xl border-2 border-gray-150 hover:border-rose-450 transition-all cursor-pointer flex justify-between items-center shadow-xs"
                      >
                        <span className="font-mono bg-rose-50 text-rose-800 px-1.5 py-0.5 rounded-md text-[9px] font-bold">
                          {specialKeys[idx]}
                        </span>
                        <span className="truncate max-w-[120px] font-medium">{option}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2 mt-6">
                  <span className="text-[9px] text-gray-400 block font-mono font-bold uppercase">Արագ սեղմեք երբ համապատասխանում է</span>
                  <button
                    id="p1-whack-btn"
                    onClick={() => submitWhack(1)}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-4 rounded-full text-xs shadow-md transition-all cursor-pointer flex justify-between items-center px-5"
                  >
                    <span className="font-mono bg-white text-rose-600 px-1.5 py-0.5 rounded text-[10px] font-bold">
                      W/A/S/D
                    </span>
                    <span>ԲՌՆԵԼ (TAP)!</span>
                  </button>
                </div>
              )}
            </div>

            {/* Duel Active Arena Column - Center (Active questions / words) */}
            <div className="lg:col-span-6 bg-gradient-to-br from-white to-blue-50/20 rounded-2xl p-6 border border-gray-200 shadow-md flex flex-col justify-between items-center min-h-[350px] space-y-6 text-center bento-card">
              
              {/* Question Index badge */}
              <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-gray-150">
                ՓՈՒԼ {currentQuestionIdx + 1} / {activeGameIdx === 4 ? whackTotalQuestions : currentQuestions.length}
              </div>

              {/* ACTIVE MATCH CHALLENGE FOR GAMES 1-4 */}
              {activeGameIdx !== 4 ? (
                <div className="space-y-4 max-w-sm">
                  <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest block">
                    Հարցի Պայմանը՝
                  </span>
                  <h2 className="text-base md:text-lg font-black text-slate-800 leading-snug">
                    {currentQuestion.prompt}
                  </h2>
                  
                  {/* Option display helper to look beautiful */}
                  {highlightCorrect && (
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-800 font-bold animate-bounce mt-2 shadow-xs">
                      Ճիշտ պատասխանն էր՝ "{currentQuestion.options[currentQuestion.correct]}"
                    </div>
                  )}

                  {(currentQuestion as any).reason && highlightCorrect && (
                    <p className="text-slate-500 text-[10px] italic leading-normal mt-1 border-t border-gray-150 pt-2 text-left font-medium">
                      <strong>Իմաստ՝</strong> {(currentQuestion as any).reason}
                    </p>
                  )}
                </div>
              ) : (
                // GAME 5 (CONJUGATION WHACK HERO PROMPT)
                <div className="space-y-4 max-w-sm">
                  <div className="p-1 px-3 bg-blue-50 text-blue-800 rounded-full text-[10px] font-black inline-block border border-blue-105 uppercase tracking-wider">
                    ԹԻՐԱԽԱՅԻՆ ԺԱՄԱՆԱԿ՝
                  </div>
                  <h2 className="text-lg md:text-xl font-black text-slate-800">
                    {whackTargetTense}
                  </h2>

                  {/* Gigantic fast changing word card */}
                  <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-md border-4 border-slate-700 min-w-[200px] transform hover:scale-101 transition-transform relative overflow-hidden bento-card">
                    <span className="text-[9px] text-slate-400 block mb-1 uppercase tracking-widest font-bold">ԲԱՅԱԿԱՆ ՁԵՎ</span>
                    <div className="text-xl md:text-2xl font-black tracking-wide font-mono text-yellow-400">
                      {whackActiveWord.word}
                    </div>
                    {/* Visual signal */}
                    <div className="absolute bottom-1 right-2 text-[8px] font-mono text-slate-500 uppercase">
                      Armenia-Spain
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-400 max-w-xs leading-normal mx-auto font-semibold">
                    Սեղմեք ձեր կոճակը միայն այն ժամանակ, երբ տեսնեք <strong>{whackTargetTense}</strong>-ին պատկանող բայ:
                  </p>
                </div>
              )}

              {/* Dynamic status feedback banner */}
              <div className="w-full bg-slate-50/85 p-3 rounded-xl border border-gray-200/80 min-h-[46px] flex justify-center items-center shadow-5xs">
                <p className="text-xs font-bold text-gray-700 leading-snug text-center">
                  {feedbackMsg || 'Խաղացողներ՛ սպասում ենք ձեր պատասխաններին...'}
                </p>
              </div>
            </div>

            {/* Player 2 Console - Right Side (Blue) */}
            <div className={`lg:col-span-3 bg-blue-500/5 border-2 rounded-2xl p-6 flex flex-col justify-between text-center transition-all duration-305 relative overflow-hidden bento-card ${
              p2Flash === 'correct' ? 'ring-4 ring-emerald-500 bg-emerald-50/10' :
              p2Flash === 'wrong' ? 'ring-4 ring-rose-500 bg-rose-50/10' :
              p2LockedOut ? 'opacity-50 border-blue-200 bg-slate-101' : 'border-blue-500/20'
            }`}>
              {p2LockedOut && (
                <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-blue-600 text-white rounded-full px-4 py-1.5 text-xs font-black flex items-center gap-1.5 shadow-sm">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Մեկուսացված է</span>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="text-4xl hover:scale-110 transition-transform duration-200 cursor-default">{p2.emoji}</div>
                <div>
                  <h3 className="font-black text-gray-805 text-sm truncate">{p2.name}</h3>
                  <span className="text-blue-600 font-mono font-black text-xl">{score2} միավոր</span>
                </div>
              </div>

              {/* Player 2 interactive options (only visible if not Game 5) */}
              {activeGameIdx !== 4 ? (
                <div className="space-y-2.5 mt-6">
                  <span className="text-[10px] text-gray-400 block uppercase font-mono font-bold tracking-wider mb-2">Կառավարման վահանակ</span>
                  {currentQuestion.options.map((option, idx) => {
                    const keys = ['J', 'K', 'L', 'I'];
                    const specialKeys = currentQuestion.options.length === 2 ? ['I', 'M'] : keys;
                    return (
                      <button
                        key={idx}
                        id={`p2-opt-btn-${idx}`}
                        disabled={questionLocked || p2LockedOut}
                        onClick={() => submitAnswer(2, idx)}
                        className="w-full bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold py-2.5 px-3.5 rounded-xl border-2 border-gray-150 hover:border-blue-450 transition-all cursor-pointer flex justify-between items-center shadow-xs"
                      >
                        <span className="truncate max-w-[120px] font-medium">{option}</span>
                        <span className="font-mono bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded-md text-[9px] font-bold">
                          {specialKeys[idx]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2 mt-6">
                  <span className="text-[9px] text-gray-400 block font-mono font-bold uppercase">Արագ սեղմեք երբ համապատասխանում է</span>
                  <button
                    id="p2-whack-btn"
                    onClick={() => submitWhack(2)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-full text-xs shadow-md transition-all cursor-pointer flex justify-between items-center px-5"
                  >
                    <span>ԲՌՆԵԼ (TAP)!</span>
                    <span className="font-mono bg-white text-blue-600 px-1.5 py-0.5 rounded text-[10px] font-bold">
                      I/J/K/L
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Helpful keyboard shortcut layout sheet */}
          <div className="bento-card bg-gray-50 border border-gray-200 p-4 rounded-2xl flex flex-col md:flex-row gap-4 justify-around text-[10px] font-semibold text-slate-500 shadow-5xs mt-6">
            <div>
              <span className="font-black text-slate-800 block mb-0.5 uppercase tracking-wide">Խաղացող 1 (Ստեղներ՝ W, A, S, D, X)</span>
              A-Տարբերակ 1, S-Տարբերակ 2, D-Տարբերակ 3, W-Տարբերակ 4 կամ Ճիշտ, X-Սխալ
            </div>
            <div className="hidden md:block border-l border-gray-200 w-px"></div>
            <div>
              <span className="font-black text-slate-800 block mb-0.5 uppercase tracking-wide">Խաղացող 2 (Ստեղներ՝ I, J, K, L, M)</span>
              J-Տարբերակ 1, K-Տարբերակ 2, L-Տարբերակ 3, I-Տարբերակ 4 կամ Ճիշտ, M-Սխալ
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
