import { useEffect, useState } from "react";

function TypewriterText({ text }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= text.length) return;

    const timeout = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 70);

    return () => clearTimeout(timeout);
  }, [index, text]);

  return (
    <span className="inline">
      {text.slice(0, index)}
      {index < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-slate-900 ml-1 align-middle animate-pulse" />
      )}
    </span>
  );
}

export default TypewriterText;
