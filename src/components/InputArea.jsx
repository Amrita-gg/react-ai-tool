const InputArea = ({ question, setQuestion, askQuestion, isLoading }) => {
  return (
    <div className="p-8 pt-0">
      <div className="bg-gradient-to-r from-zinc-800 to-zinc-850 w-3/4 mx-auto px-2 py-2 rounded-full border border-zinc-700 flex items-center gap-2 shadow-2xl hover:shadow-blue-500/10 hover:border-zinc-600 transition-all duration-300">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && !isLoading && askQuestion()}
          className="flex-1 bg-transparent text-white px-6 py-3 outline-none placeholder-gray-400 text-base"
          placeholder="Ask me anything..."
          disabled={isLoading}
        />
        <button
          onClick={() => askQuestion()}
          disabled={!question.trim() || isLoading}
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-medium transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 disabled:shadow-none"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default InputArea;
