/**
 * Component for displaying individual benefits with checkmark
 * @param {string} title - Benefit title
 * @param {string} description - Benefit description
 */
export function BenefitItem({ title, description }) {
  return (
    <div className="flex gap-3">
      <div className="shrink-0 mt-1">
        <svg
          className="w-5 h-5 text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>
      <div>
        <h4 className="font-medium text-blue-300">{title}</h4>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
}
