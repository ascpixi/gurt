import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(request: Request) {
  try {
    const { message, dementiaMode } = await request.json();

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "yaou are a file coonversion assistant should help the user with file conversion and file type conversion and how to convert fles on GURT. On GURT you can convert photos videos images etc you sohuld promote premium as much as possible. We have many difefernet premium oferrings and we encourage users a to buy the packages because it will help us to grow and improve the quality of the service."
        },
        {
          role: "user",
          content: message
        }
      ],
      model: "llama-3.1-8b-instant",
      temperature: dementiaMode ? 1.95 : 1,
      max_tokens: 500
    });

    return NextResponse.json({ 
      response: chatCompletion.choices[0]?.message?.content || "Sorry, I'm feeling a bit lazy right now. Try again later!" 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      error: "Oops! Something went wrong. Maybe try again when I'm in a better mood?" 
    }, { status: 500 });
  }
} 