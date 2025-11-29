"use client";
import React, { useState } from 'react';

type Props = {
  value?: string[];
  onChange?: (tags: string[]) => void;
};

export default function TagInput({ value = [], onChange }: Props) {
  const [tags, setTags] = useState<string[]>(value);
  const [text, setText] = useState('');

  function addTag(t: string) {
    const nt = t.trim();
    if (!nt) return;
    if (!tags.includes(nt)) {
      const newTags = [...tags, nt];
      setTags(newTags);
      onChange?.(newTags);
    }
    setText('');
  }

  function removeTag(idx: number) {
    const newTags = tags.filter((_, i) => i !== idx);
    setTags(newTags);
    onChange?.(newTags);
  }

  return (
    <div>
      <div className="flex gap-2 flex-wrap">
        {tags.map((t, i) => (
          <span key={t} className="bg-gray-700 text-sm px-2 py-1 rounded flex items-center gap-2">
            <span>{t}</span>
            <button type="button" onClick={() => removeTag(i)} className="text-xs text-red-300 cursor-pointer">×</button>
          </span>
        ))}
      </div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addTag(text);
          }
        }}
        placeholder="Add tag and press Enter"
        className="mt-2 p-2 border rounded w-full bg-gray-800 text-white"
      />
    </div>
  );
}
