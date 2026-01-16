import React, { useEffect, useState } from 'react';
import { Container, Title, Text, Group, Button, Stack, Box, Avatar, Badge, Tooltip } from '@mantine/core';
import { IconBrandLinkedin, IconBrandGithub, IconSparkles, IconDownload, IconMail } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import profilePic from '../assets/1000120900.jpg';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '140px',
        paddingBottom: '40px',
      }}
    >
      {/* Dynamic Background Gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, rgba(3, 7, 18, 0) 50%)',
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          transition: 'transform 0.2s ease-out',
          zIndex: 0
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
          animation: 'float 8s ease-in-out infinite'
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
          animation: 'float 10s ease-in-out infinite reverse'
        }}
      />

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
              variant="outline"
              color="gray"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#e2e8f0',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                padding: '12px 20px',
                height: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 500
              }}
              leftSection={
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <IconSparkles size={14} style={{ color: '#fbbf24', marginRight: 4 }} />
                </motion.div>
              }
            >
              Available for Opportunities
            </Badge>
          </motion.div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="animate-float"
          >
            <Box
              p={4}
              style={{
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)'
              }}
            >
              <Avatar
                src={profilePic}
                size={220}
                radius={999}
                style={{
                  border: '4px solid rgba(3, 7, 18, 0.8)',
                }}
              />
            </Box>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            <Title
              order={1}
              style={{
                fontSize: 'clamp(3rem, 5vw, 5rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                letterSpacing: '-0.03em'
              }}
            >
              <span className="text-gradient">Manish Kumar</span>{' '}
              <span className="text-gradient-accent">Yadav</span>
            </Title>
            <Text
              size="xl"
              style={{
                color: 'var(--text-secondary)',
                maxWidth: '600px',
                margin: '0 auto',
                fontSize: '1.25rem',
                lineHeight: 1.6
              }}
            >
              Full Stack Developer crafting exceptional digital experiences with modern technologies and premium design.
            </Text>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Group gap="md">
              <Button
                size="xl"
                radius="xl"
                variant="gradient"
                gradient={{ from: 'indigo', to: 'purple', deg: 135 }}
                leftSection={<IconDownload size={22} />}
                component="a"
                href="/resume.pdf"
                download
                className="hover:scale-105 shadow-glow"
                style={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                Download Resume
              </Button>
              <Button
                size="xl"
                radius="xl"
                variant="outline"
                color="gray"
                leftSection={<IconMail size={22} />}
                component="a"
                href="#contact"
                className="hover:scale-105 transition-all"
                style={{
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
              >
                Contact Me
              </Button>
            </Group>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <Group gap="lg" mt="xl">
              {[
                { icon: IconBrandGithub, href: 'https://github.com/leomessi1077', label: 'GitHub' },
                { icon: IconBrandLinkedin, href: 'https://www.linkedin.com/in/manish-kumar-yadav-6879691a0/', label: 'LinkedIn' },
                { icon: IconMail, href: 'mailto:yadavmanish7675@gmail.com', label: 'Email' }
              ].map((social, index) => (
                <Tooltip label={social.label} key={index} withArrow position="bottom" transitionProps={{ duration: 200 }}>
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'var(--text-secondary)',
                      backdropFilter: 'blur(5px)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <social.icon size={24} stroke={1.5} />
                  </motion.a>
                </Tooltip>
              ))}
            </Group>
          </motion.div>
        </Stack>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '50%',
            transform: 'translateX(-50%)',
            cursor: 'pointer'
          }}
          onClick={scrollToAbout}
        >
          <Stack align="center" gap={8}>
            <Text size="xs" c="dimmed" tt="uppercase" style={{ letterSpacing: '3px', fontSize: '0.7rem' }}>Scroll</Text>
            <div style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.5))'
            }} />
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home;