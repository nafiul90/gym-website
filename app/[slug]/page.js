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
import WhatsAppButton from "@/components/WhatsAppButton";
import RegistrationProvider from "@/components/registration/RegistrationProvider";
import { getGalleryByGym, getGymWebsiteBySlug, getPricingByGym, getTermsByGym } from "@/lib/api";
import { IMAGE_URL } from "@/lib/constants";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const data = await getGymWebsiteBySlug(params.slug);
  if (!data) return {};

  const name = data.meta?.title || data.navbar?.logoText || data.gym?.gymName || "Gym Website";
  const description = data.meta?.description || `Welcome to ${name}`;
  const ogImage = data.meta?.ogImage ? `${IMAGE_URL}/${data.meta.ogImage}` : null;
  const favicon = data.meta?.favicon
    ? `${IMAGE_URL}/${data.meta.favicon}`
    : data.gym?.logo
    ? `${IMAGE_URL}/${data.gym.logo}`
    : null;

  return {
    title: name,
    description,
    ...(ogImage && { openGraph: { images: [{ url: ogImage }] } }),
    ...(favicon && { icons: { icon: favicon } }),
  };
}

export default async function SlugPage({ params }) {
  const data = await getGymWebsiteBySlug(params.slug);
  if (!data) notFound();

  const [pricingItems, terms, galleryItems] = await Promise.all([
    data.gym?._id ? getPricingByGym(data.gym._id) : [],
    getTermsByGym(data.gym?._id),
    getGalleryByGym(data.gym?._id),
  ]);

  const showHero = data.hero?.visible !== false;

  return (
    <main>
      <ThemeStyle theme={data.theme} />
      <Suspense>
        <RegistrationProvider gymData={data.gym} termsContent={terms?.content ?? null}>
          <Navbar navbarData={data.navbar} gymData={data.gym} navbarBg={data.theme?.navbarBg} />

          {showHero && (
            <Hero heroData={data.hero} gymData={data.gym} socialMedia={data.socialMedia} />
          )}

          {/* Scrolling content card — slides over the sticky hero */}
          <div className={showHero ? "relative z-10 shadow-[0_-12px_40px_rgba(0,0,0,0.7)]" : ""}>
            <div className={showHero ? "bg-primary-dark-900 rounded-t-[2rem] overflow-hidden" : ""}>
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
            </div>
          </div>

          <WhatsAppButton whatsapp={data.whatsapp} />
        </RegistrationProvider>
      </Suspense>
    </main>
  );
}
