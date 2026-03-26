import { useState, useRef, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { Send, Bot, User, Download, X } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { SpinnerCircular } from 'spinners-react';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import FormattedText from "../../components/FormattedText.jsx";
const TravelRecommChatbot = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: t("travelRecommendationsbotText"),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const messagesEndRef = useRef(null);
  const previewRef = useRef(null);

  const customersList = useSelector((state) => state.customers.customers);
  const lastCustomer = customersList.length > 0 ? customersList[customersList.length - 1] : null;

  console.log(customersList);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  // --- PDF Generation Logic ---
  const handleDownload = async () => {
    if (messages.length <= 1) {
      Swal.fire("Info", "No travel plan to download. Start chatting first!", "info");
      return;
    }
    setShowPreview(true);
  };

  // const generatePDF = async () => {
  //   try {
  //     setIsDownloading(true);
  //     const html2pdf = (await import("html2pdf.js")).default;
  //     const lastBotMessage = [...messages].reverse().find((msg) => msg.sender === "bot");

  //     const cleanHTML = `
  //       <div style="font-family: Arial, sans-serif; padding: 30px; background: #ffffff;">
  //         <h1 style="color: #2563eb; text-align: center;">✈️ GuideBuddy Travel Plan</h1>
  //         <p style="text-align: center; color: #666;">Generated on ${new Date().toLocaleDateString()}</p>
  //         <hr/>
  //         <div style="margin-top: 20px; line-height: 1.6;">
  //           ${lastBotMessage ? ReactDOMServer.renderToStaticMarkup(<FormattedText text={lastBotMessage.text} />) : "No plan generated."}
  //         </div>
  //       </div>`;

  //     const container = document.createElement("div");
  //     container.innerHTML = cleanHTML;
  //     document.body.appendChild(container);

  //     const opt = {
  //       margin: 10,
  //       filename: "travel-plan.pdf",
  //       image: { type: "jpeg", quality: 0.98 },
  //       html2canvas: { scale: 2 },
  //       jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  //     };

  //     await html2pdf().set(opt).from(container).save();
  //     document.body.removeChild(container);
  //     setIsDownloading(false);
  //     setShowPreview(false);
  //   } catch (error) {
  //     console.error(error);
  //     setIsDownloading(false);
  //   }
  // };

  // --- API Communication ---
const generatePDF = async () => {
  try {
    setIsDownloading(true);
    const html2pdf = (await import("html2pdf.js")).default;

    // 1. LocalStorage එකෙන් දත්ත ලබාගැනීම
    const savedData = JSON.parse(localStorage.getItem("userTravelPlan"));
    
    // 2. Chat එකේ අන්තිම Bot message එක සොයාගැනීම
    const lastBotMessage = [...messages].reverse().find((msg) => msg.sender === "bot");

    // 3. Variables ටික Scope එකෙන් පිටතට ගැනීම (Default values සහිතව)
    let startLoc = "N/A";
    let endLoc = "N/A";
    let budget = "N/A";

    if (savedData) {
      startLoc = savedData.start_location || "N/A";
      endLoc = savedData.end_location || "N/A";
      budget = savedData.budget || "N/A";
      console.log(`ගමන ආරම්භය: ${startLoc} සිට ${endLoc} දක්වා`);
    } else {
      console.warn("LocalStorage එකේ දත්ත නැත.");
    }

    const cleanHTML = `
  <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f7f9; padding: 40px; color: #2d3748;">
    <div style="max-width: 800px; margin: auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
      
      <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 40px 20px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 28px; letter-spacing: 1px; font-weight: 700;">SRI LANKA TRAVEL PLAN</h1>
        <div style="margin-top: 15px; font-size: 16px; opacity: 0.9; display: flex; align-items: center; justify-content: center; gap: 10px;">
          <span>📍 ${startLoc}</span>
          <span style="font-size: 20px;">➔</span>
          <span>🏁 ${endLoc}</span>
        </div>
      </div>

      <div style="padding: 40px;">
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px;">
          <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border-top: 4px solid #3b82f6; text-align: center;">
            <small style="color: #64748b; font-weight: bold; text-transform: uppercase; font-size: 10px; display: block; margin-bottom: 5px;">Starting From</small>
            <div style="font-size: 15px; font-weight: bold; color: #1e293b;">${startLoc}</div>
          </div>
          <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border-top: 4px solid #10b981; text-align: center;">
            <small style="color: #64748b; font-weight: bold; text-transform: uppercase; font-size: 10px; display: block; margin-bottom: 5px;">Destination</small>
            <div style="font-size: 15px; font-weight: bold; color: #1e293b;">${endLoc}</div>
          </div>
          <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border-top: 4px solid #f59e0b; text-align: center;">
            <small style="color: #64748b; font-weight: bold; text-transform: uppercase; font-size: 10px; display: block; margin-bottom: 5px;">Est. Budget</small>
            <div style="font-size: 15px; font-weight: bold; color: #1e293b;">Rs. ${budget}</div>
          </div>
        </div>

        <div style="position: relative;">
          <h3 style="color: #1e3a8a; font-size: 20px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
             <span style="background: #1e3a8a; color: white; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 14px;">📅</span>
             Detailed Itinerary
          </h3>
          
          <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 30px; border-radius: 12px; line-height: 1.8; font-size: 14px; color: #4a5568; white-space: pre-line;">
            ${lastBotMessage ? lastBotMessage.text : "Your personalized itinerary is being prepared..."}
          </div>
        </div>

        <div style="margin-top: 50px; text-align: center; border-top: 1px solid #edf2f7; padding-top: 30px;">
          <img src="YOUR_LOGO_URL_HERE" style="height: 30px; margin-bottom: 10px; opacity: 0.5;" alt="" />
          <p style="margin: 0; color: #a0aec0; font-size: 12px;">Generated by <strong>GuideBuddy AI</strong></p>
          <p style="margin: 5px 0 0; color: #cbd5e0; font-size: 10px;">${new Date().toLocaleDateString()} | Personal Travel Guide</p>
        </div>
      </div>
    </div>
  </div>`;

    // PDF එක සෑදීම
    const container = document.createElement("div");
    container.innerHTML = FormattedText(FormattedText(cleanHTML));
    document.body.appendChild(container);

    const opt = {
      margin: 10,
      filename: `Travel_Plan_${startLoc}_to_${endLoc}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    };

    await html2pdf().set(opt).from(container).save();
    document.body.removeChild(container);
    setIsDownloading(false);
    if(setShowPreview) setShowPreview(false); // පරීක්ෂා කර බැලීම
  } catch (error) {
    console.error("PDF Error:", error);
    setIsDownloading(false);
  }
};

  // const sendToAI = async (text) => {
  //   const userMessage = {
  //     id: Date.now(),
  //     sender: "user",
  //     text,
  //     timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  //   };

  //   setMessages((prev) => [...prev, userMessage]);
  //   setInputValue("");
  //   setIsTyping(true);

  //   try {
  //     const response = await axios.post("http://localhost:5000/travel-agent", { user_id: "user_001", text });
  //     setMessages((prev) => [...prev, {
  //       id: Date.now() + 1,
  //       sender: "bot",
  //       text: response.data.message || "No response.",
  //       timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  //       localStorage.setItem("userTravelPlan", JSON.stringify(data.travel_info)),
  //     }]);
  //   } catch (error) {
  //     setMessages((prev) => [...prev, { id: Date.now() + 2, sender: "bot", text: "Server error.", timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
  //   } finally { setIsTyping(false); }
  // };

  // --- Message Handler with Budget Logic ---
  const sendToAI = async (text) => {
  const userMessage = {
    id: Date.now(),
    sender: "user",
    text,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };

  setMessages((prev) => [...prev, userMessage]);
  setInputValue("");
  setIsTyping(true);

  try {
    const response = await axios.post("http://localhost:5000/travel-agent", { 
      user_id: "user_001", 
      text 
    });

    const data = response.data; // Backend එකෙන් එන response එක

    // ✅ 1. දත්ත Completed නම් පමණක් LocalStorage එකේ සේව් කරන්න
    if (data.status === "completed" && data.travel_info) {
      localStorage.setItem("userTravelPlan", JSON.stringify(data.travel_info));
      console.log("Travel data saved to local storage:", data.travel_info);
    }

    // ✅ 2. Bot ගේ පණිවිඩය Chat එකට එකතු කරන්න
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        sender: "bot",
        text: data.message || "No response.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      { 
        id: Date.now() + 2, 
        sender: "bot", 
        text: "Server error. Please try again.", 
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) 
      },
    ]);
  } finally {
    setIsTyping(false);
  }
};
  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

   if (!lastCustomer) {
      Swal.fire({
        icon: 'error',
        title: t('budget_alerts.no_customer_title'),
        text: t('budget_alerts.no_customer_text'),
        confirmButtonText: t('budget_alerts.btn_ok'),
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    // Check if message is about budget
    const budgetKeywords = ["budget", "lkr", "rs", "price", "cost", "රුපියල්", "ගාණ", "මුදල", "බජට්"];
    const hasBudgetContext = budgetKeywords.some(keyword => text.toLowerCase().includes(keyword));
    const budgetPattern = /(?:budget|rs\.?|lkr|price|is)\s?(\d+)/i;
    const match = text.match(budgetPattern);
    const extractedValue = match ? match[1] : text.match(/\d+/)?.[0];
    const inputBudget = extractedValue ? parseInt(extractedValue) : null;

    if (hasBudgetContext && inputBudget !== null) {
      const storedBudget = lastCustomer?.budget ? parseInt(lastCustomer.budget) : null;
      if (storedBudget !== null) {
        if (inputBudget < 5000) {
          Swal.fire({ icon: 'error', title: t('budget_alerts.too_low_title'), text: t('budget_alerts.too_low_text'), confirmButtonText: t('budget_alerts.btn_ok'), confirmButtonColor: '#ef4444' });
          return;
        }
        if (inputBudget > storedBudget) {
          Swal.fire({ icon: 'error', title: t('budget_alerts.too_high_title'), text: t('budget_alerts.too_high_text', { storedBudget, inputBudget }), confirmButtonText: t('budget_alerts.btn_ok'), confirmButtonColor: '#ef4444' });
          return;
        }
        const fortyPercentValue = storedBudget * 0.4;
        const tenPercentValue = storedBudget * 0.1;
        if (inputBudget > fortyPercentValue || inputBudget < tenPercentValue) {
          const isHigh = inputBudget > fortyPercentValue;
          Swal.fire({
            title: isHigh ? t('budget_alerts.warning_high_title') : t('budget_alerts.warning_low_title'),
            text: (isHigh ? t('budget_alerts.warning_high_text', { inputBudget }) : t('budget_alerts.warning_low_text', { inputBudget })) + t('budget_alerts.proceed_question'),
            icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: t('budget_alerts.btn_proceed'), cancelButtonText: t('budget_alerts.btn_change')
          }).then((result) => { if (result.isConfirmed) sendToAI(text); });
          return;
        }
      }
    }
    sendToAI(text);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col">
  
    <div className="w-full h-full flex flex-col bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
              <Bot className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">GuideBuddy Assistant</h1>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <p className="text-xs text-gray-300">Online</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"} gap-3 animate-in fade-in slide-in-from-bottom-2`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md ${msg.sender === "bot" ? "bg-blue-600" : "bg-emerald-500"}`}>
                {msg.sender === "bot" ? <Bot size={20} className="text-white"/> : <User size={20} className="text-white"/>}
              </div>
              <div className="max-w-[75%]">
                <div className={`p-4 rounded-2xl text-white shadow-sm ${msg.sender === "bot" ? "bg-white/10 border border-white/10" : "bg-gradient-to-r from-blue-600 to-blue-500"}`}>
                  <FormattedText text={msg.text} />
                </div>
                <p className="text-[10px] text-gray-400 mt-1 px-1">{msg.timestamp}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center"><Bot size={20} className="text-white"/></div>
              <div className="bg-white/10 px-4 py-3 rounded-2xl"><div className="flex gap-1"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span><span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-150"></span><span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-300"></span></div></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/5 border-t border-white/10">
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-500"
              placeholder={t('travel_chatbot.input_placeholder')}
            />
            <button type="submit" disabled={!inputValue.trim()} className="bg-gradient-to-r from-blue-600 to-blue-500 p-3 rounded-xl text-white hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 shadow-lg">
              <Send size={22}/>
            </button>
            <button type="button" onClick={handleDownload} className="bg-white/10 border border-white/20 p-3 rounded-xl text-white hover:bg-white/20 transition-all shadow-lg">
              <Download size={22}/>
            </button>
          </form>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-xl font-bold text-gray-800">Plan Preview</h2>
              <button onClick={() => setShowPreview(false)} className="p-2 hover:bg-gray-100 rounded-full transition"><X /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-gray-800">
                {(() => {
                  const lastBot = [...messages].reverse().find(m => m.sender === "bot");
                  return lastBot ? <FormattedText text={lastBot.text} /> : "No plan generated.";
                })()}
              </div>
            </div>
            <div className="p-5 border-t bg-gray-50 flex gap-3">
              <button onClick={() => setShowPreview(false)} className="flex-1 py-3 rounded-xl border border-gray-300 font-semibold text-gray-700 hover:bg-white transition">Cancel</button>
              <button onClick={generatePDF} disabled={isDownloading} className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                {isDownloading ? <SpinnerCircular size={20} color="white" /> : <><Download size={18}/> Download PDF</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelRecommChatbot;