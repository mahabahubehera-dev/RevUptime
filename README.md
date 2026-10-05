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

The contact and whitepaper forms send validated, normalised JSON leads server-side to the configured `LEAD_WEBHOOK_URL` (`https://api.trustsolar.in/webhook/rev-up-time` in `.env.example`). Set the destination in `.env.local` or the hosting provider's environment settings. Optionally set `LEAD_WEBHOOK_TOKEN` for a receiver that requires bearer authentication. A 2xx response means the receiver accepted the enquiry; only then does the site display success. Delivery errors are logged without personal details, and the site never fabricates successful delivery.

`lib/leads.ts` isolates delivery for later Supabase/Zoho integration. Add persistent rate limiting, receiver-side deduplication and spam protection appropriate to the selected production service before a public launch. No CRM, Supabase, customer authentication or email service is connected. `/sign-in` explains pilot workspace access and does not request credentials.

## Product previews

Dashboard, Copilot and mobile views use explicitly labelled illustrative data. Filters, charts, alerts, machine detail, maintenance history and sample inspections work locally in the page session. They are not connected to sensors or a live AI service. The mobile alert uses +100% vs the 2.1 mm/s baseline to remain mathematically consistent with its 4.2 mm/s reading.

## Content and design

- Supplied logo: `public/images/revuptime-brand.png`, displayed through a CSS crop without altering the original.
- Supplied predictive-intelligence artwork: `public/images/revuptime-predictive-intelligence.png`, used as the homepage hero visual. Because the artwork contains sample percentage outcomes, the page labels it as an illustrative concept rather than verified customer results.
- The homepage machine-monitoring section automatically cycles through sensor installation and measurement images from `public/images/revuptime-condition-sensor.png`, `public/images/revuptime-installed-sensor.png` and `public/images/revuptime-sensor-metrics.png`. The separate “How RevUptime Works” section shows the seven-step workflow graphic at `public/images/revuptime-condition-monitoring-workflow.png` alongside all seven step descriptions.
- Original website composition and diagrams, based on the supplied brand brief.
- Industrial photograph by [Ant Rozetsky on Unsplash](https://unsplash.com/photos/interior-of-large-industrial-factory-SLIFI67jv5k), used under the [Unsplash License](https://unsplash.com/license). It is representative industrial photography, not a claimed RevUptime customer site or Odisha location.
- Marketing copy and page data live in `data/`, reusable views in `components/`.
- Privacy and terms describe this implementation; the business should review them against its final operating arrangements before launch.
- No customer logos, recognition badges, testimonials, performance percentages, or pricing claims have been invented.

## Routes

`/`, `/product`, `/solutions`, `/solutions/predictive-maintenance`, `/resources`, `/industries/steel`, `/industries/mining`, `/industries/manufacturing`, `/industries/cement`, `/industries/chemicals-fertilizer`, `/industries/pulp-paper`, `/industries/tires`, `/industries/food-beverage`, `/industries/pharma`, `/pilot`, `/about`, `/contact`, `/privacy`, `/terms`, `/sign-in`, plus a custom 404, sitemap and robots.txt.

The Resources page includes a downloadable industrial reliability guide. The guide form uses the same HTTPS `LEAD_WEBHOOK_URL` receiver as pilot enquiries and enables the download only after the receiver accepts the lead.
