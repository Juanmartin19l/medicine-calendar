import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { UserCase } from "./UserCase";
import {
  FaUserClock,
  FaUserNurse,
  FaBriefcase,
  FaUserTie,
} from "react-icons/fa";

/**
 * Component displaying different user cases for Medicine Calendar
 */
export function UserCases() {
  // User case data for the section
  const userCases = [
    {
      icon: <FaUserClock />,
      color: "blue",
      title: "Individuals with Chronic Conditions",
      description:
        "People managing ongoing health conditions often have complex medication regimens. Medicine Calendar helps organize multiple prescriptions across varying schedules.",
      delay: 0.1,
    },
    {
      icon: <FaUserNurse />,
      color: "purple",
      title: "Caregivers",
      description:
        "Those caring for loved ones can keep track of medication schedules more efficiently, reducing stress and potential errors.",
      delay: 0.2,
    },
    {
      icon: <FaBriefcase />,
      color: "green",
      title: "Busy Professionals",
      description:
        "When life gets hectic, it's easy to forget routine medications. Our calendar integration ensures you stay on track even with a packed schedule.",
      delay: 0.3,
    },
    {
      icon: <FaUserTie />,
      color: "blue",
      title: "Senior Citizens",
      description:
        "With an interface designed for clarity and ease of use, older adults find Medicine Calendar a helpful tool for maintaining their health regimen.",
      delay: 0.4,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto py-16 px-4"
    >
      <SectionTitle title="Who Benefits from Medicine Calendar" />

      <div className="grid md:grid-cols-2 gap-8 mb-6">
        {userCases.map((userCase, index) => (
          <UserCase
            key={index}
            icon={userCase.icon}
            color={userCase.color}
            title={userCase.title}
            description={userCase.description}
            delay={userCase.delay}
          />
        ))}
      </div>
    </motion.section>
  );
}
