import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { industryPages, pilotFaq } from '@/data/pages';
import { faqQuestions } from '@/components/marketing/faq-section';
import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

export async function GET() {
  const summary = await readFile(path.join(process.cwd(), 'public', 'llms.txt'), 'utf8');
  const industries = Object.entries(industryPages).map(([slug, d]) => `### ${d.title}\nURL: ${SITE_URL}/industries/${slug}\n\n${d.description}\n\n${d.challenge} ${d.copy}\n\nAssets monitored: ${d.assets.join(', ')}.\n\nPilot: ${d.pilot}`).join('\n\n');
  const faq = (items: readonly (readonly string[])[]) => items.map(([q, a]) => `**${q}**\n${a}`).join('\n\n');
  const body = `${summary}\n\n## How RevUptime works\n\n1. Sense: a vibration and temperature sensor captures condition data from the machine while it operates (3-axis vibration plus temperature).\n2. Connect: data is sent through a gateway to the RevUptime platform.\n3. Analyze: each machine gets its own baseline; sustained deviations and deteriorating trends are detected.\n4. Alert: prioritised alerts go to the agreed recipients (WhatsApp can be an optional channel).\n5. Operator review: operators validate or dismiss the alert.\n6. Maintenance: the team plans the recommended inspection.\n7. Close: the outcome is recorded in the machine's maintenance history.\n\n## Industries\n\n${industries}\n\n## Frequently asked questions\n\n${faq(faqQuestions)}\n\n## 90-day pilot FAQ\n\n${faq(pilotFaq)}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
