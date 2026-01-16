import React from 'react';
import { Container, Title, Card, Text, Button, Badge, Stack, Box, Image, SimpleGrid, rem, ActionIcon, Tooltip, Group } from '@mantine/core';
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
  return (
    <Box id="projects" py={rem(120)} style={{ position: 'relative', zIndex: 1 }}>
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
              gradient={{ from: 'pink', to: 'orange', deg: 90 }}
              radius="xl"
              px="xl"
              py="md"
              tt="uppercase"
              fw={700}
              leftSection={<IconRocket size={18} />}
              style={{
                boxShadow: '0 4px 15px rgba(236, 72, 153, 0.5)',
                letterSpacing: '1px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Portfolio
            </Badge>
            <Title
              order={1}
              className="section-title"
            >
              Featured Projects
            </Title>
            <Text ta="center" c="dimmed" size="xl" maw={800} px="md" style={{ color: 'var(--text-secondary)' }}>
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
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ height: '100%' }}
              >
                <Card
                  padding={0}
                  radius="xl"
                  className="glass-card"
                  style={{
                    height: '100%',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backgroundColor: 'rgba(255,255,255,0.03)'
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
                      style={{ zIndex: 10, boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}
                    >
                      Featured
                    </Badge>
                  )}

                  {/* Project Image */}
                  <Box pos="relative" h={rem(240)} style={{ overflow: 'hidden' }}>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      style={{ height: '100%' }}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        h={rem(240)}
                        fit="cover"
                      />
                    </motion.div>
                    {/* Quick Actions Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.75)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: rem(16),
                        backdropFilter: 'blur(8px)'
                      }}
                    >
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <Tooltip label="View Code" withArrow>
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
                      </motion.div>
                      {project.live !== '#' && (
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                          <Tooltip label="Live Demo" withArrow>
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
                        </motion.div>
                      )}
                    </motion.div>
                  </Box>

                  {/* Project Content */}
                  <Stack gap="lg" p="xl">
                    <Title order={2} size="h2" fw={800} style={{ color: 'white' }}>
                      {project.title}
                    </Title>

                    <Text size="md" c="dimmed" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                      {project.description}
                    </Text>

                    {/* Tech Stack */}
                    <Stack gap="xs">
                      <Text size="xs" fw={700} c="dimmed" tt="uppercase" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '1px' }}>
                        Technologies
                      </Text>
                      <Group gap="xs">
                        {project.tech.map((tech, techIndex) => (
                          <motion.div
                            key={techIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: techIndex * 0.05 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <Badge
                              variant="light"
                              color={project.color}
                              size="lg"
                              radius="md"
                              className="glass-card"
                              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                            >
                              {tech}
                            </Badge>
                          </motion.div>
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
                        className="glass-card transition-all"
                        style={{
                          background: 'transparent',
                          color: 'white',
                          borderColor: 'rgba(255,255,255,0.2)'
                        }}
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
                          className="shadow-glow"
                          style={{ transition: 'all 0.3s ease' }}
                        >
                          Demo
                        </Button>
                      )}
                    </Group>
                  </Stack>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>
    </Box >
  );
};

export default Projects;
