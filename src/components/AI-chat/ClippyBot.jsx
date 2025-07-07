import { useEffect, useRef, useState } from "react";
import clippy from "clippyjs";

export default function ClippyBot() {
  const clippyRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    clippy.load(
      "Clippy",
      (agent) => {
        clippyRef.current = agent;
        agent.show();
        agent.moveTo(window.innerWidth - 150, window.innerHeight - 200);
        agent.speak("Ciao! Sono Clippy!");
        setLoaded(true);
      },
      undefined,
      "/agents/"
    ); // fallback explicit
  }, []);

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
      {loaded && (
        <button
          onClick={() => clippyRef.current?.speak("Hai cliccato il bottone!")}
        >
          Fai parlare Clippy
        </button>
      )}
    </div>
  );
}
