import { Hero } from '@/components/marketing/hero';
import { ProblemSection, HowItWorks, ProductSection, CopilotSection, AIIntelligenceSection, ExplainableAISection, ConditionTimelineSection, MobileSection, AssetSection, WhySection, PilotSection, OutcomesSection, CompanySection, FinalCTA } from '@/components/marketing/sections';
import { FAQSection, faqQuestions } from '@/components/marketing/faq-section';
import { OperatorValidation } from '@/components/product/operator-validation';
import { MachineMonitoringSection } from '@/components/marketing/machine-monitoring';
import { JsonLd } from '@/components/seo/json-ld';
import { seoMetadata, faqJsonLd, serviceJsonLd } from '@/lib/seo';
export const metadata = seoMetadata('/');
export default function Home(){return <main id="main"><Hero/><ProblemSection/><HowItWorks/><MachineMonitoringSection/><ProductSection/><OperatorValidation/><AIIntelligenceSection/><CopilotSection/><ExplainableAISection/><ConditionTimelineSection/><MobileSection/><AssetSection/><WhySection/><PilotSection/><FAQSection/><OutcomesSection/><CompanySection/><FinalCTA/><JsonLd data={[faqJsonLd(faqQuestions), serviceJsonLd({ name: 'Predictive maintenance for industrial plants', description: 'Vibration and temperature condition monitoring with machine-specific baselines and explainable AI guidance for maintenance teams, delivered as a 90-day pilot on five critical machines.', path: '/', serviceType: 'Predictive maintenance' })]}/></main>;}
