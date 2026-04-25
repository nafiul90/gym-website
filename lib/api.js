import { GYM_WEBSITE_API_URL, WEBSITE_PRICING_ITEMS_API_URL } from "./constants";

export async function getGymWebsiteBySlug(slug) {
  const res = await fetch(`${GYM_WEBSITE_API_URL}/by-slug/${slug}`, {
    next: { revalidate: 60 },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export async function getGymWebsiteByDomain(domain) {
  const res = await fetch(
    `${GYM_WEBSITE_API_URL}/by-domain?domain=${encodeURIComponent(domain)}`,
    { next: { revalidate: 60 } },
  );
  if (!res.ok) return null;
  return res.json();
}

export async function getPricingByGym(gymId) {
  const res = await fetch(
    `${WEBSITE_PRICING_ITEMS_API_URL}/public?gym=${gymId}&active=true`,
    { next: { revalidate: 60 } },
  );
  if (!res.ok) return [];
  return res.json();
}
