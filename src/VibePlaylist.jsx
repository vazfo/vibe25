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
    <div style={{ background: "black", color: "white", minHeight: "100vh", padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "3rem", color: "#1DB954" }}>Vibe 25</h1>
      <p>Playlist Generator</p>

      <input
        type="text"
        placeholder="Enter a vibe..."
        value={vibe}
        onChange={(e) => setVibe(e.target.value)}
        style={{ padding: "0.5rem", fontSize: "1rem", marginRight: "1rem" }}
      />
      <button onClick={handleGenerate} style={{ padding: "0.5rem", fontSize: "1rem" }}>Generate</button>

      {playlist && (
        <div style={{ marginTop: "2rem" }}>
          <h2>{playlist.title}</h2>
          <p>{playlist.description}</p>
          <ul>
            {playlist.songs.map((song, index) => (
              <li key={index}>{song}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

