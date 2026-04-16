"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (!input.startsWith("!")) return;

    const [cmd, ...rest] = input.slice(1).split(" ");
    const query = rest.join(" ");

    let url = " ";

    if (cmd === "leet") {
      url = `https://leetcode.com/problemset/?search=${query}`;
    } else if (cmd === "yt") {
      url = `https://www.youtube.com/results?search_query=${query}`;
    } else if (cmd === "gate") {
      url = `https://www.google.com/search?q=gate+${query}`;
    }

    if (url) {
      window.location.href = url;
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
          if (e.key === "Enter") handleSearch();
        }}
        placeholder="Type !leet dp"
        className="w-100 p-4 rounded-xl bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white"
      />
    </main>
  );
}
