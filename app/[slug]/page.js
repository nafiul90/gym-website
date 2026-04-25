import About from "@/components/sections/About";
import Instructors from "@/components/sections/Instructors";
import Pricing from "@/components/sections/Pricing";
import Services from "@/components/sections/Services";
import ThemeStyle from "@/components/ThemeStyle";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Hero from "@/components/hero/Hero";
import Navbar from "@/components/navbar/Navbar";
import RegistrationProvider from "@/components/registration/RegistrationProvider";
import { getGymWebsiteBySlug, getPricingByGym, getTermsByGym } from "@/lib/api";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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

  const [pricingItems, terms] = await Promise.all([
    data.gym?._id ? getPricingByGym(data.gym._id) : [],
    getTermsByGym(data.gym?._id),
  ]);

  return (
    <main>
      <ThemeStyle theme={data.theme} />
      <Suspense>
        <RegistrationProvider gymData={data.gym} termsContent={terms?.content ?? null}>
          <Navbar navbarData={data.navbar} gymData={data.gym} navbarBg={data.theme?.navbarBg} />
          {data.hero?.visible !== false && (
            <Hero heroData={data.hero} gymData={data.gym} socialMedia={data.socialMedia} />
          )}
          {data.whyChooseUs?.visible !== false && (
            <WhyChooseUs whyChooseUsData={data.whyChooseUs} />
          )}
          {data.about?.visible !== false && (
            <About aboutData={data.about} />
          )}
          {data.services?.visible !== false && (
            <Services servicesData={data.services} />
          )}
          {data.instructors?.visible !== false && (
            <Instructors instructorsData={data.instructors} />
          )}
          {data.pricing?.visible !== false && (
            <Pricing pricingData={data.pricing} pricingItems={pricingItems} />
          )}
        </RegistrationProvider>
      </Suspense>
    </main>
  );
}
