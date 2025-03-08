import { useEffect, useState } from "react";
import { MedicineForm } from "../components/medicine/MedicineForm";
import { MedicineList } from "../components/medicine/MedicineList";
import { Export } from "../components/medicine/CalendarExport";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SEO } from "../components/SEO";
import { PageHeader } from "../components/shared/PageHeader";
import { SectionContainer } from "../components/medicine/SectionContainer";
import { InfoSection } from "../components/medicine/InfoSection";
import { clearFileCache } from "../utils/calendarExporter";
import { FaPills, FaListAlt, FaCalendarAlt } from "react-icons/fa";

/**
 * Medicine page component for managing medications and exporting calendars
 */
export function MedicinePage() {
  const [medicines, setMedicines] = useState(() => {
    try {
      const saved = localStorage.getItem("medicines");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("medicines", JSON.stringify(medicines));
      // Clear file cache whenever medicines change
      clearFileCache();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }, [medicines]);

  const handleAddMedicine = (newMedicine) => {
    setMedicines((prev) => [newMedicine, ...prev]);
  };

  const handleDeleteMedicine = (index) => {
    setMedicines((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1e1e24] to-[#222222] text-white">
      {/* SEO Optimization */}
      <SEO
        title="Medicine Calendar - Track Your Medications"
        description="Add your prescriptions, set frequencies, and export your calendar to stay on top of your health regimen."
        keywords="medicine tracker, medication schedule, medicine export, health management"
        ogTitle="Medicine Calendar - Track Your Medications"
        ogDescription="Never miss a dose again with our medication tracking calendar."
        canonical="https://juanmartin19l.github.io/medicine-calendar/"
      />

      <Header />

      <div className="flex-grow pt-24">
        {/* Page Header */}
        <PageHeader
          title="Your Personal Health Assistant"
          subtitle="Track your medication schedule seamlessly. Add your prescriptions, set frequencies, and export your calendar to stay on top of your health regimen. Never miss a dose again."
        />

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 mb-16">
          {/* Form and List Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Medicine Form Section */}
            <SectionContainer
              id="add-medication"
              icon={<FaPills />}
              title="Add New Medication"
              color="blue"
              delay={0.1}
            >
              <MedicineForm
                onSubmit={handleAddMedicine}
                existingMedicines={medicines}
              />
            </SectionContainer>

            {/* Medicine List Section */}
            <SectionContainer
              id="your-medications"
              icon={<FaListAlt />}
              title="Your Medications"
              color="purple"
              delay={0.2}
            >
              <MedicineList
                medicines={medicines}
                onDelete={handleDeleteMedicine}
              />
            </SectionContainer>
          </div>

          {/* Export Section */}
          <SectionContainer
            id="export-calendar"
            icon={<FaCalendarAlt />}
            title="Export Your Calendar"
            color="green"
            delay={0.3}
          >
            <Export medicines={medicines} />
          </SectionContainer>

          {/* Info Section */}
          <InfoSection />
        </div>
      </div>

      <Footer />
    </div>
  );
}
