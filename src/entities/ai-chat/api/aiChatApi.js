const API_URL = import.meta.env.VITE_API_URL;

export const streamAiMessage = async (messages, situationType = null) => {
  const response = await fetch(`${API_URL}/ai-chat/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      messages,
      ...(situationType ? { situation_type: situationType } : {}),
    }),
  });

  if (response.status === 401) throw new Error("UNAUTHORIZED");
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.body.getReader();
};
