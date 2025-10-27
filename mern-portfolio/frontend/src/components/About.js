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
    <Box id="about" bg="gray.0" py={rem(120)}>
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
              gradient={{ from: 'violet', to: 'grape', deg: 45 }}
              radius="xl"
              px="xl"
              py="md"
              tt="uppercase"
              fw={700}
              leftSection={<IconTarget size={18} />}
            >
              About Me
            </Badge>
            
            <Title 
              order={1} 
              ta="center"
              size={rem(48)}
              fw={900}
              variant="gradient"
              gradient={{ from: 'violet', to: 'grape', deg: 45 }}
            >
              Profile Summary
            </Title>
            
            <Text 
              size="xl" 
              ta="center" 
              c="dimmed" 
              maw={800}
              px="md"
            >
              Full Stack Developer skilled in <Text span fw={700} c="violet">Java, JavaScript and React</Text>, 
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
            >
              <Card
                shadow="md"
                padding="xl"
                radius="xl"
                withBorder
                h="100%"
                style={{
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px)';
                  e.currentTarget.style.boxShadow = theme.shadows.xl;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = theme.shadows.md;
                }}
              >
                <Stack gap="lg" align="center">
                  <ThemeIcon
                    size={rem(80)}
                    radius="xl"
                    variant="gradient"
                    gradient={feature.gradient}
                  >
                    <feature.icon size={rem(40)} stroke={2} />
                  </ThemeIcon>
                  
                  <Stack gap="xs" align="center">
                    <Title order={3} size="h3" ta="center" fw={700}>
                      {feature.title}
                    </Title>
                    <Text size="md" c="dimmed" ta="center">
                      {feature.description}
                    </Text>
                  </Stack>
                </Stack>
              </Card>
            </motion.div>
          ))}
        </SimpleGrid>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
            {[
              { value: '3+', label: 'Years Experience as Freelance', icon: IconTrophy, gradient: { from: 'violet', to: 'grape' } },
              { value: '20+', label: 'Projects Completed', icon: IconTarget, gradient: { from: 'cyan', to: 'blue' } },
              { value: '100%', label: 'Client Satisfaction', icon: IconHeart, gradient: { from: 'pink', to: 'red' } }
            ].map((stat, index) => (
              <Card
                key={index}
                shadow="lg"
                padding="xl"
                radius="xl"
                withBorder
                style={{
                  background: `linear-gradient(135deg, var(--mantine-color-${stat.gradient.from}-6), var(--mantine-color-${stat.gradient.to}-6))`,
                  border: 'none'
                }}
              >
                <Stack align="center" gap="md">
                  <ThemeIcon
                    size={rem(60)}
                    radius="xl"
                    variant="white"
                    color={stat.gradient.from}
                  >
                    <stat.icon size={rem(32)} />
                  </ThemeIcon>
                  <Text 
                    size={rem(56)} 
                    fw={900} 
                    c="white"
                    lh={1}
                  >
                    {stat.value}
                  </Text>
                  <Text 
                    size="md" 
                    c="white" 
                    fw={600}
                    tt="uppercase"
                    ta="center"
                  >
                    {stat.label}
                  </Text>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About;
