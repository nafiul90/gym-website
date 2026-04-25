import Hero from "@/components/hero/Hero";
import Navbar from "@/components/navbar/Navbar";
import { getGymWebsiteBySlug } from "@/lib/api";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const data = await getGymWebsiteBySlug(params.slug);
  if (!data) return {};
  const name = data.navbar?.logoText || data.gym?.gymName || "Gym Website";
  return {
    title: name,
    description: `Welcome to ${name}`,
  };
}

export default async function SlugPage({ params }) {
  const data = await getGymWebsiteBySlug(params.slug);
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
