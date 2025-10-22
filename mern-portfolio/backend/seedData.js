const mongoose = require('mongoose');
require('dotenv').config();
const Portfolio = require('./models/Portfolio');

const seedData = {
  name: "Manish Kumar Yadav",
  title: "Full Stack Developer",
  email: "yadavmanish7675@gmail.com",
  about: "Full Stack Developer skilled in Java, JavaScript and React, focused on building scalable web apps and delivering impactful solutions.",
  experience: [
    {
      position: "Backend Developer",
      company: "Livnium",
      duration: "April 2025 – Present",
      description: [
        "Built scalable backend systems with Node.js, boosting system efficiency by 10%.",
        "Integrated RESTful APIs, improving data flow speed by 8%.",
        "Fixed bugs and added features with the frontend team, enhancing UX by 10%.",
        "Debugged and optimized backend, cutting response time by 12%."
      ]
    }
  ],
  projects: [
    {
      title: "QuickCart",
      tech: "MongoDB, Express.js, React.js, Node.js",
      description: "Implemented seamless cart management and checkout functionality, providing a smooth and user-friendly shopping experience.",
      github: "https://github.com/your-repo/quickcart",
      live: "#"
    },
    {
      title: "Meal Express",
      tech: "HTML, CSS, JavaScript, WebAPI",
      description: "Integrated video streaming functionality, allowing users to watch recipe videos directly within the application.",
      github: "https://github.com/your-repo/meal-express",
      live: "#"
    },
    {
      title: "DataAuthenticator",
      tech: "Node.js, REST APIs, Mongoose, Express, EJS",
      description: "Designed and implemented a scalable authentication system using Node.js, REST APIs, Mongoose, and Express.",
      github: "https://github.com/your-repo/data-authenticator",
      live: "#"
    },
    {
      title: "Movix App",
      tech: "React.js, TMDB API, SCSS, MUI, Redux",
      description: "Created a dynamic web application using React.js and Redux to display currently popular movies from the TMDB API.",
      github: "https://github.com/your-repo/movix-app",
      live: "#"
    }
  ],
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/your-profile",
    github: "https://github.com/your-profile"
  }
};

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Portfolio.deleteMany({});
    console.log('Cleared existing portfolio data');

    // Insert seed data
    const portfolio = new Portfolio(seedData);
    await portfolio.save();
    console.log('Portfolio data seeded successfully');

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
