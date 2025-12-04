import React from 'react';
import { Text, Box, Container, Group, Anchor, Stack, Divider, ActionIcon, rem, SimpleGrid } from '@mantine/core';
import { IconBrandLinkedin, IconBrandGithub, IconMail, IconArrowUp } from '@tabler/icons-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: IconBrandLinkedin, href: 'https://www.linkedin.com/in/manish-kumar-yadav-6879691a0/', label: 'LinkedIn', color: '#0A66C2' },
    { icon: IconBrandGithub, href: 'https://github.com/leomessi1077', label: 'GitHub', color: '#333' },
    { icon: IconMail, href: 'mailto:yadavmanish7675@gmail.com', label: 'Email', color: '#EA4335' }
  ];

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      component="footer"
      style={{
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: 0,
        position: 'relative',
        zIndex: 10
      }}
    >
      <Container size="xl" py={rem(48)}>
        <Stack gap="xl">
          {/* Top Section */}
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Stack gap="md">
                <Text
                  size={rem(28)}
                  fw={900}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                  lh={1.2}
                >
                  Manish Kumar Yadav
                </Text>
                <Text size="sm" c="dimmed" lh={1.6}>
                  Full Stack Developer passionate about creating innovative web solutions
                  and building meaningful digital experiences.
                </Text>
              </Stack>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Stack gap="md">
                <Text size="xs" fw={700} c="white" tt="uppercase" style={{ letterSpacing: rem(1.5) }}>
                  Quick Links
                </Text>
                <Stack gap="xs">
                  {quickLinks.map((link) => (
                    <Anchor
                      key={link.label}
                      href={link.href}
                      size="sm"
                      c="dimmed"
                      td="none"
                      style={{
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.transform = 'translateX(8px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--mantine-color-dimmed)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      {link.label}
                    </Anchor>
                  ))}
                </Stack>
              </Stack>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Stack gap="md">
                <Text size="xs" fw={700} c="white" tt="uppercase" style={{ letterSpacing: rem(1.5) }}>
                  Connect
                </Text>
                <Group gap="md">
                  {socialLinks.map((social) => (
                    <ActionIcon
                      key={social.label}
                      component="a"
                      href={social.href}
                      target="_blank"
                      size={rem(48)}
                      radius="md"
                      variant="outline"
                      color="gray"
                      style={{
                        transition: 'all 0.2s ease',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.borderColor = social.color;
                        e.currentTarget.style.color = social.color;
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <social.icon size={rem(24)} />
                    </ActionIcon>
                  ))}
                </Group>
              </Stack>
            </motion.div>
          </SimpleGrid>

          {/* Divider */}
          <Divider color="rgba(255,255,255,0.1)" />

          {/* Bottom Section */}
          <Group justify="space-between" align="center" wrap="wrap">
            <Text size="sm" c="dimmed">
              &copy; {currentYear} Manish Kumar Yadav. All Rights Reserved.
            </Text>

            <Group>
              <Text size="sm" c="dimmed">
                Built with React & Mantine
              </Text>
              <ActionIcon
                variant="light"
                color="violet"
                size="lg"
                radius="xl"
                onClick={scrollToTop}
                aria-label="Scroll to top"
              >
                <IconArrowUp size={18} />
              </ActionIcon>
            </Group>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
