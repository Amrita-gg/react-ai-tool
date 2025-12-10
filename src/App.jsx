import { useState } from "react";
// import "./App.css";
import ChatArea from "./components/ChatArea";
import InputArea from "./components/InputArea";
import Sidebar from "./components/Sidebar";
import { URL } from "./constants";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const askQuestion = async (questionText = question) => {
    if (!questionText.trim()) return;

    setIsLoading(true);

    // Save to history
    if (localStorage.getItem("history")) {
      let history = JSON.parse(localStorage.getItem("history"));
      if (!history.includes(questionText)) {
        history = [questionText, ...history];
        history = history.map((item) =>
          item.charAt(0).toUpperCase() + item.slice(1).trim());
        history = [...new Set(history)]; // Remove duplicates
        if (history.length > 20) {
          history.pop(); // Keep only latest 20
        }
        localStorage.setItem("history", JSON.stringify(history));
        setRecentHistory(history);
      }
    } else {
      localStorage.setItem("history", JSON.stringify([questionText]));
      setRecentHistory([questionText]);
    }

    // Add question to result immediately
    setResult((prev) => [...prev, { type: "q", text: questionText }]);
    setQuestion("");

    const payload = {
      contents: [
        {
          parts: [{ text: questionText }],
        },
      ],
    };

    try {
      let response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(payload),
      });
      response = await response.json();

      let dataString = response.candidates[0].content.parts[0].text;
      dataString = dataString.replace(/\*\*/g, "").replace(/\*/g, "");
      dataString = dataString.split("\n");
      dataString = dataString
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      setResult((prev) => [...prev, { type: "a", text: dataString }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setResult((prev) => [
        ...prev,
        { type: "a", text: ["Error: Failed to get response"] },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // dark mode toggle handler
  const [darkMode, setDarkMode] = useState(false);
  // useEffect(() => {
  //   console.log(darkMode);
  //   if (darkMode === 'dark') {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // }, [darkMode]);



  const clearHistory = () => {
    localStorage.removeItem("history");
    setRecentHistory([]);
  };

  const handleHistoryClick = (item) => {
    setQuestion(item);
    askQuestion(item);
  };

  return (
    <div className={darkMode ? "bg-black text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      <div className="grid grid-cols-1 md:grid-cols-5 text-left h-screen overflow-hidden">
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="fixed text-white bottom-0 left-0 p-3 md:p-5 z-50"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

        {/* Mobile menu button */}
        <button 
          onClick={() => setShowSidebar(!showSidebar)}
          className="md:hidden fixed top-4 left-4 z-50 bg-zinc-800 text-white p-2 rounded"
        >
          ☰
        </button>


        
        
        {/* Sidebar with mobile overlay */}
        <div className={`${showSidebar ? 'block' : 'hidden'} md:block fixed md:relative z-40 w-64 md:w-auto h-full`}>
          <Sidebar
            recentHistory={recentHistory}
            setRecentHistory={setRecentHistory}  // <- Make sure this is passed
            clearHistory={clearHistory}
            handleHistoryClick={handleHistoryClick}
          />
        </div>

        {/* Overlay for mobile */}
        {showSidebar && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setShowSidebar(false)}
          />
        )}

        <div className="col-span-1 md:col-span-4 bg-gradient-to-br from-zinc-900 via-zinc-900 to-gray-900 h-screen flex flex-col">
          <ChatArea result={result} isLoading={isLoading} />
          
          <InputArea
            question={question}
            setQuestion={setQuestion}
            askQuestion={askQuestion}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>  
  );
}

export default App;