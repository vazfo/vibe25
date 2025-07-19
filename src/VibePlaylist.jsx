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
      background: "linear-gradient(to bottom right, #121212, #1db954)",
      color: "#fff",
      fontFamily: "'Circular', 'Helvetica Neue', sans-serif",
      padding: "4rem 2rem",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <h1 style={{
        fontSize: "3.5rem",
        color: "#1db954",
        marginBottom: "0.25rem",
        fontWeight: "700"
      }}>
        Vibe 25
      </h1>
      <p style={{
        fontSize: "1.25rem",
        color: "#b3b3b3",
        marginBottom: "2.5rem"
      }}>
        Playlist Generator
      </p>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        marginBottom: "2rem",
        width: "100%",
        maxWidth: "600px"
      }}>
        <input
          type="text"
          placeholder="Enter a mood, theme, or vibe..."
          value={vibe}
          onChange={(e) => setVibe(e.target.value)}
          style={{
            flex: 1,
            padding: "0.75rem 1rem",
            fontSize: "1rem",
            borderRadius: "30px",
            border: "1px solid #333",
            backgroundColor: "#181818",
            color: "#fff",
            outline: "none",
            transition: "all 0.2s ease-in-out",
            boxShadow: "0 0 0 0 rgba(29,185,84, 0)"
          }}
          onFocus={(e) => e.target.style.boxShadow = "0 0 0 3px rgba(29,185,84, 0.6)"}
          onBlur={(e) => e.target.style.boxShadow = "0 0 0 0 rgba(29,185,84, 0)"}
        />
        <button
          onClick={handleGenerate}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            background: "#1db954",
            color: "#000",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background 0.3s ease"
          }}
          onMouseOver={(e) => e.target.style.background = "#1ed760"}
          onMouseOut={(e) => e.target.style.background = "#1db954"}
        >
          Generate
        </button>
      </div>

      {playlist && (
        <div style={{
          background: "#181818",
          borderRadius: "16px",
          padding: "2rem",
          width: "100%",
          maxWidth: "700px",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)"
        }}>
          <h2 style={{ color: "#1db954", fontSize: "2rem", marginBottom: "0.5rem" }}>{playlist.title}</h2>
          <p style={{ color: "#ccc", marginBottom: "1.5rem", fontSize: "1rem" }}>{playlist.description}</p>
          <div style={{
            columns: 2,
            gap: "2rem",
            color: "#eee",
            fontSize: "0.95rem",
            lineHeight: "1.6"
          }}>
            {playlist.songs.map((song, i) => (
              <div key={i} style={{ marginBottom: "0.5rem" }}>• {song}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

