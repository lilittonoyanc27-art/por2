import { DialogueData, QuizData } from './types';

export const dialoguesData: DialogueData[] = [
  {
    id: 'd1',
    title: 'Hoy he tenido un día ocupado',
    subTitle: '¿Qué has hecho hoy?',
    description: 'Այս երկխոսությունը օգտագործում է Pretérito Perfecto ժամանակաձևը, որը նկարագրում է ավարտված գործողություններ, որոնք կատարվել են անցյալի այնպիսի ժամանակահատվածում, որը դեռ կապված է ներկայի հետ (օրինակ՝ «այսօր», «այս շաբաթ», «այս առավոտ»):',
    tenseName: 'Pretérito Perfecto',
    tenseCode: 'perfecto',
    lines: [
      { speaker: 'Carlos', spanish: 'Hola, Lucía. ¿Qué has hecho hoy?', armenian: 'Բարև, Լուսիա։ Ի՞նչ ես արել այսօր։' },
      { speaker: 'Lucía', spanish: 'Hola, Carlos. Hoy he tenido un día muy ocupado.', armenian: 'Բարև, Կառլոս։ Այսօր շատ զբաղված օր եմ ունեցել։' },
      { speaker: 'Carlos', spanish: '¿Has ido al colegio?', armenian: 'Դպրոց գնացե՞լ ես։' },
      { speaker: 'Lucía', spanish: 'Sí, he ido al colegio por la mañana.', armenian: 'Այո, առավոտյան գնացել եմ դպրոց։' },
      { speaker: 'Carlos', spanish: '¿Y qué has estudiado?', armenian: 'Իսկ ի՞նչ ես սովորել։' },
      { speaker: 'Lucía', spanish: 'He estudiado español, inglés y matemáticas.', armenian: 'Սովորել եմ իսպաներեն, անգլերեն և մաթեմատիկա։' },
      { speaker: 'Carlos', spanish: '¿Has comido en casa?', armenian: 'Տա՞նն ես կերել։' },
      { speaker: 'Lucía', spanish: 'No, he comido en la cafetería con mis amigas.', armenian: 'Ոչ, կերել եմ սրճարանում ընկերուհիներիս հետ։' },
      { speaker: 'Carlos', spanish: '¿Has hecho los deberes?', armenian: 'Տնային աշխատանքը արե՞լ ես։' },
      { speaker: 'Lucía', spanish: 'Sí, ya he hecho los deberes. También he leído un texto en español.', armenian: 'Այո, արդեն արել եմ տնային աշխատանքը։ Նաև կարդացել եմ մի տեքստ իսպաներենով։' },
      { speaker: 'Carlos', spanish: 'Muy bien. Yo también he leído un texto, pero no he hecho los deberes todavía.', armenian: 'Շատ լավ։ Ես նույնպես կարդացել եմ մի տեքստ, բայց դեռ տնային աշխատանքը չեմ արել։' },
      { speaker: 'Lucía', spanish: 'Entonces tienes que estudiar ahora.', armenian: 'Ուրեմն հիմա պետք է սովորես։' },
      { speaker: 'Carlos', spanish: 'Sí, tienes razón. Hoy no he tenido mucho tiempo.', armenian: 'Այո, դու ճիշտ ես։ Այսօր շատ ժամանակ չեմ ունեցել։' },
      { speaker: 'Lucía', spanish: 'No pasa nada. Podemos estudiar juntos.', armenian: 'Ոչինչ։ Կարող ենք միասին սովորել։' },
      { speaker: 'Carlos', spanish: 'Buena idea. Gracias, Lucía.', armenian: 'Լավ միտք է։ Շնորհակալություն, Լուսիա։' }
    ]
  },
  {
    id: 'd2',
    title: 'Cuando era pequeño',
    subTitle: '¿Cómo eras de pequeño?',
    description: 'Այս երկխոսությունում օգտագործվում է Pretérito Imperfecto ժամանակաձևը: Այն օգտագործվում է նկարագրելու համար անցյալում կրկնվող գործողությունները, սովորությունները, ինչպես նաև մարդկանց կամ իրերի բնութագրերը անցյալում (օրինակ՝ «երբ ես փոքր էի», «առաջ», «սովորաբար»):',
    tenseName: 'Pretérito Imperfecto',
    tenseCode: 'imperfecto',
    lines: [
      { speaker: 'Carlos', spanish: 'Lucía, ¿cómo eras de pequeña?', armenian: 'Լուսիա, փոքր ժամանակ դու ինչպիսի՞ն էիր։' },
      { speaker: 'Lucía', spanish: 'Era tranquila y un poco tímida.', armenian: 'Ես հանգիստ էի և մի քիչ ամաչկոտ։' },
      { speaker: 'Carlos', spanish: '¿Dónde vivías?', armenian: 'Որտե՞ղ էիր ապրում։' },
      { speaker: 'Lucía', spanish: 'Vivía en un pueblo pequeño.', armenian: 'Ապրում էի մի փոքր գյուղում։' },
      { speaker: 'Carlos', spanish: '¿Qué hacías por la tarde?', armenian: 'Ի՞նչ էիր անում կեսօրից հետո։' },
      { speaker: 'Lucía', spanish: 'Jugaba en el parque y leía libros.', armenian: 'Խաղում էի այգում և գրքեր էի կարդում։' },
      { speaker: 'Carlos', spanish: 'Yo también jugaba mucho.', armenian: 'Ես էլ էի շատ խաղում։' },
      { speaker: 'Lucía', spanish: 'Sí, antes teníamos más tiempo libre.', armenian: 'Այո, առաջ մենք ավելի շատ ազատ ժամանակ ունեինք։' }
    ]
  },
  {
    id: 'd3',
    title: 'Ayer fui al parque',
    subTitle: '¿Qué hiciste ayer?',
    description: 'Այս երկխոսությունում օգտագործվում է Pretérito Indefinido ժամանակաձևը, որը ցույց է տալիս անցյալում կատարված կոնկրետ, ավարտված գործողություն, որը կապված չէ ներկայի հետ և տեղի է ունեցել հստակ ժամանակում (օրինակ՝ «երեկ», «անցյալ շաբաթ», «1999 թվականին»):',
    tenseName: 'Pretérito Indefinido',
    tenseCode: 'indefinido',
    lines: [
      { speaker: 'Carlos', spanish: 'Lucía, ¿qué hiciste ayer?', armenian: 'Լուսիա, երեկ ի՞նչ արեցիր։' },
      { speaker: 'Lucía', spanish: 'Ayer fui al parque con Ana.', armenian: 'Երեկ Անայի հետ գնացի այգի։' },
      { speaker: 'Carlos', spanish: '¿Y qué hiciste allí?', armenian: 'Իսկ այնտեղ ի՞նչ արեցիր։' },
      { speaker: 'Lucía', spanish: 'Caminé un poco, hablé con Ana y comí un helado.', armenian: 'Մի քիչ քայլեցի, խոսեցի Անայի հետ և պաղպաղակ կերա։' },
      { speaker: 'Carlos', spanish: '¡Qué bien! Yo me quedé en casa.', armenian: 'Շատ լավ։ Ես մնացի տանը։' },
      { speaker: 'Lucía', spanish: '¿Estudiaste español?', armenian: 'Իսպաներեն սովորեցի՞ր։' },
      { speaker: 'Carlos', spanish: 'Sí, estudié español y después vi una película.', armenian: 'Այո, իսպաներեն սովորեցի, հետո ֆիլմ դիտեցի։' },
      { speaker: 'Lucía', spanish: 'Entonces también tuviste un buen día.', armenian: 'Ուրեմն դու էլ լավ օր ունեցար։' }
    ]
  }
];

