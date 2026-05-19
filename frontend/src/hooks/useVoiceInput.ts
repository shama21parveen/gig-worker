import { useCallback, useMemo, useState } from 'react';
import { env } from '@/lib/config/env';

type SpeechCtor = new () => {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

declare global {
  interface Window {
    SpeechRecognition?: SpeechCtor;
    webkitSpeechRecognition?: SpeechCtor;
  }

  interface SpeechRecognitionEvent {
    results: ArrayLike<ArrayLike<{ transcript: string }>>;
  }
}

export function useVoiceInput(language: 'en-IN' | 'hi-IN' = 'en-IN') {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const SpeechRecognition = useMemo(
    () => window.SpeechRecognition || window.webkitSpeechRecognition,
    [],
  );

  const supported = env.enableVoiceInput && Boolean(SpeechRecognition);

  const startListening = useCallback(
    (onTranscript: (transcript: string) => void) => {
      if (!SpeechRecognition || !env.enableVoiceInput) {
        setError('Voice input is not supported on this browser.');
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language;
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .flatMap((result) => Array.from(result))
          .map((item) => item.transcript)
          .join(' ');
        onTranscript(transcript.trim());
      };
      recognition.onerror = (event) => {
        setError(event.error);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      setError(null);
      setIsListening(true);
      recognition.start();
    },
    [SpeechRecognition, language],
  );

  return {
    supported,
    isListening,
    error,
    startListening,
  };
}
