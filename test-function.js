// Simple test script to verify the function works
const handler = require('./netlify/functions/followup-question.js').handler;

const testEvent = {
  httpMethod: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    moduleName: 'Introduction to AI',
    userProgress: null
  }),
  path: '/.netlify/functions/followup-question',
  queryStringParameters: null
};

const testContext = {};

console.log('Testing function locally...');

handler(testEvent, testContext)
  .then(result => {
    console.log('Function test result:');
    console.log('Status:', result.statusCode);
    console.log('Headers:', result.headers);
    console.log('Body:', result.body);
    
    if (result.statusCode === 200) {
      console.log('✅ Function test passed!');
    } else {
      console.log('❌ Function test failed!');
    }
  })
  .catch(error => {
    console.error('❌ Function test error:', error);
  });