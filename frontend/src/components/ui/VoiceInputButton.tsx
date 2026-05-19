import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface VoiceInputButtonProps {
  supported: boolean;
  listening: boolean;
  onClick: () => void;
}

export function VoiceInputButton({ supported, listening, onClick }: VoiceInputButtonProps) {
  return (
    <Button
      type="button"
      variant={supported ? 'secondary' : 'ghost'}
      size="sm"
      onClick={onClick}
      disabled={!supported}
      className="w-full sm:w-auto"
    >
      {listening ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
      {supported ? (listening ? 'Listening...' : 'Voice note') : 'Voice unavailable'}
    </Button>
  );
}
