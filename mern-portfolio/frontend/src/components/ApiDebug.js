import React, { useState } from 'react';
import { Container, Title, Text, Button, Stack, Box, Card, Code, Badge, Group, Alert } from '@mantine/core';
import { IconCheck, IconX, IconAlertCircle } from '@tabler/icons-react';

const ApiDebug = () => {
  const [testResult, setTestResult] = useState(null);
  const [healthResult, setHealthResult] = useState(null);
  const [contactResult, setContactResult] = useState(null);
  const [loading, setLoading] = useState({ test: false, health: false, contact: false });

  const API_URL = process.env.REACT_APP_API_URL || '';

  const testEndpoint = async (endpoint, type) => {
    setLoading({ ...loading, [type]: true });
    try {
      const response = await fetch(`${API_URL}/api/${endpoint}`);
      const data = await response.json();
      
      if (type === 'test') setTestResult({ success: true, data, status: response.status });
      if (type === 'health') setHealthResult({ success: true, data, status: response.status });
      
    } catch (error) {
      const result = { success: false, error: error.message };
      if (type === 'test') setTestResult(result);
      if (type === 'health') setHealthResult(result);
    } finally {
      setLoading({ ...loading, [type]: false });
    }
  };

  const testContact = async () => {
    setLoading({ ...loading, contact: true });
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          mobile: '1234567890',
          message: 'This is a test message'
        })
      });
      const data = await response.json();
      setContactResult({ success: response.ok, data, status: response.status });
    } catch (error) {
      setContactResult({ success: false, error: error.message });
    } finally {
      setLoading({ ...loading, contact: false });
    }
  };

  const ResultCard = ({ title, result, loading }) => (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <Title order={4}>{title}</Title>
          {result && (
            <Badge color={result.success ? 'green' : 'red'} leftSection={result.success ? <IconCheck size={14} /> : <IconX size={14} />}>
              {result.success ? 'Success' : 'Failed'}
            </Badge>
          )}
        </Group>
        
        {result && (
          <Box>
            <Text size="sm" fw={700} mb="xs">Response:</Text>
            <Code block style={{ maxHeight: '300px', overflow: 'auto' }}>
              {JSON.stringify(result, null, 2)}
            </Code>
          </Box>
        )}
      </Stack>
    </Card>
  );

  return (
    <Box py={60} bg="gray.0">
      <Container size="lg">
        <Stack gap="xl">
          <Alert icon={<IconAlertCircle size={16} />} title="API Debugging Panel" color="blue">
            This page helps you test your backend API endpoints. Use it to diagnose connection issues.
          </Alert>

          <Card shadow="md" padding="xl" radius="md" withBorder>
            <Stack gap="lg">
              <Title order={2}>API Endpoint Tests</Title>
              
              <Text c="dimmed">
                API Base URL: <Code>{API_URL || 'Same origin (Vercel deployment)'}</Code>
              </Text>

              <Group grow>
                <Button 
                  onClick={() => testEndpoint('test', 'test')} 
                  loading={loading.test}
                  variant="outline"
                >
                  Test /api/test
                </Button>
                
                <Button 
                  onClick={() => testEndpoint('health', 'health')} 
                  loading={loading.health}
                  variant="outline"
                  color="cyan"
                >
                  Test /api/health
                </Button>
                
                <Button 
                  onClick={testContact} 
                  loading={loading.contact}
                  variant="outline"
                  color="grape"
                >
                  Test /api/contact
                </Button>
              </Group>
            </Stack>
          </Card>

          {testResult && <ResultCard title="/api/test" result={testResult} loading={loading.test} />}
          {healthResult && <ResultCard title="/api/health" result={healthResult} loading={loading.health} />}
          {contactResult && <ResultCard title="/api/contact" result={contactResult} loading={loading.contact} />}

          <Card shadow="sm" padding="lg" radius="md" withBorder bg="blue.0">
            <Stack gap="sm">
              <Title order={4}>What to look for:</Title>
              <Text size="sm">
                ✅ <strong>/api/test:</strong> Should show "API is working! ✅" and environment variables status
              </Text>
              <Text size="sm">
                ✅ <strong>/api/health:</strong> Should show "Connected" database status if MONGODB_URI is set
              </Text>
              <Text size="sm">
                ✅ <strong>/api/contact:</strong> Should successfully save the test message to database
              </Text>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
};

export default ApiDebug;

