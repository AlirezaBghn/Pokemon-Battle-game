import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      home: "Home",
      leaderboard: "Leaderboard",
      signOut: "Sign Out",
      pokemonBattle: "Pokémon Battle",
      back: "Back", // Add back button translation

      // Hero Section
      hero: {
        title: "Pokémon Battle Game",
        description:
          "Welcome to the ultimate Pokémon battle experience! Test your knowledge and battle skills against other trainers to become the very best.",
        button: "Get Started",
      },

      // Loading Screen
      loading: {
        message: "Loading page takes a little time. Please be patient.",
        seconds: "seconds",
        tips: {
          1: "Did you know? Pikachu was originally going to be a second evolution of another Pokémon!",
          2: "Fire-type moves are super effective against Grass, Bug, Ice, and Steel types.",
          3: "Water-type Pokémon are resistant to Fire, Water, Ice, and Steel moves.",
          4: "Grass-type moves are super effective against Water, Ground, and Rock types.",
          5: "Legendary Pokémon often have higher base stats than regular Pokémon.",
          6: "Eevee has the most possible evolutions of any Pokémon!",
        },
      },

      // HomePage
      welcomeTo: "Welcome to Card Battle",
      startGame: "Start Game",
      loading: "Loading...",
      loadingGame: "Loading game...",
      loadingLeaderboard: "Loading leaderboard...",
      loadingBattle: "Loading battle...",

      // Game Selection
      selectGame: "Select a Game",
      battleGame: "Battle Game",
      guessingGame: "Guessing Game",

      // BattleGame
      cardBattle: "Card Battle",
      player: "Player",
      userScore: "User Score",
      pcScore: "PC Score",
      yourCards: "Your Cards",
      pcCards: "PC Cards",
      noCardsLeft: "No cards left",
      youWinRound: "YOU WIN THIS ROUND!",
      pcWinsRound: "PC WINS THIS ROUND!",
      tieRound: "TIE ROUND!",
      congratulationsWon: "Congratulations, You Won! 🏆",
      pcWins: "PC Wins! 💻",
      itsATie: "It's a Tie! 🤝",
      playAgain: "Play Again",

      // GuessGame
      guessThePokemon: "Guess the Pokémon!",
      bestScore: "Best Score",
      score: "Score",
      wrong: "Wrong",
      hints: "Hints",
      noMoreHints: "No More Hints",
      getHint: "Get Hint",
      enterPokemonName: "Enter Pokémon name",
      submitGuess: "Submit Guess",
      correctPoints: "Correct! +10 points",
      wrongAnswer: "Wrong! The correct answer was {{pokemon}}. -10 points",
      gameOverLost: "Game Over! You lost. Click Try Again to restart.",
      congratsNewRecord: "Congratulations, You Won! 🏆",
      gameOverScore: "Game Over! 💔",
      tryAgain: "Play Again",

      // Smartachu AI
      smartachu: "Smartachu",
      pokemonAiBuddy: "Your Pokémon AI Buddy",
      askSmartachu: "Ask Smartachu about Pokémon...",
      thinking: "Thinking...",
      askSmartachuButton: "Ask Smartachu",
      smartachuSays: "Smartachu says:",
      askSmartachuExample: "Ask Smartachu about Pokémon!",
      exampleQuestion:
        'Example: "What type is effective against water Pokémon?"',
      aiDisclaimer:
        "Smartachu is an AI assistant and may occasionally provide incorrect information.",

      // Leaderboard
      leaderboardTitle: "🎖️ Leaderboard",
      battleGameLeaderboard: "Battle Game Leaderboard",
      noScoresYet: "No scores yet!",
      rank: "🏆 Rank",
      username: "👤 Username",
      scoreLeaderboard: "💯 Score",
      date: "📅 Date",
      scrollHorizontally: "Scroll horizontally to see all data",
      winner: "Winner",

      // Auth
      signIn: "Sign In",
      signUp: "Sign Up",
      email: "Email",
      password: "Password",
      enterEmail: "Enter your email",
      enterPassword: "Enter your password",
      confirmPassword: "Confirm Password",
      confirmYourPassword: "Confirm your password",
      dontHaveAccount: "Don't have an account?",
      signUpHere: "Sign up here",
      alreadyHaveAccount: "Already have an account?",
      signInHere: "Sign in here",
      usernameField: "Username",
      enterUsername: "Enter your username",
      passwordsDoNotMatch: "Passwords do not match",

      // 404 Error Page
      error: {
        pageNotFound: "Page Not Found",
        pageNotFoundMessage:
          "Oops! Looks like this page got lost in the tall grass. Maybe it's a wild MissingNo?",
        backToHome: "Return to Home",
        backToLanding: "Go to Landing Page",
      },
    },
  },
  de: {
    translation: {
      // Navigation
      home: "Startseite",
      leaderboard: "Bestenliste",
      signOut: "Abmelden",
      pokemonBattle: "Pokémon Kampf",
      back: "Zurück",

      // Hero Section
      hero: {
        title: "Pokémon Kampfspiel",
        description:
          "Willkommen zum ultimativen Pokémon-Kampferlebnis! Teste dein Wissen und deine Kampffähigkeiten gegen andere Trainer, um der Beste zu werden.",
        button: "Starten",
      },

      // Loading Screen
      loading: {
        message:
          "Das Laden der Seite dauert einen Moment. Bitte haben Sie Geduld.",
        seconds: "Sekunden",
        tips: {
          1: "Wusstest du? Pikachu sollte ursprünglich eine Weiterentwicklung eines anderen Pokémon sein!",
          2: "Feuer-Attacken sind sehr effektiv gegen Pflanzen-, Käfer-, Eis- und Stahl-Pokémon.",
          3: "Wasser-Pokémon sind resistent gegen Feuer-, Wasser-, Eis- und Stahl-Attacken.",
          4: "Pflanzen-Attacken sind sehr effektiv gegen Wasser-, Boden- und Gesteins-Pokémon.",
          5: "Legendäre Pokémon haben oft höhere Basiswerte als normale Pokémon.",
          6: "Evoli hat die meisten möglichen Entwicklungen aller Pokémon!",
        },
      },

      // HomePage
      welcomeTo: "Willkommen beim Kartenkampf",
      startGame: "Spiel starten",
      loading: "Wird geladen...",
      loadingGame: "Spiel wird geladen...",
      loadingLeaderboard: "Bestenliste wird geladen...",
      loadingBattle: "Kampf wird geladen...",

      // Game Selection
      selectGame: "Wähle ein Spiel",
      battleGame: "Kartenspiel",
      guessingGame: "Ratespiel",

      // BattleGame
      cardBattle: "Kartenkampf",
      player: "Spieler",
      userScore: "Spieler Punkte",
      pcScore: "PC Punkte",
      yourCards: "Deine Karten",
      pcCards: "PC Karten",
      noCardsLeft: "Keine Karten übrig",
      youWinRound: "DU GEWINNST DIESE RUNDE!",
      pcWinsRound: "PC GEWINNT DIESE RUNDE!",
      tieRound: "UNENTSCHIEDEN!",
      congratulationsWon: "Glückwunsch, Du hast gewonnen! 🏆",
      pcWins: "PC gewinnt! 💻",
      itsATie: "Unentschieden! 🤝",
      playAgain: "Nochmal spielen",

      // GuessGame
      guessThePokemon: "Rate das Pokémon!",
      bestScore: "Beste Punktzahl",
      score: "Punkte",
      wrong: "Falsch",
      hints: "Hinweise",
      noMoreHints: "Keine Hinweise mehr",
      getHint: "Hinweis bekommen",
      enterPokemonName: "Pokémon-Name eingeben",
      submitGuess: "Raten",
      correctPoints: "Richtig! +10 Punkte",
      wrongAnswer: "Falsch! Die richtige Antwort war {{pokemon}}. -10 Punkte",
      gameOverLost:
        "Spiel vorbei! Du hast verloren. Klicke auf Nochmal spielen.",
      congratsNewRecord: "Glückwunsch, Du hast gewonnen! 🏆",
      gameOverScore: "Spiel vorbei! 💔",
      tryAgain: "Nochmal spielen",

      // Smartachu AI
      smartachu: "Smartachu",
      pokemonAiBuddy: "Dein Pokémon KI-Freund",
      askSmartachu: "Frage Smartachu über Pokémon...",
      thinking: "Überlegt...",
      askSmartachuButton: "Smartachu fragen",
      smartachuSays: "Smartachu sagt:",
      askSmartachuExample: "Frage Smartachu über Pokémon!",
      exampleQuestion:
        'Beispiel: "Welcher Typ ist effektiv gegen Wasser-Pokémon?"',
      aiDisclaimer:
        "Smartachu ist ein KI-Assistent und kann gelegentlich falsche Informationen liefern.",

      // Leaderboard
      leaderboardTitle: "🎖️ Bestenliste",
      battleGameLeaderboard: "Kartenspiel Bestenliste",
      noScoresYet: "Noch keine Punkte!",
      rank: "🏆 Rang",
      username: "👤 Benutzername",
      scoreLeaderboard: "💯 Punkte",
      date: "📅 Datum",
      scrollHorizontally: "Horizontal scrollen um alle Daten zu sehen",
      winner: "Gewinner",

      // Auth
      signIn: "Anmelden",
      signUp: "Registrieren",
      email: "E-Mail",
      password: "Passwort",
      enterEmail: "E-Mail eingeben",
      enterPassword: "Passwort eingeben",
      confirmPassword: "Passwort bestätigen",
      confirmYourPassword: "Bestätige dein Passwort",
      dontHaveAccount: "Noch kein Konto?",
      signUpHere: "Hier registrieren",
      alreadyHaveAccount: "Bereits ein Konto?",
      signInHere: "Hier anmelden",
      usernameField: "Benutzername",
      enterUsername: "Benutzernamen eingeben",
      passwordsDoNotMatch: "Passwörter stimmen nicht überein",

      // 404 Error Page
      error: {
        pageNotFound: "Seite nicht gefunden",
        pageNotFoundMessage:
          "Hoppla! Diese Seite hat sich im hohen Gras verlaufen. Vielleicht ist es ein wildes Missingno?",
        backToHome: "Zurück zur Startseite",
        backToLanding: "Zur Landingpage",
      },
    },
  },
  es: {
    translation: {
      // Navigation
      home: "Inicio",
      leaderboard: "Clasificación",
      signOut: "Cerrar Sesión",
      pokemonBattle: "Batalla Pokémon",
      back: "Atrás",

      // Hero Section
      hero: {
        title: "Juego de Batalla Pokémon",
        description:
          "¡Bienvenido a la experiencia definitiva de batallas Pokémon! Pon a prueba tus conocimientos y habilidades de batalla contra otros entrenadores para convertirte en el mejor.",
        button: "Comenzar",
      },

      // Loading Screen
      loading: {
        message:
          "La carga de la página lleva un poco de tiempo. Por favor, ten paciencia.",
        seconds: "segundos",
        tips: {
          1: "¿Sabías que? ¡Pikachu iba a ser originalmente una segunda evolución de otro Pokémon!",
          2: "Los movimientos de tipo Fuego son muy efectivos contra los tipos Planta, Bicho, Hielo y Acero.",
          3: "Los Pokémon de tipo Agua son resistentes a los movimientos de Fuego, Agua, Hielo y Acero.",
          4: "Los movimientos de tipo Planta son muy efectivos contra los tipos Agua, Tierra y Roca.",
          5: "Los Pokémon legendarios suelen tener estadísticas base más altas que los Pokémon comunes.",
          6: "¡Eevee tiene la mayor cantidad de evoluciones posibles de cualquier Pokémon!",
        },
      },

      // HomePage
      welcomeTo: "Bienvenido a Batalla de Cartas",
      startGame: "Iniciar Juego",
      loading: "Cargando...",
      loadingGame: "Cargando juego...",
      loadingLeaderboard: "Cargando clasificación...",
      loadingBattle: "Cargando batalla...",

      // Game Selection
      selectGame: "Selecciona un Juego",
      battleGame: "Juego de Batalla",
      guessingGame: "Juego de Adivinanza",

      // BattleGame
      cardBattle: "Batalla de Cartas",
      player: "Jugador",
      userScore: "Puntos del Jugador",
      pcScore: "Puntos de la PC",
      yourCards: "Tus Cartas",
      pcCards: "Cartas de la PC",
      noCardsLeft: "No quedan cartas",
      youWinRound: "¡GANASTE ESTA RONDA!",
      pcWinsRound: "¡PC GANA ESTA RONDA!",
      tieRound: "¡EMPATE!",
      congratulationsWon: "¡Felicidades, Has Ganado! 🏆",
      pcWins: "¡PC Gana! 💻",
      itsATie: "¡Es un Empate! 🤝",
      playAgain: "Jugar de Nuevo",

      // GuessGame
      guessThePokemon: "¡Adivina el Pokémon!",
      bestScore: "Mejor Puntaje",
      score: "Puntos",
      wrong: "Incorrecto",
      hints: "Pistas",
      noMoreHints: "No hay más pistas",
      getHint: "Obtener Pista",
      enterPokemonName: "Ingresa el nombre del Pokémon",
      submitGuess: "Enviar Respuesta",
      correctPoints: "¡Correcto! +10 puntos",
      wrongAnswer:
        "¡Incorrecto! La respuesta correcta era {{pokemon}}. -10 puntos",
      gameOverLost:
        "¡Juego terminado! Has perdido. Haz clic en Jugar de nuevo para reiniciar.",
      congratsNewRecord: "¡Felicidades, Has Ganado! 🏆",
      gameOverScore: "¡Juego Terminado! 💔",
      tryAgain: "Jugar de Nuevo",

      // Smartachu AI
      smartachu: "Smartachu",
      pokemonAiBuddy: "Tu Asistente de IA Pokémon",
      askSmartachu: "Pregunta a Smartachu sobre Pokémon...",
      thinking: "Pensando...",
      askSmartachuButton: "Preguntar a Smartachu",
      smartachuSays: "Smartachu dice:",
      askSmartachuExample: "¡Pregunta a Smartachu sobre Pokémon!",
      exampleQuestion:
        'Ejemplo: "¿Qué tipo es efectivo contra Pokémon de agua?"',
      aiDisclaimer:
        "Smartachu es un asistente de IA y ocasionalmente puede proporcionar información incorrecta.",

      // Leaderboard
      leaderboardTitle: "🎖️ Clasificación",
      battleGameLeaderboard: "Clasificación del Juego de Batalla",
      noScoresYet: "¡Aún no hay puntajes!",
      rank: "🏆 Rango",
      username: "👤 Usuario",
      scoreLeaderboard: "💯 Puntos",
      date: "📅 Fecha",
      scrollHorizontally: "Desplázate horizontalmente para ver todos los datos",
      winner: "Ganador",

      // Auth
      signIn: "Iniciar Sesión",
      signUp: "Registrarse",
      email: "Correo Electrónico",
      password: "Contraseña",
      enterEmail: "Ingresa tu correo electrónico",
      enterPassword: "Ingresa tu contraseña",
      confirmPassword: "Confirmar Contraseña",
      confirmYourPassword: "Confirma tu contraseña",
      dontHaveAccount: "¿No tienes una cuenta?",
      signUpHere: "Regístrate aquí",
      alreadyHaveAccount: "¿Ya tienes una cuenta?",
      signInHere: "Inicia sesión aquí",
      usernameField: "Nombre de Usuario",
      enterUsername: "Ingresa tu nombre de usuario",
      passwordsDoNotMatch: "Las contraseñas no coinciden",

      // 404 Error Page
      error: {
        pageNotFound: "Página no encontrada",
        pageNotFoundMessage:
          "¡Ups! Parece que esta página se perdió en la hierba alta. ¿Tal vez sea un MissingNo salvaje?",
        backToHome: "Volver al inicio",
        backToLanding: "Ir a la página de inicio",
      },
    },
  },
  ar: {
    translation: {
      // Navigation
      home: "الرئيسية",
      leaderboard: "المتصدرين",
      signOut: "تسجيل الخروج",
      pokemonBattle: "معركة بوكيمون",
      back: "عودة",

      // Hero Section
      hero: {
        title: "لعبة معركة بوكيمون",
        description:
          "مرحبًا بك في تجربة معارك بوكيمون النهائية! اختبر معرفتك ومهارات القتال ضد المدربين الآخرين لتصبح الأفضل.",
        button: "ابدأ الآن",
      },

      // Loading Screen
      loading: {
        message: "تحميل الصفحة يستغرق بعض الوقت. يرجى التحلي بالصبر.",
        seconds: "ثوان",
        tips: {
          1: "هل تعلم؟ كان من المفترض أن يكون بيكاتشو في الأصل تطورًا ثانيًا لبوكيمون آخر!",
          2: "هجمات النار فعالة للغاية ضد بوكيمون العشب والحشرات والجليد والفولاذ.",
          3: "بوكيمون الماء مقاوم لهجمات النار والماء والجليد والفولاذ.",
          4: "هجمات العشب فعالة للغاية ضد بوكيمون الماء والأرض والصخور.",
          5: "بوكيمون الأسطوري غالبًا ما يكون لديه إحصائيات أساسية أعلى من بوكيمون العادي.",
          6: "إيفي لديه أكبر عدد ممكن من التطورات من بين جميع البوكيمون!",
        },
      },

      // HomePage
      welcomeTo: "مرحبًا بك في معركة البطاقات",
      startGame: "ابدأ اللعبة",
      loading: "جاري التحميل...",
      loadingGame: "جاري تحميل اللعبة...",
      loadingLeaderboard: "جاري تحميل المتصدرين...",
      loadingBattle: "جاري تحميل المعركة...",

      // Game Selection
      selectGame: "اختر لعبة",
      battleGame: "لعبة المعركة",
      guessingGame: "لعبة التخمين",

      // BattleGame
      cardBattle: "معركة البطاقات",
      player: "اللاعب",
      userScore: "نقاط اللاعب",
      pcScore: "نقاط الكمبيوتر",
      yourCards: "بطاقاتك",
      pcCards: "بطاقات الكمبيوتر",
      noCardsLeft: "لا توجد بطاقات متبقية",
      youWinRound: "أنت تفوز بهذه الجولة!",
      pcWinsRound: "الكمبيوتر يفوز بهذه الجولة!",
      tieRound: "تعادل في الجولة!",
      congratulationsWon: "تهانينا، لقد فزت! 🏆",
      pcWins: "الكمبيوتر فاز! 💻",
      itsATie: "إنه تعادل! 🤝",
      playAgain: "العب مرة أخرى",

      // GuessGame
      guessThePokemon: "خمن البوكيمون!",
      bestScore: "أفضل نتيجة",
      score: "النتيجة",
      wrong: "خطأ",
      hints: "تلميحات",
      noMoreHints: "لا مزيد من التلميحات",
      getHint: "احصل على تلميح",
      enterPokemonName: "أدخل اسم البوكيمون",
      submitGuess: "أرسل التخمين",
      correctPoints: "صحيح! +10 نقاط",
      wrongAnswer: "خطأ! الإجابة الصحيحة كانت {{pokemon}}. -10 نقاط",
      gameOverLost:
        "انتهت اللعبة! لقد خسرت. انقر على اللعب مرة أخرى لإعادة البدء.",
      congratsNewRecord: "تهانينا، لقد فزت! 🏆",
      gameOverScore: "انتهت اللعبة! 💔",
      tryAgain: "حاول مرة أخرى",

      // Smartachu AI
      smartachu: "سمارتاشو",
      pokemonAiBuddy: "مساعد الذكاء الاصطناعي الخاص بك للبوكيمون",
      askSmartachu: "اسأل سمارتاشو عن البوكيمون...",
      thinking: "يفكر...",
      askSmartachuButton: "اسأل سمارتاشو",
      smartachuSays: "يقول سمارتاشو:",
      askSmartachuExample: "اسأل سمارتاشو عن البوكيمون!",
      exampleQuestion: 'مثال: "ما هو النوع الفعال ضد بوكيمون الماء؟"',
      aiDisclaimer:
        "سمارتاشو هو مساعد ذكاء اصطناعي وقد يقدم معلومات غير متطابقة أحيانًا.",

      // Leaderboard
      leaderboardTitle: "🎖️ المتصدرين",
      battleGameLeaderboard: "متصدرو لعبة المعركة",
      noScoresYet: "لا توجد نقاط بعد!",
      rank: "🏆 المرتبة",
      username: "👤 اسم المستخدم",
      scoreLeaderboard: "💯 النقاط",
      date: "📅 التاريخ",
      scrollHorizontally: "مرر أفقيًا لرؤية جميع البيانات",
      winner: "الفائز",

      // Auth
      signIn: "تسجيل الدخول",
      signUp: "إنشاء حساب",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      enterEmail: "أدخل بريدك الإلكتروني",
      enterPassword: "أدخل كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      confirmYourPassword: "قم بتأكيد كلمة المرور",
      dontHaveAccount: "ليس لديك حساب؟",
      signUpHere: "سجل هنا",
      alreadyHaveAccount: "لديك حساب بالفعل؟",
      signInHere: "سجل الدخول هنا",
      usernameField: "اسم المستخدم",
      enterUsername: "أدخل اسم المستخدم",
      passwordsDoNotMatch: "كلمات المرور غير متطابقة",

      // 404 Error Page
      error: {
        pageNotFound: "الصفحة غير موجودة",
        pageNotFoundMessage:
          "عفواً! يبدو أن هذه الصفحة ضاعت في العشب الطويل. ربما هي بوكيمون MissingNo؟",
        backToHome: "العودة إلى الصفحة الرئيسية",
        backToLanding: "الذهاب إلى صفحة البداية",
      },
    },
  },
  fa: {
    translation: {
      // Navigation
      home: "خانه",
      leaderboard: "جدول امتیازات",
      signOut: "خروج",
      pokemonBattle: "نبرد پوکمون",
      back: "بازگشت",

      // Hero Section
      hero: {
        title: "بازی نبرد پوکمون",
        description:
          "به تجربه نهایی نبرد پوکمون خوش آمدید! دانش و مهارت‌های نبرد خود را در برابر مربیان دیگر آزمایش کنید تا بهترین شوید.",
        button: "شروع کنید",
      },

      // Loading Screen
      loading: {
        message: "بارگذاری صفحه کمی زمان می‌برد. لطفا صبور باشید.",
        seconds: "ثانیه",
        tips: {
          1: "آیا می‌دانستید؟ پیکاچو در اصل قرار بود تکامل دوم پوکمون دیگری باشد!",
          2: "حرکات نوع آتش در برابر پوکمون‌های گیاهی، حشره، یخی و فولادی بسیار موثر هستند.",
          3: "پوکمون‌های آبی در برابر حرکات آتش، آب، یخ و فولاد مقاوم هستند.",
          4: "حرکات نوع گیاهی در برابر پوکمون‌های آبی، زمینی و سنگی بسیار موثر هستند.",
          5: "پوکمون‌های افسانه‌ای معمولاً آمار پایه بالاتری نسبت به پوکمون‌های معمولی دارند.",
          6: "ایوی بیشترین تعداد تکامل ممکن را در میان تمام پوکمون‌ها دارد!",
        },
      },

      // HomePage
      welcomeTo: "به نبرد کارتی خوش آمدید",
      startGame: "شروع بازی",
      loading: "در حال بارگذاری...",
      loadingGame: "در حال بارگذاری بازی...",
      loadingLeaderboard: "در حال بارگذاری جدول امتیازات...",
      loadingBattle: "در حال بارگذاری نبرد...",

      // Game Selection
      selectGame: "یک بازی را انتخاب کنید",
      battleGame: "بازی نبرد",
      guessingGame: "بازی حدس زدن",

      // BattleGame
      cardBattle: "نبرد کارتی",
      player: "بازیکن",
      userScore: "امتیاز بازیکن",
      pcScore: "امتیاز کامپیوتر",
      yourCards: "کارت‌های شما",
      pcCards: "کارت‌های کامپیوتر",
      noCardsLeft: "کارتی باقی نمانده است",
      youWinRound: "شما این دور را بردید!",
      pcWinsRound: "کامپیوتر این دور را برد!",
      tieRound: "این دور مساوی شد!",
      congratulationsWon: "تبریک، شما برنده شدید! 🏆",
      pcWins: "کامپیوتر برنده شد! 💻",
      itsATie: "بازی مساوی شد! 🤝",
      playAgain: "بازی دوباره",

      // GuessGame
      guessThePokemon: "پوکمون را حدس بزنید!",
      bestScore: "بهترین امتیاز",
      score: "امتیاز",
      wrong: "اشتباه",
      hints: "راهنمایی‌ها",
      noMoreHints: "راهنمایی بیشتری وجود ندارد",
      getHint: "دریافت راهنمایی",
      enterPokemonName: "نام پوکمون را وارد کنید",
      submitGuess: "ثبت حدس",
      correctPoints: "درست! +10 امتیاز",
      wrongAnswer: "اشتباه! پاسخ صحیح {{pokemon}} بود. -10 امتیاز",
      gameOverLost:
        "بازی تمام شد! شما باختید. برای شروع دوباره روی بازی مجدد کلیک کنید.",
      congratsNewRecord: "تبریک، شما برنده شدید! 🏆",
      gameOverScore: "بازی تمام شد! 💔",
      tryAgain: "تلاش مجدد",

      // Smartachu AI
      smartachu: "اسمارتاچو",
      pokemonAiBuddy: "دستیار هوش مصنوعی پوکمون شما",
      askSmartachu: "از اسمارتاچو درباره پوکمون بپرسید...",
      thinking: "در حال فکر کردن...",
      askSmartachuButton: "از اسمارتاچو بپرسید",
      smartachuSays: "اسمارتاچو می‌گوید:",
      askSmartachuExample: "از اسمارتاچو درباره پوکمون بپرسید!",
      exampleQuestion: 'مثال: "چه نوعی در برابر پوکمون‌های آبی مؤثر است؟"',
      aiDisclaimer:
        "اسمارتاچو یک دستیار هوش مصنوعی است و ممکن است گاهی اطلاعات نادرست ارائه دهد.",

      // Leaderboard
      leaderboardTitle: "🎖️ جدول امتیازات",
      battleGameLeaderboard: "جدول امتیازات بازی نبرد",
      noScoresYet: "هنوز امتیازی ثبت نشده است!",
      rank: "🏆 رتبه",
      username: "👤 نام کاربری",
      scoreLeaderboard: "💯 امتیاز",
      date: "📅 تاریخ",
      scrollHorizontally: "برای مشاهده تمام اطلاعات به صورت افقی اسکرول کنید",
      winner: "برنده",

      // Auth
      signIn: "ورود",
      signUp: "ثبت‌نام",
      email: "ایمیل",
      password: "رمز عبور",
      enterEmail: "ایمیل خود را وارد کنید",
      enterPassword: "رمز عبور خود را وارد کنید",
      confirmPassword: "تأیید رمز عبور",
      confirmYourPassword: "رمز عبور خود را تأیید کنید",
      dontHaveAccount: "حساب کاربری ندارید؟",
      signUpHere: "اینجا ثبت‌نام کنید",
      alreadyHaveAccount: "قبلاً حساب کاربری دارید؟",
      signInHere: "اینجا وارد شوید",
      usernameField: "نام کاربری",
      enterUsername: "نام کاربری خود را وارد کنید",
      passwordsDoNotMatch: "رمزهای عبور مطابقت ندارند",

      // 404 Error Page
      error: {
        pageNotFound: "صفحه پیدا نشد",
        pageNotFoundMessage:
          "اوه! به نظر می‌رسد این صفحه در علف‌های بلند گم شده است. شاید یک MissingNo وحشی است؟",
        backToHome: "بازگشت به خانه",
        backToLanding: "رفتن به صفحه اصلی",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    react: {
      useSuspense: false, // This helps ensure translations are available immediately
    },
  });

export default i18n;
