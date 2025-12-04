import React, { useState } from 'react';
import { Container, Title, Text, Button, Stack, Box, TextInput, Textarea, Badge, SimpleGrid, ThemeIcon, Card, rem, useMantineTheme, Divider, Anchor } from '@mantine/core';
import { IconMail, IconPhone, IconUser, IconSend, IconBrandLinkedin, IconBrandGithub, IconMapPin, IconCheck, IconX } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

const Contact = () => {
  const theme = useMantineTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      message: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must be at least 2 characters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      mobile: (value) => (value.length < 10 ? 'Mobile number must be at least 10 digits' : null),
    },
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      const API_URL = process.env.REACT_APP_API_URL || '';
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.success) {
        notifications.show({
          title: 'Success!',
          message: "Thank you! I'll get back to you soon.",
          color: 'green',
          icon: <IconCheck size={18} />,
          autoClose: 3000,
          withCloseButton: true,
          style: { marginTop: rem(80) },
        });
        form.reset();
      } else {
        notifications.show({
          title: 'Error',
          message: 'Something went wrong. Please try again.',
          color: 'red',
          icon: <IconX size={18} />,
          autoClose: 3000,
          withCloseButton: true,
          style: { marginTop: rem(80) },
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      notifications.show({
        title: 'Error',
        message: 'Something went wrong. Please try again.',
        color: 'red',
        icon: <IconX size={18} />,
        autoClose: 3000,
        withCloseButton: true,
        style: { marginTop: rem(80) },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: IconMail,
      title: 'Email',
      value: 'yadavmanish7675@gmail.com',
      href: 'mailto:yadavmanish7675@gmail.com',
      color: 'blue'
    },
    {
      icon: IconMapPin,
      title: 'Location',
      value: 'Delhi, India',
      href: null,
      color: 'red'
    }
  ];

  return (
    <Box id="contact" py={rem(120)} style={{ position: 'relative', zIndex: 1 }}>
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
              gradient={{ from: 'grape', to: 'pink', deg: 90 }}
              radius="xl"
              px="xl"
              py="md"
              tt="uppercase"
              fw={700}
              leftSection={<IconSend size={18} />}
              style={{
                boxShadow: '0 4px 15px rgba(192, 38, 211, 0.5)',
                letterSpacing: '1px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Contact
            </Badge>
            <Title
              order={1}
              className="section-title"
            >
              Get In Touch
            </Title>
            <Text ta="center" c="dimmed" size="xl" maw={800} px="md" style={{ color: 'var(--text-secondary)' }}>
              Have a project in mind or want to collaborate? I'd love to hear from you!
            </Text>
          </Stack>
        </motion.div>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          {/* Contact Info */}
          <Stack gap="xl">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  padding="xl"
                  radius="xl"
                  component={info.href ? Anchor : Box}
                  href={info.href || undefined}
                  target={info.href ? "_blank" : undefined}
                  className="glass-card"
                  style={{
                    textDecoration: 'none',
                    cursor: info.href ? 'pointer' : 'default',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backgroundColor: 'rgba(255,255,255,0.03)'
                  }}
                >
                  <Stack gap="md">
                    <ThemeIcon
                      size={rem(70)}
                      radius="xl"
                      variant="gradient"
                      gradient={{ from: info.color, to: info.color, deg: 45 }}
                      style={{ boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}
                    >
                      <info.icon size={rem(32)} />
                    </ThemeIcon>
                    <Stack gap="xs">
                      <Text size="xs" fw={700} c="dimmed" tt="uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        {info.title}
                      </Text>
                      <Text size="lg" fw={700} style={{ color: 'white' }}>
                        {info.value}
                      </Text>
                    </Stack>
                  </Stack>
                </Card>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
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
                  <Text size="xs" fw={700} c="dimmed" tt="uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Connect With Me
                  </Text>
                  <Divider color="rgba(255,255,255,0.1)" />
                  <SimpleGrid cols={2} spacing="md">
                    <Button
                      component="a"
                      href="https://www.linkedin.com/in/manish-kumar-yadav-6879691a0/"
                      target="_blank"
                      variant="gradient"
                      gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
                      leftSection={<IconBrandLinkedin size={20} />}
                      size="lg"
                      radius="md"
                      fullWidth
                      style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                    >
                      LinkedIn
                    </Button>
                    <Button
                      component="a"
                      href="https://github.com/leomessi1077"
                      target="_blank"
                      variant="gradient"
                      gradient={{ from: 'dark', to: 'gray', deg: 45 }}
                      leftSection={<IconBrandGithub size={20} />}
                      size="lg"
                      radius="md"
                      fullWidth
                      style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                    >
                      GitHub
                    </Button>
                  </SimpleGrid>
                </Stack>
              </Card>
            </motion.div>
          </Stack>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
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
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="lg">
                  <Stack gap="xs">
                    <Title order={2} size="h2" fw={800} style={{ color: 'white' }}>
                      Send Message
                    </Title>
                    <Text size="sm" c="dimmed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      Fill out the form below and I'll get back to you soon
                    </Text>
                  </Stack>

                  <Divider color="rgba(255,255,255,0.1)" />

                  <TextInput
                    label="Full Name"
                    placeholder="John Doe"
                    leftSection={<IconUser size={18} />}
                    required
                    size="lg"
                    radius="md"
                    {...form.getInputProps('name')}
                    styles={{
                      input: {
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white'
                      },
                      label: { color: 'rgba(255,255,255,0.8)' }
                    }}
                  />

                  <TextInput
                    label="Email Address"
                    placeholder="john@example.com"
                    leftSection={<IconMail size={18} />}
                    required
                    size="lg"
                    radius="md"
                    {...form.getInputProps('email')}
                    styles={{
                      input: {
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white'
                      },
                      label: { color: 'rgba(255,255,255,0.8)' }
                    }}
                  />

                  <TextInput
                    label="Mobile Number"
                    placeholder="+1 234 567 8900"
                    leftSection={<IconPhone size={18} />}
                    required
                    size="lg"
                    radius="md"
                    {...form.getInputProps('mobile')}
                    styles={{
                      input: {
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white'
                      },
                      label: { color: 'rgba(255,255,255,0.8)' }
                    }}
                  />

                  <Textarea
                    label="Message"
                    placeholder="Tell me about your project..."
                    minRows={4}
                    size="lg"
                    radius="md"
                    {...form.getInputProps('message')}
                    styles={{
                      input: {
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white'
                      },
                      label: { color: 'rgba(255,255,255,0.8)' }
                    }}
                  />

                  <Button
                    type="submit"
                    size="xl"
                    loading={isSubmitting}
                    fullWidth
                    radius="md"
                    variant="gradient"
                    gradient={{ from: 'grape', to: 'pink', deg: 45 }}
                    leftSection={<IconSend size={20} />}
                    style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </Stack>
              </form>
            </Card>
          </motion.div>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Contact;
