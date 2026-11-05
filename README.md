# Yash Kashyap — Portfolio

The source for my personal portfolio: https://portfolio.yashkashyap.workers.dev/

I build websites and web apps for local businesses and my own products. This site shows that work and explains how I approach it. It is a single page with a short guided tour, plus a case study for each project.

## What's on the site

- **Selected work.** Six projects, each with a live link and a case study.
- **Case studies.** Each one says what the problem was, what I changed to fix it, and what the result was. I only quote numbers I can verify, so some results are described in words.
- **Services, process and contact.** The contact form opens a pre-written WhatsApp message.

### Projects featured

| Project | Type |
| --- | --- |
| Chilli Bistro | Client: restaurant website with WhatsApp ordering |
| Suto Café | Client: café website with booking and pre-orders |
| The Town House | Café and kitchen website |
| randomchat.social | Own product: real-time text and video chat |
| PikkNDrop | Own product: local ride booking |
| Chaand nikla kya? | Own product: Karwa Chauth companion app |

## Built with

- [Astro](https://astro.build) (static output)
- Tailwind CSS
- TypeScript for the small scripts (scroll, cursor, guide)
- Hosted on Cloudflare Workers (static assets)

## Run it locally

You need Node.js installed.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview  # serves the built site
```

## Where things live

- `src/pages/index.astro` is the home page.
- `src/pages/work/[slug].astro` is the shared case study template.
- `src/data/site.ts` holds the project list, services and guide text.
- `src/data/cases.ts` holds the case study copy. To edit a case study, change it here.
- `public/assets/` holds the screenshots and images.

## Deploying

The site is not connected to GitHub, so pushing does not update the live site. To publish:

```bash
npm run build
npx wrangler deploy --name portfolio --assets ./dist
```

## Get in touch

- Email: yashkashyap1110@gmail.com
- WhatsApp: +91 78763 31526
- [LinkedIn](https://www.linkedin.com/in/yash--kashyap/) · [Instagram](https://www.instagram.com/__yash_.kashyap_/) · [GitHub](https://github.com/Yash-Kashyap)

The code is here so you can see how it is built. Please don't copy the design, the text or the project content as your own.
