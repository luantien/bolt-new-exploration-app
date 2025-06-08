// netlify/functions/followup-question.js
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};
exports.handler = async (event, context) => {
  console.log("Function called with method:", event.httpMethod);
  console.log("Function called with body:", event.body);
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ""
    };
  }
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }
  try {
    const { moduleName, userProgress } = JSON.parse(event.body || "{}");
    if (!moduleName) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Module name is required" })
      };
    }
    const followupQuestions = generateFollowupQuestions(moduleName, userProgress);
    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        success: true,
        questions: followupQuestions,
        moduleName,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      })
    };
  } catch (error) {
    console.error("Error generating follow-up questions:", error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: "Failed to generate follow-up questions",
        message: error.message
      })
    };
  }
};
function generateFollowupQuestions(moduleName, userProgress) {
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
  const moduleQuestions = questionSets[moduleName] || questionSets["Introduction to AI"];
  const shuffled = moduleQuestions.sort(() => 0.5 - Math.random());
  const selectedQuestions = shuffled.slice(0, Math.floor(Math.random() * 2) + 2);
  return selectedQuestions.map((q, index) => ({
    id: `q_${Date.now()}_${index}`,
    ...q,
    suggested_time: "5-10 minutes"
  }));
}
//# sourceMappingURL=followup-question.js.map
