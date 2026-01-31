"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  message: any;
  onMessageDelete: (id: string) => void;
};

export default function MessageCard({ message, onMessageDelete }: Props) {
  const createdAt = message?.createdAt ? new Date(message.createdAt) : null;

  return (
    <div className="p-4 border rounded-md bg-gray-50">
      <p className="mb-2">{message?.content}</p>
      {createdAt && (
        <p className="text-xs text-muted-foreground mb-2">
          {createdAt.toLocaleString()}
        </p>
      )}
      <div className="flex gap-2">
        <Button
          variant="destructive"
          onClick={() => onMessageDelete(message?._id || message?.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
