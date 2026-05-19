import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface StatCardProps {
  label: string;
  value: string;
  hint: string;
  icon: ReactNode;
}

export function StatCard({ label, value, hint, icon }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-brand-100/60 blur-2xl" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-extrabold tracking-tight text-ink">{value}</p>
          <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
            <ArrowUpRight className="h-3.5 w-3.5" />
            {hint}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-900 p-3 text-white">{icon}</div>
      </div>
    </Card>
  );
}
