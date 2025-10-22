const axios = require('axios');

async function testAPI() {
  try {
    console.log('Testing API endpoints...\n');
    
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get('http://localhost:5000/api/health');
    console.log('Health Status:', healthResponse.data);
    console.log('✅ Health endpoint working\n');
    
    // Test portfolio endpoint
    console.log('2. Testing portfolio endpoint...');
    const portfolioResponse = await axios.get('http://localhost:5000/api/portfolio');
    console.log('Portfolio Data:', {
      name: portfolioResponse.data.name,
      title: portfolioResponse.data.title,
      email: portfolioResponse.data.email,
      projectsCount: portfolioResponse.data.projects.length,
      experienceCount: portfolioResponse.data.experience.length
    });
    console.log('✅ Portfolio endpoint working\n');
    
    console.log('🎉 All API endpoints are working correctly!');
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Wait a moment for server to start, then test
setTimeout(testAPI, 3000);

