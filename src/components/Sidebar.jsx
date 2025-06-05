import './Sidebar.css';

const Sidebar = ({ conversations, onNewChat, onSelect }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button onClick={onNewChat} className="new-chat-btn">
          ➕ Nouveau Chat
        </button>
      </div>
      <div className="conversation-list">
        {conversations.map((conv, index) => (
          <div
            key={index}
            onClick={() => onSelect(index)}
            className="conversation-item"
          >
            {conv.title || `Conversation ${index + 1}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
