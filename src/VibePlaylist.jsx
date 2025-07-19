import { useState } from "react";

export default function VibePlaylist() {
  const [vibe, setVibe] = useState("");
  const [playlist, setPlaylist] = useState(null);

  const handleGenerate = () => {
    setPlaylist({
      title: `Vibe: ${vibe}`,
      description: "A 25-song playlist to match your mood.",
      songs: Array.from({ length: 25 }, (_, i) => `Song ${i + 1}`),
    });
  };

  return (
    <div style={{
      background: "linear-gradient(to bottom right, #000, #1db954)",
      color: "white",
      fontFamily: "sans-serif",
      padding: "2rem",
      minHeight: "100vh"
    }}>
      <h1 style={{ fontSize: "3rem", color: "#1db954" }}>Vibe 25</h1>
      <p style={{ marginBottom: "1rem" }}>Playlist Generator</p>

      <input
        type="text"
        placeholder="Enter a mood, theme, or vibe..."
        value={vibe}
        onChange={(e) => setVibe(e.target.value)}
        style={{ padding: "0.5rem", width: "60%", marginRight: "1rem", fontSize: "1rem" }}
      />
      <button
        onClick={handleGenerate}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          background: "#1db954",
          color: "black",
          border: "none",
          cursor: "pointer"
        }}
      >
        Generate
      </button>

      {playlist && (
        <div style={{ marginTop: "2rem", backgroundColor: "#222", padding: "1rem", borderRadius: "0.5rem" }}>
          <h2 style={{ color: "#1db954" }}>{playlist.title}</h2>
          <p>{playlist.description}</p>
          <ul style={{ columns: 2, marginTop: "1rem" }}>
            {playlist.songs.map((song, i) => (
              <li key={i}>{song}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
