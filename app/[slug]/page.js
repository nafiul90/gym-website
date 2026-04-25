import Hero from "@/components/hero/Hero";
import Navbar from "@/components/navbar/Navbar";
import { getGymWebsiteBySlug } from "@/lib/api";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const data = await getGymWebsiteBySlug(params.slug);
  if (!data) return {};
  return {
    title: data.navbar?.logoText || "Gym Website",
    description: `Welcome to ${data.navbar?.logoText || "our gym"}`,
  };
}

export default async function SlugPage({ params }) {
  const data = await getGymWebsiteBySlug(params.slug);
  if (!data) notFound();

  return (
    <main>
      <Navbar data={data.navbar} />
      <Hero data={{ banners: data.hero?.banners ?? [] }} />
    </main>
  );
}
