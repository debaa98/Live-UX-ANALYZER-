import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to support JSON parsing
  app.use(express.json());

  // API endpoint for DOM HTML optimization analysis (real Gemini integration!)
  app.post('/api/optimize', async (req, res) => {
    const { html } = req.body;
    if (!html) {
      return res.status(400).json({ error: 'HTML body content is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      console.warn('GEMINI_API_KEY is not defined. Initiating rich fallback mocks on backend...');
      return res.status(500).json({ error: 'API key not configured' });
    }

    try {
      // Lazy Initialization of Gemini SDK to prevent startup failures on empty keys
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: `Analyze the following HTML code representation and identify exactly 1-2 major user-friction or accessibility issues. Output a detailed JSON report including estimated conversion lift percentage (as a plain floating point number), specific correction suggestions, why it is a friction trigger, and fully corrected optimized HTML blocks. Code snippet:\n\n${html}`,
        config: {
          systemInstruction: 'You are a veteran principal UX engineer specializing in high-converting, accessible user interfaces and conversion rate optimization (CRO) telemetry audits.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { 
                type: Type.INTEGER, 
                description: 'The overall UX performance health score representing DOM friction, from 0 to 100.' 
              },
              insights: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING, description: 'A unique hyphenated string id (e.g. scanned-insight-1)' },
                    title: { type: Type.STRING, description: 'Short actionable title of the optimization (e.g. "Fix button visibility contrast")' },
                    confidence: { type: Type.STRING, description: 'Confidence level rating: "High", "Medium", "Emerging", or "Low"' },
                    description: { type: Type.STRING, description: 'Comprehensive details on what user-friction layout issues was identified in the HTML' },
                    lift: { type: Type.NUMBER, description: 'Estimated conversion rate lift percentage (e.g. 4.2)' },
                    source: { type: Type.STRING, description: 'Identified source trigger context (e.g. "Contrast validation algorithm")' },
                    why: { type: Type.STRING, description: 'Description of the behavioral science or user study backing why this issue causes friction' },
                    recommendation: { type: Type.STRING, description: 'A clear prescription detailing what styling modifications or HTML changes to make.' },
                    originalHtml: { type: Type.STRING, description: 'The original outdated HTML fragment provided' },
                    optimizedHtml: { type: Type.STRING, description: 'The fully corrected, beautiful, optimized HTML structure with inline tailwind CSS or standard tags.' }
                  },
                  required: ['id', 'title', 'confidence', 'description', 'lift', 'source', 'why', 'recommendation', 'originalHtml', 'optimizedHtml']
                }
              }
            },
            required: ['score', 'insights']
          }
        }
      });

      const text = response.text || '';
      const parsedReport = JSON.parse(text.trim());
      return res.json(parsedReport);

    } catch (err: any) {
      console.error('Gemini Optimization Failure:', err);
      return res.status(500).json({ error: 'Failed to process optimize request', details: err.message });
    }
  });

  // Serve static assets and Vite server depending on runtime configuration environment
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`UX Optimiser full-stack server running on http://localhost:${PORT}`);
  });
}

startServer();
