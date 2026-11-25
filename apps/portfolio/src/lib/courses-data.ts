export interface CourseData {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  provider: string; // Institution / Academy / Community
  roleEn: string;
  roleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  durationEn: string;
  durationAr: string;
  formatEn: string;
  formatAr: string;
  levelEn: string;
  levelAr: string;
  studentsCount?: string;
  status: "active" | "completed" | "upcoming" | string;
  skills: string[];
  syllabusEn: { title: string; topics: string[] }[];
  syllabusAr: { title: string; topics: string[] }[];
  audienceEn: string;
  audienceAr: string;
  prerequisitesEn: string[];
  prerequisitesAr: string[];
  projectsBuiltEn: string[];
  projectsBuiltAr: string[];
  highlightsEn: string[];
  highlightsAr: string[];
}

export const COURSES_DATA: CourseData[] = [
  {
    id: "fullstack-bootcamp",
    slug: "fullstack-bootcamp",
    titleEn: "Full-Stack Web Development Bootcamp",
    titleAr: "معسكر تطوير الويب المتكامل (Full-Stack Bootcamp)",
    provider: "Tech Academy & Community",
    roleEn: "Lead Instructor",
    roleAr: "المحاضر الرئيسي",
    descriptionEn:
      "An intensive, project-driven bootcamp preparing developers for production engineering. Covers end-to-end web architecture from relational database modeling to modern React interfaces and deployment.",
    descriptionAr:
      "معسكر تدريبي مكثف يعتمد على إنجاز المشاريع العملية وتأهيل المتدربين لسوق العمل وهندسة البرمجيات الاحترافية، بدءاً من تصميم قواعد البيانات وحتى واجهات React الحديثة.",
    durationEn: "60 Hours • 10 Weeks",
    durationAr: "60 ساعة تدريبية • 10 أسابيع",
    formatEn: "Live Interactive & Code Reviews",
    formatAr: "تدريب عملي مباشر ومراجعة أكواد",
    levelEn: "Beginner to Advanced",
    levelAr: "من المبتدئ إلى المتقدم",
    studentsCount: "120+ Graduates",
    status: "active",
    skills: ["React", "Node.js", "Express", "PostgreSQL", "Next.js", "Tailwind CSS", "Git"],
    syllabusEn: [
      {
        title: "Module 1: Web Foundations & Semantic UI",
        topics: [
          "Semantic HTML5 & Accessible Document Trees",
          "Modern CSS Architecture & Responsive Layouts with Flexbox/Grid",
          "Tailwind CSS utility patterns and responsive design",
        ],
      },
      {
        title: "Module 2: Advanced JavaScript Core",
        topics: [
          "Memory management, Scope, Closures, and Execution Context",
          "Asynchronous JS: Event Loop, Promises, Async/Await",
          "DOM Manipulation, Browser APIs, and Fetch",
        ],
      },
      {
        title: "Module 3: Frontend Architecture with React",
        topics: [
          "React 19 Core: Components, Props, and JSX Compilation",
          "State Management: useState, useReducer, Context API",
          "Custom Hooks design and performance optimization",
        ],
      },
      {
        title: "Module 4: Backend Engineering with Node & Express",
        topics: [
          "Node.js runtime, Event-driven architecture, and File system",
          "RESTful API design and Express router modularization",
          "Authentication: JWT tokens, password hashing, and security headers",
        ],
      },
      {
        title: "Module 5: Relational Databases & ORM",
        topics: [
          "PostgreSQL relational modeling, migrations, and joins",
          "Type-safe data access with Drizzle ORM and Neon Postgres",
          "Query optimization, indexes, and connection pooling",
        ],
      },
      {
        title: "Module 6: Production Engineering & Deployment",
        topics: [
          "Git branch workflows and GitHub collaboration",
          "CI/CD pipelines, automated linting and testing",
          "Deployment on Vercel, Docker basics, and live monitoring",
        ],
      },
    ],
    syllabusAr: [
      {
        title: "الوحدة 1: أساسيات الويب وهندسة الواجهات",
        topics: [
          "بنية HTML5 الدلالية وتطبيقات إمكانية الوصول Accessibility",
          "تنسيقات CSS الحديثة وتصميم الشاشات المتجاوبة بـ Flexbox وGrid",
          "منهجية Tailwind CSS وأنظمة التصميم السريعة",
        ],
      },
      {
        title: "الوحدة 2: جوهر لغة جافاسكريبت المتقدم",
        topics: [
          "إدارة الذاكرة، نطاق المتغيرات، الإغلاقات (Closures)، وسياق التنفيذ",
          "البرمجة غير المتزامنة: Event Loop والوعود (Promises) وAsync/Await",
          "التعامل مع عناصر الصفحة وواجهات المتصفح وطلبات Fetch",
        ],
      },
      {
        title: "الوحدة 3: هندسة الواجهات الحديثة بـ React",
        topics: [
          "مفاهيم React 19: المكونات والخصائص وترجمة JSX",
          "إدارة الحالة: useState وuseReducer وContext API",
          "بناء الـ Custom Hooks وتحسين سرعة استجابة المكونات",
        ],
      },
      {
        title: "الوحدة 4: هندسة الخوادم بـ Node.js وExpress",
        topics: [
          "بيئة تشغيل Node.js وبنية الأحداث ونظام الملفات",
          "تصميم واجهات برمجية RESTful وهيكلة مسارات Express",
          "المصادقة الأمنية: تشفير كلمات المرور وتوكنز JWT وحماية الطلبات",
        ],
      },
      {
        title: "الوحدة 5: قواعد البيانات العلائقية وأنظمة ORM",
        topics: [
          "تصميم قواعد بيانات PostgreSQL العلائقية والربط بين الجداول",
          "إدارة البيانات آمنة الأنواع باستخدام Drizzle ORM وسحابة Neon",
          "تحسين الاستعلامات والفهارس وإدارة مجموعات الاتصال Pooling",
        ],
      },
      {
        title: "الوحدة 6: هندسة الإنتاج والنشر السحابي",
        topics: [
          "تدفقات عمل Git وإدارة الفروع والتعاون عبر GitHub",
          "أنابيب النشر المستمر CI/CD والاختبارات الآلية",
          "النشر على Vercel، أساسيات Docker، ومراقبة بيئة الإنتاج",
        ],
      },
    ],
    audienceEn: "Aspiring software engineers, computer science students, and career switchers wanting industry-grade full-stack skills.",
    audienceAr: "مهندسو البرمجيات المبتدئون وطلاب كليات الحاسب والراغبون في التحول المهني لتطوير الويب بمستويات احترافية.",
    prerequisitesEn: [
      "Basic programming curiosity and analytical mindset",
      "A laptop capable of running VS Code and Node.js",
      "No prior full-stack experience required; we start from first principles",
    ],
    prerequisitesAr: [
      "شغف بالبرمجة والتفكير التحليلي المنطقي",
      "جهاز حاسوب قادر على تشغيل VS Code وNode.js",
      "لا يُشترط وجود خبرة سابقة في تطوير الويب؛ نبدأ من المبادئ الأساسية",
    ],
    projectsBuiltEn: [
      "Full-featured E-commerce Platform with Stripe checkout and order management",
      "Real-time Collaborative Task Management SaaS with WebSockets",
      "Production-ready RESTful Authentication & Role Management API with Swagger docs",
    ],
    projectsBuiltAr: [
      "منصة تجارة إلكترونية متكاملة مع بوابات الدفع الإلكتروني وإدارة الطلبات",
      "تطبيق لإدارة المهام التعاونية لحظياً بنظام SaaS",
      "نظام مصادقة وإدارة صلاحيات آمن لمعايير الإنتاج وموثق بـ Swagger",
    ],
    highlightsEn: [
      "Live interactive coding sessions with instant feedback",
      "Weekly code review on every student pull request",
      "Portfolio project ready for tech company hiring",
      "1-on-1 mentorship and technical interview preparation",
    ],
    highlightsAr: [
      "جلسات تدريب برمجية مباشرة وتطبيق فوري للأكواد",
      "مراجعة تفصيلية أسبوعية لأكواد الطلاب على GitHub",
      "بناء معرض أعمال احترافي يؤهلك للتقديم على الشركات التقنية",
      "إرشاد فردي مستمر والتحضير لمقابلات التوظيف التقنية",
    ],
  },
  {
    id: "javascript-typescript-mastery",
    slug: "javascript-typescript-mastery",
    titleEn: "Advanced JavaScript & TypeScript Architecture",
    titleAr: "احتراف جافاسكريبت المتقدمة وهندسة TypeScript",
    provider: "Developer Workshops",
    roleEn: "Instructor",
    roleAr: "المدرب والمحاضر",
    descriptionEn:
      "A specialized masterclass on building scalable, type-safe software. Emphasizes clean code, design patterns, robust typing, and asynchronous reliability.",
    descriptionAr:
      "دورة تخصصية متقدمة تركز على بناء برمجيات آمنة وقابلة للتوسع باستخدام TypeScript وكتابة كود نظيف وتطبيق أنماط التصميم البرمجي.",
    durationEn: "30 Hours • 5 Weeks",
    durationAr: "30 ساعة تدريبية • 5 أسابيع",
    formatEn: "Hands-on Workshops & Exercises",
    formatAr: "ورش تطبيقية وتمارين عملية",
    levelEn: "Intermediate to Advanced",
    levelAr: "متوسط إلى متقدم",
    studentsCount: "85+ Developers",
    status: "upcoming",
    skills: ["TypeScript", "JavaScript ESNext", "Generics", "Design Patterns", "Unit Testing", "Zod"],
    syllabusEn: [
      {
        title: "Module 1: The Modern JavaScript Engine",
        topics: [
          "V8 internals, JIT compilation, and garbage collection mechanisms",
          "Advanced asynchronous flows: Async generators, iterators, and microtasks",
          "Memory leak diagnosis and Chrome DevTools profiling",
        ],
      },
      {
        title: "Module 2: Advanced TypeScript Type System",
        topics: [
          "Generic constraints, inference, and conditional types",
          "Mapped types, template literal types, and type gymnastics",
          "Runtime schema validation and type inference with Zod",
        ],
      },
      {
        title: "Module 3: Enterprise Software Design Patterns",
        topics: [
          "Creational & Structural Patterns: Factory, Builder, Adapter, Decorator",
          "Behavioral Patterns: Observer, Strategy, State, Command",
          "SOLID principles applied to modern TypeScript codebases",
        ],
      },
      {
        title: "Module 4: Automated Testing & Code Quality",
        topics: [
          "Unit testing with Vitest and Jest",
          "Mocking, spies, and test-driven development (TDD)",
          "ESLint, Prettier, and automated typecheck CI gates",
        ],
      },
    ],
    syllabusAr: [
      {
        title: "الوحدة 1: محرك جافاسكريبت الحديث والذاكرة",
        topics: [
          "آلية عمل محرك V8 والترجمة الفورية JIT وإدارة الذاكرة",
          "التدفقات غير المتزامنة المتقدمة: Async Generators ومصفوفات Microtasks",
          "تشخيص تسريبات الذاكرة وفحص الأداء عبر أدوات Chrome DevTools",
        ],
      },
      {
        title: "الوحدة 2: نظام الأنواع المعقد في TypeScript",
        topics: [
          "الأنواع المعممة (Generics) والقيود والاستنتاج والأنواع الشرطية",
          "الأنواع المعينة (Mapped Types) وأنواع النصوص النمطية Template Literals",
          "التحقق من البيانات في وقت التشغيل مع استنتاج الأنواع عبر Zod",
        ],
      },
      {
        title: "الوحدة 3: أنماط التصميم البرمجية للمشاريع الكبرى",
        topics: [
          "الأنماط الإنشائية والهيكلية: Factory وBuilder وAdapter وDecorator",
          "الأنماط السلوكية: Observer وStrategy وState وCommand",
          "تطبيق مبادئ SOLID الخمسة في بيئة TypeScript الحديثة",
        ],
      },
      {
        title: "الوحدة 4: الاختبارات الآلية وضمان جودة الكود",
        topics: [
          "اختبارات الوحدات (Unit Tests) باستخدام Vitest وJest",
          "المحاكاة (Mocking) ومنهجية التطوير الموجه بالاختبار (TDD)",
          "بوابات التحقق الآلي وفحص الأنواع في تدفقات CI",
        ],
      },
    ],
    audienceEn: "Frontend and backend developers looking to level up their type-safety, code architecture, and engineering confidence.",
    audienceAr: "مطورو الواجهات والخوادم الساعون لرفع كفاءة كتابة الأكواد والاعتماد على TypeScript في المشاريع الكبرى.",
    prerequisitesEn: [
      "Solid understanding of JavaScript basics (functions, arrays, objects)",
      "Familiarity with modern syntax (arrow functions, destructuring)",
    ],
    prerequisitesAr: [
      "فهم جيد لأساسيات لغة جافاسكريبت (الدوال، المصفوفات، الكائنات)",
      "معرفة بالمفاهيم الحديثة للغة (Arrow Functions، Destructuring)",
    ],
    projectsBuiltEn: [
      "Type-safe Reactive State Management & Event Emitter Library",
      "Enterprise Data Validation, Normalization & Transformation Pipeline",
    ],
    projectsBuiltAr: [
      "مكتبة مخصصة تفاعلية لإدارة الحالة آمنة الأنواع بالكامل",
      "نظام مؤسسي للتحقق من سلامة البيانات ومعالجتها",
    ],
    highlightsEn: [
      "Deep understanding of what happens under the hood",
      "Refactoring complex JavaScript projects into strict TypeScript",
      "Practical exercises in TypeScript type gymnastics",
    ],
    highlightsAr: [
      "فهم عميق لما يحدث خلف الكواليس داخل محرك اللغة",
      "إعادة هيكلة مشاريع واقعية من جافاسكريبت إلى TypeScript صارمة",
      "تمارين عملية مكثفة على أصعب مفاهيم الأنواع",
    ],
  },
  {
    id: "react-nextjs-engineering",
    slug: "react-nextjs-engineering",
    titleEn: "Modern Frontend Engineering with React & Next.js",
    titleAr: "هندسة الواجهات الحديثة بـ React وNext.js",
    provider: "Tech Mentorship",
    roleEn: "Instructor",
    roleAr: "المدرب والمحاضر",
    descriptionEn:
      "Modern client and server web development using Next.js App Router, React Server Components (RSC), Partial Prerendering, and Tailwind CSS v4 styling.",
    descriptionAr:
      "تطوير الواجهات الحديثة ومفاهيم React Server Components، وموجه التطبيقات في Next.js، والتصيير المسبق الجزئي، وتنسيقات Tailwind CSS v4.",
    durationEn: "45 Hours • 7 Weeks",
    durationAr: "45 ساعة تدريبية • 7 أسابيع",
    formatEn: "Interactive Labs & Code Clinics",
    formatAr: "مختبرات برمجية وعيادات كود",
    levelEn: "Intermediate",
    levelAr: "متوسط",
    studentsCount: "140+ Students",
    status: "active",
    skills: ["Next.js", "React 19", "Server Components", "Tailwind CSS v4", "SEO & Core Web Vitals", "Turbopack"],
    syllabusEn: [
      {
        title: "Module 1: React 19 Mental Model & Architecture",
        topics: [
          "Component lifecycle, Reconciliation, and Virtual DOM deep dive",
          "Hooks architecture, custom hook composition, and rules",
          "Concurrent features, transitions, and Suspense boundaries",
        ],
      },
      {
        title: "Module 2: Next.js App Router & Hybrid Rendering",
        topics: [
          "Server Components vs Client Components: When and how to split",
          "Streaming SSR, Partial Prerendering (PPR), and Cache Components",
          "Server Actions, optimistic updates, and form state",
        ],
      },
      {
        title: "Module 3: Styling, Design Systems & Motion",
        topics: [
          "Tailwind CSS v4 engine, CSS variables, and dark mode systems",
          "Building reusable UI components with Radix UI and Tailwind",
          "Fluid UI micro-animations and page transitions with GSAP",
        ],
      },
      {
        title: "Module 4: Performance, SEO & Global Delivery",
        topics: [
          "Internationalization (i18n) and multilingual routing",
          "Core Web Vitals optimization: LCP, CLS, INP",
          "Dynamic OpenGraph image generation and metadata SEO",
        ],
      },
    ],
    syllabusAr: [
      {
        title: "الوحدة 1: النموذج العقلي ومعمارية React 19",
        topics: [
          "دورة حياة المكونات، خوارزمية المطابقة Reconciliation، والـ Virtual DOM",
          "هندسة الخطافات (Hooks)، دمج الخطافات المخصصة، والقواعد الذهبية",
          "الميزات المتزامنة (Concurrent Features) وSuspense Boundaries",
        ],
      },
      {
        title: "الوحدة 2: موجه التطبيقات في Next.js والتصيير الهجين",
        topics: [
          "المكونات الخادمة RSC مقابل مكونات العميل: متى وكيف تفصل بينها",
          "التدفق السريع Streaming SSR والتصيير المسبق الجزئي (PPR)",
          "الـ Server Actions والتحديثات المتفائلة وحالات النماذج",
        ],
      },
      {
        title: "الوحدة 3: التنسيق، أنظمة التصميم، والحركة",
        topics: [
          "محرك Tailwind CSS v4، متغيرات CSS، وأنظمة المظهر الداكن/الفاتح",
          "بناء مكونات واجهة مستخدم قابلة لإعادة الاستخدام مع Radix UI",
          "حركات الواجهة التفاعلية والانتقالات بين الصفحات باستخدام GSAP",
        ],
      },
      {
        title: "الوحدة 4: السرعة، تحسين محركات البحث، والتوزيع العالمي",
        topics: [
          "تعدد اللغات (i18n) والتوجيه متعدد اللغات الديناميكي",
          "تحسين مؤشرات أداء الويب الأساسية Core Web Vitals (LCP, CLS, INP)",
          "توليد صور OpenGraph التلقائية والبيانات الوصفية لمحركات البحث",
        ],
      },
    ],
    audienceEn: "Web developers wanting to master Next.js and build lightning-fast web applications.",
    audienceAr: "مطورو الويب الراغبون في احتراف Next.js وبناء تطبيقات فائقة السرعة وعالية الأداء.",
    prerequisitesEn: [
      "Working knowledge of React basics",
      "Comfortable with JavaScript ES6+ and CSS",
    ],
    prerequisitesAr: [
      "معرفة عملية بأساسيات مكتبة React",
      "إلمام بأساسيات JavaScript الحديثة وتنسيقات CSS",
    ],
    projectsBuiltEn: [
      "High-Performance Multilingual Tech Blog & News Platform",
      "SaaS Analytics Dashboard with Interactive Charts and Real-time Feeds",
    ],
    projectsBuiltAr: [
      "مدونة تقنية متعددة اللغات فائقة السرعة مع تحسين كامل لمحركات البحث",
      "لوحة تحكم إحصائية تفاعلية بنظام SaaS مع تغذية بيانات حية",
    ],
    highlightsEn: [
      "Master Next.js App Router and Server Components end-to-end",
      "Build real-world production apps from scratch",
      "Best practices for lightning-fast performance and SEO",
    ],
    highlightsAr: [
      "احتراف موجه التطبيقات والمكونات الخادمة من الألف إلى الياء",
      "بناء تطبيقات حقيقية متكاملة وجاهزة للإنتاج من الصفر",
      "أفضل الممارسات لتحقيق أعلى تقييمات السرعة ومحركات البحث",
    ],
  },
];

export function getCourseById(id: string): CourseData | undefined {
  return COURSES_DATA.find((c) => c.id === id || c.slug === id);
}
