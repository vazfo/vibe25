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
      background: "linear-gradient(145deg, #121212, #1db954)",
      color: "#fff",
      fontFamily: "'Circular', 'Helvetica Neue', sans-serif",
      padding: "4rem 1.5rem",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: "2rem",
      transition: "all 0.3s ease-in-out"
    }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", color: "#1db954", fontWeight: 700 }}>Vibe 25</h1>
        <p style={{ fontSize: "1.2rem", color: "#b3b3b3" }}>Playlist Generator</p>
      </div>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1rem",
        width: "100%",
        maxWidth: "600px"
      }}>
        <input
          type="text"
          placeholder="Type a mood, theme, or vibe..."
          value={vibe}
          onChange={(e) => setVibe(e.target.value)}
          style={{
            flex: 1,
            padding: "0.8rem 1rem",
            fontSize: "1rem",
            borderRadius: "50px",
            border: "1px solid #333",
            backgroundColor: "#1e1e1e",
            color: "#fff",
            outline: "none",
            transition: "0.3s ease",
            boxShadow: "0 0 0 0 rgba(29,185,84, 0)"
          }}
          onFocus={(e) => e.target.style.boxShadow = "0 0 0 3px rgba(29,185,84, 0.4)"}
          onBlur={(e) => e.target.style.boxShadow = "0 0 0 0 rgba(29,185,84, 0)"}
        />
        <button
          onClick={handleGenerate}
          style={{
            padding: "0.8rem 1.5rem",
            fontSize: "1rem",
            background: "#1db954",
            color: "black",
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            fontWeight: 600,
            transition: "0.3s ease"
          }}
          onMouseEnter={(e) => e.target.style.background = "#1ed760"}
          onMouseLeave={(e) => e.target.style.background = "#1db954"}
        >
          Generate
        </button>
      </div>

      {playlist && (
        <div style={{
          backgroundColor: "#181818",
          padding: "2rem",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "700px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          transition: "all 0.3s ease"
        }}>
          <h2 style={{ fontSize: "1.75rem", color: "#1db954", marginBottom: "0.5rem" }}>{playlist.title}</h2>
          <p style={{ color: "#ccc", marginBottom: "1.5rem" }}>{playlist.description}</p>
          <div style={{
            columns: 2,
            gap: "2rem",
            color: "#eee",
            fontSize: "0.95rem",
            lineHeight: 1.6
          }}>
            {playlist.songs.map((song, i) => (
              <div key={i}>• {song}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
