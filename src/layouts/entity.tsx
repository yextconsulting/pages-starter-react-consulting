import type { TemplateRenderProps, LocationProfile } from "src/types/entities";
import { LazyLoadWrapper } from "src/components/common/LazyLoadWrapper";
import { AnalyticsScopeProvider } from "@yext/pages/components";

import About from "src/components/entity/About";
import Banner from "src/components/entity/Banner";
import Breadcrumbs from "src/components/common/Breadcrumbs";
import Core from "src/components/entity/Core";
import Events from "src/components/entity/Events";
import FAQs from "src/components/entity/FAQs";
import Gallery from "src/components/entity/Gallery";
import Hero from "src/components/entity/Hero";
import Insights from "src/components/entity/Insights";
import Nearby from "src/components/entity/Nearby";
import Products from "src/components/entity/Products";
import Promo from "src/components/entity/Promo";
import Reviews from "src/components/entity/Reviews";
import Team from "src/components/entity/Team";

interface EntityLayoutProps {
  data: TemplateRenderProps<LocationProfile>;
}

const EntityLayout = ({ data }: EntityLayoutProps) => {
  const {
    id,
    geocodedCoordinate,
    name,
    address,
    description,
    hours,
    photoGallery,
    c_bannerSection: banner,
    c_heroSection: hero,
    c_promoSection: promo,
    c_featuredProductsSection: products,
    c_aboutSection: about,
    c_gallerySection: gallery,
    c_teamSection: team,
    c_faqSection: faq,
    c_nearbySection: nearby,
    c_eventsSection: events,
    c_insightsSection: insights,
    c_reviewsSection: reviews,
    dm_directoryParents: directoryParents,
  } = data.document;

  const showBanner = banner?.text && banner?.image;
  const showPromo = promo?.title && promo?.image;
  const showProducts = products?.title && products?.products;
  const showAbout = about?.title && (about.description || description);
  const showGallery = gallery?.images || photoGallery;
  const showTeam = team?.title && team?.team;
  const showFAQ = faq?.title && faq?.faqs;
  const showEvents = events?.title && events.events;
  const showInsights = insights?.title && insights?.insights;
  const showReviews = reviews?.title && reviews?.reviews;

  return (
    <>
      {showBanner && (
        <AnalyticsScopeProvider name="banner">
          <Banner text={banner.text} image={banner.image} />
        </AnalyticsScopeProvider>
      )}
      <AnalyticsScopeProvider name="breadcrumbs">
        <Breadcrumbs
          breadcrumbs={directoryParents || []}
          separator="/"
          className="container"
          addAnalytics={true}
        />
      </AnalyticsScopeProvider>
      <AnalyticsScopeProvider name="hero">
        <Hero
          name={name}
          cta1={hero?.cta1}
          cta2={hero?.cta2}
          address={address}
          background={hero?.background}
          hours={hours}
          numReviews={21}
          rating={4.5}
        />
      </AnalyticsScopeProvider>
      <AnalyticsScopeProvider name="core">
        <Core profile={data.document} />
      </AnalyticsScopeProvider>
      {showPromo && (
        <AnalyticsScopeProvider name="promo">
          <Promo
            title={promo.title}
            description={promo.description}
            image={promo.image}
            cta={promo.cta}
            googlePlayUrl={promo.googlePlayUrl}
            appStoreUrl={promo.appStoreUrl}
          />
        </AnalyticsScopeProvider>
      )}
      {showProducts && (
        <AnalyticsScopeProvider name="products">
          <Products title={products.title} items={products.products} />
        </AnalyticsScopeProvider>
      )}
      {showEvents && (
        <AnalyticsScopeProvider name="events">
          <Events title={events.title} items={events.events} />
        </AnalyticsScopeProvider>
      )}
      {showAbout && (
        <AnalyticsScopeProvider name="about">
          <About
            title={about.title}
            image={about.image}
            description={about.description || description}
            cta={about.cta}
          />
        </AnalyticsScopeProvider>
      )}
      {showInsights && (
        <AnalyticsScopeProvider name="insights">
          <Insights
            title={insights.title}
            cta={insights.cta}
            insights={insights.insights}
          />
        </AnalyticsScopeProvider>
      )}
      {showGallery && (
        <AnalyticsScopeProvider name="gallery">
          <Gallery
            title={gallery?.title}
            images={gallery?.images || photoGallery}
          />
        </AnalyticsScopeProvider>
      )}
      {showTeam && (
        <AnalyticsScopeProvider name="team">
          <Team title={team.title} team={team.team} initialSize={3} />
        </AnalyticsScopeProvider>
      )}
      {showFAQ && (
        <AnalyticsScopeProvider name="faqs">
          <FAQs title={faq.title} faqs={faq.faqs} />
        </AnalyticsScopeProvider>
      )}
      {showReviews && (
        <AnalyticsScopeProvider name="reviews">
          <Reviews
            title={reviews.title}
            reviews={reviews.reviews}
            name={name}
          />
        </AnalyticsScopeProvider>
      )}
      <LazyLoadWrapper>
        <AnalyticsScopeProvider name="nearby">
          <Nearby
            title={nearby?.title}
            linkToLocator={nearby?.linkToLocator}
            buttonText={nearby?.cta?.label}
            buttonLink={nearby?.cta?.link}
            geocodedCoordinate={geocodedCoordinate}
            id={id}
          />
        </AnalyticsScopeProvider>
      </LazyLoadWrapper>
    </>
  );
};

export default EntityLayout;
