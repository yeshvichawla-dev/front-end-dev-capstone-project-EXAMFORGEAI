export const BCA_CURRICULUM = {
  1: {
    label: "Semester 1", color: "#4CAF85", accent: "#2D7A5A",
    subjects: {
      "DDDM": ["Data & Information", "Decision Making Basics", "Data Collection Methods", "Data Visualization", "Business Intelligence", "Dashboards & Reports"],
      "Python Fundamentals": ["Python Basics", "Data Types & Operators", "Control Flow", "Functions", "Lists & Tuples", "Dictionaries", "File Handling", "Libraries"],
      "Power BI": ["Power BI Interface", "Data Import & Transform", "DAX Basics", "Creating Visualizations", "Reports & Dashboards", "Publishing & Sharing"],
      "Web Development": ["HTML Basics", "HTML5 Semantic Tags", "CSS Basics", "CSS Layouts & Flexbox", "CSS Grid", "JavaScript Basics", "DOM Manipulation", "Responsive Design"],
      "Mathematics I": ["Sets & Relations", "Functions", "Matrices", "Determinants", "Differential Calculus", "Integral Calculus"],
      "CS & Linux": ["Computer Architecture", "Operating System Basics", "Linux Commands", "File System", "Shell Scripting", "Process Management", "Networking Basics"],
      "Excel Course": ["Excel Interface", "Formulas & Functions", "VLOOKUP & HLOOKUP", "Pivot Tables", "Charts & Graphs", "Data Validation", "Macros Basics"],
    }
  },
  2: {
    label: "Semester 2", color: "#5B8DD9", accent: "#2C5BA8",
    subjects: {
      "Finance Literacy": ["Financial Basics", "Budgeting", "Banking & Credit", "Investment Basics", "Taxation", "Financial Statements", "Personal Finance"],
      "Prototype & Design Thinking": ["Design Thinking Process", "Empathy Mapping", "Problem Definition", "Ideation Techniques", "Prototyping", "User Testing", "Figma Basics"],
      "Discrete Mathematics": ["Logic & Propositions", "Set Theory", "Relations & Functions", "Graph Theory", "Combinatorics", "Boolean Algebra", "Number Theory"],
      "DSA in Python": ["Arrays in Python", "Linked Lists", "Stacks & Queues", "Trees", "Graphs", "Sorting Algorithms", "Searching Algorithms", "Hashing"],
      "Cloud Computing": ["Cloud Concepts", "AWS Basics", "Azure Fundamentals", "GCP Overview", "Virtualization", "Cloud Security", "Microservices", "Serverless"],
      "Front End Development": ["Advanced HTML5", "Advanced CSS3", "JavaScript ES6+", "React Basics", "React Hooks", "State Management", "API Integration", "Deployment"],
      "SQL": ["SQL Basics", "SELECT Queries", "Joins", "Subqueries", "Aggregation Functions", "Indexing", "Stored Procedures", "Transactions"],
      "C Programming": ["C Basics", "Data Types & Operators", "Control Structures", "Functions", "Arrays & Pointers", "Structures", "File Handling"],
      "C++": ["C++ Basics", "OOP Concepts", "Classes & Objects", "Inheritance", "Polymorphism", "Templates", "STL", "Exception Handling"],
    }
  },
  3: {
    label: "Semester 3", color: "#E07070", accent: "#B03030",
    subjects: {
      "Machine Learning Fundamentals": ["Intro to ML", "Supervised Learning", "Regression", "Classification", "Decision Trees", "SVM", "Model Evaluation", "Feature Engineering"],
      "Statistics & Probability": ["Descriptive Statistics", "Probability Theory", "Distributions", "Hypothesis Testing", "Regression Analysis", "Bayesian Statistics"],
      "Data Wrangling & EDA": ["Data Cleaning", "Pandas", "NumPy", "Exploratory Analysis", "Data Visualization with Matplotlib", "Seaborn", "Handling Missing Data"],
      "DBMS": ["DBMS Concepts", "ER Diagrams", "Relational Model", "SQL Advanced", "Normalization", "Transactions", "NoSQL Basics"],
      "Operating Systems": ["OS Concepts", "Process Management", "CPU Scheduling", "Memory Management", "File Systems", "Deadlocks", "Security"],
      "Java Programming": ["Java Basics", "OOP in Java", "Collections Framework", "Exception Handling", "Multithreading", "JDBC", "Spring Basics"],
    }
  },
  4: {
    label: "Semester 4", color: "#D4A027", accent: "#A07010",
    subjects: {
      "Deep Learning": ["Neural Networks", "Backpropagation", "CNNs", "RNNs & LSTMs", "Transfer Learning", "GANs", "Transformers", "Model Deployment"],
      "Big Data Technologies": ["Hadoop Ecosystem", "HDFS", "MapReduce", "Apache Spark", "Kafka", "Data Lakes", "Data Pipelines"],
      "Computer Vision": ["Image Processing Basics", "OpenCV", "Object Detection", "Image Classification", "Segmentation", "Face Recognition"],
      "NLP": ["Text Preprocessing", "Tokenization", "Word Embeddings", "Sentiment Analysis", "Named Entity Recognition", "Transformers & BERT", "Text Generation"],
      "Software Engineering": ["SDLC Models", "Requirements Engineering", "UML Diagrams", "System Design", "Testing Strategies", "DevOps Basics"],
      "Theory of Computation": ["Automata Theory", "Regular Languages", "Context-Free Grammar", "Turing Machines", "Complexity Classes"],
    }
  },
  5: {
    label: "Semester 5", color: "#9B72CF", accent: "#6B3FA0",
    subjects: {
      "Reinforcement Learning": ["RL Basics", "Markov Decision Processes", "Q-Learning", "Policy Gradient", "Deep RL", "Multi-Agent Systems"],
      "MLOps & Model Deployment": ["MLflow", "Docker for ML", "Kubernetes", "CI/CD for ML", "Model Monitoring", "A/B Testing", "Feature Stores"],
      "Data Engineering": ["ETL Pipelines", "Apache Airflow", "dbt", "Data Warehousing", "Snowflake", "Data Governance"],
      "Cyber Security": ["Security Fundamentals", "Cryptography", "Network Security", "Web Security", "Penetration Testing", "Ethical Hacking", "Forensics"],
      "Mobile App Development": ["React Native", "Flutter Basics", "Android Studio", "iOS Basics", "Mobile APIs", "Push Notifications", "App Deployment"],
      "Research Methodology": ["Research Design", "Literature Review", "Quantitative Methods", "Qualitative Methods", "Ethics in Research", "Paper Writing"],
    }
  },
  6: {
    label: "Semester 6", color: "#E07A40", accent: "#B04A15",
    subjects: {
      "Advanced AI & GenAI": ["Generative AI", "LLMs", "Prompt Engineering", "RAG Systems", "Fine-tuning", "AI Ethics", "Responsible AI"],
      "Blockchain & Web3": ["Blockchain Basics", "Smart Contracts", "Ethereum", "Solidity", "DeFi", "NFTs", "Web3 Development"],
      "Cloud Architecture": ["Solution Design", "Microservices Architecture", "Serverless Patterns", "Multi-Cloud", "Cost Optimization", "High Availability"],
      "Project Management": ["Agile & Scrum", "Risk Management", "Cost Estimation", "Quality Assurance", "Team Leadership", "Documentation"],
      "Capstone Project": ["Project Planning", "Requirements Analysis", "System Architecture", "Implementation", "Testing", "Deployment", "Presentation"],
      "Entrepreneurship & Startups": ["Startup Basics", "Business Model Canvas", "Market Research", "Funding", "Pitch Deck", "Legal Basics"],
    }
  }
};

export const MOCK_LEADERBOARD = [
  { name: "Priya S.", xp: 2840, level: 29, streak: 15 },
  { name: "Arjun M.", xp: 2510, level: 26, streak: 12 },
  { name: "Sneha K.", xp: 2200, level: 23, streak: 8 },
  { name: "Rohit V.", xp: 1980, level: 20, streak: 6 },
  { name: "Ananya P.", xp: 1750, level: 18, streak: 5 },
  { name: "Karan J.", xp: 1520, level: 16, streak: 4 },
  { name: "Divya R.", xp: 1340, level: 14, streak: 3 },
  { name: "Aditya N.", xp: 1100, level: 12, streak: 2 },
];
