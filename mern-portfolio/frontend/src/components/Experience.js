import React from 'react';
import { Container, Title, Text, Box, Stack, Badge, ThemeIcon, Card, Timeline, rem, useMantineTheme, Divider, Group } from '@mantine/core';
import { IconBriefcase, IconCalendar, IconMapPin, IconTrendingUp, IconCheck, IconBuilding, IconRocket } from '@tabler/icons-react';
import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: 'Back End Developer',
      company: 'K-lite',
      type: 'Full-time',
      duration: 'Sep 2025 - Present',
      period: '2 mos',
      location: 'Delhi, India',
      locationType: 'On-site',
      current: true,
      color: 'blue',
      achievements: [
        { text: 'Contributed to building and maintaining scalable backend systems for product-based applications', metric: '12% performance boost' },
        { text: 'Designed and optimized database schemas, enhancing query efficiency', metric: '15% faster retrieval' },
        { text: 'Developed and integrated RESTful APIs, ensuring seamless communication between services and frontend systems', metric: null },
        { text: 'Collaborated with cross-functional teams to deliver high-quality product features on time', metric: 'improved satisfaction' },
        { text: 'Debugged, tested, and optimized backend services', metric: '10% faster response' },
        { text: 'Supported deployment and monitoring of production applications, ensuring system reliability and uptime', metric: null }
      ]
    },
    {
      id: 2,
      title: 'Back End Developer',
      company: 'Livnium',
      type: 'Internship',
      duration: 'April 2025 - September 2025',
      period: '6 months',
      location: 'Mumbai, Maharashtra, India',
      locationType: 'Remote',
      current: false,
      color: 'violet',
      achievements: [
        { text: 'Built scalable backend systems with Node.js', metric: '10% efficiency boost' },
        { text: 'Integrated RESTful APIs', metric: '8% faster data flow' },
        { text: 'Fixed bugs and added features with frontend team', metric: '10% better UX' },
        { text: 'Debugged and optimized backend', metric: '12% faster response' },
        { text: 'Delivered live client projects on time', metric: '9% team efficiency' },
        { text: 'Developed app and website with team', metric: '10% client productivity' }
      ]
    }
  ];

  const theme = useMantineTheme();
  
  return (
    <Box id="experience" bg="white" py={rem(120)}>
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
              gradient={{ from: 'blue', to: 'indigo', deg: 45 }}
              radius="xl"
              px="xl"
              py="md"
              tt="uppercase"
              fw={700}
              leftSection={<IconRocket size={18} />}
            >
              Career Journey
            </Badge>
            <Title 
              order={1} 
              ta="center" 
              size={rem(48)}
              fw={900}
              variant="gradient"
              gradient={{ from: 'blue', to: 'indigo', deg: 45 }}
            >
              Experience
            </Title>
            <Text size="xl" c="dimmed" ta="center" maw={800} px="md">
              Building scalable solutions and driving innovation through backend excellence
            </Text>
          </Stack>
        </motion.div>

        {/* Timeline */}
        <Timeline active={experiences.length} bulletSize={rem(60)} lineWidth={4} color="blue">
          {experiences.map((exp, index) => (
            <Timeline.Item
              key={exp.id}
              bullet={
                <ThemeIcon 
                  size={rem(40)} 
                  radius="xl" 
                  variant="gradient"
                  gradient={{ from: exp.color, to: exp.color, deg: 45 }}
                >
                  <IconBriefcase size={rem(20)} />
                </ThemeIcon>
              }
              title={
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    shadow="lg"
                    padding="xl"
                    radius="xl"
                    withBorder
                    style={{
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      background: exp.current ? `var(--mantine-color-${exp.color}-0)` : 'white'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = theme.shadows.xl;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = theme.shadows.lg;
                    }}
                  >
                    <Stack gap="lg">
                      {/* Header */}
                      <Stack gap="sm">
                        <Group justify="space-between" align="flex-start" wrap="wrap">
                          <Stack gap="xs">
                            <Group gap="xs">
                              <Title order={2} size="h2" fw={800}>
                                {exp.title}
                              </Title>
                              {exp.current && (
                                <Badge 
                                  size="lg" 
                                  variant="gradient" 
                                  gradient={{ from: 'teal', to: 'green', deg: 45 }}
                                  leftSection={<IconTrendingUp size={16} />}
                                >
                                  Current
                                </Badge>
                              )}
                            </Group>
                            <Group gap="xs">
                              <ThemeIcon size="sm" radius="sm" variant="light" color={exp.color}>
                                <IconBuilding size={14} />
                              </ThemeIcon>
                              <Text size="lg" fw={700} c={exp.color}>
                                {exp.company}
                              </Text>
                            </Group>
                          </Stack>
                          <Badge 
                            size="lg" 
                            variant="light" 
                            color={exp.color}
                            radius="md"
                          >
                            {exp.type}
                          </Badge>
                        </Group>

                        {/* Date & Location */}
                        <Group grow>
                          <Group gap="xs">
                            <ThemeIcon size="md" radius="md" variant="light" color={exp.color}>
                              <IconCalendar size={16} />
                            </ThemeIcon>
                            <Box>
                              <Text size="sm" fw={600}>{exp.duration}</Text>
                              <Text size="xs" c="dimmed">{exp.period}</Text>
                            </Box>
                          </Group>
                          <Group gap="xs">
                            <ThemeIcon size="md" radius="md" variant="light" color={exp.color}>
                              <IconMapPin size={16} />
                            </ThemeIcon>
                            <Box>
                              <Text size="sm" fw={600}>{exp.location}</Text>
                              <Text size="xs" c="dimmed">{exp.locationType}</Text>
                            </Box>
                          </Group>
                        </Group>
                      </Stack>

                      <Divider />

                      {/* Achievements */}
                      <Stack gap="md">
                        <Group gap="xs">
                          <ThemeIcon size="sm" radius="sm" variant="light" color="green">
                            <IconCheck size={14} />
                          </ThemeIcon>
                          <Text size="sm" fw={700} tt="uppercase" c="dimmed">
                            Key Achievements
                          </Text>
                        </Group>
                        <Stack gap="sm">
                          {exp.achievements.map((achievement, idx) => (
                            <Card
                              key={idx}
                              padding="md"
                              radius="md"
                              withBorder
                              bg="gray.0"
                            >
                              <Group justify="space-between" align="flex-start" wrap="nowrap">
                                <Group gap="sm" style={{ flex: 1 }}>
                                  <ThemeIcon 
                                    size="xs" 
                                    radius="xl" 
                                    variant="light" 
                                    color={exp.color}
                                  >
                                    <IconCheck size={10} />
                                  </ThemeIcon>
                                  <Text size="sm" style={{ flex: 1 }}>
                                    {achievement.text}
                                  </Text>
                                </Group>
                                {achievement.metric && (
                                  <Badge 
                                    variant="filled" 
                                    color={exp.color}
                                    size="sm"
                                    radius="sm"
                                  >
                                    {achievement.metric}
                                  </Badge>
                                )}
                              </Group>
                            </Card>
                          ))}
                        </Stack>
                      </Stack>
                    </Stack>
                  </Card>
                </motion.div>
              }
            />
          ))}
        </Timeline>
      </Container>
    </Box>
  );
};

export default Experience;
