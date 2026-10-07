import { seoMetadata } from '@/lib/seo';

export const metadata = seoMetadata('/roi-calculator');

export default function RoiCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
