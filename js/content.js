/* Site content data — edit here to update portfolio content */

const SITE = {
  name: "Mustafa Sohail",
  domain: "",
  email: "mustufasohail7@gmail.com",
  github: "https://github.com/Mustafasohail7",
  resume: "assets/resume.pdf",
  currentActivity: "Working on a Solution That Detects Phishing Forms",
  profile: {
    default: "assets/profile.jpg",
    hover: "assets/profile-hover.jpg",
    alt: "Mustafa Sohail",
  },
};

const NAV_LINKS = [
  { label: "Home", href: "index.html", page: "home" },
  { label: "Lab", href: "lab.html", page: "lab" },
  { label: "Blog", href: "notes.html", page: "notes" },
  { label: "Vault", href: "vault.html", page: "vault" },
  { label: "About", href: "about.html", page: "about" },
];

const IDENTITY_STRIP = [
  "2 Years Experience",
  "eJPT Certified",
  "Writeups & Research"
];

const CURRENT_FOCUS = [
  {
    title: "BSCP Preparation",
    description: "Would ideally like to complete all PortSwigger labs before attempting BurpSuite Certified Practitioner exam.",
    status: "In Progress",
  },
  {
    title: "Preparing for Ignite National Hackathon 2027",
    description: "Need to practice more CTFs and hone my skills in web exploitation, reverse engineering, and binary exploitation.",
    status: "Researching",
  }
];

const FEATURED_WORK = {
  title: "OverTheWire Natas All Levels Walkthrough",
  excerpt: "Notes, solutions and all insights from OverTheWire Natas Web Exploitation Challenges.",
  tags: ["Web Exploitation", "Walkthrough", "Games"],
  href: "https://medium.com/@mustufasohail7/exploring-web-security-through-overthewire-natas-878ad5cf6e69",
  readTime: "41 min",
};

const SERVICES = [
  {
    title: "Web App Testing",
    description: "Thorough assessment of web applications for common and nuanced vulnerabilities.",
  },
  {
    title: "API Security Review",
    description: "Analysis of REST and GraphQL APIs for authentication, authorization, and data exposure issues.",
  },
  {
    title: "Security Research",
    description: "Focused research on offensive techniques, tooling, and practical security concepts.",
  },
];

/* Only "In Progress" projects appear on the Lab page */
const LAB_PROJECTS = [
  {
    title: "Security Assessment Automation Portal",
    status: "Company Internal",
    summary: "Automated portal for assessment of files, URLs and IPs through different intelligence sources, sandboxes and scanners.",
    github: null,
    medium: null,
  },
  {
    title: "Advisory Management Platform",
    status: "Company Internal",
    summary: "Built a centralized advisory management system that streamlined vulnerability tracking across diverse stakeholders. Provided visibility into affected assets, active CVEs, remediation progress, and overall attack surface through a unified dashboard.",
    github: null,
    medium: null
  },
];

const LEARNING_TIMELINE = [
  {
    date: "2023",
    title: "Offensive Security Foundations",
    description: "Started learning with TryHackMe, Hack The Box, and OverTheWire Bandit."
  },
  {
    date: "2024",
    title: "Professional Security Entry",
    description: "Started first cybersecurity role dealing with real problems"
  },
  {
    date: "2024",
    title: "First Real World Vulnerability",
    description: "Reported first production security vulnerability during professional work."
  },
  {
    date: "2024",
    title: "Security Competition Finalist",
    description: "Reached finalist stage in Ignite National Cybersecurity Hackathon."
  },
  {
    date: "2025",
    title: "Security Automation Engineering",
    description: "Automated the complete end-to-end security assessment pipeline to improve security posture and response time."
  },
  {
    date: "2025",
    title: "eJPT Certification",
    description: "Earned eLearnSecurity Junior Penetration Tester certification."
  },
  {
    date: "2026",
    title: "Web Exploitation",
    description: "Completed OverTheWire Natas, strengthening web security and exploitation skills."
  }
];

const NOTES = [
  {
    title: "OverTheWire Natas Walkthrough",
    excerpt: "A complete walkthrough with each level explained",
    category: "CTF",
    skills: ["Web Exploitation", "Injection", "PHP"],
    href: "https://medium.com/@mustufasohail7/exploring-web-security-through-overthewire-natas-878ad5cf6e69",
    readTime: "41 min",
  },
  {
    title: "JetPunk Quiz Bypass",
    excerpt: "A simple bypass I discovered - a good lesson for understanding web and code obfuscation",
    category: "Web",
    skills: ["Web","Obfuscation","Client-Side Logic"],
    href: "https://medium.com/@mustufasohail7/jetpunk-quiz-hack-5128ffcc8d57",
    readTime: "6 min",
  },
  {
    title: "OverTheWire Bandit Walkthrough",
    excerpt: "A complete walkthrough with each level & command explained",
    category: "CTF",
    skills: ["Linux", "Command Line", "Scripting"],
    href: "https://medium.com/@mustufasohail7/learning-linux-the-fun-way-a-walkthrough-approach-to-overthewire-bandit-48a0b73f32c1",
    readTime: "16 min",
  },
  {
    title: "My eJPTv2 Experience",
    excerpt: "A short account of my journey to eJPTv2 certification.",
    category: "Random",
    skills: ["Experience"],
    href: "https://medium.com/@mustufasohail7/the-ejptv2-experience-e3d6e1cce162",
    readTime: "5 min",
  },
  {
    title: "Bare Bones Endpoint Detection System Using MITRE ATT&CK",
    excerpt: "A minimalistic endpoint detection system.",
    category: "Research",
    skills: ["Threat Hunting", "MITRE ATT&CK", "Event Logging"],
    href: "https://medium.com/@mustufasohail7/bare-bones-endpoint-detection-system-using-mitre-att-ck-c0ace3b0353a",
    readTime: "7 min",
  },
];

