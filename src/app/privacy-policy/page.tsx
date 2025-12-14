import { BRAND_NAME } from '@/lib/constants';

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-lg mt-8 max-w-none text-foreground">
          <p>
            Welcome to {BRAND_NAME}. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>

          <h2 className="font-headline">1. Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, phone number, and shipping address when you make a purchase, create an account, or contact us for support. We also collect non-personal information, such as browser type, operating system, and website usage data through cookies and other tracking technologies.
          </p>

          <h2 className="font-headline">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Process your transactions and fulfill your orders.</li>
            <li>Communicate with you, including responding to your inquiries.</li>
            <li>Improve our website and services.</li>
            <li>Send you promotional materials, from which you can opt-out at any time.</li>
          </ul>

          <h2 className="font-headline">3. Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information except to trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
          </p>
          
          <h2 className="font-headline">4. Security of Your Information</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
          </p>

          <h2 className="font-headline">5. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>

          <h2 className="font-headline">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please <a href="/contact">contact us</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
