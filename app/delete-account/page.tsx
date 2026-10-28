import Link from 'next/link';
import type { Metadata } from 'next';
import { ExternalLink, Trash2, Shield, AlertTriangle, CheckCircle, Info, Smartphone } from 'lucide-react';
import { JsonLd } from '@/components/seo/json-ld';
import { seoMetadata, breadcrumbJsonLd, SITE_URL, ORG_ID } from '@/lib/seo';

export const metadata: Metadata = seoMetadata('/delete-account');

/**
 * Placeholder for the Google Form URL.
 * Replace this with your actual Google Form URL:
 * e.g., 'https://forms.gle/your-form-id'
 */
const GOOGLE_FORM_URL = '[GOOGLE_FORM_URL]';

const deletionDataItems = [
  {
    title: 'User profile information',
    description: 'Full name, email address, contact numbers, job role, and profile preferences.',
  },
  {
    title: 'Account details and authentication-related account records',
    description: 'Login credentials, session records, security logs, and authorization tokens.',
  },
  {
    title: 'Personal information associated with the account',
    description: 'Any personal contact or identifying information tied directly to your user account.',
  },
  {
    title: 'User-specific application preferences',
    description: 'Custom alert thresholds, display preferences, push notification settings, and dashboard layouts.',
  },
  {
    title: 'Associated user-generated data and account activity',
    description: 'Notes, equipment feedback, inspection comments, audit entries, and user activity history.',
  },
  {
    title: 'Other personal data directly associated with the account',
    description: 'Any remaining personal information linked directly to the account, where deletion is technically and legally possible.',
  },
];

