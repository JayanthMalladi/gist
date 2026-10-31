"use client";

import { useRef, useState } from "react";
import { MAX_UPLOAD_BYTES } from "@/lib/audio";

type Props = {
  onAudio: (file: File, source: "uploaded") => void;
  disabled?: boolean;
};

/**
 * Drag-drop or file input → keeps the original File (name matters for
 * audioFilename). Refuses files over MAX_UPLOAD_BYTES with an inline message.
 */
export default function Uploader({ onAudio, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (file.size > MAX_UPLOAD_BYTES) {
      setError("Audio is over 4 MB. Record a shorter recap or compress it.");
      return;
    }
    setError(null);
    setName(file.name);
    onAudio(file, "uploaded");
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (!disabled) handleFile(e.dataTransfer?.files?.[0]);
        }}
        onClick={() => !disabled && inputRef.current?.click()}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        className={`rounded-sm border border-dashed px-4 py-10 text-center text-[14px] text-stone-500 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E5442F]/60 ${
          disabled
            ? "cursor-not-allowed border-zinc-300 opacity-50"
            : dragging
              ? "cursor-pointer border-[#E5442F] bg-[#F1EADC]/60"
              : "cursor-pointer border-[#1D1A16]/25 bg-black/[0.02] hover:border-[#E5442F]"
        }`}
      >
        {name ? `Loaded ${name} · tap to replace` : "Drop a voice memo or tap to choose (webm, mp3, m4a, wav)"}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="audio/*,.m4a,.mp3,.wav,.webm,.ogg"
        className="hidden"
        disabled={disabled}
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
