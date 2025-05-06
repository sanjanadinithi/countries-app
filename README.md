# 🌍 Countries Explorer

A comprehensive React application that allows users to explore, compare, and analyze country data from around the world using the REST Countries API.

---

## 🔗 Live URL

👉 [https://rest-countries-3863bhlcy-sanjanadinithi6-gmailcoms-projects.vercel.app](https://rest-countries-3863bhlcy-sanjanadinithi6-gmailcoms-projects.vercel.app)

---

## ✨ Features

### 🔍 Search & Filter
- Search countries by name
- Filter countries by region
- Toggle view between all countries and favorites

### 👤 User Management
- User registration and login
- Protected routes requiring authentication
- User preferences saved in localStorage

### ⭐ Country Management
- Add countries to favorites
- Compare up to 4 countries side by side
- View detailed information about each country

### 🌓 Appearance
- Toggle between light and dark mode
- Responsive design for all screen sizes

### 📊 Statistics
- View population statistics
- Compare area and population density
- Region distribution visualization

## 🛠️ Tech Stack

- **Frontend**: React with functional components and hooks
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Data Source**: REST Countries API
- **Storage**: Local Storage for user data and preferences

---

## 📚 API Endpoints Used

From [REST Countries API](https://restcountries.com/):

- `GET /all` – List all countries
- `GET /name/{name}` – Search country by name
- `GET /region/{region}` – Filter by region
- `GET /alpha/{code}` – Get country details by code

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/countries-explorer.githttps://github.com/sanjanadinithi/countries-app

2. Install dependencies
   ```bash
   npm install

3. Start the development server
   ```bash
   npm start


## 🔒 Authentication

The application uses a simulated authentication system with localStorage for demonstration purposes:

- User credentials are stored in localStorage
- Protected routes redirect to login page
- User session persists between page reloads

---

## 🎨 Features in Detail

### Country Comparison
Users can select up to 4 countries to compare side by side. The comparison includes:
- Official name
- Population
- Area
- Region & Subregion
- Capital
- Languages
- Currencies
- UN membership status
- Independence status
- Driving side
- Timezones

### Statistics Dashboard
The statistics page provides visualizations of:
- Top countries by population
- Top countries by area
- Top countries by population density
- Distribution of countries by region
- Summary statistics

### Dark Mode
The application supports both light and dark modes, with the preference saved in localStorage.
