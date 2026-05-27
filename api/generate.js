export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { question, level, responseLength } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Falta la pregunta." });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    const model = process.env.CLAUDE_MODEL || "claude-haiku-4-5-20251001";

    if (!apiKey) {
      return res.status(500).json({ error: "Falta configurar ANTHROPIC_API_KEY en Vercel." });
    }

    const levelDescriptions = {
      cero: "complete beginner with almost no English knowledge",
      basico: "beginner at A1 level",
      a2b1: "upper beginner at A2 level almost reaching B1",
      intermedio: "intermediate level student"
    };

    const lengthDescriptions = {
      corta: "very short, only 1 or 2 sentences",
      media: "medium length, 3 or 4 short sentences",
      larga: "a little longer, 5 or 6 short sentences"
    };

    const systemPrompt = `
You are a simple English tutor.
Answer the student's question directly.
Do not repeat the same idea many times.
Use simple English.
Use short sentences.
Be natural, but clear.
The student level is: ${levelDescriptions[level] || levelDescriptions.a2b1}.
The answer length must be: ${lengthDescriptions[responseLength] || lengthDescriptions.corta}.
If the question asks for a fact, answer the fact first.
`;

    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model,
        max_tokens: 500,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: `Student question: ${question}`
          }
        ]
      })
    });

    const data = await anthropicResponse.json();

    if (!anthropicResponse.ok) {
      return res.status(anthropicResponse.status).json({
        error: data.error?.message || "Error al conectar con Claude."
      });
    }

    const answer = data.content?.[0]?.text || "I am sorry. I could not create an answer.";

    return res.status(200).json({ answer });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Error interno del servidor."
    });
  }
}
