# RevUptime

Next.js App Router, TypeScript, React, Tailwind CSS and Lucide. Designed for Node.js/Vercel deployment.

## Run

```sh
npm install
npm run dev
```

Production: `npm run build` then `npm start`. Type checking: `npm run typecheck`.

## Deployment

Import the repository into Vercel, select the Next.js preset, and deploy from the repository root. No database is needed for the marketing site. The production domain and canonical metadata are set to `https://revuptime.com`; connect that domain in Vercel after deployment. The site has not been deployed or connected to the domain by this build.

## Pilot enquiries

Copy `.env.example` to `.env.local` and set `LEAD_WEBHOOK_URL` to an HTTPS lead receiver. Optionally set `LEAD_WEBHOOK_TOKEN`. The route validates payloads on the server and passes a normalised JSON lead to the receiver. A 2xx response means the receiver accepted the enquiry; only then does the site display success. Without a configured receiver it returns 503, keeps the form populated and offers a local download. It never fabricates successful delivery or writes personal details to logs.

`lib/leads.ts` isolates delivery for later Supabase/Zoho integration. Add persistent rate limiting, receiver-side deduplication and spam protection appropriate to the selected production service before a public launch. No CRM, Supabase, customer authentication or email service is connected. `/sign-in` explains pilot workspace access and does not request credentials.

## Product previews

Dashboard, Copilot and mobile views use explicitly labelled illustrative data. Filters, charts, alerts, machine detail, maintenance history and sample inspections work locally in the page session. They are not connected to sensors or a live AI service. The mobile alert uses +100% vs the 2.1 mm/s baseline to remain mathematically consistent with its 4.2 mm/s reading.

## Content and design

- Supplied logo: `public/images/revuptime-brand.png`, displayed through a CSS crop without altering the original.
- Supplied predictive-intelligence artwork: `public/images/revuptime-predictive-intelligence.png`, used as the homepage hero visual. Because the artwork contains sample percentage outcomes, the page labels it as an illustrative concept rather than verified customer results.
- Original website composition and diagrams, based on the supplied brand brief.
- Industrial photograph by [Ant Rozetsky on Unsplash](https://unsplash.com/photos/interior-of-large-industrial-factory-SLIFI67jv5k), used under the [Unsplash License](https://unsplash.com/license). It is representative industrial photography, not a claimed RevUptime customer site or Odisha location.
- Marketing copy and page data live in `data/`, reusable views in `components/`.
- Privacy and terms describe this implementation; the business should review them against its final operating arrangements before launch.
- No customer logos, recognition badges, testimonials, performance percentages, or pricing claims have been invented.

## Routes

`/`, `/product`, `/solutions/predictive-maintenance`, `/industries/steel`, `/industries/mining`, `/industries/manufacturing`, `/pilot`, `/about`, `/contact`, `/privacy`, `/terms`, `/sign-in`, plus a custom 404, sitemap and robots.txt.
