# Virtual Try-On App MVP

A minimalist virtual try-on application built with Next.js and React, featuring a clean desktop interface for outfit creation and management.

## Features

- **Main Screen**: Browse saved outfits with quick navigation
- **Gallery**: View clothing items organized by categories (T-shirts, Skirts, Jackets, Dresses, Trousers, Shoes)
- **New Outfit**: Create outfits with form inputs (Weather, Style, Type)
- **Generate**: AI-powered outfit generation with extended options (Weather, Style, Type, Colour, Purpose)

## Tech Stack

- Next.js 14 with App Router
- React with TypeScript
- Tailwind CSS for styling
- JSON database for clothing items
- Unsplash images for clothing visuals

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
├── app/
│   ├── page.tsx          # Main screen
│   ├── gallery/          # Gallery page
│   ├── new-outfit/       # New outfit creation
│   ├── generate/         # AI outfit generation
│   └── api/clothing/     # API route for clothing data
├── data/
│   └── clothing.json     # Clothing database
└── README.md
```

## MVP Features

- Responsive desktop design
- Clean, minimal UI without excessive comments
- JSON-based clothing database
- Simulated AI outfit generation
- Navigation between all screens
- Form validation and user feedback

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
