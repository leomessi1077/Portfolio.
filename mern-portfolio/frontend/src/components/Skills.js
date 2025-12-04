import React from 'react';
import { Container, Title, Text, Box, Stack, Badge, SimpleGrid, Card, Progress, rem, useMantineTheme, Group, ThemeIcon, Divider } from '@mantine/core';
import { IconTools, IconCode, IconDatabase, IconServer, IconDeviceDesktop, IconCloud } from '@tabler/icons-react';
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
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
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
                className="glass-card"
                style={{
                  height: '100%',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backgroundColor: 'rgba(255,255,255,0.03)'
                }}
              >
                <Stack gap="xl">
                  {/* Category Header */}
                  <Group>
                    <ThemeIcon
                      size={rem(50)}
                      radius="md"
                      variant="gradient"
                      gradient={{ from: category.color, to: `${category.color}.4`, deg: 45 }}
                      style={{ boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}
                    >
                      <category.icon size={rem(26)} stroke={1.5} />
                    </ThemeIcon>
                    <Title order={3} size="h3" fw={700} style={{ color: 'white' }}>
                      {category.title}
                    </Title>
                  </Group>

                  <Divider color="rgba(255,255,255,0.1)" />

                  {/* Skills List */}
                  <Stack gap="lg">
                    {category.skills.map((skill, skillIndex) => (
                      <Box key={skillIndex}>
                        <Group justify="space-between" mb={5}>
                          <Text fw={600} size="sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
                            {skill.name}
                          </Text>
                          <Text fw={700} size="xs" c={category.color} style={{ color: `var(--mantine-color-${category.color}-4)` }}>
                            {skill.level}%
                          </Text>
                        </Group>
                        <Progress
                          value={skill.level}
                          color={category.color}
                          size="md"
                          radius="xl"
                          striped
                          animated
                          bg="rgba(255,255,255,0.1)"
                        />
                      </Box>
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
