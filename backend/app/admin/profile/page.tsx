export default function ProfilePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="prose max-w-none">
        <h2>Portfolio Owner Information</h2>
        <p><strong>Name:</strong> Om Choksi</p>
        <p><strong>Title:</strong> AI & Machine Learning Engineer</p>
        <p><strong>Tagline:</strong> <em>"I build practical AI systems that go beyond notebooks and deliver real-world impact."</em></p>

        <hr />

        <h2>Personal Profile & About</h2>
        <h3>About Me:</h3>
        <p>"I’m Om Choksi — an AI & Machine Learning engineer focused on building deployable, production-ready intelligence systems. I specialize in transforming raw datasets into scalable ML products through end-to-end engineering, including data pipelines, model architecture, evaluation, and deployment."</p>
        <p>"My work spans ML model development, deep learning, computer vision, NLP, LLM-powered automation, full-stack ML application deployment, and data storytelling for business decisions. I believe AI is only successful when people — not just models — can use it."</p>
        <p>"I work with curiosity, speed, and product-thinking: every project I build must solve a real problem and make someone's workflow better."</p>

        <h3>Interests/Hobbies:</h3>
        <ul>
          <li>Machine Learning & Applied AI</li>
          <li>Cybersecurity & Intelligent Threat Detection</li>
          <li>Autonomous Systems & Reinforcement Learning</li>
          <li>Portfolio Web Development with Next.js</li>
          <li>Researching new AI papers and architectures</li>
        </ul>

        <hr />

        <h2>Social Links & Contact</h2>
        <ul>
          <li><strong>LinkedIn:</strong> linkedin.com/in/omchoksi</li>
          <li><strong>GitHub:</strong> github.com/omchoksi108</li>
          <li><strong>Kaggle:</strong> omchoksi04</li>
          <li><strong>Portfolio:</strong> (after deployment add URL)</li>
        </ul>

        <hr />

        <h2>Skills & Technologies</h2>
        <h3>Core Skills:</h3>
        <p>Machine Learning • Deep Learning • Computer Vision • NLP • Data Science • LLM Apps</p>

        <h3>Technical Expertise:</h3>
        <ul>
          <li><strong>ML & AI:</strong> TensorFlow, Scikit-learn, XGBoost, Random Forest, OpenCV, Statsmodels, PCA, Clustering</li>
          <li><strong>NLP / LLM:</strong> Embeddings, Prompt Engineering, Resume Scoring Systems, Semantic Search, Tone Transformation</li>
          <li><strong>Data & Pipelines:</strong> Feature Engineering, Statistical Modeling, EDA, KPI Tracking, A/B Testing</li>
          <li><strong>Backend & Deployment:</strong> FastAPI, Flask, Streamlit, REST APIs, PostgreSQL, CI/CD fundamentals</li>
          <li><strong>Programming:</strong> Python (primary), C++, Java, R, SQL</li>
          <li><strong>Tools:</strong> Jupyter, Google Colab, Git, GitHub, VS Code</li>
        </ul>

        <hr />

        <h2>Professional Experience</h2>
        <h3> AI Product Development Intern</h3>
        <p><strong>Company:</strong> Samatrix Consulting Pvt. Ltd.</p>
        <p><strong>Location:</strong> Remote</p>
        <p><strong>Date:</strong> JUN 2025</p>
        <h4>Key Responsibilities & Achievements:</h4>
        <ul>
          <li>Engineered supervised and unsupervised ML models for production-grade decision systems (not research-only prototypes)</li>
          <li>Designed feature pipelines to minimize leakage and maximize signal strength across noisy datasets</li>
          <li>Implemented clustering for customer behavioral segmentation, improving audience targeting and insight generation</li>
          <li>Constructed analytics dashboards visualizing model KPIs, explainability metrics, and business lift estimates</li>
          <li>Developed cross-department mindset: AI should be understandable and usable by non-technical decision makers</li>
        </ul>
        <p><strong>Skills Gained:</strong> ML Engineering • Feature Pipelines • Model Explainability • KPI Dashboards • Product Strategy</p>

        <h3>📊 Data Analytics Intern</h3>
        <p><strong>Company:</strong> Oasis Infobyte</p>
        <p><strong>Location:</strong> Remote</p>
        <p><strong>Date:</strong> MAY 2025</p>
        <h4>Key Responsibilities & Achievements:</h4>
        <ul>
          <li>Performed full-cycle EDA on large datasets with statistical reasoning and storytelling-based insight delivery</li>
          <li>Identified data issues, engineered analytical features, normalized structure, and uncovered actionable patterns</li>
          <li>Evaluated business hypotheses using descriptive statistics and experimentation</li>
          <li>Designed dynamic analytical dashboards to help stakeholders quickly understand trends and actions</li>
        </ul>
        <p><strong>Skills Gained:</strong> EDA • Statistical Analysis • Data Storytelling • Dashboarding • Insight Communication</p>

        <hr />

        <h2>GitHub Statistics</h2>
        <p><em>(Auto-fetched through GitHub API in the portfolio — dynamic values)</em></p>
        <ul>
          <li>Followers</li>
          <li>Total Stars</li>
          <li>Public Repos</li>
          <li>Total Forks</li>
        </ul>

        <hr />

        <h2>Mentions & Recognition</h2>
        <ul>
          <li>Finalist – <strong>IMMunoQuest Kaggle Contest</strong></li>
          <li>Winner – <strong>Data Science Treasure Hunt</strong></li>
          <li>Competitor – <strong>HPC Event (AIML Club)</strong></li>
        </ul>

        <hr />

        <h2>Header Section</h2>
        <ul>
          <li><strong>Featured Work</strong> (subtitle)</li>
          <li><strong>My AI Projects</strong> (main title with gradient styling)</li>
          <li><strong>Description:</strong> "A portfolio of AI applications, ML research experiments, cybersecurity tools, and deployed web apps — each built to solve a real-world problem, not just get an accuracy score."</li>
        </ul>

        <hr />

        <h2>Projects</h2>
        <h3>Project 1 — Employee Performance Prediction (ML + Deployment)</h3>
        <p><strong>Description:</strong> An end-to-end ML system that predicts employee performance scores using HR metrics, integrated with a Flask dashboard for HR analytics.</p>
        <h4>Features:</h4>
        <ol>
          <li>Random Forest + XGBoost Hybrid pipeline</li>
          <li>Hyperparameter tuning and feature importance analytics</li>
          <li>Interactive dashboard for prediction and insights</li>
          <li>CSV input support and data visualization</li>
          <li>Exportable analytics report generation</li>
        </ol>
        <p><strong>Tech Stack:</strong> Python, Scikit-learn, XGBoost, Flask, Pandas, Matplotlib</p>
        <p><strong>Color Theme:</strong> bg-blue-700</p>

        <h3>Project 2 — AI Resume Analyzer (FastAPI + LLMs)</h3>
        <p><strong>Description:</strong> A Resume Parsing and Job-Fit scoring system for recruiters using embeddings + LLM reasoning.</p>
        <h4>Features:</h4>
        <ol>
          <li>FastAPI backend for processing PDFs</li>
          <li>PostgreSQL database for candidate resume storage</li>
          <li>LLM engine for semantic job-fit analysis</li>
          <li>Streamlit dashboard for recruiter workflow</li>
          <li>Candidate ranking and filtering system</li>
        </ol>
        <p><strong>Tech Stack:</strong> FastAPI, LLM, PostgreSQL, Streamlit, Python</p>
        <p><strong>Color Theme:</strong> bg-purple-700</p>

        <h3>Project 3 — Keylogger Detection for Windows (Cybersecurity + AI)</h3>
        <p><strong>Description:</strong> A tool that detects keyloggers on Windows using anomaly detection on system-process behavior.</p>
        <h4>Features:</h4>
        <ol>
          <li>Background monitoring of system hooks</li>
          <li>Behavioral fingerprinting using anomaly scores</li>
          <li>Gemini AI–powered threat evaluation</li>
          <li>Action-based warnings and recommendations</li>
          <li>Process whitelist and ignore mode</li>
        </ol>
        <p><strong>Tech Stack:</strong> Python, Gemini API, Windows APIs</p>
        <p><strong>Color Theme:</strong> bg-red-700</p>

        <h3>Project 4 — Face Identification System (Real-time CV)</h3>
        <p><strong>Description:</strong> Real-time face recognition for webcam and recorded video streams using TensorFlow embeddings.</p>
        <p><strong>Tech Stack:</strong> Python, TensorFlow, OpenCV, dlib</p>
        <p><strong>Color Theme:</strong> bg-indigo-700</p>

        <h3>Project 5 — IPL Mega Auction Analysis (Data Science)</h3>
        <p><strong>Description:</strong> Exploratory analysis of IPL 2025 auction dataset to understand role-based team budget strategies.</p>
        <p><strong>Tech Stack:</strong> Python, Pandas, Matplotlib, Seaborn, Jupyter</p>
        <p><strong>Color Theme:</strong> bg-yellow-600</p>

        <h3>Project 6 — Email Rewriter AI (NLP)</h3>
        <p><strong>Description:</strong> A Streamlit app that rewrites emails into different tones using Cohere NLP API while preserving semantic intent.</p>
        <p><strong>Tech Stack:</strong> Python, Streamlit, Cohere API</p>
        <p><strong>Color Theme:</strong> bg-green-700</p>

        <hr />

        <h2>Additional Notes</h2>
        <ul>
          <li>Portfolio built with <strong>Next.js 16, React 19, TypeScript, Tailwind CSS v4</strong></li>
          <li><strong>Framer Motion</strong> used for animations</li>
          <li><strong>GitHub API integration</strong> for real-time repository statistics</li>
          <li>Projects page supports <strong>live demos, repo links, and case study pages</strong></li>
          <li>Layout is <strong>fully responsive</strong>, includes <strong>scroll animations, hover dynamics, staggered cards, and parallax sections</strong></li>
        </ul>

        <hr />

        <footer className="mt-8 text-center text-gray-500">
          <p>&copy; 2025 Om Choksi. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}