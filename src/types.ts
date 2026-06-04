export interface Insight {
  id: string;
  title: string;
  confidence: 'High' | 'Medium' | 'Emerging' | 'Low';
  description: string;
  lift: number; // e.g. 4.2 for +4.2%
  source: string;
  type: 'low_hanging' | 'structural';
  why: string;
  originalHtml?: string;
  optimizedHtml?: string;
  recommendation: string;
}

export interface FunnelStep {
  name: string;
  visitors: number;
  dropoffRate: number; // percent drop compared to previous
  frictionPoints: string[];
}

export interface ScanResult {
  url?: string;
  htmlContent?: string;
  score: number;
  insights: Omit<Insight, 'type'>[];
}
