import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper, TextInput, Button, ScrollArea, Text, Group, Avatar, Stack, ActionIcon, Modal, Badge } from '@mantine/core';
import { IconSend, IconRobot, IconX, IconMessageCircle, IconSparkles } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Manish's AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadMobile, setLeadMobile] = useState('');
  const [submittingLead, setSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses = [
    "That's interesting! Tell me more about it.",
    "I'd be happy to help you with that. What specific information do you need?",
    "Great question! Manish is a Full Stack Developer with expertise in React, Node.js, and MongoDB.",
    "You can reach out to Manish directly through the contact form on this page.",
    "Manish has worked on several projects including QuickCart, Meal Express, and Movix App.",
    "He's currently working as a Backend Developer at Livnium.",
    "Would you like to know more about his technical skills or projects?",
    "Feel free to ask me anything about Manish's portfolio or experience!",
    "I can help you understand more about his work and how to get in touch.",
    "That sounds exciting! What kind of project are you working on?"
  ];

  const getRandomResponse = () => {
    return botResponses[Math.floor(Math.random() * botResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: getRandomResponse(),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // After a few interactions, ask for contact details
      const userMessagesCount = messages.filter(m => m.sender === 'user').length + 1;
      if (userMessagesCount === 2 || userMessagesCount % 4 === 0) {
        setTimeout(() => setLeadModalOpen(true), 500);
      }
    }, 1000 + Math.random() * 1000);
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
      setLeadSubmitted(true);
      setLeadModalOpen(false);
      setLeadName('');
      setLeadEmail('');
      setLeadMobile('');
      setMessages(prev => ([...prev, {
        id: Date.now() + 2,
        text: "Thanks! I'll reach out to you soon.",
        sender: 'bot',
        timestamp: new Date()
      }]));
    } catch (e) {
      setMessages(prev => ([...prev, {
        id: Date.now() + 3,
        text: 'Sorry, something went wrong while saving your details.',
        sender: 'bot',
        timestamp: new Date()
      }]));
    } finally {
      setSubmittingLead(false);
    }
  };

  return (
    <>
      {/* Stylish Chat Button */}
      <Box
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 1000
        }}
      >
        {/* Outer pulsing rings */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            filter: 'blur(8px)',
            zIndex: -1
          }}
        />
        
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            filter: 'blur(10px)',
            zIndex: -2
          }}
        />

        {/* Main button with badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: 1, 
            rotate: 0,
          }}
          transition={{ 
            delay: 1, 
            type: "spring", 
            stiffness: 260, 
            damping: 20 
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          style={{ position: 'relative' }}
        >
          {/* Notification badge */}
          {!isOpen && messages.filter(m => m.sender === 'bot').length > 1 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                zIndex: 10
              }}
            >
              <Badge
                size="lg"
                variant="gradient"
                gradient={{ from: 'red', to: 'pink', deg: 45 }}
                style={{
                  boxShadow: '0 4px 12px rgba(255, 0, 0, 0.4)',
                  border: '2px solid white'
                }}
                circle
              >
                {messages.filter(m => m.sender === 'bot').length - 1}
              </Badge>
            </motion.div>
          )}

          <ActionIcon
            size={70}
            radius="xl"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: isOpen 
                ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4), 0 0 0 1px rgba(255,255,255,0.1)',
              border: 'none',
              cursor: 'pointer',
              overflow: 'visible',
              position: 'relative',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Inner glow effect */}
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
              }}
            />

            {/* Icon with animation */}
            <motion.div
              animate={{
                rotate: isOpen ? 0 : [0, -10, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: isOpen ? 0 : Infinity,
                repeatDelay: 3
              }}
              style={{ position: 'relative', zIndex: 1 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IconX size={32} color="white" stroke={2.5} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="chat"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IconMessageCircle size={32} color="white" stroke={2.5} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Sparkle effect */}
            {!isOpen && (
              <motion.div
                animate={{
                  scale: [0, 1.2, 0],
                  rotate: [0, 180, 360],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  zIndex: 2
                }}
              >
                <IconSparkles size={16} color="white" />
              </motion.div>
            )}
          </ActionIcon>

          {/* Floating animation */}
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          />
        </motion.div>
      </Box>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              bottom: '80px',
              right: '20px',
              width: '350px',
              height: '500px',
              zIndex: 1000
            }}
          >
            <Paper
              shadow="xl"
              radius="md"
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              {/* Header */}
              <Box
                p="md"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white'
                }}
              >
                <Group justify="space-between">
                  <Group gap="sm">
                    <Avatar color="white" radius="xl">
                      <IconRobot size={20} color="#667eea" />
                    </Avatar>
                    <div>
                      <Text size="sm" fw={600}>Manish's Assistant</Text>
                      <Text size="xs" opacity={0.8}>Online</Text>
                    </div>
                  </Group>
                </Group>
              </Box>

              {/* Messages */}
              <ScrollArea style={{ flex: 1 }} p="md">
                <Stack gap="sm">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Group
                        justify={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                        align="flex-start"
                        gap="sm"
                      >
                        {message.sender === 'bot' && (
                          <Avatar size="sm" color="blue" radius="xl">
                            <IconRobot size={16} />
                          </Avatar>
                        )}
                        <Paper
                          p="sm"
                          radius="md"
                          style={{
                            maxWidth: '80%',
                            backgroundColor: message.sender === 'user' 
                              ? '#667eea' 
                              : '#f1f3f4',
                            color: message.sender === 'user' ? 'white' : 'black'
                          }}
                        >
                          <Text size="sm">{message.text}</Text>
                        </Paper>
                        {message.sender === 'user' && (
                          <Avatar size="sm" color="gray" radius="xl">
                            U
                          </Avatar>
                        )}
                      </Group>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Group justify="flex-start" gap="sm">
                        <Avatar size="sm" color="blue" radius="xl">
                          <IconRobot size={16} />
                        </Avatar>
                        <Paper p="sm" radius="md" bg="#f1f3f4">
                          <Text size="sm" c="dimmed">Typing...</Text>
                        </Paper>
                      </Group>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </Stack>
              </ScrollArea>

              {/* Input */}
              <Box p="md" style={{ borderTop: '1px solid #e9ecef' }}>
                <Group gap="sm">
                  <TextInput
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    style={{ flex: 1 }}
                    size="sm"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    size="sm"
                    radius="md"
                  >
                    <IconSend size={16} />
                  </Button>
                </Group>
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal opened={leadModalOpen} onClose={() => setLeadModalOpen(false)} title="Stay in touch" centered>
        <Stack>
          <Text size="sm">Share your contact so Manish can reach you later.</Text>
          <TextInput label="Name" placeholder="Your name" value={leadName} onChange={(e) => setLeadName(e.target.value)} required />
          <TextInput label="Email" placeholder="you@example.com" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} required />
          <TextInput label="Mobile" placeholder="WhatsApp/phone" value={leadMobile} onChange={(e) => setLeadMobile(e.target.value)} required />
          <Group justify="flex-end">
            <Button variant="default" onClick={() => setLeadModalOpen(false)}>Maybe later</Button>
            <Button loading={submittingLead} onClick={submitLead} disabled={!leadName || !leadEmail || !leadMobile}>Send</Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};

export default Chatbot;

