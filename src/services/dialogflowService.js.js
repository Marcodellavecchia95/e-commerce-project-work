export async function sendMessageToDialogflow(
  message,
  sessionId = "clippy-session"
) {
  const response = await fetch("http://localhost:3000/api/dialogflow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, sessionId }),
  });

  if (!response.ok) {
    throw new Error("Errore nella comunicazione con il proxy backend");
  }

  return await response.json();
}