const NOTE_CATEGORIES = ["All", "CTF", "Research", "Web", "Random"];

const NOTES_FEEDBACK = {
  message: "I'm always open to feedback on these notes — corrections, suggestions, or things I overlooked.",
  emailSubject: "I have wandered from your website",
};

const CERTIFICATIONS = [
  {
    name: "eJPT",
    fullName: "eLearnSecurity Junior Penetration Tester",
    issuer: "INE / eLearnSecurity",
    year: "2024",
    status: "completed",
    credentialUrl: "https://certs.ine.com/a94fd2a6-f00c-460d-ac60-462147fbde23#acc.ScKOIZpG",
    learned: [
      "Network scanning and enumeration fundamentals",
      "Web application vulnerability identification",
      "Exploitation and post-exploitation techniques"
    ],
  },
  {
    name: "Junior Cybersecurity Analyst",
    fullName: "Junior Cybersecurity Analyst Career Path",
    issuer: "Cisco",
    year: "2024",
    status: "completed",
    credentialUrl: "https://www.credly.com/earner/earned/badge/0286da72-eb8e-45db-bfad-28cd2af7c71a",
    learned: [
      "Techniques to monitor and protect the network",
      "Understanding of cloud security and cryptography",
      "Security alerts and incident response procedures",
      "Risk management and vulnerability assessment fundamentals"
    ],
  },
  {
    name: "CC",
    fullName: "Certified in Cybersecurity",
    issuer: "ISC2",
    year: "2024",
    status: "completed",
    credentialUrl: "https://www.credly.com/earner/earned/badge/e31cce24-1238-4274-869e-a73954eae98c",
    learned: [
      "Organizational security basics",
      "It's still a cert"
    ],
  },
  {
    name: "CTF Finalist",
    fullName: "Unfortunately, there was no participation in final certificate so you are gonna have to 'Trust Me Bro' on this one. I have my picture on their website though.",
    issuer: "Ignite National Cybersecrity Hackathon",
    year: "2024",
    status: "completed",
    credentialUrl: "https://i.postimg.cc/N03fRKCW/hackathon.jpg",
    learned: [
      "Forensics and reverse engineering",
      "Monitoring and incident response",
      ""
    ],
  },
];

const TOP_MOVIES = [
  {
    title: "Good Will Hunting",
    year: "1997",
    image: "https://a.ltrbxd.com/resized/film-poster/5/1/6/2/1/51621-good-will-hunting-0-460-0-690-crop.jpg?v=acb4766abd",
  },
  {
    title: "The Place Beyond The Pines",
    year: "2012",
    image: "https://a.ltrbxd.com/resized/film-poster/8/0/2/0/0/80200-the-place-beyond-the-pines-0-460-0-690-crop.jpg?v=e30d64f591",
  },
  {
    title: "Aftersun",
    year: "2022",
    image: "https://a.ltrbxd.com/resized/film-poster/8/6/8/5/5/8/868558-aftersun-0-460-0-690-crop.jpg?v=5ce2118fca",
  },
  {
    title: "Memoir of a Snail",
    year: "2024",
    image: "https://a.ltrbxd.com/resized/film-poster/9/5/9/8/2/9/959829-memoir-of-a-snail-0-460-0-690-crop.jpg?v=e23dff99a0",
  },
];

const RUNNING = {
  stats: [
    { label: "Best Half Marathon", value: "2:23:23" },
    { label: "Best 10K", value: "58:50" },
    { label: "Best 5K", value: "28:16" },
  ],
  medals: [
    { src: "assets/medals/running.jpg", alt: "I run", caption: "Pinktober Run 2025" },
    { src: "assets/medals/medals.jpg", alt: "Medals", caption: "All of the events" },
  ],
};

const HOBBIES_ROTATION = [
  { title: "GeoGuesser", reason: "Already loved geography, so this is a natural fit." },
  { title: "Learning German", reason: "Want to be trilingual" },
  { title: "Watching Football", reason: "It's World Cup season!" },
  { title: "Cooking", reason: "Want to cook my own protein." },
];

const SONG_CORNER = {
  title: "Currently on loop",
  artist: "Daft Punk",
  youtubeId: "FxzBvqY5PP0",
  note: "Replace youtubeId in content.js with your pick.",
};

const COMMAND_ITEMS = [
  { label: "Go to Home", href: "index.html", shortcut: "H" },
  { label: "Go to Lab", href: "lab.html", shortcut: "L" },
  { label: "Go to Notes", href: "notes.html", shortcut: "N" },
  { label: "Go to Vault", href: "vault.html", shortcut: "V" },
  { label: "Go to About", href: "about.html", shortcut: "A" },
  { label: "View GitHub", href: "https://github.com/Mustafasohail7", external: true },
  { label: "Send Email", href: "mailto:mustufasohail7@gmail.com", external: true },
];
