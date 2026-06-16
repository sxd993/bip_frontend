const API_URL = import.meta.env.VITE_API_URL;

export const streamAiMessage = async (messages) => {
  const response = await fetch(`${API_URL}/ai-chat/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages })
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.body.getReader();
};
