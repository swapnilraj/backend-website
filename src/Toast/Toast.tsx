import React, { useEffect } from "react";
import "./Toast.css";

export const Toast = ({
  prompt,
  time = 2000
}: {
  prompt: string | null;
  time?: number;
}) => {
  const [text, setText] = React.useState<string | null>(prompt);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setText(null);
    }, time);

    return () => clearTimeout(timeoutId);
  }, [prompt, time, setText]);

  return text ? <div className="toast">{text}</div> : null;
};
