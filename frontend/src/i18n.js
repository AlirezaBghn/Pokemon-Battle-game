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
    },
  },
  de: {
    translation: {
      // Navigation
      home: "Startseite",
      leaderboard: "Bestenliste",
      signOut: "Abmelden",
      pokemonBattle: "Pokémon Kampf",
      back: "Zurück", // Add back button translation

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
    },
  },
  es: {
    translation: {
      // Navigation
      home: "Inicio",
      leaderboard: "Clasificación",
      signOut: "Cerrar Sesión",
      pokemonBattle: "Batalla Pokémon",
      back: "Atrás", // Add back button translation

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
    },
  },
  ar: {
    translation: {
      // Navigation
      home: "الرئيسية",
      leaderboard: "المتصدرين",
      signOut: "تسجيل الخروج",
      pokemonBattle: "معركة بوكيمون",
      back: "عودة", // Add back button translation

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
    },
  },
  fa: {
    translation: {
      // Navigation
      home: "خانه",
      leaderboard: "جدول امتیازات",
      signOut: "خروج",
      pokemonBattle: "نبرد پوکمون",
      back: "بازگشت", // Add back button translation

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
  });

export default i18n;
