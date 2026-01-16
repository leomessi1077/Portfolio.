import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper, TextInput, Button, ScrollArea, Text, Group, Avatar, Stack, ActionIcon, Modal, Badge } from '@mantine/core';
import { IconSend, IconRobot, IconX, IconMessageCircle, IconUser } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import confetti from 'canvas-confetti';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadMobile, setLeadMobile] = useState('');
  const [submittingLead, setSubmittingLead] = useState(false);

  // Initialize with time-aware greeting
  useEffect(() => {
    const hour = new Date().getHours();
    let greeting = "Hi there! 👋";
    if (hour < 12) greeting = "Good morning! ☀️";
    else if (hour < 18) greeting = "Good afternoon! 🌤️";
    else greeting = "Good evening! 🌙";

    setMessages([
      {
        id: 1,
        text: `${greeting} I'm Manish's AI assistant. How can I help you today?`,
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickQuestions = [
    "Hire Me 🚀",
    "Skills 🛠️",
    "Projects 💻",
    "Contact 📧"
  ];

  const botResponses = {
    default: [
      "That's interesting! Tell me more.",
      "I can definitely help with that.",
      "Feel free to ask about Manish's work!",
      "I'm here to help you navigate the portfolio."
    ],
    skills: "Manish is proficient in the MERN stack (MongoDB, Express, React, Node.js), Java, and AWS. He also has experience with Tailwind CSS and Mantine UI.",
    projects: "Manish has built impressive projects like a Portfolio Website, E-commerce apps, and more. Check out the Projects section!",
    contact: "You can reach Manish via the contact form below, or connect on LinkedIn and GitHub.",
    experience: "Manish is currently a Backend Developer at Livnium and has a strong background in full-stack development.",
    hire: "That's great! Please fill out the form below so Manish can get in touch with you immediately."
  };

  const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('hire')) return botResponses.hire;
    if (lowerInput.includes('skill')) return botResponses.skills;
    if (lowerInput.includes('project')) return botResponses.projects;
    if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('reach')) return botResponses.contact;
    if (lowerInput.includes('experience') || lowerInput.includes('work') || lowerInput.includes('job')) return botResponses.experience;
    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
  };

  const handleSendMessage = async (text = inputValue) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Special handling for "Hire Me"
    if (text.toLowerCase().includes('hire')) {
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          text: getBotResponse(text),
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        setTimeout(() => setLeadModalOpen(true), 800);
      }, 1000);
      return;
    }

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Lead generation logic
      const userMessagesCount = messages.filter(m => m.sender === 'user').length + 1;
      if (userMessagesCount === 3) {
        setTimeout(() => setLeadModalOpen(true), 1000);
      }
    }, 1000 + Math.random() * 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const submitLead = async () => {
    if (!leadName.trim() || !leadEmail.trim() || !leadMobile.trim()) return;
    setSubmittingLead(true);
    try {
      const payload = {
        name: leadName,
        email: leadEmail,
        mobile: leadMobile,
        message: messages.filter(m => m.sender === 'user').slice(-1)[0]?.text || 'Chatbot lead'
      };
      await axios.post('http://localhost:5000/api/contact', payload);

      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setLeadModalOpen(false);
      setLeadName('');
      setLeadEmail('');
      setLeadMobile('');
      setMessages(prev => ([...prev, {
        id: Date.now() + 2,
        text: "Thanks! Manish will be in touch soon.",
        sender: 'bot',
        timestamp: new Date()
      }]));
    } catch (e) {
      setMessages(prev => ([...prev, {
        id: Date.now() + 3,
        text: "I couldn't save your details, but feel free to use the contact form!",
        sender: 'bot',
        timestamp: new Date()
      }]));
    } finally {
      setSubmittingLead(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <Box
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 1000
        }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ActionIcon
            size={60}
            radius="xl"
            onClick={() => setIsOpen(!isOpen)}
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}
            style={{
              boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
              border: '2px solid rgba(255,255,255,0.2)'
            }}
          >
            {isOpen ? <IconX size={30} /> : <IconMessageCircle size={30} />}
          </ActionIcon>

          {/* Notification Badge */}
          {!isOpen && (
            <Badge
              size="xs"
              circle
              color="red"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                border: '2px solid #1a1b1e'
              }}
            >
              1
            </Badge>
          )}
        </motion.div>
      </Box>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              bottom: '100px',
              right: '30px',
              width: '380px',
              height: '600px',
              zIndex: 1000,
              pointerEvents: 'none' // Allow clicking through container, enable for children
            }}
          >
            <Paper
              className="glass-card"
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                pointerEvents: 'auto',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
              shadow="xl"
              radius="lg"
            >
              {/* Header */}
              <Box p="md" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}>
                <Group>
                  <Avatar color="cyan" radius="xl" variant="filled">
                    <IconRobot size={24} />
                  </Avatar>
                  <div>
                    <Text fw={700} c="white">Manish's Assistant</Text>
                    <Group gap={6}>
                      <Box w={8} h={8} bg="green" style={{ borderRadius: '50%' }} />
                      <Text size="xs" c="dimmed">Online</Text>
                    </Group>
                  </div>
                </Group>
              </Box>

              {/* Messages Area */}
              <ScrollArea style={{ flex: 1 }} p="md" type="auto">
                <Stack gap="md">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Group
                        justify={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                        align="flex-start"
                        gap="xs"
                      >
                        {message.sender === 'bot' && (
                          <Avatar size="sm" color="cyan" radius="xl"><IconRobot size={14} /></Avatar>
                        )}
                        <Paper
                          p="sm"
                          radius="lg"
                          style={{
                            maxWidth: '80%',
                            backgroundColor: message.sender === 'user'
                              ? 'var(--mantine-color-blue-filled)'
                              : 'rgba(255,255,255,0.1)',
                            color: 'white',
                            borderBottomRightRadius: message.sender === 'user' ? 0 : undefined,
                            borderBottomLeftRadius: message.sender === 'bot' ? 0 : undefined,
                          }}
                        >
                          <Text size="sm">{message.text}</Text>
                        </Paper>
                        {message.sender === 'user' && (
                          <Avatar size="sm" color="gray" radius="xl"><IconUser size={14} /></Avatar>
                        )}
                      </Group>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <Group gap="xs">
                      <Avatar size="sm" color="cyan" radius="xl"><IconRobot size={14} /></Avatar>
                      <Paper p="xs" radius="lg" bg="rgba(255,255,255,0.05)">
                        <Group gap={4}>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 0.6 }}
                            style={{ width: 6, height: 6, background: 'white', borderRadius: '50%' }}
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                            style={{ width: 6, height: 6, background: 'white', borderRadius: '50%' }}
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                            style={{ width: 6, height: 6, background: 'white', borderRadius: '50%' }}
                          />
                        </Group>
                      </Paper>
                    </Group>
                  )}
                  <div ref={messagesEndRef} />
                </Stack>
              </ScrollArea>

              {/* Quick Questions */}
              <Box p="xs" style={{ overflowX: 'auto' }}>
                <Group gap="xs" wrap="nowrap">
                  {quickQuestions.map((q, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      color="cyan"
                      style={{ cursor: 'pointer', flexShrink: 0 }}
                      onClick={() => handleSendMessage(q)}
                      className="glass-card"
                    >
                      {q}
                    </Badge>
                  ))}
                </Group>
              </Box>

              {/* Input Area */}
              <Box p="md" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}>
                <Group gap="sm">
                  <TextInput
                    placeholder="Type a message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    style={{ flex: 1 }}
                    styles={{
                      input: {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        color: 'white',
                        '&::placeholder': { color: 'rgba(255,255,255,0.5)' }
                      }
                    }}
                  />
                  <ActionIcon
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'cyan' }}
                    size="lg"
                    radius="md"
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() && !isTyping}
                  >
                    <IconSend size={18} />
                  </ActionIcon>
                </Group>
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lead Modal */}
      <Modal
        opened={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        title="Let's Connect!"
        centered
        styles={{
          content: { backgroundColor: '#1a1b1e', color: 'white' },
          header: { backgroundColor: '#1a1b1e', color: 'white' }
        }}
      >
        <Stack>
          <Text size="sm" c="dimmed">Leave your details and Manish will get back to you.</Text>
          <TextInput
            label="Name"
            placeholder="Your name"
            value={leadName}
            onChange={(e) => setLeadName(e.target.value)}
            styles={{ input: { backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }, label: { color: 'white' } }}
          />
          <TextInput
            label="Email"
            placeholder="you@example.com"
            value={leadEmail}
            onChange={(e) => setLeadEmail(e.target.value)}
            styles={{ input: { backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }, label: { color: 'white' } }}
          />
          <TextInput
            label="Mobile"
            placeholder="Phone number"
            value={leadMobile}
            onChange={(e) => setLeadMobile(e.target.value)}
            styles={{ input: { backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }, label: { color: 'white' } }}
          />
          <Group justify="flex-end">
            <Button variant="subtle" color="gray" onClick={() => setLeadModalOpen(false)}>Later</Button>
            <Button
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
              loading={submittingLead}
              onClick={submitLead}
              disabled={!leadName || !leadEmail || !leadMobile}
            >
              Send
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};

export default Chatbot;
