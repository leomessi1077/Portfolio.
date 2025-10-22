import React, { useState, useEffect } from 'react';
import { Group, Anchor, Burger, Drawer, Stack, Box, rem, Indicator } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { motion } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const Header = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Detect active section
      const sections = navItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      component="header"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: rem(70),
        zIndex: 1000,
        background: scrolled 
          ? 'rgba(255, 255, 255, 0.98)' 
          : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: `2px solid ${scrolled ? 'var(--mantine-color-violet-2)' : 'transparent'}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: scrolled ? '0 4px 20px rgba(102, 126, 234, 0.1)' : 'none',
      }}
    >
      <Group justify="space-between" h="100%" px={rem(32)}>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            component={Anchor}
            href="#home"
            px="md"
            py="xs"
            style={{
              background: 'linear-gradient(135deg, var(--mantine-color-violet-6), var(--mantine-color-grape-6))',
              borderRadius: rem(8),
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05) rotateZ(-2deg)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotateZ(0deg)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Box
              component="span"
              c="white"
              fw={900}
              size={rem(24)}
              style={{
                letterSpacing: rem(-1),
                fontFamily: 'system-ui, -apple-system'
              }}
            >
              MKY
            </Box>
          </Box>
        </motion.div>
        
        {/* Desktop Navigation */}
        <Group gap="xs" visibleFrom="sm">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {isActive ? (
                  <Indicator inline processing color="violet" size={8}>
                    <Box
                      component={Anchor}
                      href={item.href}
                      px={rem(16)}
                      py={rem(8)}
                      bg="violet.0"
                      c="violet.7"
                      fw={700}
                      size="md"
                      style={{
                        textDecoration: 'none',
                        borderRadius: rem(8),
                        transition: 'all 0.2s ease',
                        border: '2px solid var(--mantine-color-violet-3)'
                      }}
                    >
                      {item.label}
                    </Box>
                  </Indicator>
                ) : (
                  <Box
                    component={Anchor}
                    href={item.href}
                    px={rem(16)}
                    py={rem(8)}
                    c="gray.7"
                    fw={500}
                    size="md"
                    style={{
                      textDecoration: 'none',
                      borderRadius: rem(8),
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--mantine-color-gray-1)';
                      e.currentTarget.style.color = 'var(--mantine-color-violet-7)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--mantine-color-gray-7)';
                    }}
                  >
                    {item.label}
                  </Box>
                )}
              </motion.div>
            );
          })}
        </Group>

        {/* Mobile Burger Menu */}
        <Burger 
          opened={opened} 
          onClick={toggle} 
          hiddenFrom="sm" 
          size="md"
          color="violet"
        />
      </Group>

      {/* Mobile Drawer */}
      <Drawer 
        opened={opened} 
        onClose={close} 
        size="75%" 
        position="right"
        hiddenFrom="sm"
        padding="xl"
        styles={{
          content: {
            background: 'linear-gradient(135deg, var(--mantine-color-violet-6), var(--mantine-color-grape-6))',
          },
          header: {
            background: 'transparent',
          },
          close: {
            color: 'white',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.2)',
            }
          },
          body: {
            padding: 0
          }
        }}
      >
        <Stack gap="xs" pt="xl">
          {navItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Box
                component={Anchor}
                href={item.href}
                onClick={close}
                p="lg"
                c="white"
                fw={700}
                size="lg"
                style={{
                  textDecoration: 'none',
                  display: 'block',
                  borderRadius: rem(12),
                  transition: 'all 0.2s ease',
                  background: 'rgba(255, 255, 255, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateX(8px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                {item.label}
              </Box>
            </motion.div>
          ))}
        </Stack>
      </Drawer>
    </Box>
  );
};

export default Header;
