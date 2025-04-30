# 🌍 REST Countries Explorer (SE3040 Assignment)

This is a React frontend application that uses the REST Countries API to provide detailed information about countries. Built as part of the SE3040 – Application Frameworks module at SLIIT.

---

## 🔗 Live URL

👉 [https://rest-countries-3863bhlcy-sanjanadinithi6-gmailcoms-projects.vercel.app](https://rest-countries-3863bhlcy-sanjanadinithi6-gmailcoms-projects.vercel.app)

---

## 🚀 Features

- Search for countries by name
- Filter countries by region
- View detailed country information:
  - Flag
  - Name
  - Capital
  - Population
  - Region
  - Languages
- Dynamic UI without page reload
- Responsive design with Tailwind CSS
- User session preserved (last search saved via `localStorage`)

---

## 🧰 Tech Stack

- React (with functional components and hooks)
- Tailwind CSS (for styling)
- REST Countries API
- React Router DOM
- Vercel (for deployment)
- Jest + React Testing Library (for testing)

---

## 🔌 API Endpoints Used

From [REST Countries API](https://restcountries.com/):

- `GET /all` – List all countries
- `GET /name/{name}` – Search country by name
- `GET /region/{region}` – Filter by region
- `GET /alpha/{code}` – Get full details by country code

---

## ⚙️ Getting Started

To run the project locally:

```bash
git clone https://github.com/sanjanadinithi/countries-app
cd countries-app
npm install
npm start
