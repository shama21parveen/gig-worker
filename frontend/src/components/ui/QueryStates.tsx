import { AlertTriangle, Inbox, LoaderCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export function LoadingState({ label }: { label: string }) {
  return (
    <Card className="flex min-h-40 items-center justify-center">
      <div className="flex items-center gap-3 text-slate-500">
        <LoaderCircle className="h-5 w-5 animate-spin" />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Card>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card className="flex min-h-40 flex-col items-center justify-center text-center">
      <Inbox className="h-8 w-8 text-slate-400" />
      <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-500">{description}</p>
    </Card>
  );
}

export function ErrorState({ title, description }: { title: string; description: string }) {
  return (
    <Card className="flex min-h-40 flex-col items-center justify-center text-center">
      <AlertTriangle className="h-8 w-8 text-danger-500" />
      <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-500">{description}</p>
    </Card>
  );
}