export default function DeleteAccountPage() {
  const structuredData = [
    breadcrumbJsonLd([
      { name: 'Delete Account', path: '/delete-account' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Delete Your RevUptime Account',
      description: 'Public account and personal data deletion request page for RevUptime mobile and web applications.',
      url: `${SITE_URL}/delete-account`,
      publisher: { '@id': ORG_ID },
    },
  ];

  return (
    <main id="main">
      {/* Page Hero Header */}
      <section className="page-hero">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <Link className="breadcrumb" href="/">
              RevUptime <span>/</span> Delete Account
            </Link>
          </nav>
          <span className="section-eyebrow">REVUPTIME ACCOUNT DELETION</span>
          <h1>Delete Your RevUptime Account</h1>
          <p>
            At RevUptime, we respect your privacy and give you control over your personal
            information. If you wish to permanently delete your RevUptime account and associated
            data, you can submit an account deletion request using the form below.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="deletion-page">
        <div className="deletion-container">
          {/* App Identification Badge */}
          <div className="deletion-app-badge" role="status">
            <Smartphone size={16} aria-hidden="true" />
            <span>App: RevUptime (Android &amp; iOS) &bull; Developer: Revapex AI Private Limited</span>
          </div>

          {/* Section: How to Request Account Deletion */}
          <section className="deletion-card primary-action" aria-labelledby="how-to-request-title">
            <div className="deletion-card-header">
              <div className="deletion-card-icon" aria-hidden="true">
                <CheckCircle size={20} />
              </div>
              <h2 id="how-to-request-title">How to Request Account Deletion</h2>
            </div>
            <p>
              This page provides a publicly accessible way to request account deletion in
              compliance with Google Play Store data safety and account deletion requirements. You do
              not need to be logged into your account or have the RevUptime app installed to submit a
              request.
            </p>

            <ol className="deletion-steps">
              <li className="deletion-step-item">
                <div className="deletion-step-num" aria-hidden="true">1</div>
                <div className="deletion-step-content">
                  <strong>Open the Account Deletion Request Form.</strong>
                  <span>Click the prominent “Request Account Deletion” button below to access our secure Google Form in a new tab.</span>
                </div>
              </li>
              <li className="deletion-step-item">
                <div className="deletion-step-num" aria-hidden="true">2</div>
                <div className="deletion-step-content">
                  <strong>Enter the email address associated with your RevUptime account.</strong>
                  <span>Provide the primary email address registered with your RevUptime user profile.</span>
                </div>
              </li>
              <li className="deletion-step-item">
                <div className="deletion-step-num" aria-hidden="true">3</div>
                <div className="deletion-step-content">
                  <strong>Provide your account details and submit the request.</strong>
                  <span>Include your username, organization or plant details, and any additional context to help our team locate your account records.</span>
                </div>
              </li>
              <li className="deletion-step-item">
                <div className="deletion-step-num" aria-hidden="true">4</div>
                <div className="deletion-step-content">
                  <strong>Our support team will verify your request and process the deletion.</strong>
                  <span>Our support team will verify account ownership to prevent unauthorized deletion and process the removal of eligible data across our backend systems.</span>
                </div>
              </li>
              <li className="deletion-step-item">
                <div className="deletion-step-num" aria-hidden="true">5</div>
                <div className="deletion-step-content">
                  <strong>You will receive confirmation once your account deletion request has been completed.</strong>
                  <span>Once the deletion is finalized, a confirmation email will be sent to your registered address.</span>
                </div>
              </li>
            </ol>

            <div className="deletion-cta-box">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="button deletion-cta-btn"
                id="request-account-deletion-btn"
                aria-label="Request Account Deletion (opens Google Form in a new tab)"
              >
                Request Account Deletion
                <ExternalLink size={17} aria-hidden="true" />
              </a>
              <p className="deletion-cta-note">
                Opens our official deletion request form in a new tab. No account login is required.
              </p>
            </div>

            <div className="deletion-alert warning" role="note">
              <AlertTriangle size={20} aria-hidden="true" />
              <div>
                <strong>Important Notice:</strong> Account deletion is permanent. Once processed, your
                RevUptime account credentials, access rights, and personalized application settings
                cannot be recovered.
              </div>
            </div>
          </section>

          {/* Section: What Data Will Be Deleted? */}
          <section className="deletion-card" aria-labelledby="data-deleted-title">
            <div className="deletion-card-header">
              <div className="deletion-card-icon danger" aria-hidden="true">
                <Trash2 size={20} />
              </div>
              <h2 id="data-deleted-title">What Data Will Be Deleted?</h2>
            </div>
            <p>
              Upon successful verification and completion of the deletion request, the following
              data will be permanently deleted where applicable:
            </p>

            <ul className="deletion-data-list">
              {deletionDataItems.map((item) => (
                <li key={item.title} className="deletion-data-item">
                  <div className="deletion-data-icon" aria-hidden="true">
                    <Trash2 size={18} />
                  </div>
                  <div className="deletion-data-text">
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="deletion-disclaimer">
              * Note: Data is permanently removed from production databases and active storage where
              technically supported by our backend systems. We do not claim that any data is deleted
              if the backend does not actually support its deletion.
            </p>
          </section>

          {/* Section: Data We May Retain */}
          <section className="deletion-card" aria-labelledby="data-retention-title">
            <div className="deletion-card-header">
              <div className="deletion-card-icon shield" aria-hidden="true">
                <Shield size={20} />
              </div>
              <h2 id="data-retention-title">Data We May Retain</h2>
            </div>
            <p>
              Certain information may be retained when required by applicable laws, regulatory
              obligations, fraud prevention, security requirements, or the resolution of disputes.
            </p>
            <p>
              Any retained information will be limited to what is necessary for the applicable
              purpose and will be securely deleted when the retention requirement expires.
            </p>
            <div className="deletion-alert info" role="note">
              <Info size={20} aria-hidden="true" />
              <div>
                Information retained for legal or security purposes will be kept only for as long
                as necessary to fulfill the applicable requirements.
              </div>
            </div>
          </section>

          {/* Section: Separate Data Deletion */}
          <section className="deletion-card" aria-labelledby="separate-deletion-title">
            <div className="deletion-card-header">
              <div className="deletion-card-icon" aria-hidden="true">
                <Info size={20} />
              </div>
              <h2 id="separate-deletion-title">Separate Data Deletion</h2>
            </div>
            <p>
              Users who wish to delete specific data while keeping their RevUptime account active
              should contact our support team.
            </p>
            <p>
              Please note: RevUptime does not currently support separate or partial data deletion
              requests while maintaining an active account. Users who wish to delete their
              associated account data must submit a complete account deletion request.
            </p>
            <p>
              If you have questions about specific data categories or need custom administrative
              assistance for your plant workspace, please reach out to our team at{' '}
              <a href="mailto:info@revapex.ai" className="support-email-inline">
                info@revapex.ai
              </a>.
            </p>
          </section>
        </div>
      </section>

      <JsonLd data={structuredData} />
    </main>
  );
}
