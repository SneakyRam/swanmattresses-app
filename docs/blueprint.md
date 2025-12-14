# **App Name**: Swan E-Commerce

## Core Features:

- Product Catalog: Display mattresses, beds, and sofas with detailed information, images, and specifications pulled from Firestore.
- Shopping Cart: Enable users to add products to a shopping cart and proceed to checkout.
- User Authentication: Implement Firebase Authentication for user registration, login (email + Google), and profile management.
- AI Chat Assistant: Provide a floating AI chat widget powered by a simple LLM tool, with pre-defined smart replies to assist users. Links to WhatsApp, Instagram and Facebook.
- Order Management: Allow users to view their order history and track order status using data stored in Firestore.
- Product Filtering & Sorting: Implement sidebar filters for price range, category, rating, material, and size, along with sorting options for price, popularity, and ratings. This information is saved to the Firestore.
- SEO Optimization: Generate unique title and description per page with JSON-LD schema markup to show brand/company SEO info for local business searches. Utilize Next.js Metadata API.

## Style Guidelines:

- Primary color: Deep purple (#4B0082) to convey luxury, quality, and comfort, echoing the Swan Mattresses brand.
- Background color: Very light purple (#F0E6FF) to provide a calm, elegant backdrop that doesn't distract from the products.
- Accent color: Deep blue (#00008B) for CTAs and highlights, providing a stark contrast while staying within the analogous color scheme.
- Body font: 'Inter', a grotesque-style sans-serif font providing a modern, machined, objective and neutral look for user readability; Headline font: 'Space Grotesk', a proportional sans-serif with a computerized, techy, scientific feel
- Note: currently only Google Fonts are supported.
- Use Lucide/Heroicons for clear and modern icons throughout the site.
- Modern, component-based layout with a focus on responsiveness across all devices. Implement a sticky header and well-structured footer.
- Employ smooth GSAP + Framer Motion animations for the hero section and scroll animations to create a premium and engaging user experience.