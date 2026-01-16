import React from 'react';
import { Container, Title, Text, Box, Stack, Badge, SimpleGrid, Card, Progress, rem, useMantineTheme, Group, ThemeIcon, Divider, Paper, RingProgress, Center } from '@mantine/core';
import { IconTools, IconCode, IconDatabase, IconServer, IconDeviceDesktop, IconCloud, IconShoppingCart } from '@tabler/icons-react';
import { motion } from 'framer-motion';

const Skills = () => {
  const theme = useMantineTheme();

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: IconDeviceDesktop,
      color: 'cyan',
      skills: [
        { name: 'React.js', level: 90 },
        { name: 'HTML5/CSS3', level: 95 },
        { name: 'JavaScript (ES6+)', level: 85 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'Mantine UI', level: 85 }
      ]
    },
    {
      title: 'Backend Development',
      icon: IconServer,
      color: 'violet',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 85 },
        { name: 'REST APIs', level: 90 },
        { name: 'Java', level: 75 },
        { name: 'Socket.io', level: 80 }
      ]
    },
    {
      title: 'Database & Cloud',
      icon: IconDatabase,
      color: 'grape',
      skills: [
        { name: 'MongoDB', level: 85 },
        { name: 'Mongoose', level: 85 },
        { name: 'MySQL', level: 70 },
        { name: 'AWS', level: 75 },
        { name: 'Vercel', level: 80 },
        { name: 'Git/GitHub', level: 90 }
      ]
    },
    {
      title: 'E-Commerce & Tools',
      icon: IconShoppingCart,
      color: 'green',
      skills: [
        { name: 'Shopify', level: 85 },
        { name: 'WordPress', level: 80 },
        { name: 'Git/GitHub', level: 90 }
      ]
    }
  ];

  return (
    <Box id="skills" py={rem(120)} style={{ position: 'relative', zIndex: 1 }}>
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
              gradient={{ from: 'cyan', to: 'blue', deg: 90 }}
              radius="xl"
              px="xl"
              py="md"
              tt="uppercase"
              fw={700}
              leftSection={<IconTools size={18} />}
              style={{
                boxShadow: '0 4px 15px rgba(6, 182, 212, 0.5)',
                letterSpacing: '1px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              My Expertise
            </Badge>
            <Title
              order={1}
              className="section-title"
            >
              Technical Skills
            </Title>
            <Text size="xl" c="dimmed" ta="center" maw={800} px="md" style={{ color: 'var(--text-secondary)' }}>
              A comprehensive overview of my technical proficiency and toolset
            </Text>
          </Stack>
        </motion.div>

        {/* Skills Grid */}
        <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} spacing="xl">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                padding="xl"
                radius="xl"
                className="skill-card"
                style={{
                  height: '100%',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
              >
                {/* Gradient Overlay on Hover */}
                <Box
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, var(--mantine-color-${category.color}-6), var(--mantine-color-${category.color}-4))`,
                    opacity: 0.8,
                    transition: 'height 0.3s ease'
                  }}
                  className="skill-card-accent"
                />

                <Stack gap="xl">
                  {/* Category Header */}
                  <Group wrap="nowrap" gap="md">
                    <ThemeIcon
                      size={rem(56)}
                      radius="lg"
                      variant="gradient"
                      gradient={{ from: category.color, to: `${category.color}.4`, deg: 45 }}
                      style={{
                        boxShadow: `0 8px 20px rgba(0,0,0,0.3), 0 0 20px var(--mantine-color-${category.color}-9)`,
                        transition: 'all 0.3s ease'
                      }}
                      className="skill-icon"
                    >
                      <category.icon size={rem(28)} stroke={1.5} />
                    </ThemeIcon>
                    <Box style={{ flex: 1 }}>
                      <Title order={3} size="h4" fw={700} style={{ color: 'white', marginBottom: '4px' }}>
                        {category.title}
                      </Title>
                      <Text size="xs" c="dimmed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        {category.skills.length} skills
                      </Text>
                    </Box>
                  </Group>

                  <Divider color="rgba(255,255,255,0.1)" />

                  {/* Skills List */}
                  <Stack gap="md">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <Box>
                          <Group justify="space-between" mb={8}>
                            <Text fw={600} size="sm" style={{ color: 'rgba(255,255,255,0.95)' }}>
                              {skill.name}
                            </Text>
                            <Badge
                              size="sm"
                              variant="gradient"
                              gradient={{ from: category.color, to: `${category.color}.4`, deg: 90 }}
                              style={{ fontWeight: 700 }}
                            >
                              {skill.level}%
                            </Badge>
                          </Group>
                          <Progress
                            value={skill.level}
                            color={category.color}
                            size="sm"
                            radius="xl"
                            striped
                            animated
                            bg="rgba(255,255,255,0.08)"
                            style={{
                              boxShadow: `0 2px 8px rgba(0,0,0,0.2)`,
                              border: '1px solid rgba(255,255,255,0.05)'
                            }}
                          />
                        </Box>
                      </motion.div>
                    ))}
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

export default Skills;
