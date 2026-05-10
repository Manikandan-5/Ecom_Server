const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.generateDescription = async (req, res) => {

  try {

    const { title } = req.body;

   const completion =
  await groq.chat.completions.create({

    messages: [
      {
        role: "user",

        content: `
Write a professional ecommerce product description for ${title}.

Rules:
- Maximum 40 words
- Only 2 sentences
- Simple English
- No headings
- No bullet points
- No price
- No emojis
`
      }
    ],

    model: "llama-3.1-8b-instant",

  });

    res.status(200).json({
      description:
        completion.choices[0].message.content,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "AI generation failed",
    });

  }

};