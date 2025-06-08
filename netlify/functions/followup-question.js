const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

exports.handler = async (event, context) => {
  console.log('=== FUNCTION START ===');
  console.log('HTTP Method:', event.httpMethod);
  console.log('Headers:', JSON.stringify(event.headers, null, 2));
  console.log('Body:', event.body);
  console.log('Path:', event.path);
  console.log('Query:', event.queryStringParameters);

  // Handle CORS preflight requests
  if (event.httpMethod === "OPTIONS") {
    console.log('Handling CORS preflight request');
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "",
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    console.log('Method not allowed:', event.httpMethod);
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    console.log('Parsing request body...');
    const requestBody = event.body || '{}';
    const { moduleName, userProgress } = JSON.parse(requestBody);
    
    console.log('Parsed data:', { moduleName, userProgress });

    if (!moduleName) {
      console.log('Module name missing');
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Module name is required" }),
      };
    }

    // Simulate AI-generated follow-up questions based on the module
    console.log('Generating follow-up questions for:', moduleName);
    const followupQuestions = generateFollowupQuestions(moduleName, userProgress);
    
    console.log('Generated questions:', followupQuestions);

    const response = {
      success: true,
      questions: followupQuestions,
      moduleName: moduleName,
      timestamp: new Date().toISOString(),
    };

    console.log('Sending response:', response);

    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error("Error in function:", error);
    console.error("Error stack:", error.stack);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: "Failed to generate follow-up questions",
        message: error.message,
        debug: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }),
    };
  }
};

function generateFollowupQuestions(moduleName, userProgress) {
  console.log('Generating questions for module:', moduleName);
  
  const questionSets = {
    "Introduction to AI": [
      {
        question: "How do you think AI will impact your specific industry or field of interest?",
        type: "reflection",
        difficulty: "beginner"
      },
      {
        question: "Can you identify three AI applications you use in your daily life without realizing it?",
        type: "application",
        difficulty: "beginner"
      },
      {
        question: "What ethical considerations should we keep in mind when developing AI systems?",
        type: "critical-thinking",
        difficulty: "intermediate"
      },
      {
        question: "How would you explain the difference between narrow AI and general AI to a friend?",
        type: "explanation",
        difficulty: "beginner"
      },
      {
        question: "What are some potential risks and benefits of AI automation in the workplace?",
        type: "analysis",
        difficulty: "intermediate"
      }
    ],
    "Machine Learning Basics": [
      {
        question: "How would you decide whether to use supervised or unsupervised learning for a new project?",
        type: "decision-making",
        difficulty: "intermediate"
      },
      {
        question: "Can you think of a real-world problem that could be solved with machine learning?",
        type: "application",
        difficulty: "beginner"
      },
      {
        question: "What steps would you take to prepare data for a machine learning model?",
        type: "process",
        difficulty: "intermediate"
      }
    ],
    "Deep Learning": [
      {
        question: "How do neural networks mimic the human brain, and where do they differ?",
        type: "comparison",
        difficulty: "advanced"
      },
      {
        question: "What factors would you consider when choosing the architecture for a neural network?",
        type: "design",
        difficulty: "advanced"
      }
    ]
  };

  // Get questions for the specific module, or default questions
  const moduleQuestions = questionSets[moduleName] || questionSets["Introduction to AI"];
  
  // Randomly select 2-3 questions
  const shuffled = moduleQuestions.sort(() => 0.5 - Math.random());
  const selectedQuestions = shuffled.slice(0, Math.floor(Math.random() * 2) + 2);

  const result = selectedQuestions.map((q, index) => ({
    id: `q_${Date.now()}_${index}`,
    ...q,
    suggested_time: "5-10 minutes"
  }));

  console.log('Generated questions result:', result);
  return result;
}