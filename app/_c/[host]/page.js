import About from "@/components/sections/About";
import Gallery from "@/components/sections/Gallery";
import Instructors from "@/components/sections/Instructors";
import Pricing from "@/components/sections/Pricing";
import Services from "@/components/sections/Services";
import ThemeStyle from "@/components/ThemeStyle";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Hero from "@/components/hero/Hero";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import RegistrationProvider from "@/components/registration/RegistrationProvider";
import { getGalleryByGym, getGymWebsiteByDomain, getPricingByGym, getTermsByGym } from "@/lib/api";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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

  const [pricingItems, terms, galleryItems] = await Promise.all([
    data.gym?._id ? getPricingByGym(data.gym._id) : [],
    getTermsByGym(data.gym?._id),
    getGalleryByGym(data.gym?._id),
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
          {data.gallery?.visible !== false && (
            <Gallery galleryData={data.gallery} galleryItems={galleryItems} />
          )}
          <Footer gymData={data.gym} navbarData={data.navbar} socialMedia={data.socialMedia} />
        </RegistrationProvider>
      </Suspense>
    </main>
  );
}
