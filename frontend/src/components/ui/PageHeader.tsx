import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function PageHeader({ eyebrow, title, description, action, className }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={cn(
        'flex flex-col gap-4 rounded-[2rem] bg-ink px-5 py-6 text-white shadow-lift sm:px-7 sm:py-8 lg:flex-row lg:items-end lg:justify-between',
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow ? <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-brand-200">{eyebrow}</p> : null}
        <h1 className="font-display text-3xl leading-tight sm:text-4xl">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </motion.div>
  );
}
