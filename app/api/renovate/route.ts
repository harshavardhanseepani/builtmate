import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const STYLE_CONCEPT_CATALOG: Record<string, string[]> = {
  'Modern Minimalist': [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1600'
  ],
  'Kerala Contemporary': [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1600'
  ],
  'Ultra-Luxury Villa': [
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1600'
  ],
  'Brutalist Brick': [
    'https://images.unsplash.com/photo-1541888086925-920eb1f1dc17?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1600'
  ],
  'Classical Colonial': [
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1600'
  ]
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      photos = [],
      scope = 'FACADE_MODERNIZATION',
      style = 'Modern Minimalist',
      budget = '₹30L – ₹60L',
      preservedFeatures = [],
      customRequirements = ''
    } = body;

    // 1. Analyze and generate architectural renovation concept with Groq AI
    let architecturalReport = {
      scopeTitle: scope === 'FACADE_MODERNIZATION' 
        ? 'Exterior Facade & Elevation Modernization' 
        : scope === 'EXTENSION' 
        ? 'Vertical & Horizontal Floor Extension' 
        : 'Full Structural Architectural Rebuild',
      scopeSummary: 'Comprehensive renovation transforming the existing residence into a contemporary ' + style + ' home while maintaining essential structural integrity.',
      structuralModifications: [
        'Demolish non-load-bearing exterior partition walls and install structural steel beams (ISMB 250).',
        'Replace outdated wooden framing with 6mm toughened double-glazed solar reflective glass facades.',
        'Apply weather-resistant exterior textured acrylic plaster with integrated teak vertical louvers.',
        'Reinforce existing plinth beams to accommodate expanded terrace cantilevered balconies.',
        'Upgrade MEP conduits, conceal electrical distribution lines, and install rainwater harvesting percolation pits.'
      ],
      materials: [
        'UltraTech OPC 53 Grade High Performance Cement',
        'Tata Tiscon Fe550D TMT Corrosion Resistant Rebars',
        'Saint-Gobain Solar Control Reflective Glazing 6mm',
        'High-Density AAC Autoclaved Aerated Blocks',
        'Asian Paints Apex Ultima Protek Exterior Emulsion'
      ],
      estimatedBudget: budget,
      civilCost: '₹14.5L',
      finishCost: '₹11.2L',
      mepCost: '₹6.3L',
      constructionTimeline: scope === 'FACADE_MODERNIZATION' ? '3–5 Months' : scope === 'EXTENSION' ? '6–8 Months' : '10–14 Months',
      permitRequirements: scope === 'COMPLETE_REBUILD' ? 'Full Municipal Corporation Sanction Required' : 'Minor Alteration & Structural Stability Endorsement',
      imagePrompt: 'A photorealistic ultra-high-definition architectural rendering of a renovated residential Indian home, transformed in ' + style + ' style. Features modern white stucco walls, natural wood slats, large glass windows, ambient LED architectural lighting, landscaped garden with stone pathway, modern SUV in driveway, sunny daylight, 8k resolution, architectural magazine photography.'
    };

    // If GROQ_API_KEY is available, produce specialized deep architectural guidance
    const groqKey = process.env.GROQ_API_KEY;
    if (groqKey) {
      try {
        const groq = new Groq({ apiKey: groqKey });
        const systemPrompt = 'You are a chief Indian renovation architect and structural engineer with 25+ years experience.\n' +
'Create a realistic, actionable renovation plan for an existing Indian home.\n' +
'Return a clean JSON object with keys:\n' +
'- "scopeTitle": short title\n' +
'- "scopeSummary": 2-3 sentences explaining how to transform the structure in ' + style + ' style\n' +
'- "structuralModifications": array of 5 concrete engineering actions\n' +
'- "materials": array of 5 specific materials with brand and grade\n' +
'- "civilCost": string in ₹ Lakhs (e.g. "₹14.5L")\n' +
'- "finishCost": string in ₹ Lakhs (e.g. "₹10.8L")\n' +
'- "mepCost": string in ₹ Lakhs (e.g. "₹5.7L")\n' +
'- "constructionTimeline": duration\n' +
'- "permitRequirements": municipal permits needed in Indian cities\n' +
'- "imagePrompt": a vivid prompt for an image generator (modern villa, ' + style + ', glass windows, exterior lighting)';

        const userMessage = 'Renovation Scope: ' + scope + '\n' +
'Target Architectural Style: ' + style + '\n' +
'Budget Range: ' + budget + '\n' +
'Features to Preserve: ' + (preservedFeatures.join(', ') || 'Original foundation and boundary') + '\n' +
'Client Requirements: ' + (customRequirements || 'Modernize facade, enlarge windows, improve curb appeal');

        const completion = await groq.chat.completions.create({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ],
          model: 'llama3-70b-8192',
          response_format: { type: 'json_object' },
          temperature: 0.8,
        });

        const raw = completion.choices[0]?.message?.content || '{}';
        const parsed = JSON.parse(raw);
        architecturalReport = {
          ...architecturalReport,
          ...parsed,
          estimatedBudget: budget
        };
      } catch (e) {
        console.warn('Groq AI renovation analysis warning (using fallback report):', e);
      }
    }

    // 2. Check Image Generation API configuration
    const replicateToken = process.env.REPLICATE_API_TOKEN;
    const openaiKey = process.env.OPENAI_API_KEY;

    let generatedImageUrl = '';
    let apiStatus: 'SUCCESS' | 'API_KEY_REQUIRED' = 'API_KEY_REQUIRED';
    let missingKeyNotice = '';

    // Pick a random variation from the catalog for the selected style
    const styleConcepts = STYLE_CONCEPT_CATALOG[style] || STYLE_CONCEPT_CATALOG['Modern Minimalist'];
    const randomConcept = styleConcepts[Math.floor(Math.random() * styleConcepts.length)];

    if (openaiKey) {
      try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + openaiKey
          },
          body: JSON.stringify({
            model: 'dall-e-3',
            prompt: architecturalReport.imagePrompt,
            n: 1,
            size: '1024x1024',
            quality: 'standard'
          })
        });

        if (response.ok) {
          const data = await response.json();
          generatedImageUrl = data.data?.[0]?.url || '';
          if (generatedImageUrl) {
            apiStatus = 'SUCCESS';
          }
        }
      } catch (err) {
        console.error('OpenAI image generation error:', err);
      }
    } else if (replicateToken) {
      try {
        const response = await fetch('https://api.replicate.com/v1/predictions', {
          method: 'POST',
          headers: {
            'Authorization': 'Token ' + replicateToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            version: '39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
            input: {
              prompt: architecturalReport.imagePrompt,
              width: 1024,
              height: 768
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.output && Array.isArray(data.output)) {
            generatedImageUrl = data.output[0];
            apiStatus = 'SUCCESS';
          }
        }
      } catch (err) {
        console.error('Replicate image generation error:', err);
      }
    }

    if (apiStatus === 'API_KEY_REQUIRED') {
      missingKeyNotice = 'Live AI diffusion rendering requires an image generation API key (e.g. REPLICATE_API_TOKEN or OPENAI_API_KEY) in .env.local. The architectural structural plan has been generated with a concept preview.';
      generatedImageUrl = randomConcept;
    }

    return NextResponse.json({
      success: true,
      api_status: apiStatus,
      missingKeyNotice,
      report: architecturalReport,
      originalPhoto: photos[0] || null,
      proposedImageUrl: generatedImageUrl,
      availableConcepts: styleConcepts,
      selectedStyle: style,
      selectedScope: scope
    });

  } catch (error: any) {
    console.error('Renovate API error:', error);
    return NextResponse.json(
      { error: 'Failed to process renovation request. Please try again.' },
      { status: 500 }
    );
  }
}
