import React, { useState, useEffect } from 'react';
import { MantineProvider, Box } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ApiDebug from './components/ApiDebug';

function App() {
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    // Show debug page if URL has ?debug=true
    const params = new URLSearchParams(window.location.search);
    setShowDebug(params.get('debug') === 'true');
  }, []);

  // If debug mode, show only debug page
  if (showDebug) {
    return (
      <MantineProvider>
        <Notifications position="top-center" zIndex={2000} />
        <ApiDebug />
      </MantineProvider>
    );
  }

  return (
    <MantineProvider>
      <Notifications position="top-center" zIndex={2000} />
      <Box>
        <Header />
        <Box component="main">
          <Home />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </Box>
        <Footer />
        <Chatbot />
      </Box>
    </MantineProvider>
  );
}

export default App;
