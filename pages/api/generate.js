export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { vibe } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Missing OpenAI API key" });
  }

  try {
    // 1. Generate playlist content using GPT
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a playlist curator that creates 25-song Spotify-style playlists. Based on the user’s vibe, respond with: a playlist title, a short description, and 25 song names (real or made-up, but fitting the vibe).",
          },
          {
            role: "user",
            content: vibe,
          },
        ],
      }),
    });

    const data = await completion.json();
    const rawText = data.choices[0].message.content;

    const titleMatch = rawText.match(/Title:\s*(.+)/i);
    const descMatch = rawText.match(/Description:\s*(.+)/i);
    const songsMatch = rawText.match(/Songs:\s*([\s\S]*)/i);

    const title = titleMatch ? titleMatch[1].trim() : "Vibe Playlist";
    const description = descMatch ? descMatch[1].trim() : "A playlist to match your mood.";
    const songs = songsMatch
      ? songsMatch[1]
          .split(/\n/)
          .filter((line) => line.trim())
          .map((s) => s.replace(/^\d+\.\s*/, "").trim())
      : [];

    // 2. Generate playlist image using DALL·E
    const imageResponse = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: `Playlist cover art for a mood: ${vibe}. Style: cinematic, digital art, Spotify aesthetic.`,
        n: 1,
        size: "1024x1024",
      }),
    });

    const imageData = await imageResponse.json();
    const image = imageData.data?.[0]?.url || "https://via.placeholder.com/300x300.png?text=Vibe25";

    res.status(200).json({
      title,
      description,
      songs: songs.slice(0, 25),
      image,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate playlist" });
  }
}
