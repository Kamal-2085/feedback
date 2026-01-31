"use client";

import * as React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ children, className, ...props }: DivProps) {
  return (
    <div
      className={["rounded-lg bg-white/5 p-4 shadow-sm", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }: DivProps) {
  return (
    <div className={["mb-2", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }: DivProps) {
  return (
    <h3
      className={["text-lg font-semibold", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardContent({ children, className, ...props }: DivProps) {
  return (
    <div
      className={["text-sm", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
