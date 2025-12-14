import { BRAND_NAME } from '@/lib/constants';

export default function TermsOfServicePage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-lg mt-8 max-w-none text-foreground">
          <p>
            Please read these Terms of Service carefully before using our website operated by {BRAND_NAME}.
          </p>

          <h2 className="font-headline">1. Conditions of Use</h2>
          <p>
            By using this website, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you are advised to leave the website accordingly.
          </p>

          <h2 className="font-headline">2. Privacy Policy</h2>
          <p>
            Before you continue using our website, we advise you to read our <a href="/privacy-policy">Privacy Policy</a> regarding our user data collection. It will help you better understand our practices.
          </p>

          <h2 className="font-headline">3. Intellectual Property</h2>
          <p>
            You agree that all materials, products, and services provided on this website are the property of {BRAND_NAME}, its affiliates, directors, officers, employees, agents, suppliers, or licensors including all copyrights, trade secrets, trademarks, patents, and other intellectual property.
          </p>
          
          <h2 className="font-headline">4. Limitation of Liability</h2>
          <p>
           {BRAND_NAME} is not liable for any damages that may occur to you as a result of your misuse of our website.
          </p>

          <h2 className="font-headline">5. Governing Law</h2>
          <p>
            This Agreement is governed in accordance with the laws of India.
          </p>

          <h2 className="font-headline">Contact Us</h2>
          <p>
            If you have any questions about these Terms, please <a href="/contact">contact us</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