export const quizzesData: QuizData[] = [
  {
    id: 'q1',
    title: 'Վիկտորինա։ Pretérito Perfecto',
    tenseCode: 'perfecto',
    questions: [
      {
        question: 'Ի՞նչ է արել Լուսիան այսօր առավոտյան։',
        options: ['Գնացել է այգի', 'Գնացել է դպրոց', 'Մնացել է տանը', 'Գնացել է խանութ'],
        correctIndex: 1,
        explanation: 'Երկխոսության մեջ Լուսիան ասում է. «Sí, he ido al colegio por la mañana» (Այո, առավոտյան գնացել եմ դպրոց):',
        spanishQuestion: '¿Qué ha hecho Lucía esta mañana?',
        spanishOptions: ['Ha ido al parque', 'Ha ido al colegio', 'Se ha quedado en casa', 'Ha ido a la tienda'],
        spanishExplanation: 'En el diálogo, Lucía dice: "Sí, he ido al colegio por la mañana".'
      },
      {
        question: 'Որտե՞ղ է Լուսիան ճաշել և ում հետ։',
        options: ['Տանը՝ ընտանիքի հետ', 'Սրճարանում՝ ընկերուհիների հետ', 'Դպրոցում՝ Կառլոսի հետ', 'Ռեստորանում՝ մայրիկի հետ'],
        correctIndex: 1,
        explanation: 'Լուսիան ասում է. «No, he comido en la cafetería con mis amigas» (Ոչ, կերել եմ սրճարանում ընկերուհիներիս հետ):',
        spanishQuestion: '¿Dónde ha comido Lucía y con quién?',
        spanishOptions: ['En casa con su familia', 'En la cafetería con sus amigas', 'En el colegio con Carlos', 'En un restaurante con su madre'],
        spanishExplanation: 'Lucía dice: "No, he comido en la cafetería con mis amigas".'
      },
      {
        question: 'Ի՞նչ է Լուսիան կարդացել իսպաներենով։',
        options: ['Գիրք', 'Մի տեքստ', 'Տնային աշխատանք', 'Նամակ'],
        correctIndex: 1,
        explanation: 'Լուսիան ասում է. «También he leído un texto en español» (Նաև կարդացել եմ մի տեքստ իսպաներենով):',
        spanishQuestion: '¿Qué ha leído Lucía en español?',
        spanishOptions: ['Un libro', 'Un texto', 'La tarea', 'Una carta'],
        spanishExplanation: 'Lucía dice: "También he leído un texto en español".'
      },
      {
        question: 'Ի՞նչ չի արել Կառլոսը դեռևս։',
        options: ['Չի գնացել դպրոց', 'Չի կարդացել տեքստը', 'Չի արել տնային աշխատանքը', 'Չի ճաշել սրճարանում'],
        correctIndex: 2,
        explanation: 'Կառլոսն ասում է. «Yo también he leído un texto, pero no he hecho los deberes todavía» (Ես նույնպես կարդացել եմ մի տեքստ, բայց դեռ տնային աշխատանքը չեմ արել):',
        spanishQuestion: '¿Qué no ha hecho Carlos todavía?',
        spanishOptions: ['No ha ido al colegio', 'No ha leído el texto', 'No ha hecho los deberes', 'No ha comido en la cafetería'],
        spanishExplanation: 'Carlos dice: "Yo también he leído un texto, pero no he hecho los deberes todavía".'
      },
      {
        question: 'Լուսիան ի՞նչ է առաջարկում Կառլոսին։',
        options: ['Գնալ զբոսնելու', 'Միասին սովորել', 'Ֆիլմ դիտել', 'Ճաշել սրճարանում'],
        correctIndex: 1,
        explanation: 'Լուսիան առաջարկում է. «Podemos estudiar juntos» (Կարող ենք միասին սովորել), ինչին Կառլոսը պատասխանում է. «Buena idea»:',
        spanishQuestion: '¿Qué le propone Lucía a Carlos?',
        spanishOptions: ['Ir a dar un paseo', 'Estudiar juntos', 'Ver una película', 'Comer en la cafetería'],
        spanishExplanation: 'Lucía le propone: "Podemos estudiar juntos", a lo que Carlos responde: "Buena idea".'
      },
      {
        question: 'Ո՞ր բայական ձևն է օգտագործված «he leído» արտահայտության մեջ։',
        options: ['Pretérito Imperfecto', 'Pretérito Indefinido', 'Presente de Indicativo', 'Pretérito Perfecto'],
        correctIndex: 3,
        explanation: '«he leído»-ն Pretérito Perfecto-ն է (haber-ի ներկա ձևը՝ «he» + leer բայի դերբայը/participio՝ «leído»):',
        spanishQuestion: '¿Qué tiempo verbal se utiliza en la expresión "he leído"?',
        spanishOptions: ['Pretérito Imperfecto', 'Pretérito Indefinido', 'Presente de Indicativo', 'Pretérito Perfecto'],
        spanishExplanation: '"he leído" es el Pretérito Perfecto (verbo auxiliar "haber" en presente "he" + participio de "leer" que es "leído").'
      }
    ]
  },
  {
    id: 'q2',
    title: 'Վիկտորինա։ Pretérito Imperfecto',
    tenseCode: 'imperfecto',
    questions: [
      {
        question: 'Ինչպիսի՞ն էր Լուսիան, երբ փոքր էր։',
        options: ['Ակտիվ և աղմկոտ', 'Հանգիստ և մի քիչ ամաչկոտ', 'Չարաճճի և ուրախ', 'Լուրջ և տխուր'],
        correctIndex: 1,
        explanation: 'Լուսիան ասում է. «Era tranquila y un poco tímida» (Ես հանգիստ էի և մի քիչ ամաչկոտ):',
        spanishQuestion: '¿Cómo era Lucía cuando era pequeña?',
        spanishOptions: ['Activa y ruidosa', 'Tranquila y un poco tímida', 'Traviesa y alegre', 'Seria y triste'],
        spanishExplanation: 'Lucía dice: "Era tranquila y un poco tímida".'
      },
      {
        question: 'Որտե՞ղ էր ապրում Լուսիան փոքր ժամանակ։',
        options: ['Մեծ քաղաքում', 'Փոքր գյուղում', 'Ծովափին', 'Երևանում'],
        correctIndex: 1,
        explanation: 'Լուսիան պատասխանում է. «Vivía en un pueblo pequeño» (Ապրում էի մի փոքր գյուղում): «Vivía»-ն vivir բայի Imperfecto-ն է:',
        spanishQuestion: '¿Dónde vivía Lucía cuando era pequeña?',
        spanishOptions: ['En una gran ciudad', 'En un pueblo pequeño', 'En la playa', 'En Ereván'],
        spanishExplanation: 'Lucía responde: "Vivía en un pueblo pequeño". "Vivía" es el Imperfecto del verbo vivir.'
      },
      {
        question: 'Ի՞նչ էր անում Լուսիան կեսօրից հետո։',
        options: ['Տնայիններն էր անում և հեռուստացույց դիտում', 'Խաղում էր այգում և գրքեր կարդում', 'Օգնում էր մայրիկին և նկարում', 'Լողում էր գետում'],
        correctIndex: 1,
        explanation: 'Լուսիան պատասխանում է. «Jugaba en el parque y leía libros» (Խաղում էի այգում և գրքեր էի կարդում):',
        spanishQuestion: '¿Qué hacía Lucía por la tarde?',
        spanishOptions: ['Hacía los deberes y veía la tele', 'Jugaba en el parque y leía libros', 'Ayudaba a su madre y dibujaba', 'Nadaba en el río'],
        spanishExplanation: 'Lucía responde: "Jugaba en el parque y leía libros".'
      },
      {
        question: 'Ի՞նչ էր անում Կառլոսը փոքր ժամանակ։',
        options: ['Նույնպես շատ էր խաղում', 'Շատ էր սովորում', 'Ճամփորդում էր', 'Գրքեր էր կարդում'],
        correctIndex: 0,
        explanation: 'Կառլոսն ասում է. «Yo también jugaba mucho» (Ես էլ էի շատ խաղում): «Jugaba»-ն jugar բայի Imperfecto ձևն է:',
        spanishQuestion: '¿Qué hacía Carlos cuando era pequeño?',
        spanishOptions: ['También jugaba mucho', 'Estudiaba mucho', 'Viajaba', 'Leía libros'],
        spanishExplanation: 'Carlos dice: "Yo también jugaba mucho". "Jugaba" es el Imperfecto del verbo jugar.'
      },
      {
        question: 'Ըստ Լուսիայի՝ առաջ նրանք ի՞նչ ունեին ավելի շատ։',
        options: ['Խաղալիքներ', 'Ազատ ժամանակ', 'Ընկերներ', 'Գրքեր'],
        correctIndex: 1,
        explanation: 'Լուսիան ասում է. «Sí, antes teníamos más tiempo libre» (Այո, առաջ մենք ավելի շատ ազատ ժամանակ ունեինք):',
        spanishQuestion: 'Según Lucía, ¿qué tenían más antes?',
        spanishOptions: ['Juguetes', 'Tiempo libre', 'Amigos', 'Libros'],
        spanishExplanation: 'Lucía dice: "Sí, antes teníamos más tiempo libre".'
      },
      {
        question: 'Ո՞րն է «vivía» բայի անորոշ ձևը (infinitivo)։',
        options: ['Vivir', 'Viajar', 'Ver', 'Volver'],
        correctIndex: 0,
        explanation: '«vivía»-ն առաջացել է Vivir (ապրել) բայից՝ երրորդ խմբի (-ir-ով վերջացող) կանոնավոր բայ:',
        spanishQuestion: '¿Cuál es el infinitivo del verbo "vivía"?',
        spanishOptions: ['Vivir', 'Viajar', 'Ver', 'Volver'],
        spanishExplanation: '"vivía" proviene del verbo vivir (vivir) - verbo regular del tercer grupo terminado en -ir.'
      }
    ]
  },
  {
    id: 'q3',
    title: 'Վիկտորինա։ Pretérito Indefinido',
    tenseCode: 'indefinido',
    questions: [
      {
        question: 'Ո՞ւր գնաց Լուսիան երեկ և ում հետ։',
        options: ['Դպրոց՝ Կառլոսի հետ', 'Այգի՝ Անայի հետ', 'Սրճարան՝ ընկերուհիների հետ', 'Կինոթատրոն՝ եղբոր հետ'],
        correctIndex: 1,
        explanation: 'Լուսիան ասում է. «Ayer fui al parque con Ana» (Երեկ Անայի հետ գնացի այգի): «Fui»-ն ir (գնալ) բայի Indefinido ձևն է:',
        spanishQuestion: '¿A dónde fue Lucía ayer y con quién?',
        spanishOptions: ['Al colegio con Carlos', 'Al parque con Ana', 'A la cafetería con sus amigas', 'Al cine con su hermano'],
        spanishExplanation: 'Lucía dice: "Ayer fui al parque con Ana". "Fui" es la forma de Indefinido del verbo ir.'
      },
      {
        question: 'Ի՞նչ արեց Լուսիան այգում։',
        options: ['Հեծանիվ քշեց և նկարեց', 'Քայլեց, խոսեց Անայի հետ և պաղպաղակ կերավ', 'Գիրք կարդաց և ննջեց', 'Ֆուտբոլ խաղաց'],
        correctIndex: 1,
        explanation: 'Լուսիան ասում է. «Caminé un poco, hablé con Ana y comí un helado» (Մի քիչ քայլեցի, խոսեցի Անայի հետ և պաղպաղակ կերա):',
        spanishQuestion: '¿Qué hizo Lucía en el parque?',
        spanishOptions: ['Montó en bicicleta y dibujó', 'Caminó un poco, habló con Ana y comió un helado', 'Leyó un libro y durmió', 'Jugó al fútbol'],
        spanishExplanation: 'Lucía dice: "Caminé un poco, hablé con Ana y comí un helado".'
      },
      {
        question: 'Որտե՞ղ մնաց Կառլոսը երեկ։',
        options: ['Դպրոցում', 'Գրադարանում', 'Տանը', 'Այգում'],
        correctIndex: 2,
        explanation: 'Կառլոսն ասում է. «Yo me quedé en casa» (Ես մնացի տանը): «Quedarse» բայի անդրադարձ խոնարհումն անցյալում:',
        spanishQuestion: '¿Dónde se quedó Carlos ayer?',
        spanishOptions: ['En el colegio', 'En la biblioteca', 'En casa', 'En el parque'],
        spanishExplanation: 'Carlos dice: "Yo me quedé en casa". Uso reflexivo del verbo "quedarse" en pasado.'
      },
      {
        question: 'Ի՞նչ առարկա սովորեց Կառլոսը երեկ։',
        options: ['Մաթեմատիկա', 'Անգլերեն', 'Իսպաներեն', 'Պատմություն'],
        correctIndex: 2,
        explanation: 'Կառլոսն ասում է. «Sí, estudié español...» (Այո, իսպաներեն սովորեցի...): «Estudié»-ն estudiar բայի Indefinido առաջին դեմքն է:',
        spanishQuestion: '¿Qué asignatura estudió Carlos ayer?',
        spanishOptions: ['Matemáticas', 'Inglés', 'Español', 'Historia'],
        spanishExplanation: 'Carlos dice: "Sí, estudié español...". "Estudié" es la primera persona del Indefinido del verbo estudiar.'
      },
      {
        question: 'Ի՞նչ արեց Կառլոսը սովորելուց հետո։',
        options: ['Գնաց քնելու', 'Ֆիլմ դիտեց', 'Խաղաց այգում', 'Գնաց սրճարան'],
        correctIndex: 1,
        explanation: 'Կառլոսն ասում է. «...y después vi una película» (...և հետո ֆիլմ դիտեցի): «Vi»-ն ver (տեսնել, դիտել) բայի Indefinido ձևն է:',
        spanishQuestion: '¿Qué hizo Carlos después de estudiar?',
        spanishOptions: ['Se fue a dormir', 'Vio una película', 'Jugó en el parque', 'Fue a la cafetería'],
        spanishExplanation: 'Carlos dice: "...y después vi una película". "Vi" es la forma de Indefinido del verbo ver.'
      },
      {
        question: 'Ո՞ր բայական ժամանակով է խոնարհված «fui» բայը այս տեքստում։',
        options: ['Pretérito Imperfecto (ser/ir)', 'Pretérito Perfecto (ir)', 'Presente de Indicativo (ser)', 'Pretérito Indefinido (ser/ir)'],
        correctIndex: 3,
        explanation: '«fui»-ն և՛ ir, և՛ ser բայերի Pretérito Indefinido-ն է: Այստեղ, քանի որ կա «al parque» (դեպի այգի), այն նշանակում է «գնացի» (ir):',
        spanishQuestion: '¿En qué tiempo verbal está conjugado el verbo "fui" en este texto?',
        spanishOptions: ['Pretérito Imperfecto (ser/ir)', 'Pretérito Perfecto (ir)', 'Presente de Indicativo (ser)', 'Pretérito Indefinido (ser/ir)'],
        spanishExplanation: '"fui" es el Pretérito Indefinido de los verbos ir y ser. Aquí, debido a "al parque", significa "fui" (ir).'
      }
    ]
  }
];

