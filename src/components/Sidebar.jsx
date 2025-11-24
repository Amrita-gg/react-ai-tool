const Sidebar = ({ recentHistory, clearHistory, handleHistoryClick }) => {
  return (
    <div className="col-span-1 bg-gradient-to-b from-zinc-900 to-zinc-950 border-r border-zinc-800 h-screen p-6 text-white shadow-2xl flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          AI Chat
        </h1>
        <p className="text-sm text-gray-400 mt-1">Powered by Gemini</p>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-3 px-2">
          <h2 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              viewBox="0 -960 960 960"
              width="16px"
              fill="#9CA3AF"
            >
              <path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z" />
            </svg>
            Recent History
          </h2>
          <button
            onClick={clearHistory}
            className="p-1.5 rounded-lg hover:bg-zinc-800 transition-all duration-200 group"
            title="Clear history"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 -960 960 960"
              width="18px"
              className="fill-gray-500 group-hover:fill-red-400 transition-colors duration-200"
            >
              <path d="m400-325 80-80 80 80 51-51-80-80 80-80-51-51-80 80-80-80-51 51 80 80-80 80 51 51Zm-88 181q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480Zm-336 0v480-480Z" />
            </svg>
          </button>
        </div>

        <ul className="overflow-y-auto flex-1 space-y-1">
          {recentHistory && recentHistory.length ? (
            recentHistory.map((item, i) => (
              <li
                key={i}
                onClick={() => handleHistoryClick(item)}
                className="cursor-pointer truncate hover:bg-zinc-800 p-1.5 rounded-lg hover:text-white text-sm text-gray-300 transition-all duration-200"
                title={item}
              >
                {item}
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic text-sm px-3">
              No recent history
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;