import rfdc from "rfdc";

export const speak = (text: string): void => {
  if (!("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-EN";
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 0.1;
  speechSynthesis.speak(utterance);
};

export const clone = rfdc({ proto: true });
