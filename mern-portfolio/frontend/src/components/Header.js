import React, { useState, useEffect } from 'react';
import { Container, Group, Burger, Drawer, Stack, Button, Box, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCode } from '@tabler/icons-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -100 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      close();
      setActiveSection(id);
    }
  };

  const menuItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <Box
      component={motion.header}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '1rem 0' : '1.5rem 0',
        transition: 'padding 0.3s ease'
      }}
    >
      <Container size="lg">
        <Box
          style={{
            background: scrolled ? 'rgba(3, 7, 18, 0.9)' : 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '100px',
            padding: '0.75rem 1.5rem',
            boxShadow: scrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.5)' : 'none',
            transition: 'all 0.3s ease'
          }}
        >
          <Group justify="space-between" h="100%">
            {/* Logo */}
            <Group
              gap="xs"
              style={{ cursor: 'pointer' }}
              onClick={() => scrollTo('home')}
            >
              <Box
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  padding: '6px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <IconCode size={20} color="white" stroke={2.5} />
              </Box>
              <Text
                fw={700}
                size="lg"
                style={{
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '-0.02em'
                }}
              >
                Manish<span style={{ color: '#a855f7' }}>.dev</span>
              </Text>
            </Group>

            {/* Desktop Menu */}
            <Group gap={4} visibleFrom="sm">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant="subtle"
                  color="gray"
                  radius="xl"
                  size="sm"
                  onClick={() => scrollTo(item.id)}
                  style={{
                    color: activeSection === item.id ? '#fff' : 'var(--text-secondary)',
                    backgroundColor: activeSection === item.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                    fontWeight: 500,
                    transition: 'all 0.2s ease'
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Group>

            {/* Mobile Menu Button */}
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              color="white"
            />
          </Group>
        </Box>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="xl"
        hiddenFrom="sm"
        zIndex={1001}
        styles={{
          content: {
            background: '#030712',
            color: 'white'
          },
          header: {
            background: 'transparent',
            color: 'white'
          },
          close: {
            color: 'white',
            '&:hover': { background: 'rgba(255,255,255,0.1)' }
          }
        }}
      >
        <Stack gap="xl" mt="xl" align="center">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ width: '100%' }}
            >
              <Button
                fullWidth
                variant="subtle"
                color="gray"
                size="xl"
                onClick={() => scrollTo(item.id)}
                style={{
                  color: activeSection === item.id ? '#a855f7' : 'white',
                  fontSize: '1.5rem',
                  height: '60px'
                }}
              >
                {item.label}
              </Button>
            </motion.div>
          ))}
        </Stack>
      </Drawer>
    </Box>
  );
};

export default Header;
