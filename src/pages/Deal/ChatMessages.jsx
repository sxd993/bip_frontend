import { formatMessage, getFileIcon } from '../../utils/utils';
import './styles/ChatMessages.css'

const ChatMessages = ({ activities, auth }) => {
  const getAuthorName = (activity) => {
    if (activity.AUTHOR_ID === auth.contact_id) {
      return `${auth.first_name || ''} ${auth.second_name || ''} ${auth.last_name || ''}`.trim();
    }
    return activity.SUBJECT || 'Неизвестный автор';
  };

  return (
    <div className="chat">
      {activities.length === 0 ? (
        <p className="no-messages">Нет сообщений</p>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.ID}
            className={`message ${activity.AUTHOR_ID === auth.contact_id ? 'message-client' : 'message-manager'}`}
          >
            <p className="message-header">
              <strong>{getAuthorName(activity)}</strong> ({new Date(activity.CREATED).toLocaleString()})
            </p>
            <p className="message-content">{formatMessage(activity.TEXT)}</p>
            {activity.FILES?.map((file) => (
              <div key={file.ID || file.id || `file-${Math.random()}`} className="message-file">
                <a
                  href={file.URL || file.url || '#'}
                  download={file.NAME || `file_${file.ID || file.id || 'unknown'}`}
                  className="file-link"
                >
                  <i className={getFileIcon(file.NAME)}></i>
                  {file.NAME || `file_${file.ID || file.id || 'unknown'}`}
                </a>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default ChatMessages;