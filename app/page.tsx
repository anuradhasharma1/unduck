"use client";
import { useState } from "react";
import { commands } from "@/lib/commands";

export default function Home() {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    const trimmed = input.trim();

    if (!trimmed.startsWith("!")) return;

    const parts = trimmed.slice(1).split(" ");
    const cmd = parts[0].toLowerCase();
    const query = parts.slice(1).join(" ");

    const baseUrl = commands[cmd];

    if (baseUrl) {
      const finalUrl = query ? baseUrl + encodeURIComponent(query) : baseUrl;
      window.location.href = finalUrl;
      setInput("");
    } else {
      alert("Command not found");
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-black text-white">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
          }
        }}
        placeholder="Type !leet dp"
        className="w-100 p-4 rounded-xl bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white"
      />
    </main>
  );
}
