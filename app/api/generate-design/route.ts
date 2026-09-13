import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(req: Request) {
  try {
    const { prompt, plotSize, floors, bhk, style, bedrooms, bathrooms, balcony, parking, garden, rooftop, openKitchen, pooja, studyRoom, servantRoom, facing, budget, extraDetails } = await req.json();

    if (!prompt && !extraDetails) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const systemPrompt = `You are a world-class Indian architectural designer and construction consultant with 30+ years of experience. 
You specialize in residential buildings across India.

Your task is to generate a UNIQUE, HIGHLY DETAILED architectural design concept based on the client's requirements. 
Every response must be distinct — never repeat generic descriptions. Be creative, specific, and professional.

Return a JSON object with these EXACT keys:
- "description": A vivid, specific 3-4 sentence architectural description. Mention the style, key visual elements, materials, and how the space feels. Make it feel like a premium design brief.
- "features": An array of exactly 6 specific architectural/design features (be concrete, not generic — e.g. "Cantilevered first-floor balcony with toughened glass railing" not just "balcony")
- "materials": An array of exactly 5 specific materials with grades (e.g. "Fe 500D TMT Steel", "OPC 53 Grade Cement", "Vitrified Tiles 800x800mm")
- "estimatedBudget": A realistic INR budget range based on plot size, floors, and specifications (e.g. "₹42L – ₹58L")
- "constructionTimeline": Estimated construction duration (e.g. "14–18 months")
- "architect_notes": One sentence of a specific expert recommendation for this project

Indian construction context: cost ₹1500–₹3500/sqft depending on quality. Factor in the plot size, floors, rooms, and premium features.`;

    const userMessage = `Design a ${style} house with these specifications:
- Plot Size: ${plotSize} sqft
- Number of Floors: ${floors}
- BHK Configuration: ${bhk} BHK
- Bedrooms: ${bedrooms}
- Bathrooms: ${bathrooms}
- Balcony: ${balcony}
- Parking: ${parking}
- Garden/Lawn: ${garden}
- Rooftop Terrace: ${rooftop}
- Open Kitchen: ${openKitchen}
- Pooja Room: ${pooja}
- Study Room: ${studyRoom}
- Servant Room: ${servantRoom}
- House Facing: ${facing}
- Budget Range: ${budget}
- Client Vision: ${prompt || 'Modern comfortable family home'}
- Additional Requirements: ${extraDetails || 'None'}

Generate a unique, premium architectural concept for this Indian residential project.`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      model: 'llama3-70b-8192',
      response_format: { type: 'json_object' },
      temperature: 0.9,
    });

    const raw = completion.choices[0]?.message?.content || '{}';
    const result = JSON.parse(raw);

    return NextResponse.json({
      description: result.description || 'A stunning modern architectural concept.',
      features: result.features || [],
      materials: result.materials || [],
      estimatedBudget: result.estimatedBudget || '₹30L – ₹60L',
      constructionTimeline: result.constructionTimeline || '12–18 months',
      architect_notes: result.architect_notes || ''
    });

  } catch (error: any) {
    console.error('Groq AI Error:', error);
    return NextResponse.json({ error: 'Failed to generate design' }, { status: 500 });
  }
}
