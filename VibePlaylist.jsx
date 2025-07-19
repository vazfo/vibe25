import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import "./SpotifyThemeCSS.css";

export default function VibePlaylist() {
  const [vibe, setVibe] = useState("");
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState(null);
  const [tab, setTab] = useState("generator");

  const handleGenerate = async () => {
    setLoading(true);
    setTimeout(() => {
      setPlaylist({
        title: `Vibe: ${vibe}`,
        description: "A curated 25-song playlist to match your vibe.",
        thumbnail: "https://via.placeholder.com/300x300.png?text=Your+Vibe",
        songs: Array.from({ length: 25 }, (_, i) => `Song ${i + 1}`)
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="content-container">
      <h1 className="text-5xl font-extrabold mb-2 text-green-500 title-text">Vibe 25</h1>
      <p className="mb-6 text-gray-300">Type in a mood, theme, or concept — we’ll make the perfect playlist.</p>
      <div className="flex items-center gap-2 mb-6 w-full max-w-xl">
        <Input
          type="text"
          value={vibe}
          onChange={(e) => setVibe(e.target.value)}
          placeholder="e.g. summer nostalgia, heartbreak, beach sunset"
          className="flex-1 text-black"
        />
        <Button onClick={handleGenerate} disabled={loading || !vibe}>
          {loading ? <Loader2 className="animate-spin" /> : "Generate"}
        </Button>
      </div>
      {playlist && (
        <Card className="section-card text-left w-full max-w-4xl">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <img src={playlist.thumbnail} alt="thumbnail" className="w-40 h-40 rounded-xl object-cover thumbnail" />
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-white">{playlist.title}</h2>
                <p className="description">{playlist.description}</p>
                <ul className="tracklist list-disc pl-5 space-y-1 text-sm">
                  {playlist.songs.map((song, index) => (
                    <li key={index}>{song}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
