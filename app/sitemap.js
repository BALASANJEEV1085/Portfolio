const SITE_URL = "https://balasanjeev.netlify.app";
export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
