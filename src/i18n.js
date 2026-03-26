import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// translations
const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      login: "Login",
      logout: "Logout",
      Email: "Email",
      Password: "Password",
      Confirm_Password: "Confirm Password",
      enterPassword: "Please enter your password",
      enterEmail: "Please enter your email",
            Logging_in: "Logging in...",
        Dontyouhaveanaccount: "Don't you have an account?",
        Register: "Register",
        Username: "Username",
        Alreadyhaveanaccount: "Already have an account?",
        guidebuddyExploreDestinationText:"Discover amazing destinations and share your travel stories with fellow tourist guiders",
        guidebuddyshareTravelStoryText:"Share your unique travel experiences and inspire others with your stories on GuideBuddy",
        guidebuddyPlanyourjourneyText:"Plan your journey with personalized recommendations and expert tips from our tourist guiders", 
        sidebar:{
            home: "Home",
            customerList: "Customer List",
            travelRecommendations: "Travel Recommendations",
            customerRegister: "Customer Register",
            supportBuddy: "Support Buddy",
            settings: "Settings",
        },
        travelRecommendationsbotText:"Hello! I'm your travel assistant. Where would you like to explore today?" ,
        customerRegisterbotText:"Hello! I'm your customer registration agent. I can help you register customers. How can I assist you today?",
        tripPlannerbottext:"Hello! I'm your trip planner. I can help you plan your trip and provide travel recommendations. How can I assist you today?",
        askAnything: "Ask me anything about your trip!",
        budget_alerts: {
    too_low_title: "Budget too low",
    too_low_text: "Please enter a budget of 5000 LKR or more.",
    too_high_title: "Budget too high!",
    too_high_text: "You have entered {{inputBudget}} LKR, which exceeds your profile budget of {{storedBudget}} LKR.",
    warning_high_title: "Budget seems high",
    warning_low_title: "Budget seems low",
    warning_high_text: "{{inputBudget}} LKR is relatively high compared to your registered budget.",
    warning_low_text: "{{inputBudget}} LKR is relatively low compared to your registered budget.",
    proceed_question: " Do you want to proceed?",
    btn_proceed: "Proceed",
    btn_change: "Change Value",
    btn_ok: "OK",
   
  },
   travel_chatbot: {
    input_placeholder: "Enter your travel plan or budget..."
  },
  Error:"Please register a customer first!, error"

    }
  },
  si: {
    translation: {
      welcome: "සාදරයෙන් පිළිගනිමු",
      login: "ඇතුල් වන්න",
      logout: "ඉවත් වන්න",
        Email: "ඊමේල්",
        Password: "මුරපදය",
        Confirm_Password: "මුරපදය තහවුරු කරන්න",
        enterPassword: "කරුණාකර ඔබේ මුරපදය ඇතුළත් කරන්න",
        enterEmail: "කරුණාකර ඔබේ ඊමේල් ඇතුළත් කරන්න",
        Logging_in: "ඇතුල් වීම...",
        Dontyouhaveanaccount: "ඔබට ගිණුමක් නැද්ද?",
        Register: "ලියාපදිංචි වන්න",
        Username: "පරිශීලක නාමය",
        Alreadyhaveanaccount: "ඔබට ගිණුමක් තිබේද?",
        guidebuddyExploreDestinationText:"අදහස් හුවමාරු කරමින් අමුතු ගමන් මඟ හොයා ගන්න සහ ඔබේ ගමන් කථා බෙදා ගන්න",
        guidebuddyshareTravelStoryText:"ඔබේ අද්විතීය ගමන් අත්දැකීම් බෙදා හදා ගන්න සහ GuideBuddy හි ඔබේ කථා සමඟ අන් අයට ආදර්ශයක් වන්න",
        guidebuddyPlanyourjourneyText:"අපගේ සංචාරක මඟ පෙන්වන්නන්ගෙන් පුද්ගලික නිර්දේශ සහ විශේෂඥ උපදෙස් සමඟ ඔබේ ගමන සැලසුම් කරන්න",
        sidebar:{
            home: "මුල් පිටුව",
            customerList: "පාරිභෝගික ලැයිස්තුව",
            travelRecommendations: "ගමන් නිර්දේශ",
            customerRegister: "පාරිභෝගික ලියාපදිංචි",
            supportBuddy: "සහාය",
            settings: "සැකසුම්",
        },
        travelRecommendationsbotText:"හෙලෝ! මම ඔබේ ගමන් සහායකයා. අද ඔබ කොහේ ගමන් කිරීමට කැමතිද?" ,
        customerRegisterbotText:"හෙලෝ! මම ඔබේ පාරිභෝගික ලියාපදිංචි නියෝජිතයා. මම ඔබට පාරිභෝගිකයින් ලියාපදිංචි කිරීමට උදව් කළ හැක. අද ඔබට කෙසේ උදව් කළ හැකිද?",
        tripPlannerbottext:"හෙලෝ! මම ඔබේ ගමන් සැලසුම්කරු. මම ඔබට ගමන සැලසුම් කිරීමට සහ ගමන් නිර්දේශ ලබා දීමට උදව් කළ හැක. අද ඔබට කෙසේ උදව් කළ හැකිද?",
        askAnything: "ඔබගේ සංචාරය ගැන ඕනෑම දෙයක් මගෙන් අසන්න!",
        budget_alerts: {
    too_low_title: "Budget එක මදි...",
    too_low_text: "කරුණාකර 5000 LKR හෝ ඊට වැඩි budget එකක් ඇතුළත් කරන්න.",
    too_high_title: "Budget එක වැඩියි!",
    too_high_text: "ඔබේ Profile budget එක ({{storedBudget}} LKR) ඉක්මවා ඔබ {{inputBudget}} LKR ඇතුළත් කර ඇත.",
    warning_high_title: "Budget එක ටිකක් වැඩියි වගේ",
    warning_low_title: "Budget එක ටිකක් අඩුයි වගේ",
    warning_high_text: "ඔබේ ලියාපදිංචි budget එකට සාපේක්ෂව {{inputBudget}} LKR යනු ඉහළ අගයකි.",
    warning_low_text: "ඔබේ ලියාපදිංචි budget එකට සාපේක්ෂව {{inputBudget}} LKR යනු ඉතා අඩු අගයකි.",
    proceed_question: " ඔබට ඉදිරියට යාමට අවශ්‍යද?",
    btn_proceed: "ඉදිරියට යන්න",
    btn_change: "අගය වෙනස් කරන්න",
    btn_ok: "හරි",
    
  },travel_chatbot: {
    input_placeholder:"ඔබේ සංචාරක සැලසුම හෝ Budget එක ඇතුළත් කරන්න..."
  },
    Error:"කරුණාකර පළමුව පාරිභෝගිකයෙකු ලියාපදිංචි කරන්න!"

    },
  },
  ta: {
    translation: {
      welcome: "வரவேற்கிறோம்",
      login: "உள்நுழை",
      logout: "வெளியேறு",
        Email: "மின்னஞ்சல்",
        Password: "கடவுச்சொல்",
        Confirm_Password: "கடவுச்சொல் உறுதிப்படுத்தவும்",
        enterPassword: "தயவுசெய்து உங்கள் கடவுச்சொல்லை உள்ளிடவும்",
        enterEmail: "தயவுசெய்து உங்கள் மின்னஞ்சலை உள்ளிடவும்",
        Logging_in: "உள்நுழைகிறது...",
        Dontyouhaveanaccount: "உங்களிடம் கணக்கு இல்லையா?",
        Register: "பதிவு செய்யவும்",
        Username: "பயனர் பெயர்",
        Alreadyhaveanaccount: "உங்களிடம் கணக்கு இருக்கிறதா?",
        guidebuddyExploreDestinationText:"அற்புதமான இடங்களை கண்டறிந்து, பயண கதை பகிர்ந்து கொள்ளுங்கள் பயண வழிகாட்டிகளுடன்",
        guidebuddyshareTravelStoryText:"உங்கள் தனித்துவமான பயண அனுபவங்களை பகிர்ந்து கொள்ளுங்கள் மற்றும் GuideBuddy இல் உங்கள் கதைகளுடன் மற்றவர்களுக்கு ஊக்கமளியுங்கள்",
        guidebuddyPlanyourjourneyText:"தனிப்பயன் பரிந்துரைகள் மற்றும் நிபுணர் குறிப்புகளுடன் உங்கள் பயணத்தை திட்டமிடுங்கள் எங்கள் சுற்றுலா வழிகாட்டிகளிடமிருந்து",
        sidebar:{
            home: "முகப்பு",
            customerList: "வாடிக்கையாளர் பட்டியல்",
            travelRecommendations: "பயண பரிந்துரைகள்",
            customerRegister: "வாடிக்கையாளர் பதிவு",
            supportBuddy: "ஆதரவு நண்பர்",
            settings: "அமைப்புகள்",
        },
        travelRecommendationsbotText:"வணக்கம்! நான் உங்கள் பயண உதவியாளர். இன்று நீங்கள் எங்கே ஆராய விரும்புகிறீர்கள்?" ,
         customerRegisterbotText:"வணக்கம்! நான் உங்கள் வாடிக்கையாளர் பதிவு முகவர். நான் உங்களுக்கு வாடிக்கையாளர்களை பதிவு செய்ய உதவ முடியும். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
         tripPlannerbottext:"வணக்கம்! நான் உங்கள் பயண திட்டமிடுபவர். நான் உங்களுக்கு பயணத்தை திட்டமிட உதவ முடியும் மற்றும் பயண பரிந்துரைகள் வழங்க முடியும். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
          askAnything: "உங்கள் பயணம் பற்றி என்னிடம் ஏதாவது கேளுங்கள்!",
          budget_alerts: {
    too_low_title: "பட்ஜெட் போதாது...",
    too_low_text: "தயவுசெய்து 5000 LKR அல்லது அதற்கு மேற்பட்ட பட்ஜெட்டை உள்ளிடவும்.",
    too_high_title: "பட்ஜெட் அதிகம்!",
    too_high_text: "உங்கள் சுயவிவர பட்ஜெட்டை ({{storedBudget}} LKR) விட அதிகமாக {{inputBudget}} LKR ஐ உள்ளிட்டுள்ளீர்கள்.",
    warning_high_title: "பட்ஜெட் அதிகமாகத் தெரிகிறது",
    warning_low_title: "பட்ஜெட் குறைவாகத் தெரிகிறது",
    warning_high_text: "உங்கள் பதிவுசெய்யப்பட்ட பட்ஜெட்டுடன் ஒப்பிடும்போது {{inputBudget}} LKR அதிகமானது.",
    warning_low_text: "உங்கள் பதிவுசெய்யப்பட்ட பட்ஜெட்டுடன் ஒப்பிடும்போது {{inputBudget}} LKR மிகக் குறைவானது.",
    proceed_question: " நீங்கள் தொடர விரும்புகிறீர்களா?",
    btn_proceed: "தொடரவும்",
    btn_change: "மதிப்பை மாற்றவும்",
    btn_ok: "சரி",
  },
        travel_chatbot: {
        input_placeholder: "உங்கள் பயணத் திட்டம் அல்லது பட்ஜெட்டை உள்ளிடவும்..."
  } ,
  Error:"தயவுசெய்து முதலில் ஒரு வாடிக்கையாளரைப் பதிவு செய்யவும்!"
    }
  }
};

i18n
  .use(LanguageDetector) // detect browser language
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;