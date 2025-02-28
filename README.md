# Medicine Calendar 💊📅

https://juanmartin19l.github.io/medicine-calendar/

A modern and minimalist web application to manage medication schedules with reminders. Easily add medications, set dosage intervals, durations, and start times. The app automatically calculates reminders and allows you to export the schedule to your calendar as an `.ics` file. Built with **React**, **React Icons**, and **Tailwind CSS**, it features a clean dark theme and a responsive grid layout for a seamless user experience.

![image](https://github.com/user-attachments/assets/45722ca3-7dee-425b-a9e2-abb379bbd569)
_Preview image_

---

## Features ✨

- **Add Medications**: Input medication details (name, interval, duration, and start time).
- **Reminder Calculation**: Automatically calculates reminders based on the provided schedule.
- **Export to Calendar**: Export your medication schedule as an `.ics` file for integration with calendar apps.
- **Webcal Integration**: Supports webcal:// protocol for direct calendar subscription.
- **Cloud Storage**: Uses Supabase Storage to store and manage calendar files.
- **Smart Caching**: Prevents unnecessary file uploads by caching previous exports.
- **Dark Theme**: A sleek and modern dark theme for better readability and aesthetics.
- **Responsive Design**: Grid-based layout that adapts to different screen sizes.
- **Animations**: Smooth animations for a better user experience.
- **Local Storage**: Your medication data is saved in your browser's local storage.

---

## Technologies Used 🛠️

- **React**: For building the user interface.
- **React Icons**: For adding intuitive icons.
- **Tailwind CSS**: For styling and responsive design.
- **ICS Library**: For generating calendar files.
- **Supabase**: For backend storage of calendar files.
- **Webcal Protocol**: For direct calendar subscription links.
- **Motion**: For adding animations.
- **Vite**: For fast development and optimized builds.

---

## How to Use 🚀

1. **Add Medications**: Use the form to add your medications.
2. **View Schedule**: Your medications will be displayed in a responsive grid layout.
3. **Export to Calendar**:
   - Use "Subscribe to Calendar" to add events directly to your calendar application.
   - Use "Download Calendar" to get an `.ics` file that you can import manually.

---

## Installation 💻

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Juanmartin19l/medicine-calendar.git
   ```
2. Navigate into the project directory:
   ```bash
   cd medicine-calendar
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit http://localhost:5173 (or the port indicated in your terminal).

---

## Contact 📧

If you have any questions or suggestions, feel free to reach out:
- lavallejuanmartin@gmail.com
- https://www.linkedin.com/in/juan-mart%C3%ADn-lavalle/

---

Made with ❤️ by Juan Martín Lavalle.
Happy coding! 💻✨
