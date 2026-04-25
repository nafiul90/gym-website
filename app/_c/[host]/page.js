import Hero from "@/components/hero/Hero";
import Navbar from "@/components/navbar/Navbar";
import { getGymWebsiteByDomain } from "@/lib/api";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const domain = Buffer.from(params.host, "base64url").toString("utf-8");
    const data = await getGymWebsiteByDomain(domain);
    if (!data) return {};
    return {
        title: data.navbar?.logoText || "Gym Website",
        description: `Welcome to ${data.navbar?.logoText || "our gym"}`,
    };
}

export default async function CustomDomainPage({ params }) {
    // params.host is base64url-encoded hostname (set by middleware)
    const domain = Buffer.from(params.host, "base64url").toString("utf-8");
    const data = await getGymWebsiteByDomain(domain);
    if (!data) notFound();

    return (
        <main>
            <Navbar data={data.navbar} />
            <Hero data={{ banners: data.hero?.banners ?? [] }} />
        </main>
    );
}
