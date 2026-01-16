import React, { useMemo } from 'react';
import { Container, Title, Text, Box, Stack, Badge, ThemeIcon, Card, Timeline, rem, Divider, Group } from '@mantine/core';
import { IconBriefcase, IconCalendar, IconMapPin, IconTrendingUp, IconCheck, IconBuilding, IconRocket } from '@tabler/icons-react';
import { motion } from 'framer-motion';

const Experience = () => {
  console.log('✅ NEW VERSION LOADED - K-lite has 4 achievements only!');

  // Calculate dynamic duration for K-lite
  const calculateDuration = (startYear, startMonth) => {
    const startDate = new Date(startYear, startMonth - 1);
    const currentDate = new Date();
    const diffMonths = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth());

    if (diffMonths === 0) return '1 mo';
    if (diffMonths === 1) return '1 mo';
    if (diffMonths < 12) return `${diffMonths} mos`;

    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;

    if (months === 0) return years === 1 ? '1 yr' : `${years} yrs`;
    return years === 1 ? `1 yr ${months} mos` : `${years} yrs ${months} mos`;
  };

  const kliteDuration = useMemo(() => calculateDuration(2025, 9), []);

  const experiences = [
    {
      id: 1,
      title: 'Backend Developer',
      company: 'K-lite',
      type: 'Full-time',
      duration: 'Sep 2025 - Present',
      period: kliteDuration,
      location: 'Delhi',
      locationType: 'On-site',
      current: true,
      color: 'blue',
      achievements: [
        { text: 'Built task delegation and checklist systems with APIs, enhancing workflow management and team coordination', metric: null },
        { text: 'Resolved 100+ critical bugs through systematic debugging, enhancing application stability and user experience', metric: '100+ bugs fixed' },
        { text: 'Built comprehensive bug reporting system with backend logic, enabling real-time issue tracking and resolution', metric: null },
        { text: 'Developed bug view dashboard with filtering and analytics, providing actionable insights for development and QA teams', metric: null }
      ]
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'Livnium',
      type: 'Internship',
      duration: 'April 2025 - September 2025',
      period: '6 mos',
      location: 'Mumbai, Maharashtra',
      locationType: 'Remote',
      current: false,
      color: 'violet',
      achievements: [
        { text: 'Architected scalable Node.js, Backend Systems handling 1000+ daily requests, boosting overall efficiency by 10%', metric: '10% efficiency boost' },
        { text: 'Developed real-time video calling feature using WebRTC, fulfilling critical client demand for enhanced communication', metric: null },
        { text: 'Integrated AI-powered features into backend, enabling intelligent automation per client specifications', metric: null },
        { text: 'Debugged and optimized backend, cutting response time by 12%', metric: '12% faster response' },
        { text: 'Delivered live client projects on time, increasing team efficiency by 9%', metric: '9% team efficiency' },
        { text: 'Debugged complex backend issues and optimized code architecture, reducing average API response time by 12%', metric: null }
      ]
    }
  ];

  return (
    <Box id="experience" py={rem(120)} style={{ position: 'relative', zIndex: 1 }}>
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
              gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
              radius="xl"
              px="xl"
              py="md"
              tt="uppercase"
              fw={700}
              leftSection={<IconRocket size={18} />}
              style={{
                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.5)',
                letterSpacing: '1px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Career Journey
            </Badge>
            <Title
              order={1}
              className="section-title"
            >
              Experience
            </Title>
            <Text size="xl" c="dimmed" ta="center" maw={800} px="md" style={{ color: 'var(--text-secondary)' }}>
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
                  style={{ boxShadow: '0 0 20px rgba(102, 126, 234, 0.4)' }}
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
                    padding="xl"
                    radius="xl"
                    className="glass-card"
                    style={{
                      border: '1px solid rgba(255,255,255,0.1)',
                      backgroundColor: 'rgba(255,255,255,0.03)'
                    }}
                  >
                    <Stack gap="lg">
                      {/* Header */}
                      <Stack gap="sm">
                        <Group justify="space-between" align="flex-start" wrap="wrap">
                          <Stack gap="xs">
                            <Group gap="xs">
                              <Title order={2} size="h2" fw={800} style={{ color: 'white' }}>
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
                              <Text size="lg" fw={700} c={exp.color} style={{ color: `var(--mantine-color-${exp.color}-4)` }}>
                                {exp.company}
                              </Text>
                            </Group>
                          </Stack>
                          <Badge
                            size="lg"
                            variant="light"
                            color={exp.color}
                            radius="md"
                            className="glass-card"
                            style={{ background: 'rgba(255,255,255,0.05)' }}
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
                              <Text size="sm" fw={600} style={{ color: 'white' }}>{exp.duration}</Text>
                              <Text size="xs" c="dimmed">{exp.period}</Text>
                            </Box>
                          </Group>
                          <Group gap="xs">
                            <ThemeIcon size="md" radius="md" variant="light" color={exp.color}>
                              <IconMapPin size={16} />
                            </ThemeIcon>
                            <Box>
                              <Text size="sm" fw={600} style={{ color: 'white' }}>{exp.location}</Text>
                              <Text size="xs" c="dimmed">{exp.locationType}</Text>
                            </Box>
                          </Group>
                        </Group>
                      </Stack>

                      <Divider color="rgba(255,255,255,0.1)" />

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
                              className="glass-card"
                              style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.05)'
                              }}
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
                                  <Text size="sm" style={{ flex: 1, color: 'rgba(255,255,255,0.8)' }}>
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
