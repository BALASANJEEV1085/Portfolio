import "./globals.css";
import { Geist } from "next/font/google";

const SITE_URL = "https://balasanjeev.netlify.app";
const SITE_NAME = "Bala Sanjeev C — Software Developer & AI Engineer";
const SITE_DESCRIPTION =
  "Portfolio of Bala Sanjeev C, a Computer Science Engineering student building full-stack software, secure backend systems, and applied AI projects.";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bala Sanjeev C | Software Developer & AI Engineer",
    template: "%s | Bala Sanjeev C",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Bala Sanjeev C Portfolio",
  authors: [{ name: "Bala Sanjeev C", url: SITE_URL }],
  creator: "Bala Sanjeev C",
  publisher: "Bala Sanjeev C",
  keywords: [
    "Bala Sanjeev C",
    "Balasanjeev C",
    "Bala Sanjeev software developer",
    "Bala Sanjeev AI engineer",
    "software developer portfolio",
    "software engineer portfolio",
    "full-stack developer",
    "full-stack developer India",
    "backend developer",
    "AI engineer",
    "integration engineer",
    "Java developer",
    "Python developer",
    "Go developer",
    "React developer",
    "Node.js developer",
    "MERN stack developer",
    "machine learning projects",
    "artificial intelligence projects",
    "DevSecOps projects",
    "GitHub security tools",
    "SBOM generation",
    "Next.js developer",
    "2027 engineering graduate",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: "/",
    siteName: "Bala Sanjeev C Portfolio",
    title: "Bala Sanjeev C | Software Developer & AI Engineer",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Bala Sanjeev C | Software Developer & AI Engineer",
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: [{ url: "/image.png?v=2", type: "image/png", sizes: "360x234" }],
    shortcut: "/image.png?v=2",
    apple: [{ url: "/image.png?v=2", type: "image/png" }],
  },
  category: "technology",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0c1d",
  colorScheme: "dark",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Bala Sanjeev C Portfolio",
      description: SITE_DESCRIPTION,
      keywords:
        "software development, full-stack engineering, backend development, AI engineering, machine learning, integration engineering",
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profile-page`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en-IN",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Bala Sanjeev C",
      alternateName: "Balasanjeev C",
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/image.png`,
      email: "mailto:balasnjeev1085@gmail.com",
      jobTitle: "Software Developer and AI Engineer",
      description:
        "Computer Science Engineering student graduating in 2027 with hands-on work in full-stack development, backend systems, and applied machine learning.",
      sameAs: [
        "https://github.com/BALASANJEEV1085",
        "https://www.linkedin.com/in/balasanjeev-c-00258b298/",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Palani",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: "Nandha Engineering College",
      },
      knowsAbout: [
        "Full-stack web development",
        "Software engineering",
        "Backend development",
        "API integration",
        "Integration engineering",
        "DevSecOps",
        "Software supply chain security",
        "Software bill of materials",
        "Java",
        "Python",
        "JavaScript",
        "Go",
        "React",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "PostgreSQL",
        "Redis",
        "Docker",
        "Machine learning",
        "Natural language processing",
        "Computer vision",
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#deptic`,
      name: "Deptic",
      applicationCategory: "DeveloperApplication",
      description:
        "A platform for GitHub dependency vulnerability scanning, automated remediation, SBOM export, and compliance reporting.",
      url: "https://deptic.netlify.app/",
      codeRepository: "https://github.com/BALASANJEEV1085/deptic",
      author: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#nandha-notes`,
      name: "Nandha Notes",
      applicationCategory: "EducationalApplication",
      description:
        "A study notes-sharing platform for students to publish and access learning materials.",
      url: "https://nandha-notes.netlify.app/",
      codeRepository: "https://github.com/BALASANJEEV1085/NANDHANOTES",
      author: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#socialplanet`,
      name: "SocialPlanet",
      applicationCategory: "SocialNetworkingApplication",
      description:
        "A full-stack social application with posting, liking, and commenting features.",
      url: "https://socialsplanet.netlify.app/",
      author: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={geist.variable}>
      <head>
        <link rel="describedby" href="/llms.txt" />
        <link rel="alternate" type="text/markdown" href="/llms-full.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
