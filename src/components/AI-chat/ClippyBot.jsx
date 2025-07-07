import { useEffect, useRef, useState } from "react";
import clippy from "clippyjs";

export default function ClippyBot() {
  const clippyRef = useRef(null);
  const [agent, setAgent] = useState(null);
  const [conversation, setConversation] = useState([]);

  // Appare all'avvio
  useEffect(() => {
    clippy.load("Clippy", (agentInstance) => {
      clippyRef.current = agentInstance;
      setAgent(agentInstance);
      agentInstance.moveTo(window.innerWidth - 150, window.innerHeight - 200);
      agentInstance.show();
      agentInstance.speak("Ciao! Posso aiutarti a trovare qualcosa?");
    });
  }, []);

  // Invia messaggio a Dialogflow
  const sendToDialogflow = async (text) => {
    const response = await fetch(
      "https://api.dialogflow.com/v1/query?v=20150910",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_DIALOGFLOW_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lang: "it",
          query: text,
          sessionId: "123456",
        }),
      }
    );

    const data = await response.json();
    const reply = data.result.fulfillment.speech;
    clippyRef.current?.speak(reply);
    setConversation((prev) => [...prev, { from: "bot", text: reply }]);
  };

  // Test: Click per parlare
  const handleClick = () => {
    const input = prompt("Scrivi qualcosa a Clippy:");
    if (input) {
      setConversation((prev) => [...prev, { from: "user", text: input }]);
      clippyRef.current?.speak("Ok, controllo...");
      sendToDialogflow(input);
    }
  };

  // Clippy sempre visibile in basso a destra
  useEffect(() => {
    const handleResize = () => {
      clippyRef.current?.moveTo(
        window.innerWidth - 150,
        window.innerHeight - 200
      );
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return null;
}
