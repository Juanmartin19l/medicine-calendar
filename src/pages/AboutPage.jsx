import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { PageHeader } from "../components/shared/PageHeader";
import { OurStory } from "../components/about/OurStory";
import { WhyChooseUs } from "../components/about/WhyChooseUs";
import { UserCases } from "../components/about/UserCases";
import { CallToAction } from "../components/about/CallToAction";

/**
 * About page component providing information about Medicine Calendar,
 * its story, features, and target users
 */
function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1e1e24] to-[#222222] text-white">
      {/* SEO Optimization */}
      <SEO
        title="About Medicine Calendar - Our Mission and Features"
        description="Learn about Medicine Calendar, how it was created, and how it helps people manage their medication schedules effectively."
        keywords="medicine tracker, medication management, health app, medication reminder"
        ogTitle="About Medicine Calendar"
        ogDescription="Learn about Medicine Calendar, how it was created, and how it helps people manage their medication schedules."
        canonical="https://juanmartin19l.github.io/medicine-calendar/"
      />

      <Header />

      <div className="flex-grow pt-24 px-4">
        {/* Page Header */}
        <PageHeader
          title="About Medicine Calendar"
          subtitle="Our mission is to help people never miss an important medication again."
        />

        {/* Our Story Section */}
        <OurStory />

        {/* Features Section */}
        <WhyChooseUs />

        {/* User Cases Section */}
        <UserCases />

        {/* Call to Action Section */}
        <CallToAction />
      </div>

      <Footer />
    </div>
  );
}

export default AboutPage;
