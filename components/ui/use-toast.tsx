"use client";

import { toast as sonnerToast } from "sonner";

type AnyToast = (...args: any[]) => void;

export function useToast(): { toast: AnyToast } {
  return { toast: sonnerToast as AnyToast };
}
