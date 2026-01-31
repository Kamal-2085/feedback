"use client";

import React from "react";

type Props = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
};

export function Switch({
  checked,
  onCheckedChange,
  disabled,
  className,
  ...props
}: Props) {
  return (
    <input
      type="checkbox"
      checked={!!checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      disabled={disabled}
      className={className}
      {...props}
    />
  );
}

export default Switch;
