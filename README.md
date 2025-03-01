# Medical Camp Management System (MCMS) – Client Side

## Project Overview
The **Medical Camp Management System (MCMS)** is a responsive MERN stack application designed to simplify the management of medical camps. It allows organizers to efficiently coordinate camps and participants to easily register, manage profiles, and access camp details. The client side ensures a smooth and user-friendly experience, powered by modern frontend technologies.

---

## Live Links
- **Live Website-1**: [MCMS Live-1](https://medical-camp-management-b10a12.web.app)


- **Live Website-2**: [MCMS Live-2](https://medical-camp-management-b10a12.firebaseapp.com)


- **Live Website-3**: [MCMS Live-3](https://medical-camp-management-system-b10a12.netlify.app)


- **GitHub Repository**: [MCMS Client Side Repo](#)

---

## Features

### Core Features
1. **User-Friendly Navigation**:
   - Dynamic navbar with profile dropdown, dashboard access, and logout functionality.
2. **Home Page**:
   - **Banner**: A slider showcasing impactful moments and success stories.
   - **Popular Camps Section**: Highlights six camps with key details (Camp Name, Image, Fees, Date & Time, Location, Healthcare Professional, Participant Count).
   - **Feedback Section**: Displays participant reviews and ratings.
3. **Available Camps Page**:
   - Displays all available camps with search and sort functionality.
   - Toggle layout view (3-column to 2-column).
4. **Camp Details Page**:
   - Comprehensive details about each camp.
   - "Join Camp" button opens a modal for registration.
5. **Participant Dashboard**:
   - **Analytics**: Visual charts using Recharts to display registration data.
   - **Profile Management**: Update personal details.
   - **Registered Camps**: View camp details, payment status, feedback, and cancellation options.
   - **Payment History**: View past and current transactions with status.
6. **Organizer Dashboard**:
   - **Profile Management**: Update organizer details.
   - **Add A Camp**: Add new camps with validation using Formik or React Hook Form.
   - **Manage Camps**: Edit or delete existing camps.
   - **Manage Registered Camps**: View participant details, update payment status, and handle cancellations.
7. **Authentication**:
   - Login and registration with React Hook Form.
   - Social login option included.

---

## Technologies Used

### Frontend
- **React.js**
- **React Router DOM**
- **Tailwind CSS**
- **Material Tailwind**
- **React Icons**
- **Framer Motion**
- **Recharts**

### State Management & Data Fetching
- **TanStack Query (React Query)**

---

## Pages & Routes

### Public Routes
- **Home**: Banner, popular camps, feedback, and custom sections.
- **Available Camps**: All camps with search, sort, and layout toggle options.
- **Camp Details**: Individual camp details and registration modal.
- **Join Us**: Login and registration pages.
- **404 Page**: Custom not-found page.

### Private Routes
- **Participant Dashboard**:
  - Analytics, Profile Management, Registered Camps, Payment History.
- **Organizer Dashboard**:
  - Profile Management, Add A Camp, Manage Camps, Manage Registered Camps.

---


## Key Rules

- **Environment Variables**: Firebase keys and API endpoints are hidden using `.env`.
- **Responsive Design**: Optimized for mobile, tablet, and desktop.
- **Sweet Alerts**: All CRUD operations and authentication display custom notifications.
- **Data Fetching**: TanStack Query handles all GET requests.
- **Authentication**: JWT implemented for private routes.
- **Pagination and Search**: Available in all tables.

---

## Additional Features

- **Animations**: Framer Motion and AOS for smooth transitions.
- **Axios Interceptor**: Handles API requests and responses.

---

## Thank You
Thank you for reviewing the client-side implementation of MCMS! If you have any feedback or suggestions, feel free to contribute or reach out.
