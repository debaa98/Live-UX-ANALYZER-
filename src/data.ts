import { Insight, FunnelStep } from './types';

export const initialInsights: Insight[] = [
  {
    id: 'insight-1',
    title: 'Fix checkout button contrast on mobile',
    confidence: 'High',
    description: "The primary 'Complete Purchase' button on viewport widths < 480px fails WCAG AA contrast ratio against the light gray background, causing a significant drop-off in the final funnel stage.",
    lift: 4.2,
    source: 'Checkout Flow Heatmap',
    type: 'low_hanging',
    why: 'Only 64% of mobile users tap in the checkout submission area compared to 91% on desktop, indicating visibility confusion in ambient lighting conditions.',
    recommendation: 'Update button colors to use a high-contrast theme: set background to Action Teal (#006A61) and text to white, achieving a 6.2:1 contrast ratio.',
    originalHtml: `<!-- Old Code -->
<button class="bg-[#e2e3e5] text-[#45464d] py-3 px-6 rounded w-full">
  Complete Purchase
</button>`,
    optimizedHtml: `<!-- AI-Optimized Code -->
<button class="bg-[#006a61] text-white py-3 px-6 rounded w-full font-semibold border-b-2 border-[#005049] transition-all hover:bg-teal-700 active:translate-y-px">
  Complete Purchase
</button>`
  },
  {
    id: 'insight-2',
    title: "Remove secondary field 'Company Name'",
    confidence: 'Medium',
    description: "Time-to-complete on the signup form increases by 14 seconds when users interact with the 'Company Name' field. It is optional but creates perceived friction.",
    lift: 2.8,
    source: 'Form Analytics',
    type: 'low_hanging',
    why: 'Required analytical inputs combined with secondary text-entry fields increase abandonment rate on mobile devices where soft keyboards are intrusive.',
    recommendation: 'Eliminate the standard text input and replace it with a text disclosure link that reveals the field only if user explicitly clicks it.',
    originalHtml: `<!-- Old Code -->
<label class="block text-sm text-gray-600 mb-1">Company Name (Optional)</label>
<input type="text" name="company" class="border border-gray-300 rounded p-2 w-full mb-3" />`,
    optimizedHtml: `<!-- AI-Optimized Code -->
<div class="mb-3">
  <button type="button" onclick="this.nextElementSibling.classList.toggle('hidden')" class="text-xs text-[#006a61] hover:underline flex items-center gap-1 font-medium">
    + Add company details (Optional)
  </button>
  <input type="text" name="company" class="hidden border border-gray-300 rounded p-2 text-sm w-full mt-2" />
</div>`
  },
  {
    id: 'insight-3',
    title: "Elevate 'Social Proof' section on Homepage",
    confidence: 'Emerging',
    description: 'Only 22% of users scroll down to the testimonials section. Moving this block above the fold correlates strongly with increased click-through to pricing.',
    lift: 1.5,
    source: 'Scroll Depth Tracking',
    type: 'low_hanging',
    why: 'Testimonials located below pricing cards do not influence top-funnel doubts. Users need immediate social validation before investing time into examining fees.',
    recommendation: 'Incorporate a mini trust banner of partner logos and a singular high-impact multi-star testimonial review directly beneath the secondary call-to-action button.',
    originalHtml: `<!-- Old Code: Placed far below pricing charts -->
<section id="pricing">...</section>
<section id="testimonials" class="bg-gray-50 py-12">...</section>`,
    optimizedHtml: `<!-- AI-Optimized Code: Embedded in Hero main columns -->
<div class="mt-6 flex flex-col gap-2 items-center">
  <div class="flex items-center gap-1 text-amber-500">
    ★★★★★ <span class="text-xs text-gray-500 ml-1">4.9/5 by 12,000+ engineers</span>
  </div>
  <p class="text-xs text-gray-600 italic">"Improved our funnel performance by 15% in two days."</p>
</div>`
  },
  {
    id: 'insight-4',
    title: 'Consolidate Checkout Routing into 1-Step Layout',
    confidence: 'High',
    description: 'Users navigating across multi-step checkout pages (Cart -> Shipping -> Billing) experience an aggregated friction loss of 18%. Consolidating step count will boost velocity.',
    lift: 6.8,
    source: 'Funnels Drop-off telemetry',
    type: 'structural',
    why: 'Page-load latency on step transitions combined with repetitive field inputs leads to decision fatigue, especially for impulse buying models.',
    recommendation: 'Replace step screens with a unified, smart single-column scrolling checkout layout featuring asynchronous shipping rate lookups and Google address auto-completes.',
    originalHtml: `<!-- Old: Step 1 (Checkout-Cart) -> Step 2 (Checkout-Shipping) -->
<a href="/checkout/shipping" class="bg-blue-600 text-white p-3 rounded">Next: Shipping Setup</a>`,
    optimizedHtml: `<!-- AI-Optimized: Single-pane progressive disclosure form -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div class="p-4 border rounded-lg">1. Delivery details & Express calculation</div>
  <div class="p-4 border rounded-lg bg-gray-50">2. Secure Payment & Order confirmation</div>
</div>`
  },
  {
    id: 'insight-5',
    title: 'Migrate popups from Native Webview to graceful Inline drawer',
    confidence: 'Medium',
    description: 'OAuth integrations inside native in-app wrappers (Facebook, Instagram browser frames) systematically terminate authorization states on popup close events.',
    lift: 3.4,
    source: 'Log Server Exception Tracking',
    type: 'structural',
    why: 'Social network wrappers block `window.open` or force popups directly into external systems, which interrupts the original tab session cookie continuity.',
    recommendation: 'Swap out third-party social auth popups inside Instagram viewport widths with direct redirect-based auth or clear contextual native email input guides.',
    originalHtml: `<!-- Old Code: Fires popup -->
<button onclick="authWebPopup('google')">Log in with Google</button>`,
    optimizedHtml: `<!-- AI-Optimized Code: Redirect-based flow on embedded viewport detectors -->
<button onclick="window.location.href = '/api/auth/google/redirect?type=embedded'">Log in with Google</button>`
  }
];

