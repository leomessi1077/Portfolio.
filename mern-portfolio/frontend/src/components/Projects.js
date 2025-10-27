import React from 'react';
import { Container, Title, Card, Text, Button, Badge, Stack, Box, Image, SimpleGrid, rem, useMantineTheme, ActionIcon, Tooltip, Group } from '@mantine/core';
import { IconBrandGithub, IconExternalLink, IconRocket, IconStar } from '@tabler/icons-react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'E-Commerce Platform',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    description: 'Developed full-stack e-commerce platform with seamless cart management, checkout flow, JWT authentication with bcrypt hashing, role-based access control, seller dashboard with CRUD operations, and integrated Razorpay payment gateway with cryptographic verification.',
    github: 'https://github.com/leomessi1077/E-commerce',
    live: 'https://e-commerce-5t27.vercel.app/',
    image: '/1000120910.jpg',
    color: 'blue',
    featured: true
  },
  {
    title: 'Meal Express',
    tech: ['HTML', 'CSS', 'JavaScript', 'WebAPI'],
    description: 'Integrated video streaming functionality, allowing users to watch recipe videos directly within the application.',
    github: 'https://github.com/leomessi1077/meal-app',
    live: 'https://meal-app-coral.vercel.app/',
    image: '/1000120912.jpg',
    color: 'orange',
    featured: false
  },
  {
    title: 'Data Authentication',
    tech: ['Node.js', 'REST APIs', 'Mongoose', 'Express', 'EJS'],
    description: 'Designed and implemented a scalable authentication system using Node.js, REST APIs, Mongoose, and Express.',
    github: 'https://github.com/leomessi1077/node_authentication',
    live: 'https://login-hazel-delta.vercel.app/',
    image: '/1000120914.jpg',
    color: 'violet',
    featured: false
  },
  {
    title: 'Real-Time Chat Application',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Socket.io'],
    description: 'Engineered messaging platform with Socket.io enabling real-time communication, typing indicators, and user status. Implemented JWT authentication with bcrypt hashing, token verification middleware, and 7-day session management. Designed responsive WhatsApp-inspired UI using Tailwind CSS.',
    github: 'https://github.com/leomessi1077/Chat',
    live: 'https://chat-rouge-xi-64.vercel.app/',
    image: '/f30e6c88-40f5-43da-a216-6f93788b518f.jpg',
    color: 'pink',
    featured: true
  }
];

const Projects = () => {
  const theme = useMantineTheme();

  return (
    <Box id="projects" bg="gray.0" py={rem(120)}>
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
              gradient={{ from: 'pink', to: 'orange', deg: 45 }}
              radius="xl"
              px="xl"
              py="md"
              tt="uppercase"
              fw={700}
              leftSection={<IconRocket size={18} />}
            >
              Portfolio
            </Badge>
            <Title 
              order={1} 
              ta="center" 
              size={rem(48)}
              fw={900}
              variant="gradient"
              gradient={{ from: 'pink', to: 'orange', deg: 45 }}
            >
              Featured Projects
            </Title>
            <Text ta="center" c="dimmed" size="xl" maw={800} px="md">
              Showcasing my recent work in web development and application design
            </Text>
          </Stack>
        </motion.div>

        {/* Projects Grid */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                shadow="lg"
                padding={0}
                radius="xl"
                withBorder
                h="100%"
                style={{
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px)';
                  e.currentTarget.style.boxShadow = theme.shadows.xl;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = theme.shadows.lg;
                }}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <Badge
                    size="lg"
                    variant="gradient"
                    gradient={{ from: 'yellow', to: 'orange', deg: 45 }}
                    leftSection={<IconStar size={16} />}
                    pos="absolute"
                    top={rem(16)}
                    right={rem(16)}
                    style={{ zIndex: 10 }}
                  >
                    Featured
                  </Badge>
                )}

                {/* Project Image */}
                <Box pos="relative" h={rem(240)}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    h={rem(240)}
                    fit="cover"
                  />
                  {/* Quick Actions Overlay */}
                  <Box
                    pos="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg="rgba(0,0,0,0.6)"
                    style={{
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: rem(16)
                    }}
                    className="project-overlay"
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                  >
                    <Tooltip label="View Code">
                      <ActionIcon
                        component="a"
                        href={project.github}
                        target="_blank"
                        size="xl"
                        radius="xl"
                        variant="white"
                        color="dark"
                      >
                        <IconBrandGithub size={24} />
                      </ActionIcon>
                    </Tooltip>
                    {project.live !== '#' && (
                      <Tooltip label="Live Demo">
                        <ActionIcon
                          component="a"
                          href={project.live}
                          target="_blank"
                          size="xl"
                          radius="xl"
                          variant="gradient"
                          gradient={{ from: project.color, to: project.color, deg: 45 }}
                        >
                          <IconExternalLink size={24} />
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </Box>
                </Box>

                {/* Project Content */}
                <Stack gap="lg" p="xl">
                  <Title order={2} size="h2" fw={800}>
                    {project.title}
                  </Title>

                  <Text size="md" c="dimmed">
                    {project.description}
                  </Text>

                  {/* Tech Stack */}
                  <Stack gap="xs">
                    <Text size="xs" fw={700} c="dimmed" tt="uppercase">
                      Technologies
                    </Text>
                    <Group gap="xs">
                      {project.tech.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="light"
                          color={project.color}
                          size="lg"
                          radius="md"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </Group>
                  </Stack>

                  {/* Action Buttons */}
                  <Group grow>
                    <Button
                      component="a"
                      href={project.github}
                      target="_blank"
                      variant="default"
                      leftSection={<IconBrandGithub size={18} />}
                      radius="md"
                      size="md"
                    >
                      Code
                    </Button>
                    {project.live !== '#' && (
                      <Button
                        component="a"
                        href={project.live}
                        target="_blank"
                        variant="gradient"
                        gradient={{ from: project.color, to: project.color, deg: 45 }}
                        leftSection={<IconExternalLink size={18} />}
                        radius="md"
                        size="md"
                      >
                        Demo
                      </Button>
                    )}
                  </Group>
                </Stack>
              </Card>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Projects;
