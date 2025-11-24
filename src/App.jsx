import { useEffect, useState } from "react";
import "./App.css";
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

  const askQuestion = async (questionText = question) => {
    if (!questionText.trim()) return;

    setIsLoading(true);

    // Save to history
    if (localStorage.getItem("history")) {
      let history = JSON.parse(localStorage.getItem("history"));
      if (!history.includes(questionText)) {
        history = [questionText, ...history];
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
  const [darkMode, setDarkMode] = useState('dark');
  useEffect(() => {
    console.log(darkMode);
    if (darkMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);



  const clearHistory = () => {
    localStorage.removeItem("history");
    setRecentHistory([]);
  };

  const handleHistoryClick = (item) => {
    setQuestion(item);
    askQuestion(item);
  };

  return (
    <div className="{darkMode?'dark':'light'}">
      <div className="grid grid-cols-5 text-left h-screen overflow-hidden">
        <select onChange={(event)=>setDarkMode(event.target.value)} className="fixed text-white bottom-0 p-5">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        
        <Sidebar
          recentHistory={recentHistory}
          clearHistory={clearHistory}
          handleHistoryClick={handleHistoryClick}
        />

        <div className="col-span-4 bg-gradient-to-br from-zinc-900 via-zinc-900 to-gray-900 h-screen flex flex-col">
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