import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'Downtime Cost & Predictive Maintenance ROI Calculator', description: 'Estimate your plant’s annual unplanned downtime cost and the value of recovering lost production hours with predictive maintenance. Free calculator for Indian industry.', path: '/roi-calculator' });

export default function RoiCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
