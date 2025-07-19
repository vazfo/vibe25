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
      fontFamily: "'Helvetica Neue', sans-serif",
      padding: "4rem 2rem",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <h1 style={{ fontSize: "4rem", color: "#1db954", marginBottom: "0.5rem" }}>Vibe 25</h1>
      <p style={{ fontSize: "1.2rem", color: "#ccc", marginBottom: "2rem" }}>Playlist Generator</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem", width: "100%", maxWidth: "600px" }}>
        <input
          type="text"
          placeholder="Enter a mood, theme, or vibe..."
          value={vibe}
          onChange={(e) => setVibe(e.target.value)}
          style={{
            flex: 1,
            padding: "0.75rem 1rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "none",
            outline: "none"
          }}
        />
        <button
          onClick={handleGenerate}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            background: "#1db954",
            color: "black",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Generate
        </button>
      </div>

      {playlist && (
        <div style={{
          background: "#121212",
          borderRadius: "12px",
          padding: "2rem",
          width: "100%",
          maxWidth: "700px",
          boxShadow: "0 0 20px rgba(0,0,0,0.4)"
        }}>
          <h2 style={{ color: "#1db954", fontSize: "2rem", marginBottom: "0.5rem" }}>{playlist.title}</h2>
          <p style={{ color: "#aaa", marginBottom: "1.5rem" }}>{playlist.description}</p>
          <div style={{ columns: 2, gap: "2rem", color: "#eee", fontSize: "0.95rem" }}>
            {playlist.songs.map((song, i) => (
              <div key={i} style={{ marginBottom: "0.5rem" }}>• {song}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
