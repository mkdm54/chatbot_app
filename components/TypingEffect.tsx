// components/TypingEffect.tsx
import React, { useEffect, useState } from "react";
import { Text } from "react-native";

const TypingEffect = ({
  text,
  speed = 30,
  onFinish,
}: {
  text: string;
  speed?: number;
  onFinish?: () => void;
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[currentIndex]);
      currentIndex++;
      if (currentIndex === text.length) {
        clearInterval(interval);
        if (onFinish) onFinish();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  return <Text style={{ fontSize: 16 }}>{displayedText}</Text>;
};

export default TypingEffect;
