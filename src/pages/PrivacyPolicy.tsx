
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/landing/SEOHead";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Privacy Policy – AI Writer Pros"
        description="Read the AI Writer Pros privacy policy. Learn how we collect, use, and protect your personal information."
        canonical="https://aiwriterpros.com/privacy-policy"
      />
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-10">Last updated: February 11, 2026</p>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
            <p>
              AI Writer Pros ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you use our website 
              at aiwriterpros.com and our AI writing tools (collectively, the "Service").
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">2. Information We Collect</h2>
            <h3 className="text-xl font-medium text-foreground">Personal Information</h3>
            <p>When you create an account, we may collect:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Email address</li>
              <li>Name (if provided)</li>
              <li>Account credentials</li>
              <li>Payment information (processed securely through third-party payment processors)</li>
            </ul>
            <h3 className="text-xl font-medium text-foreground mt-4">Usage Data</h3>
            <p>We automatically collect certain information when you use our Service, including:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Device information</li>
              <li>IP address</li>
              <li>Content generated using our tools (to provide the Service)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide, operate, and maintain our Service</li>
              <li>Process your transactions and manage your account</li>
              <li>Improve and personalize your experience</li>
              <li>Communicate with you about updates, features, and support</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">4. Your Content</h2>
            <p>
              Content you create using our AI tools belongs to you. We do not sell, share, or use your 
              generated content for training AI models. Your content is stored securely and accessible 
              only to you through your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">5. Data Sharing</h2>
            <p>We do not sell your personal information. We may share information with:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Service providers who assist in operating our platform (hosting, payment processing, analytics)</li>
              <li>Law enforcement when required by law</li>
              <li>Business transfers in the event of a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">6. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your information, including 
              encryption in transit and at rest, secure authentication, and regular security assessments. 
              However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">7. Cookies</h2>
            <p>
              We use essential cookies to maintain your session and preferences. We may also use analytics 
              cookies to understand how our Service is used. You can control cookie settings through 
              your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">8. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="mt-2">To exercise these rights, contact us at support@aiwriterpros.com.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">9. Children's Privacy</h2>
            <p>
              Our Service is not directed to individuals under the age of 16. We do not knowingly collect 
              personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:support@aiwriterpros.com" className="text-primary hover:underline">
                support@aiwriterpros.com
              </a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
