import Hero from "@/components/hero/Hero";
import Navbar from "@/components/navbar/Navbar";
import { getGymWebsiteByDomain } from "@/lib/api";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const domain = Buffer.from(params.host, "base64url").toString("utf-8");
  const data = await getGymWebsiteByDomain(domain);
  if (!data) return {};
  const name = data.navbar?.logoText || data.gym?.gymName || "Gym Website";
  return {
    title: name,
    description: `Welcome to ${name}`,
  };
}

export default async function CustomDomainPage({ params }) {
  const domain = Buffer.from(params.host, "base64url").toString("utf-8");
  const data = await getGymWebsiteByDomain(domain);
  if (!data) notFound();

  return (
    <main>
      <Navbar navbarData={data.navbar} gymData={data.gym} />
      <Hero
        heroData={data.hero}
        gymData={data.gym}
        socialMedia={data.socialMedia}
      />
    </main>
  );
}