export const grammarCheatSheet = {
  perfecto: {
    title: 'Pretérito Perfecto',
    usecase: 'Անցյալում կատարված գործողություն, որն իրականացել է ներկայի հետ կապ ունեցող ժամանակում (այսօր, այս շաբաթ, վերջերս):',
    marker: 'Hoy (այսօր), Esta mañana (այս առավոտ), Este año (այս տարի), Ya (արդեն), Todavía no (դեռ ոչ):',
    formula: 'Haber (ներկա) + Participio (Դերբայ)',
    conjugationHaber: ['yo he', 'tú has', 'él/ella ha', 'nosotros hemos', 'vosotros habéis', 'ellos/ellas han'],
    participioRegular: ['-AR -> -ado (hablar -> hablado)', '-ER/IR -> -ido (comer -> comido, vivir -> vivido)'],
    irregular: 'hecho (hacer), escrito (escribir), visto (ver), abierto (abrir), vuelto (volver), dicho (decir)'
  },
  imperfecto: {
    title: 'Pretérito Imperfecto',
    usecase: 'Անցյալում սովորական կամ կրկնվող գործողությունների նկարագրություն, նաև անցյալի ֆոն, վիճակ, եղանակ, տարիք կամ արտաքին նկարագրություն:',
    marker: 'Antes (առաջ), De pequeño / pequeño (փոքր ժամանակ), Siempre (միշտ), A menudo (հաճախ), Todos los días (ամեն օր):',
    formula: 'Բայի հիմք + Imperfecto վերջավորություն',
    conjugationAr: ['-aba (yo hablaba)', '-abas (tú hablabas)', '-aba (él hablaba)', '-ábamos (nosotros hablábamos)', '-abais (vosotros hablabais)', '-aban (ellos hablaban)'],
    conjugationErIr: ['-ía (yo comía/vivía)', '-ías (tú comías)', '-ía (él comía)', '-íamos (nosotros comíamos)', '-íais (vosotros comíais)', '-ían (ellos comían)'],
    irregular: 'ser (era, eras, era...), ir (iba, ibas... ), ver (veía, veías...)'
  },
  indefinido: {
    title: 'Pretérito Indefinido',
    usecase: 'Անցյալում կոնկրետ ժամանակում կատարված և ավարտված գործողություն, որը կապ չունի ներկայի հետ:',
    marker: 'Ayer (երեկ), Anoche (երեկ գիշեր), El año pasado (անցյալ տարի), Hace dos días (երկու օր առաջ), En 2018 (2018 թ.):',
    formula: 'Բայի հիմք + Indefinido վերջավորություն',
    conjugationAr: ['-é (yo hablé)', '-aste (tú hablaste)', '-ó (él habló)', '-amos (nosotros hablamos)', '-asteis (vosotros hablasteis)', '-aron (ellos hablaron)'],
    conjugationErIr: ['-í (yo comí)', '-iste (tú comiste)', '-ió (él comió)', '-imos (nosotros comimos)', '-isteis (vosotros comisteis)', '-ieron (ellos comieron)'],
    irregular: 'fui (ir/ser), estuve (estar), tuve (tener), hice (hacer), quise (querer), pude (poder), vine (venir), puse (poner)'
  }
};
