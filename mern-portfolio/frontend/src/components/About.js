import React from 'react';
import { Container, Title, Text, Box, Card, ThemeIcon, Stack, Badge, SimpleGrid, rem, useMantineTheme } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconCode, IconRocket, IconUsers, IconBulb, IconTrophy, IconHeart, IconTarget } from '@tabler/icons-react';

const About = () => {
  const theme = useMantineTheme();

  const features = [
    {
      icon: IconCode,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and efficient code following industry best practices.',
      color: 'violet',
      gradient: { from: 'violet', to: 'grape', deg: 45 }
    },
    {
      icon: IconRocket,
      title: 'Fast Performance',
      description: 'Optimizing applications for speed and performance to deliver the best user experience.',
      color: 'pink',
      gradient: { from: 'pink', to: 'red', deg: 45 }
    },
    {
      icon: IconBulb,
      title: 'Innovative Solutions',
      description: 'Thinking creatively to solve complex problems with modern technologies.',
      color: 'cyan',
      gradient: { from: 'cyan', to: 'blue', deg: 45 }
    },
    {
      icon: IconUsers,
      title: 'Team Collaboration',
      description: 'Working effectively in teams to deliver projects on time and exceed expectations.',
      color: 'teal',
      gradient: { from: 'teal', to: 'green', deg: 45 }
    },
    {
      icon: IconTrophy,
      title: 'Results Driven',
      description: 'Focused on achieving measurable outcomes and delivering value to stakeholders.',
      color: 'orange',
      gradient: { from: 'orange', to: 'yellow', deg: 45 }
    },
    {
      icon: IconHeart,
      title: 'Passion for Tech',
      description: 'Continuously learning and staying updated with the latest technologies and trends.',
      color: 'indigo',
      gradient: { from: 'indigo', to: 'violet', deg: 45 }
    }
  ];

  return (
    <Box id="about" py={rem(120)} style={{ position: 'relative', zIndex: 1 }}>
      <Container size="xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Stack align="center" gap="xl" mb={rem(60)}>
            <Badge
              size="xl"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
              radius="xl"
              px="xl"
              py="md"
              tt="uppercase"
              fw={700}
              leftSection={<IconTarget size={18} />}
              style={{
                boxShadow: '0 4px 20px rgba(6, 182, 212, 0.5)',
                letterSpacing: '1px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              About Me
            </Badge>

            <Title
              order={1}
              style={{
                fontSize: rem(48),
                fontWeight: 900,
                background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center'
              }}
            >
              Profile Summary
            </Title>

            <Text
              size="xl"
              ta="center"
              c="dimmed"
              maw={800}
              px="md"
              style={{ color: 'var(--text-secondary)', fontSize: rem(20), lineHeight: 1.6 }}
            >
              Full Stack Developer skilled in <Text span fw={700} c="cyan.4">Java, JavaScript and React</Text>,
              focused on building scalable web applications and delivering impactful solutions that make a difference.
            </Text>
          </Stack>
        </motion.div>

        {/* Features Grid */}
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3 }}
          spacing="xl"
          mb={rem(80)}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card
                padding="xl"
                radius="xl"
                style={{
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.3s ease'
                }}
                className="hover-glow"
              >
                <Stack gap="lg" align="center">
                  <ThemeIcon
                    size={rem(80)}
                    radius="xl"
                    variant="gradient"
                    gradient={feature.gradient}
                    style={{
                      boxShadow: `0 10px 30px ${theme.colors[feature.color][9]}40`,
                      transition: 'transform 0.3s ease'
                    }}
                    className="icon-float"
                  >
                    <feature.icon size={rem(40)} stroke={1.5} />
                  </ThemeIcon>

                  <Stack gap="xs" align="center">
                    <Title order={3} size="h3" ta="center" fw={700} style={{ color: 'white' }}>
                      {feature.title}
                    </Title>
                    <Text size="md" c="dimmed" ta="center" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      {feature.description}
                    </Text>
                  </Stack>
                </Stack>
              </Card>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default About;
