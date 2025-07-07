import { useEffect, useRef, useState } from "react";
import clippy from "clippyjs";
import ClippyChat from "./ClippyChat";

export default function ClippyBot() {
  const clippyRef = useRef(null);
  const [chatVisible, setChatVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const chatBoxRef = useRef(null);
  const randomPhraseInterval = useRef(null);

  useEffect(() => {
    clippy.load(
      "Clippy",
      (agent) => {
        clippyRef.current = agent;
        agent.show();
        agent.moveTo(window.innerWidth - 150, window.innerHeight - 200);
        setLoaded(true);

        setTimeout(() => {
          agent.speak("Hey! Hai bisogno di aiuto?");
        }, 10000);
      },
      undefined,
      "/agents/"
    );
  }, []);

  // Frasi random ogni 15s (solo se chat NON visibile)
  useEffect(() => {
    if (!loaded) return;

    const phrases = [
      "Hai bisogno di una mano?",
      "Clicca su di me se vuoi aiuto!",
      "Sto pensando a quanto sono utile...",
      "Posso cercare qualcosa per te!",
      "Sai che ho una laurea in ingegneria informatica?",
      "Ti serve una scheda madre nuova?",
      "Il tuo PC è lento? Forse posso aiutarti!",
    ];

    const startSpeaking = () => {
      if (randomPhraseInterval.current)
        clearInterval(randomPhraseInterval.current);
      randomPhraseInterval.current = setInterval(() => {
        if (!chatVisible && clippyRef.current) {
          const phrase = phrases[Math.floor(Math.random() * phrases.length)];
          clippyRef.current.speak(phrase);
        }
      }, 15000);
    };

    startSpeaking();

    return () => clearInterval(randomPhraseInterval.current);
  }, [loaded, chatVisible]);

  // Tracciamento click e movimento
  useEffect(() => {
    if (!loaded) return;

    const clippyEl = document.querySelector(".clippy");
    let moved = false;

    const handleMouseDown = () => {
      moved = false;
    };

    const handleMouseMove = () => {
      moved = true;
    };

    const handleMouseUp = () => {
      if (!moved) {
        setChatVisible((prev) => !prev); // toggle
      }
    };

    clippyEl?.addEventListener("mousedown", handleMouseDown);
    clippyEl?.addEventListener("mousemove", handleMouseMove);
    clippyEl?.addEventListener("mouseup", handleMouseUp);

    return () => {
      clippyEl?.removeEventListener("mousedown", handleMouseDown);
      clippyEl?.removeEventListener("mousemove", handleMouseMove);
      clippyEl?.removeEventListener("mouseup", handleMouseUp);
    };
  }, [loaded]);

  // Posiziona la chat accanto a Clippy
  useEffect(() => {
    if (!loaded || !chatVisible || !clippyRef.current) return;

    const updateChatPosition = () => {
      const clippyEl = document.querySelector(".clippy");
      const chatBox = chatBoxRef.current;
      if (!clippyEl || !chatBox) return;

      const rect = clippyEl.getBoundingClientRect();
      const chatTop = rect.top - 190;
      const chatLeft = rect.left - 110;

      chatBox.style.top = `${chatTop}px`;
      chatBox.style.left = `${chatLeft}px`;
    };

    updateChatPosition();

    const observer = new MutationObserver(updateChatPosition);
    const clippyEl = document.querySelector(".clippy");
    if (clippyEl) {
      observer.observe(clippyEl, {
        attributes: true,
        attributeFilter: ["style"],
      });
    }

    return () => observer.disconnect();
  }, [chatVisible, loaded]);

  return (
    <>
      {loaded && (
        <ClippyChat
          visible={chatVisible}
          onClose={() => setChatVisible(false)}
          ref={chatBoxRef}
        />
      )}
    </>
  );
}
