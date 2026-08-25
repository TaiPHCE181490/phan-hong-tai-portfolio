export const profile = {
  name: "Phan Hong Tai",
  role: "Developer (Node.js / .NET)",
  location: "Can Tho, Vietnam",
  github: "https://github.com/mirramirrayumeume",
  email: "taiph8.it@gmail.com",
  tagline:
    "Backend-focused developer building reliable APIs, data-driven systems, and clean full-stack experiences.",
  summary:
    "Software Engineering student at FPT University - Can Tho Campus (expected Aug 2026). I focus on backend development and full-stack academic projects with strengths in RESTful APIs, SQL databases, authentication, payment integration, and microservices. I collaborate closely with teams and use AI tools such as ChatGPT and Copilot to support coding, debugging, refactoring, and productivity.",
  techBadges: [
    "Node.js",
    ".NET",
    "REST APIs",
    "PostgreSQL",
    "SQL Server",
    "JWT Auth",
    "Microservices",
    "Unity",
    "C#",
  ],
};

export const skills = [
  {
    category: "Backend",
    items: [
      "Node.js",
      "TypeScript",
      ".NET",
      "ASP.NET Core",
      "RESTful API",
      "Microservices",
      "JWT Authentication",
    ],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "MVC View"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "SQL Server", "Prisma", "Entity Framework Core"],
  },
  {
    category: "Tools",
    items: [
      "Git",
      "Swagger",
      "AutoMapper",
      "Cloudinary",
      "Socket.IO",
      "Vercel",
      "Render",
      "Docker (basic)",
    ],
  },
  {
    category: "Architecture",
    items: ["Microservices", "REST", "Authentication", "Payment Integration"],
  },
];

export const projects = [
  {
    name: "Mystic Journey",
    type: "2D Game & Integrated Web System",
    role: "Developer & QA Engineer",
    teamSize: "4 members",
    stack: [
      "Unity",
      "C#",
      "Photon Fusion",
      "Next.js",
      "ASP.NET Core API",
      "PostgreSQL",
      "JWT",
      "Cloudinary",
      "Vercel",
      "Docker",
      "VPS",
    ],
    highlights: [
      "Integrated and deployed Web Office (user-facing) & Admin dashboard (Next.js, ASP.NET Core API) connected to the Unity 2D game for managing player data stored on PostgreSQL.",
      "Conducted unit testing (1,298 test cases) and system testing (589 test cases), tracked and managed bugs with Excel.",
      "Developed full Backend, Frontend, and Unity modules: inventory/bag system, story missions, item shop, and daily check-in system.",
      "Integrated JWT authentication, Cloudinary image uploads, and email notification services.",
    ],
    repoUrl: "https://github.com/Tngh1/SEP490-Mystic-Journey",
    demoUrl: "https://mystic-journey.io.vn/download",
    extraRepoUrls: [
      { label: "Backend", url: "https://github.com/Tngh1/Mystic-Journey-BE" },
      { label: "Frontend", url: "https://github.com/Tngh1/Mystic-Journey-FE" },
    ],
    period: "05/2026 – 08/2026",
    category: "Capstone Project (SEP490)",
  },
  {
    name: "Lumiread",
    type: "Used Book Marketplace & Auction Platform",
    role: "Full Stack Developer",
    teamSize: "2 members",
    stack: [
      "Node.js",
      "TypeScript",
      "React",
      "Prisma",
      "PostgreSQL",
      "Socket.IO",
      "Vercel",
      "Render",
    ],
    highlights: [
      "Built RESTful APIs for users, listings, auctions, bidding, and transactions.",
      "Delivered real-time auction updates using Socket.IO.",
      "Designed PostgreSQL schema and Prisma ORM data access.",
      "Implemented JWT auth, uploads, email notifications, and Cloudinary storage.",
    ],
    repoUrl: "https://github.com/FatNgynx/Lumiread",
    demoUrl: "https://lumiread-six.vercel.app/",
  },
  {
    name: "Eduti",
    type: "Online Learning Platform",
    role: "Backend Developer - Payment Service",
    teamSize: "5 members",
    stack: [
      ".NET",
      "ASP.NET Core API",
      "MVC View",
      "Microservices",
      "JWT",
      "EF Core",
      "SQL Server",
      "VNPay",
      "Swagger",
      "AutoMapper",
    ],
    highlights: [
      "Owned the payment service in a microservices architecture.",
      "Integrated VNPay for secure course payments.",
      "Implemented JWT auth between services and EF Core persistence.",
      "Delivered MVC views for cart, orders, and purchase history.",
    ],
    repoUrl: "https://github.com/Tngh1/Eduti",
    demoUrl: "#",
  },
  {
    name: "NovelRead",
    type: "Novel Reading Management System",
    role: "Project Leader",
    teamSize: "6 members",
    stack: ["Java MVC", "C# WinForms", "SQL Server", "Cloudinary"],
    highlights: [
      "Led a 6-member team with task planning and delivery tracking.",
      "Built Java MVC web and C# WinForms desktop applications.",
      "Designed SQL Server operations and reporting workflows.",
      "Integrated Cloudinary for cloud-based image management.",
    ],
    repoUrl: "#",
    demoUrl: "#",
  },
];

export const experience = [
  {
    title: "Mystic Journey",
    role: "Developer & QA Engineer | Capstone Project (SEP490)",
    period: "05/2026 – 08/2026",
    details: [
      "Built full-stack game ecosystem: Unity 2D game + Web Office + Admin dashboard integrated with PostgreSQL.",
      "Owned backend, frontend & Unity modules: bag/inventory, item shop, daily check-in, story missions.",
      "Executed 1,298 unit tests & 589 system tests; managed defect lifecycle via Excel reporting.",
      "Integrated JWT auth, Cloudinary uploads, and email notifications across services.",
    ],
  },
  {
    title: "Lumiread",
    role: "Full Stack Developer",
    period: "2025",
    details: [
      "Designed RESTful APIs and real-time auction flows.",
      "Optimized data access with Prisma and PostgreSQL.",
      "Shipped end-to-end features from API to UI integration.",
    ],
  },
  {
    title: "Eduti",
    role: "Backend Developer - Payment Service",
    period: "2024",
    details: [
      "Implemented VNPay integration and payment validation.",
      "Coordinated microservice auth and authorization policies.",
      "Documented APIs and improved developer onboarding with Swagger.",
    ],
  },
  {
    title: "NovelRead",
    role: "Project Leader",
    period: "2023 - 2024",
    details: [
      "Coordinated team delivery and milestone planning.",
      "Delivered Java MVC web and WinForms desktop modules.",
      "Designed SQL Server schemas and data workflows.",
    ],
  },
];

export const education = {
  degree: "Software Engineering",
  school: "FPT University - Can Tho Campus",
  period: "2022 - 10/2026",
  status: "Đã hoàn thành chương trình học, chuẩn bị nhận bằng tốt nghiệp tạm thời.",
  gpa: "3.2 / 4.0",
  coursework: [
    "OOP",
    "Web Development",
    "Database Systems",
    "RESTful API",
    "Software Engineering",
  ],
};

export const awards = [
  "FPT University Excellent Student - Fall 2025",
  "FPT University Excellent Student - Fall 2024",
  "FPT University Excellent Student - Summer 2024",
];

export const certificates = [
  "Gemini Certified University Student",
  "Web Design for Everybody: Basics of Web Development & Coding",
  "Software Development Lifecycle",
  "Academic Skills for University Success",
];
