const ChatMessage = ({ item }) => {
  return (
    <li className="w-full">
      {item.type === "q" ? (
        <div className="flex justify-end">
          <div className="max-w-[75%] bg-gradient-to-r from-blue-600 to-blue-500 p-4 rounded-3xl rounded-tr-sm shadow-xl shadow-blue-500/30 text-right break-words">
            <p className="text-white leading-relaxed">{item.text}</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-start">
          <div className="max-w-[75%] bg-gradient-to-br from-gray-800 to-gray-850 p-4 rounded-3xl rounded-bl-sm border border-gray-700/50 shadow-xl break-words">
            {Array.isArray(item.text) ? (
              <ul className="list-disc pl-5 space-y-2 marker:text-blue-400">
                {item.text.map((ans, idx) => (
                  <li key={idx} className="leading-relaxed text-gray-100">
                    {ans || (
                      <span className="text-gray-500 italic">No content</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <span className="leading-relaxed text-gray-100">{item.text}</span>
            )}
          </div>
        </div>
      )}
    </li>
  );
};

export default ChatMessage;