# TruthLens AI

![TruthLens AI Overview](https://via.placeholder.com/1200x600.png?text=TruthLens+AI+-+Defend+Truth+in+the+Digital+Age)

TruthLens AI is a modern, production-grade AI-powered Multimodal Deepfake & Fake News Detection Platform. Designed with enterprise-level aesthetics, it serves as a powerful tool for governments, media agencies, fact-checking organizations, and cybersecurity professionals to determine the authenticity of digital content.

## 🎯 Objective

In an era where AI can generate hyper-realistic fake content in seconds, the need for reliable detection tools is paramount. TruthLens AI provides a stunning, user-friendly interface that allows users to upload and analyze Text, Images, Audio, and Video content to ascertain whether the content is authentic or manipulated/AI-generated. The platform features professional animations, dark/light theme support, and comprehensive result dashboards.

## 🚀 Key Features

* **Multi-Modal Detection:** Comprehensive analysis across four distinct content modalities.
* **Real-Time Analysis:** Fast processing and instant results using state-of-the-art AI detection models (currently mocked for demonstration).
* **Enterprise Security & Design:** Bank-grade aesthetics, glassmorphism, gradient text, and dark mode optimizations.
* **Detailed Reports:** Generate professional, shareable reports with confidence scores, risk assessments, and AI explanations. Exportable as PDF (via print) or JSON.
* **Interactive Dashboards:** Visual representation of analysis history, content authenticity distribution, and confidence trends using Recharts.
* **Responsive Architecture:** Fully responsive, mobile-first design ensuring seamless experience across all devices.

## 🛠️ Technology Stack

* **Frontend Framework:** React.js (v18+)
* **Build Tool:** Vite for lightning-fast HMR and optimized builds
* **Routing:** React Router DOM (v6)
* **Styling:** Tailwind CSS (v3) with custom design tokens and global CSS (`index.css`)
* **Animations:** Framer Motion for page transitions, micro-interactions, and complex UI animations
* **Icons:** React Icons (`react-icons/hi`, `hi2`, `fa`, `si`)
* **Data Visualization:** Recharts for dynamic, interactive dashboard charts
* **HTTP Client:** Axios for robust API communication
* **State Management:** React Context API (`ThemeContext`, `DetectionContext`) coupled with custom hooks.

## 📂 Architecture & Folder Structure

The project follows a clean, highly modular architecture to ensure scalability and maintainability:

```text
src/
├── assets/           # Images, SVGs, and animations
├── components/       # Reusable UI components
│   ├── common/       # Generic components (Button, Loader, Modal, ErrorBoundary)
│   ├── dashboard/    # Analytics charts, statistics cards, and timelines
│   ├── layout/       # App shell components (Navbar, Sidebar, Footer)
│   ├── reports/      # Report viewers and export utilities
│   └── upload/       # Specific upload modules (Text, Image, Audio, Video)
├── context/          # Global React contexts for Theme and Detection State
├── hooks/            # Custom React hooks (`useTheme`, `useDetection`)
├── pages/            # Top-level route components (Home, Analyzer, Dashboard, etc.)
├── routes/           # AppRoutes component defining the routing structure
├── services/         # API integration and mock service definitions
├── utils/            # Helper functions, constants, and data validators
├── App.jsx           # Root application component orchestrating providers
├── main.jsx          # React entry point
└── index.css         # Global Tailwind directives and custom CSS variables/animations
```

## 🔍 Core Pages & Modules

### 1. Landing Page (`/`)
* Hero section featuring an animated neural network SVG visualization and floating gradient orbs.
* Overview of supported modalities and enterprise features.
* Step-by-step architecture flow.

### 2. Content Analyzer (`/analyzer`)
The core of the application, featuring a sidebar to navigate between four specialized modules:
*   **Text Analysis:** Large textarea for pasting articles or social media posts. Outputs sentiment score, misinformation risk, and fake news probability.
*   **Image Analysis:** Drag-and-drop interface for image uploads. Outputs manipulation detection, deepfake face score, and artifact analysis.
*   **Audio Analysis:** Upload zone with native audio preview and animated waveform. Outputs voice clone detection and synthetic voice probability.
*   **Video Analysis:** Upload zone with native video player. Outputs frame consistency, lip-sync authenticity, and overall deepfake probability.

### 3. Results Dashboard (`/dashboard`)
* Aggregated statistics cards showing Total Analyses, Authentic/Fake counts, and Average Confidence.
* **Content Distribution:** Pie chart showing authenticity breakdown.
* **Modality Breakdown:** Bar chart visualizing usage across different content types.
* **Trend Analysis:** Area chart showing detection trends over time.
* **Detection Timeline:** A chronological list of recent analysis activities.

### 4. Reports (`/reports`)
* List view of historical analyses.
* Detailed report view containing Content Information, Analysis Results, Risk Assessment, and AI Explanations.
* Export capabilities (Download detailed JSON or format for PDF printing).

## 🔌 Backend Integration (Mocked)

Currently, the application uses a sophisticated **mock service layer** (`src/services/detectionService.js`) to simulate realistic AI model responses. It generates varied predictions, confidence scores, and detailed explanations based on the modality and randomized probability logic.

**Connecting a real backend:**
The service layer uses Axios and environment variables. To connect to a live Python/TensorFlow backend, simply update the `.env` file at the root of the project:

```env
VITE_API_BASE_URL=http://your-real-backend-url.com/api
```

Expected API endpoints:
* `POST /predict/text`
* `POST /predict/image`
* `POST /predict/audio`
* `POST /predict/video`

Expected Response format:
```json
{
  "prediction": "Fake",
  "confidence": 92.4,
  "risk_score": 87.5,
  "details": {
    "model": "DeepfakeDetectorV1",
    "explanation": "High probability of manipulation detected. Pixel-level analysis reveals splicing artifacts..."
  }
}
```

## ⚙️ Setup & Installation

To run TruthLens AI locally on your machine:

1.  **Clone the repository** (if applicable) or navigate to the project directory:
    ```bash
    cd truthLen
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser:** Navigate to `http://localhost:5173/` (or the port specified by Vite).

## 🛡️ License & Credits

TruthLens AI is built as a production-grade showcase project demonstrating the integration of modern web technologies with AI detection concepts.

Built using React, Vite, Tailwind CSS, and Framer Motion.
