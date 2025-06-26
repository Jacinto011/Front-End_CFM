// components/ui/card.tsx
import React from 'react';
import { cn } from '@/components/lib/utils';

export function Card({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}>{children}</div>;
}

export function CardHeader({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)}>{children}</div>;
}

export function CardContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)}>{children}</div>;
}
