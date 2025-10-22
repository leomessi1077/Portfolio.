import React, { useEffect, useState } from 'react';
import { Container, Title, Text, Group, Button, Stack, Box, Avatar, Badge } from '@mantine/core';
import { IconBrandLinkedin, IconBrandGithub, IconArrowDown, IconCode, IconSparkles, IconDownload } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import profilePic from '../assets/1000120900.jpg';

const Home = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate floating particles with varied sizes
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          delay: Math.random() * 5,
          duration: Math.random() * 3 + 2
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      id="home"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        paddingTop: '80px',
        paddingBottom: '40px',
        position: 'relative',
        overflow: 'hidden'
      }}
      className="hero-animated-bg"
    >
      {/* Animated gradient overlay */}
      <div className="gradient-overlay" />
      
      {/* Enhanced background blobs */}
      <div className="hero-blob blob-1" />
      <div className="hero-blob blob-2" />
      <div className="hero-blob blob-3" />
      <div className="hero-blob blob-4" />
      
      {/* Grid pattern overlay */}
      <div className="grid-pattern" />
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
            y: [0, -30, 0]
          }}
          transition={{ 
            delay: particle.delay, 
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      <Container size="md" style={{ position: 'relative', zIndex: 2 }}>
        <Stack align="center" gap="xl">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Badge 
              size="lg" 
              radius="xl"
              variant="gradient"
              gradient={{ from: 'rgba(255,255,255,0.3)', to: 'rgba(255,255,255,0.1)' }}
              style={{
                border: '1px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(10px)',
                padding: '12px 24px',
                fontSize: '0.9rem',
                fontWeight: 500
              }}
              leftSection={<IconSparkles size={16} />}
            >
              Available for Opportunities
            </Badge>
          </motion.div>

          {/* Enhanced Avatar with Multiple Rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
            className="floaty"
          >
            <div className="hero-avatar-container">
              <div className="avatar-ring ring-1"></div>
              <div className="avatar-ring ring-2"></div>
              <div className="avatar-ring ring-3"></div>
              <Avatar 
                src={profilePic} 
                size={200} 
                radius={999} 
                style={{ 
                  boxShadow: '0 25px 50px rgba(0,0,0,0.4), 0 0 0 8px rgba(255,255,255,0.1)',
                  border: '5px solid rgba(255,255,255,0.3)',
                  position: 'relative',
                  zIndex: 10
                }} 
              />
            </div>
          </motion.div>
          
          {/* Enhanced Title with Letter Animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ marginTop: '1rem' }}
          >
            <Title 
              order={1} 
              size="4.5rem" 
              fw={900}
              className="hero-title-modern"
              style={{
                textShadow: '0 6px 12px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.2)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1
              }}
            >
              Manish Kumar Yadav
            </Title>
          </motion.div>
          
          {/* Enhanced Subtitle with Badge Style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <Group gap="xs" justify="center">
              <Box
                style={{
                  padding: '8px 24px',
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '50px',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                <Text 
                  size="xl" 
                  fw={600}
                  className="hero-subtitle-modern"
                  style={{
                    fontSize: '1.5rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}
                >
                  Full Stack Developer
                </Text>
              </Box>
            </Group>
          </motion.div>

          {/* Enhanced Description with Better Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <Text 
              size="xl" 
              c="white" 
              style={{ 
                maxWidth: '700px', 
                lineHeight: 1.8,
                fontSize: '1.25rem',
                opacity: 0.95,
                textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                fontWeight: 400
              }}
            >
              Crafting digital experiences with modern technologies.<br/>
              Passionate about building <strong style={{ fontWeight: 700 }}>scalable applications</strong> and solving <strong style={{ fontWeight: 700 }}>complex problems</strong>.
            </Text>
          </motion.div>
          
          {/* Tech Stack Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <Group gap="sm" justify="center">
              {['React', 'Node.js', 'MongoDB', 'Express'].map((tech, index) => (
                <Badge
                  key={tech}
                  size="lg"
                  radius="md"
                  variant="light"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white',
                    padding: '10px 16px',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                >
                  {tech}
                </Badge>
              ))}
            </Group>
          </motion.div>
          
          {/* Enhanced Action Buttons with Modern Design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            <Group gap="md" wrap="wrap" justify="center">
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={scrollToAbout}
                  size="xl"
                  radius="xl"
                  className="hero-button-primary"
                  leftSection={<IconCode size={22} />}
                  style={{
                    background: 'white',
                    color: '#667eea',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    padding: '28px 40px',
                    height: 'auto',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    border: 'none'
                  }}
                >
                  View My Work
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  component="a"
                  href="/Manish_Kumar_Yadav_Resume.pdf"
                  download="Manish_Kumar_Yadav_Resume.pdf"
                  size="xl"
                  radius="xl"
                  variant="outline"
                  leftSection={<IconDownload size={22} />}
                  style={{
                    borderColor: 'white',
                    borderWidth: '2px',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    padding: '28px 40px',
                    height: 'auto',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                  className="hero-button-secondary"
                >
                  Download CV
                </Button>
              </motion.div>
            </Group>
            
            {/* Social Links */}
            <Group gap="md" justify="center" mt="xl">
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Button
                  component="a"
                  href="https://www.linkedin.com/in/manish-kumar-yadav-6879691a0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="subtle"
                  size="md"
                  radius="xl"
                  className="social-icon-button"
                  style={{
                    color: 'white',
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    width: '50px',
                    height: '50px',
                    padding: 0
                  }}
                >
                  <IconBrandLinkedin size={24} />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                <Button
                  component="a"
                  href="https://github.com/leomessi1077"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="subtle"
                  size="md"
                  radius="xl"
                  className="social-icon-button"
                  style={{
                    color: 'white',
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    width: '50px',
                    height: '50px',
                    padding: 0
                  }}
                >
                  <IconBrandGithub size={24} />
                </Button>
              </motion.div>
            </Group>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            style={{ marginTop: '2rem' }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ cursor: 'pointer' }}
              onClick={scrollToAbout}
            >
              <IconArrowDown size={24} color="rgba(255,255,255,0.7)" />
            </motion.div>
          </motion.div>
        </Stack>
      </Container>
    </Box>
  );
};

export default Home;