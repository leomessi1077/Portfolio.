import React from 'react';
import { Container, Title, Card, Text, Badge, Stack, Box, ThemeIcon, SimpleGrid, rem, useMantineTheme, Group, Center, RingProgress } from '@mantine/core';
import { IconCode, IconDatabase, IconBrandReact, IconTools, IconCloud, IconBrain, IconSparkles } from '@tabler/icons-react';
import { motion } from 'framer-motion';

const Skills = () => {
  const theme = useMantineTheme();
  
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: ['Java', 'HTML/CSS', 'JavaScript'],
      color: 'indigo',
      icon: IconCode,
      gradient: { from: 'indigo', to: 'violet', deg: 45 },
      proficiency: 90
    },
    {
      title: 'Databases',
      skills: ['MongoDB', 'SQL'],
      color: 'teal',
      icon: IconDatabase,
      gradient: { from: 'teal', to: 'green', deg: 45 },
      proficiency: 85
    },
    {
      title: 'Libraries/Frameworks',
      skills: ['Node.js', 'Express', 'React.js'],
      color: 'cyan',
      icon: IconBrandReact,
      gradient: { from: 'cyan', to: 'blue', deg: 45 },
      proficiency: 92
    },
    {
      title: 'Developer Tools',
      skills: ['VS Code', 'GitHub', 'Docker'],
      color: 'orange',
      icon: IconTools,
      gradient: { from: 'orange', to: 'red', deg: 45 },
      proficiency: 88
    },
    {
      title: 'DevOps & Deployment',
      skills: ['CI/CD', 'Docker'],
      color: 'grape',
      icon: IconCloud,
      gradient: { from: 'grape', to: 'pink', deg: 45 },
      proficiency: 80
    },
    {
      title: 'Additional Skills',
      skills: ['DSA', 'OOPS'],
      color: 'lime',
      icon: IconBrain,
      gradient: { from: 'lime', to: 'green', deg: 45 },
      proficiency: 87
    }
  ];

  return (
    <Box id="skills" bg="white" py={rem(120)}>
      <Container size="xl">
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
              gradient={{ from: 'cyan', to: 'blue', deg: 45 }}
              radius="xl"
              px="xl"
              py="md"
              tt="uppercase"
              fw={700}
              leftSection={<IconSparkles size={18} />}
            >
              Tech Stack
            </Badge>
            <Title 
              order={1} 
              ta="center" 
              size={rem(48)}
              fw={900}
              variant="gradient"
              gradient={{ from: 'cyan', to: 'blue', deg: 45 }}
            >
              Technical Skills
            </Title>
            <Text ta="center" c="dimmed" size="xl" maw={800} px="md">
              Technologies and tools I work with to build scalable, high-performance applications
            </Text>
          </Stack>
        </motion.div>
        
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  shadow="lg"
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
                    e.currentTarget.style.boxShadow = theme.shadows.lg;
                  }}
                >
                  <Stack gap="xl" align="center">
                    {/* Icon with Ring Progress */}
                    <Box pos="relative">
                      <RingProgress
                        size={rem(140)}
                        thickness={8}
                        roundCaps
                        sections={[{ 
                          value: category.proficiency, 
                          color: category.color 
                        }]}
                        label={
                          <Center>
                            <ThemeIcon
                              size={rem(80)}
                              radius="xl"
                              variant="gradient"
                              gradient={category.gradient}
                            >
                              <IconComponent size={rem(40)} stroke={2} />
                            </ThemeIcon>
                          </Center>
                        }
                      />
                      <Badge
                        size="sm"
                        variant="filled"
                        color={category.color}
                        radius="xl"
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0
                        }}
                      >
                        {category.proficiency}%
                      </Badge>
                    </Box>
                    
                    <Stack gap="md" align="center" w="100%">
                      <Title order={3} size="h3" ta="center" fw={700}>
                        {category.title}
                      </Title>
                      
                      <Group gap="xs" justify="center">
                        {category.skills.map((skill, skillIndex) => (
                          <Badge 
                            key={skillIndex}
                            size="lg"
                            variant="light"
                            color={category.color}
                            radius="md"
                            fw={600}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </Group>
                    </Stack>
                  </Stack>
                </Card>
              </motion.div>
            );
          })}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Skills;
