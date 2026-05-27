import React, { useState } from 'react';
import { quizzesData } from './data';
import { CheckCircle2, XCircle, Award, RotateCcw, ChevronRight, HelpCircle, ArrowRight, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Quizzes() {
  const [activeQuizId, setActiveQuizId] = useState<string>('q1');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizComplete, setQuizComplete] = useState<boolean>(false);
  const [quizLang, setQuizLang] = useState<'am' | 'es'>('am');

  const activeQuiz = quizzesData.find((q) => q.id === activeQuizId) || quizzesData[0];
  const questions = activeQuiz.questions;
  const currentQuestion = questions[currentIdx];

  // Dynamically resolve properties based on selected language
  const questionText = quizLang === 'es' && currentQuestion.spanishQuestion 
    ? currentQuestion.spanishQuestion 
    : currentQuestion.question;

  const optionsList = quizLang === 'es' && currentQuestion.spanishOptions 
    ? currentQuestion.spanishOptions 
    : currentQuestion.options;

  const explanationText = quizLang === 'es' && currentQuestion.spanishExplanation 
    ? currentQuestion.spanishExplanation 
    : currentQuestion.explanation;

  const handleOptionSelect = (optIndex: number) => {
    if (isAnswered) return;
    setSelectedOpt(optIndex);
    setIsAnswered(true);

    if (optIndex === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setQuizComplete(false);
  };

  const changeQuiz = (id: string) => {
    setActiveQuizId(id);
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setQuizComplete(false);
  };

  return (
    <div id="quizzes-container" className="max-w-4xl mx-auto space-y-6">
      {/* Quiz Category Tabs */}
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4 bg-white p-3 rounded-2xl border border-gray-200 shadow-xs max-w-2xl mx-auto">
        <div className="flex gap-1 bg-gray-55/70 p-1 rounded-full border border-gray-150 shrink-0 w-full md:w-auto">
          {quizzesData.map((q) => {
            const isActive = q.id === activeQuizId;
            const label = q.tenseCode === 'perfecto' ? 'Perfecto' : q.tenseCode === 'imperfecto' ? 'Imperfecto' : 'Indefinido';
            return (
              <button
                key={q.id}
                id={`quiz-tab-${q.id}`}
                onClick={() => changeQuiz(q.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100/90'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Improved Inline Language Selector Switch */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-full border border-gray-200 shadow-3xs w-full md:w-auto shrink-0 font-sans">
          <button
            id="quiz-lang-am"
            onClick={() => setQuizLang('am')}
            className={`flex-1 md:flex-none px-3 py-1 rounded-full text-xs font-extrabold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 ${
              quizLang === 'am' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <span>🇦🇲 Հայերեն</span>
          </button>
          <button
            id="quiz-lang-es"
            onClick={() => setQuizLang('es')}
            className={`flex-1 md:flex-none px-3 py-1 rounded-full text-xs font-extrabold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 ${
              quizLang === 'es' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <span>🇪🇸 Español</span>
          </button>
        </div>
      </div>

      <div className="bento-card bg-gradient-to-br from-white to-blue-50/40 overflow-hidden shadow-md border border-gray-200">
        <AnimatePresence mode="wait">
          {!quizComplete ? (
            <motion.div
              key={currentIdx + '-' + activeQuizId + '-' + quizLang}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="p-6 md:p-8 space-y-6"
            >
              {/* Quiz state and progress bar */}
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-gray-505 uppercase tracking-widest flex items-center gap-1.5 font-black">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                  {quizLang === 'es' ? 'Pregunta' : 'Հարց'} {currentIdx + 1} / {questions.length}
                </span>
                <span className="text-blue-600 bg-blue-50/80 px-3 py-1 rounded-full border border-blue-100 font-extrabold">
                  {quizLang === 'es' ? 'Aciertos' : 'Ճիշտ'}՝ {score}
                </span>
              </div>

              {/* Progress bar line */}
              <div className="w-full bg-slate-200/50 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                ></div>
              </div>

              {/* Question */}
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-black text-gray-805 leading-snug">
                  {questionText}
                </h3>
                <p className="text-xs text-gray-450 font-medium italic">
                  {quizLang === 'es' 
                    ? '*Basado en el contenido y la gramática del diálogo.' 
                    : '*Հիմնված է երկխոսության բովանդակության և քերականության վրա:'}
                </p>
              </div>

              {/* Options list */}
              <div className="grid grid-cols-1 gap-3.5">
                {optionsList.map((option, idx) => {
                  let optStyle = 'border-2 border-gray-150 bg-white hover:border-blue-200 hover:bg-blue-50/20 text-slate-700 shadow-xs';
                  let iconElement = null;

                  if (isAnswered) {
                    const isCorrect = idx === currentQuestion.correctIndex;
                    const isSelected = idx === selectedOpt;

                    if (isCorrect) {
                      optStyle = 'border-2 border-emerald-500 bg-emerald-50/80 text-emerald-950 font-semibold shadow-xs';
                      iconElement = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
                    } else if (isSelected) {
                      optStyle = 'border-2 border-rose-500 bg-rose-50/80 text-rose-950 font-semibold shadow-xs';
                      iconElement = <XCircle className="w-5 h-5 text-rose-600 shrink-0" />;
                    } else {
                      optStyle = 'opacity-50 border-gray-200 bg-gray-50/50';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      id={`quiz-option-${idx}`}
                      disabled={isAnswered}
                      onClick={() => handleOptionSelect(idx)}
                      className={`w-full text-left p-4 rounded-2xl transition-all duration-200 flex justify-between items-center gap-3 cursor-pointer ${optStyle}`}
                    >
                      <span className="text-sm md:text-base font-medium">{option}</span>
                      {iconElement}
                    </button>
                  );
                })}
              </div>

              {/* Explanation section if answered */}
              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 bg-blue-50/45 rounded-2xl border border-blue-100/60 space-y-2.5 text-xs md:text-sm text-slate-805"
                  >
                    <div className="flex items-center gap-1.5 font-bold text-blue-900 uppercase tracking-widest text-xs">
                      <Lightbulb className="w-4 h-4 text-yellow-500 shrink-0" />
                      <span>{quizLang === 'es' ? 'Explicación' : 'Բացատրություն (Explicación)'}</span>
                    </div>
                    <p className="leading-relaxed font-medium">
                      {explanationText}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next Question / Finish Button */}
              {isAnswered && (
                <div className="flex justify-end pt-2">
                  <button
                    id="quiz-next-btn"
                    onClick={handleNext}
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-6 rounded-full text-sm shadow-md transition-all cursor-pointer transform hover:scale-[1.02]"
                  >
                    <span>
                      {currentIdx + 1 === questions.length 
                        ? (quizLang === 'es' ? 'Finalizar' : 'Ավարտել') 
                        : (quizLang === 'es' ? 'Siguiente' : 'Հաջորդը')}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            // Quiz Complete Certificate Screen
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 md:p-12 text-center space-y-8"
            >
              <div className="max-w-md mx-auto space-y-4">
                <div className="inline-flex items-center justify-center p-4 bg-yellow-100 text-yellow-850 rounded-full border-4 border-white shadow-lg">
                  <Award className="w-12 h-12" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight">
                  {quizLang === 'es' ? '¡Cuestionario finalizado!' : 'Վիկտորինան Ավարտված է։'}
                </h2>
                <p className="text-gray-500 font-medium text-sm">
                  {quizLang === 'es'
                    ? `¡Has completado correctamente la sección de ${activeQuiz.title.replace('Վիկտորինա։ ', '')}!`
                    : `Դուք հաջողությամբ անցաք ${activeQuiz.title} թեման:`}
                </p>
              </div>

              {/* Score breakdown */}
              <div className="bento-card bg-white max-w-sm mx-auto p-6 border border-gray-200 shadow-sm">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                  {quizLang === 'es' ? 'Tu resultado' : 'Ձեր արդյունքը'}
                </div>
                <div className="text-5xl font-black text-blue-600 mb-2">
                  {score} <span className="text-2xl text-slate-400">/ {questions.length}</span>
                </div>
                <div className="text-xs font-bold text-gray-700 mt-2">
                  {score === questions.length ? (
                    quizLang === 'es' 
                      ? <span className="text-emerald-600 font-extrabold">¡Resultado excelente! ¡Eres todo un experto! 🌟</span>
                      : <span className="text-emerald-600 font-extrabold">Գերազանց արդյունք: Դուք իսկական մասնագետ եք: 🌟</span>
                  ) : score >= 4 ? (
                    quizLang === 'es'
                      ? <span className="text-blue-600 font-extrabold">¡Buen resultado! ¡Usted es casi impecable! 👍</span>
                      : <span className="text-blue-600 font-extrabold">Լավ արդյունք: Գրեթե անթերի է: 👍</span>
                  ) : (
                    quizLang === 'es'
                      ? <span className="text-orange-600 font-extrabold">¡No está mal, pero puedes hacerlo mejor! 📚</span>
                      : <span className="text-orange-600 font-extrabold">Վատ չէ, բայց կարող եք ավելի լավ: Փորձեք կրկին: 📚</span>
                  )}
                </div>
              </div>

              {/* Quick glossary box */}
              <div className="bento-card bg-gradient-to-br from-white to-orange-50/20 max-w-lg mx-auto p-5 border border-amber-100/50 text-left space-y-2 text-xs text-slate-755">
                <span className="font-extrabold text-slate-850 text-sm block">
                  {quizLang === 'es' ? '💡 ¿Qué hemos aprendido?' : '💡 Ի՞նչ սովորեցինք'}
                </span>
                <p className="leading-relaxed flex font-medium">
                  {quizLang === 'es'
                    ? 'El uso preciso de los tiempos pasados perfecciona la comunicación oral en español. Continúe leyendo las conversaciones y preste atención a los verbos auxiliares y las terminaciones regulares.'
                    : 'Անցյալ ժամանակների ճիշտ կիրառումը կատարելագործում է իսպաներենի խոսակցական հմտությունները: Շարունակեք կարդալ երկխոսությունները, ուշադրություն դարձրեք օժանդակ բայերի և վերջավորությունների կանոնավոր ձևերին:'}
                </p>
              </div>

              {/* Back to top or Retry */}
              <div className="flex justify-center gap-3">
                <button
                  id="quiz-retry-btn"
                  onClick={resetQuiz}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-extrabold py-3.5 px-6 rounded-full text-sm transition-all cursor-pointer border border-gray-200"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{quizLang === 'es' ? 'Reintentar' : 'Փորձել Կրկին'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
