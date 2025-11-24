const EmptyState = () => {
  return (
    <li className="text-center py-20">
      <div className="mb-10">
        <div className="text-6xl mb-6">👋</div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-white mb-3">
          Hello User!
        </h1>
        <p className="text-lg text-gray-400">Ask me anything to get started!</p>
      </div>
    </li>
  );
};

export default EmptyState;