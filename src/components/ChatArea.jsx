import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import EmptyState from "./EmptyState";
import LoadingSpinner from "./LoadingSpinner";

const ChatArea = ({ result, isLoading }) => {
  const scrollToAns = useRef(null);

  // Auto-scroll to bottom when result changes
  useEffect(() => {
    if (scrollToAns.current) {
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
    }
  }, [result, isLoading]);

  return (
    <div className="flex-1 overflow-hidden p-8">
      <div
        ref={scrollToAns}
        className="h-full bg-gradient-to-b from-gray-900/40 to-gray-950/40 rounded-3xl p-6 
        shadow-2xl border border-gray-800/50 backdrop-blur-sm overflow-y-auto"
      >
        <ul className="space-y-6">
          {result && result.length ? (
            result.map((item, i) => (
              <ChatMessage key={i} item={item} />
            ))
          ) : (
            <EmptyState />
          )}

          {isLoading && <LoadingSpinner />}
        </ul>
      </div>
    </div>
  );
};

export default ChatArea;