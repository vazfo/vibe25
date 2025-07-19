import { useState } from "react";

export default function VibePlaylist() {
  const [vibe, setVibe] = useState("");
  const [playlist, setPlaylist] = useState(null);
  const [tab, setTab] = useState("generator");

  const handleGenerate = () => {
    setPlaylist({
      title: `Vibe: ${vibe}`,
      description: "A 25-song playlist to match your mood.",
      songs: Array.from({ length: 25 }, (_, i) => `Song ${i + 1}`),
    });
  };

  const renderTabs = () => (
    <div style={{
      display: "flex",
      justifyContent: "center",
      gap: "1.5rem",
      marginBottom: "2rem",
      fontWeight: 500,
      fontSize: "0.95rem",
      color: "#b3b3b3"
    }}>
      {['generator', 'why', 'how'].map((key) => (
        <button
          key={key}
          onClick={() => setTab(key)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: tab === key ? "#fff" : "#b3b3b3",
            textDecoration: tab === key ? "underline" : "none"
          }}
        >
          {key === 'generator' ? 'Generator' : key === 'why' ? 'Why We Made This' : 'How It Works'}
        </button>
      ))}
    </div>
  );

  const renderContent = () => {
    if (tab === 'why') {
      return (
        <div style={{ maxWidth: "700px", color: "#ccc", textAlign: "center", lineHeight: 1.6 }}>
          <h2 style={{ color: "#1db954", fontSize: "2rem", marginBottom: "1rem" }}>Why We Made Vibe 25</h2>
          <p>
            We built Vibe 25 because music is personal — and you shouldn’t have to search for hours to find the perfect playlist.
            Whether you're feeling nostalgic, heartbroken, or hyped for a night out, you deserve a soundtrack that gets you instantly.
          </p>
        </div>
      );
    }

    if (tab === 'how') {
      return (
        <div style={{ maxWidth: "700px", color: "#ccc", textAlign: "center", lineHeight: 1.6 }}>
          <h2 style={{ color: "#1db954", fontSize: "2rem", marginBottom: "1rem" }}>How It Works</h2>
          <p>
            You type in a mood, theme, or concept. Our AI interprets your vibe, pulls songs using custom logic and Spotify metadata,
            and generates a 25-song playlist with a custom title and description.
          </p>
        </div>
      );
    }

    return (
      <>
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
      </>
    );
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

      {renderTabs()}
      {renderContent()}
    </div>
  );
}

