import { useState, useRef } from 'react';
import axios from 'axios';
import './styles/ChatInput.css'

const ChatInput = ({ dealId, auth, onActivityAdded, onError }) => {
  const [comment, setComment] = useState('');
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const addActivity = async () => {
    if (!comment && files.length === 0) return;

    try {
      setSubmitting(true);
      const fileData = await Promise.all(
        files.map(async (file) => {
          if (file.size > 100 * 1024 * 1024) {
            throw new Error(`Файл ${file.name} слишком большой (макс. 100 МБ)`);
          }
          const arrayBuffer = await file.arrayBuffer();
          const base64 = btoa(
            new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          return { name: file.name, base64 };
        })
      );

      const authorName = `${auth.first_name || ''} ${auth.second_name || ''} ${auth.last_name || ''}`.trim();
      await axios.post(
        'http://localhost:8000/add-activity',
        {
          deal_id: String(dealId),
          comment: comment || null,
          files: fileData.length > 0 ? fileData : null,
          author_name: authorName,
          author_id: auth.contact_id || '',
        },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );

      setComment('');
      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      onActivityAdded();
    } catch (err) {
      onError(err.response?.data?.detail || `Ошибка отправки: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="chat-input">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Введите комментарий..."
        rows="3"
      />
      <div className="file-input">
        <label htmlFor="file-upload" className="file-label">
          <i className="fas fa-paperclip"></i> Прикрепить файл
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
      </div>
      {files.length > 0 && (
        <div className="file-list">
          {files.map((file, index) => (
            <div key={index} className="file-item">
              <span>{file.name}</span>
              <button
                onClick={() => removeFile(index)}
                className="remove-file-btn"
                title="Удалить файл"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={addActivity}
        disabled={(!comment && files.length === 0) || submitting}
        className={submitting ? 'submitting' : ''}
      >
        {submitting ? 'Отправка...' : 'Отправить'}
      </button>
    </div>
  );
};

export default ChatInput;