import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { PageHeader } from "../components/shared/PageHeader";
import { ActionButtons } from "../components/home/ActionButtons";
import { FeaturesSection } from "../components/home/FeaturesSection";
import { WorkflowSection } from "../components/home/WorkflowSection";
import { BenefitsSection } from "../components/home/BenefitsSection";
import { CallToAction } from "../components/home/CallToAction";

/**
 * Home page component serving as the landing page for the application
 */
function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1e1e24] to-[#222222] text-white">
      {/* SEO Optimization */}
      <SEO
        title="Medicine Calendar - Track Your Medication Schedule"
        description="Never miss a dose again. Medicine Calendar helps you track your medication schedule, set reminders, and export to your calendar app."
        keywords="medicine tracker, medication schedule, medical calendar, health reminder"
        ogTitle="Medicine Calendar - Track Your Medication Schedule"
        ogDescription="Never miss a dose again. Medicine Calendar helps you track your medication schedule easily."
        canonical="https://juanmartin19l.github.io/medicine-calendar/"
      />

      <Header />

      <div className="flex-grow pt-24 px-4 sm:px-6 lg:px-8">
        {/* Hero Section - Using PageHeader directly */}
        <PageHeader
          title="Never Miss a Dose Again"
          subtitle="Track, schedule, and export your medication calendar with ease. Medicine Calendar helps you stay on top of your health regimen."
        />

        {/* Action Buttons */}
        <ActionButtons />

        {/* Features Section */}
        <FeaturesSection />

        {/* How It Works Section */}
        <WorkflowSection />

        {/* Benefits Section */}
        <BenefitsSection />

        {/* Call to Action */}
        <CallToAction />
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
