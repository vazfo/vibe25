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
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vibe }),
      });

      const data = await response.json();
      setPlaylist(data);
    } catch (error) {
      console.error("Failed to generate playlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderSpotifyLogo = () => (
    <svg className="w-6 h-6 fill-green-500" viewBox="0 0 168 168" xmlns="http://www.w3.org/2000/svg">
      <path d="M84,0C37.7,0,0,37.7,0,84s37.7,84,84,84s84-37.7,84-84S130.3,0,84,0z M122.9,120.5c-1.4,2.2-4.3,2.8-6.4,1.4
        c-17.5-10.7-39.6-13.1-65.6-7.1c-2.5,0.6-5-1-5.7-3.4c-0.6-2.5,1-5,3.4-5.7c29.4-6.9,55.6-4.1,76.1,8.3
        C123.7,115.6,124.3,118.4,122.9,120.5z M132.4,98.2c-1.7,2.6-5.2,3.3-7.7,1.6c-20-12.3-50.5-15.9-74.1-8.6c-3,0.9-6.2-0.8-7.1-3.8
        c-0.9-3,0.8-6.2,3.8-7.1c28.5-8.5,63.3-4.4,87.3,10.1C133.4,92.1,134.1,95.6,132.4,98.2z M134.8,75.5c-24-14.4-63.4-15.8-86.2-8.6
        c-3.4,1.1-7.1-0.8-8.2-4.3c-1.1-3.4,0.8-7.1,4.3-8.2c26.5-8.3,70.1-6.7,98.7,10.1c3.1,1.9,4.1,6.1,2.2,9.2
        C143.8,76.4,138.5,77.7,134.8,75.5z"/>
    </svg>
  );

  const renderContent = () => {
    if (tab === "why") {
      return (
        <div className="section-card max-w-2xl mx-auto text-gray-300">
          <h2 className="text-3xl font-bold mb-4 title-text">Why We Made Vibe 25</h2>
          <p className="description">
            We built Vibe 25 because music is personal — and you shouldn’t have to search for hours to find the perfect playlist. Whether you're feeling nostalgic, heartbroken, or hyped for a night out, you deserve a soundtrack that just gets you.
          </p>
          <p className="description">
            With AI, we can instantly generate a playlist that matches your energy. This is about more than just music — it's about mood, memory, and moments.
          </p>
        </div>
      );
    }
    if (tab === "how") {
      return (
        <div className="section-card max-w-2xl mx-auto text-gray-300">
          <h2 className="text-3xl font-bold mb-4 title-text">How It Works</h2>
          <p className="description">
            You type in a mood, theme, or concept. Our AI interprets your vibe, pulls song recommendations using internal logic and Spotify metadata, and generates a 25-song playlist just for you — complete with a title, description, and a custom thumbnail.
          </p>
          <p className="description">
            When you're ready, hit “Save to Spotify” and it goes straight to your account.
          </p>
        </div>
      );
    }

    return (
      <div className="content-container">
        <h1 className="text-5xl font-extrabold mb-2 text-green-500 title-text">Vibe 25</h1>
        <p className="text-green-400 flex items-center justify-center gap-2 mb-6">
          {renderSpotifyLogo()} Playlist Generator
        </p>
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
                <img src={playlist.image} alt="thumbnail" className="w-40 h-40 rounded-xl object-cover thumbnail" />
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-white">{playlist.title}</h2>
                  <p className="description mb-2">{playlist.description}</p>
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-green-900 text-white p-8 font-sans">
      <div className="flex justify-center gap-6 text-gray-400 mb-10 text-sm font-medium tracking-wide">
        <button onClick={() => setTab("generator")} className={tab === "generator" ? "text-white underline underline-offset-4" : "hover:text-white"}>Generator</button>
        <button onClick={() => setTab("why")} className={tab === "why" ? "text-white underline underline-offset-4" : "hover:text-white"}>Why We Made This</button>
        <button onClick={() => setTab("how")} className={tab === "how" ? "text-white underline underline-offset-4" : "hover:text-white"}>How It Works</button>
      </div>

      {renderContent()}
    </div>
  );
}

