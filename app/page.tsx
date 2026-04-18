"use client";
import { useState } from "react";
import { commands } from "@/lib/commands";

export default function Home() {
  const [input, setInput] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = Object.keys(commands).filter((cmd) =>
    cmd.startsWith(input.replace("!", "").toLowerCase()),
  );

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
      <div className="relative w-100">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (!input.startsWith("!")) return;

            if (e.key === "ArrowDown") {
              e.preventDefault();
              setSelectedIndex((prev) =>
                prev < filteredCommands.length - 1 ? prev + 1 : 0,
              );
            }

            if (e.key === "ArrowUp") {
              e.preventDefault();
              setSelectedIndex((prev) =>
                prev > 0 ? prev - 1 : filteredCommands.length - 1,
              );
            }

            if (e.key === "Enter") {
              e.preventDefault();

              if (filteredCommands.length > 0) {
                setInput(`!${filteredCommands[selectedIndex]} `);
                setSelectedIndex(0);
              } else {
                handleSearch();
              }
            }
          }}
          placeholder="Type !leet dp"
          className="w-100 p-4 rounded-xl bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white"
        />

        {input.startsWith("!") && filteredCommands.length > 0 && (
          <div className="absolute mt-2 w-full bg-zinc-900 border border-zinc-700 rounded-xl max-h-48 overflow-y-auto">
            {filteredCommands.map((cmd, index) => (
              <div
                key={cmd}
                className={`p-3 cursor-pointer ${
                  index === selectedIndex ? "bg-zinc-800" : "hover:bg-zinc-800"
                }`}
                onClick={() => setInput(`!${cmd} `)}
              >
                {cmd}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