export const initialFunnelSteps: FunnelStep[] = [
  {
    name: 'Landing Page visit',
    visitors: 124000,
    dropoffRate: 0,
    frictionPoints: ['Excessive hero banner loading latency', 'Above-the-fold value proposition clarity']
  },
  {
    name: 'Interactive Demo trial',
    visitors: 78500,
    dropoffRate: 36.7,
    frictionPoints: ['Required profile registration popup', 'Slow database setup demo warm-up clock']
  },
  {
    name: 'Pricing View verification',
    visitors: 32200,
    dropoffRate: 58.9,
    frictionPoints: ['Unclear enterprise discount disclosure', 'Lack of immediate currency adjustment']
  },
  {
    name: 'Checkout Flow kickoff',
    visitors: 9100,
    dropoffRate: 71.7,
    frictionPoints: ['Button visibility contrast below 480px', 'Superfluous optional form fields']
  },
  {
    name: 'Payment Completed',
    visitors: 5100,
    dropoffRate: 43.9,
    frictionPoints: ['Popup social logins breaking inside Instagram webview wrapper']
  }
];

export const mockDashboardMetrics = {
  totalConversionRate: '4.1%',
  conversionLift: '+18.4%',
  frictionIndex: '28/100',
  frictionStatus: 'Low Friction',
  weeklyVisitors: '124,000',
  pendingOptimizations: 5,
  historicalChartData: [
    { name: 'Mon', CR: 3.1, lift: 0.1 },
    { name: 'Tue', CR: 3.3, lift: 0.2 },
    { name: 'Wed', CR: 3.5, lift: 0.5 },
    { name: 'Thu', CR: 3.8, lift: 0.9 },
    { name: 'Fri', CR: 4.0, lift: 1.2 },
    { name: 'Sat', CR: 4.1, lift: 1.5 },
    { name: 'Sun', CR: 4.1, lift: 1.8 }
  ]
};
