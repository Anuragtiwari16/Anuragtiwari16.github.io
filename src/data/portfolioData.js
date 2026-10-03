export const portfolioData = {
  personal: {
    name: "Anurag Tiwari",
    tagline: "Building intelligent, interactive and data-driven digital experiences.",
    degree: "B.Tech CSE (Data Science)",
    college: "ABES Engineering College",
    location: "Ghaziabad, Uttar Pradesh",
    phone: "9336936633",
    email: "anuragtiwari738816@gmail.com",
    cgpa: "7.33",
    aboutIntro: "A B.Tech CSE (Data Science) student at ABES Engineering College, focused on building intelligent, interactive, and data-driven digital experiences. Passionate about software development, machine learning, and modern web technologies.",
    github: "https://github.com/Anuragtiwari16",
    linkedin: "https://www.linkedin.com/in/anurag-tiwariweb"
  },
  skills: {
    programming: ["Python", "C", "C++", "Java", "SQL"],
    web: ["HTML", "CSS", "JavaScript", "React.js", "Flask"],
    dataScience: ["NumPy", "Pandas", "Scikit-learn"],
    database: ["MySQL", "SQLite"],
    tools: ["Git", "GitHub", "VS Code"],
    coreConcepts: ["OOP", "DBMS", "Operating Systems", "Data Structures", "Machine Learning"]
  },
  projects: [
    {
      id: 'sahayak',
      name: 'SAHAYAK',
      description: 'AI-assisted victim support and case management platform designed to help manage complaints, assessments, case history, and officer workflows through a secure digital portal.',
      technologies: ['React', 'FastAPI', 'PyTorch', 'Whisper', 'PostgreSQL', 'Tailwind'],
      status: 'Prototype',
      date: '2026',
      isCaseStudy: true,
      caseStudy: {
        tagline: 'AI-assisted technology for safer, smarter and more structured victim support.',
        problem: 'Traditional complaint and case management can be fragmented, manually intensive, and difficult to track for victims and officers.',
        solution: 'SAHAYAK provides a centralized digital workflow with AI-assisted assessment, audio processing, and secure case management.',
        badges: ['AI/ML', 'Full Stack', 'NLP', 'Case Management', 'Security'],
        metrics: ['Full-stack architecture', 'AI-assisted assessment', 'NLP & speech processing', 'Secure RBAC workflow', 'Real-time case tracking'],
        role: ['Frontend & Backend Development', 'AI/ML & NLP Integration', 'Auth & Security Implementation', 'Architecture Design'],
        aiPipeline: ['Complaint / Audio Input', 'Speech-to-Text', 'NLP Processing', 'Feature Extraction', 'AI/ML Assessment', 'SVI Score', 'Risk Classification', 'Officer Dashboard'],
        modules: ['Authentication & RBAC', 'Complaint Management', 'AI Assessment & SVI Scoring', 'Officer Dashboard', 'Case History & Security']
      },
      github: '',
      demo: ''
    },
    {
      id: 'bank_dashboard',
      name: 'Bank Branch Dashboard',
      description: 'Data analytics and ML dashboard to analyze branch performance, identify KPIs, and provide data-driven insights.',
      technologies: ['Python', 'FastAPI', 'Streamlit', 'Scikit-learn', 'Pandas'],
      status: 'Prototype',
      date: '2026',
      isCaseStudy: true,
      caseStudy: {
        tagline: 'Data-driven analytics and performance intelligence for bank branches.',
        problem: 'Banking data can contain multiple customer, campaign and branch-level variables, making it difficult to quickly identify performance patterns and important KPIs.',
        solution: 'Built an interactive analytics dashboard that processes banking data, performs EDA, visualizes important metrics and connects a machine learning prediction workflow through FastAPI.',
        badges: ['Data Analytics', 'Machine Learning', 'Dashboard', 'FastAPI', 'Streamlit'],
        metrics: ['Branch Performance', 'Customer Analytics', 'KPI Monitoring', 'Data Cleaning', 'ML Prediction'],
        role: ['Data preprocessing & EDA', 'KPI analysis & Visualization', 'ML workflow & FastAPI integration', 'Streamlit dashboard development'],
        aiPipeline: ['Raw Banking Data', 'Data Cleaning', 'Data Preprocessing', 'Exploratory Data Analysis', 'KPI & Feature Analysis', 'ML Model', 'FastAPI Prediction', 'Streamlit Dashboard', 'Business Insights'],
        modules: ['Performance Analysis', 'KPI Monitoring', 'Customer Analytics', 'Interactive Visualizations', 'FastAPI Prediction']
      },
      github: '',
      demo: ''
    },
    {
      id: 'creditlens',
      name: 'CreditLens AI',
      description: 'Explainable AI credit-risk assessment system predicting risk with SHAP and LIME insights.',
      technologies: ['Python', 'XGBoost', 'SHAP', 'LIME', 'Streamlit', 'Pandas'],
      status: 'Prototype',
      date: '2026',
      isCaseStudy: true,
      caseStudy: {
        tagline: 'Explainable AI for intelligent and transparent credit-risk assessment.',
        problem: 'Traditional credit-risk models can be difficult for users to interpret, especially when complex machine learning models act as a black box.',
        solution: 'CreditLens AI combines ML prediction with explainability techniques (SHAP/LIME) so users understand both the predicted risk and contributing factors.',
        badges: ['Explainable AI', 'XGBoost', 'FinTech', 'Risk Assessment', 'Machine Learning'],
        metrics: ['Credit Risk Prediction', 'SHAP Analysis', 'LIME Explanations', 'Feature Importance', 'Risk Insights'],
        role: ['Data preprocessing', 'Feature engineering', 'ML model development (XGBoost)', 'SHAP/LIME integration', 'Dashboard development'],
        aiPipeline: ['Applicant Data', 'Data Preprocessing', 'Feature Engineering', 'ML Model', 'Credit Risk Prediction', 'SHAP / LIME', 'Feature Explanation', 'Risk Insights'],
        modules: ['Risk Prediction', 'SHAP Analysis', 'LIME Explanations', 'Feature Importance', 'Risk Insights']
      },
      github: '',
      demo: ''
    },
    {
      id: 'college_complaint',
      name: 'College Complaint Portal',
      description: 'Web-based portal for students to submit complaints related to infrastructure, hostel and administration. Features a responsive UI and cloud deployment.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'AWS'],
      status: 'Completed',
      date: 'November 2025',
      isCaseStudy: false,
      github: '',
      demo: ''
    },
    {
      id: 'spam_detection',
      name: 'Spam Detection System',
      description: 'Classifies Email/SMS messages as Spam or Not Spam using text classification and prediction confidence. Built during IBM-NASSCOM internship.',
      technologies: ['Python', 'Machine Learning', 'Flask', 'React.js', 'SQLite'],
      status: 'Completed',
      date: 'June 2026 - July 2026',
      isCaseStudy: false,
      github: '',
      demo: ''
    }
  ],
  internships: [
    {
      id: 1,
      company: "IBM-NASSCOM Virtual Internship Program (PBEL 3.0)",
      date: "June 2026 - July 2026",
      project: "Spam Detection System",
      technologies: ["Python", "Machine Learning", "Flask", "React.js", "SQLite"],
      description: "Developed an ML-based web application to classify Email/SMS messages as Spam or Not Spam using text classification and prediction confidence."
    }
  ],
  education: [
    {
      id: 1,
      degree: "B.Tech in CSE (DS)",
      institution: "ABES Engineering College, AKTU",
      date: "September 2024 - August 2028",
      score: "CGPA: 7.33"
    },
    {
      id: 2,
      degree: "Class 12th",
      institution: "Shri Rananjay Inter College, Gauriganj, Amethi, UP (UP Board)",
      date: "2023",
      score: "74.2%"
    },
    {
      id: 3,
      degree: "Class 10th",
      institution: "Shiv Nayak Singh SVM IC, Gauriganj, Amethi, UP (UP Board)",
      date: "2021",
      score: "87.33%"
    }
  ],
  certificates: [
    { id: 1, name: "Exploratory Data Analysis", issuer: "NASSCOM", date: "June 2026 - July 2026" },
    { id: 2, name: "Introduction to Graphic Design", issuer: "Simplilearn", date: "" },
    { id: 3, name: "Basics of UI/UX", issuer: "Simplilearn", date: "" },
    { id: 4, name: "Introduction to CSS", issuer: "Simplilearn", date: "" }
  ],
  achievements: [
    {
      id: 1,
      name: "Smart India Hackathon (SIH) 2025",
      description: "Participated in a national-level hackathon focused on solving real-world technology problems.",
      date: "26 November 2025 - 27 November 2025"
    }
  ]
};
