const SITE_URL = "https://balasanjeev.netlify.app";
export const dynamic = "force-static";

const PORTFOLIO_IMAGES = [
  "/assets/project1.png",
  "/assets/project2.png",
  "/assets/project3.png",
  "/assets/project4.png",
  "/assets/astronova.png",
  "/assets/innovation.png",
];

export default function sitemap() {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: "2026-10-14",
      changeFrequency: "monthly",
      priority: 1,
      images: PORTFOLIO_IMAGES.map((path) => `${SITE_URL}${path}`),
    },
  ];
}
