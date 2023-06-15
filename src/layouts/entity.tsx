import type { TemplateRenderProps, LocationProfile } from "src/types/entities";
import { LazyLoadWrapper } from "src/components/common/LazyLoadWrapper";
import ErrorBoundaryWithAnalytics from "src/components/common/ErrorBoundaryWithAnalytics";

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
    yextDisplayCoordinate,
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
        <ErrorBoundaryWithAnalytics name="banner">
          <Banner text={banner.text} image={banner.image} />
        </ErrorBoundaryWithAnalytics>
      )}
      <ErrorBoundaryWithAnalytics name="breadcrumbs">
        <Breadcrumbs
          breadcrumbs={directoryParents || []}
          separator="/"
          className="container"
          addAnalytics={true}
        />
      </ErrorBoundaryWithAnalytics>
      <ErrorBoundaryWithAnalytics name="hero">
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
      </ErrorBoundaryWithAnalytics>
      <ErrorBoundaryWithAnalytics name="core">
        <Core profile={data.document} />
      </ErrorBoundaryWithAnalytics>
      {showPromo && (
        <ErrorBoundaryWithAnalytics name="promo">
          <Promo
            title={promo.title}
            description={promo.description}
            image={promo.image}
            cta={promo.cta}
            googlePlayUrl={promo.googlePlayUrl}
            appStoreUrl={promo.appStoreUrl}
          />
        </ErrorBoundaryWithAnalytics>
      )}
      {showProducts && (
        <ErrorBoundaryWithAnalytics name="products">
          <Products title={products.title} items={products.products} />
        </ErrorBoundaryWithAnalytics>
      )}
      {showEvents && (
        <ErrorBoundaryWithAnalytics name="events">
          <Events title={events.title} items={events.events} />
        </ErrorBoundaryWithAnalytics>
      )}
      {showAbout && (
        <ErrorBoundaryWithAnalytics name="about">
          <About
            title={about.title}
            image={about.image}
            description={about.description || description}
            cta={about.cta}
          />
        </ErrorBoundaryWithAnalytics>
      )}
      {showInsights && (
        <ErrorBoundaryWithAnalytics name="insights">
          <Insights
            title={insights.title}
            cta={insights.cta}
            insights={insights.insights}
          />
        </ErrorBoundaryWithAnalytics>
      )}
      {showGallery && (
        <ErrorBoundaryWithAnalytics name="gallery">
          <Gallery
            title={gallery?.title}
            images={gallery?.images || photoGallery}
          />
        </ErrorBoundaryWithAnalytics>
      )}
      {showTeam && (
        <ErrorBoundaryWithAnalytics name="team">
          <Team title={team.title} team={team.team} initialSize={3} />
        </ErrorBoundaryWithAnalytics>
      )}
      {showFAQ && (
        <ErrorBoundaryWithAnalytics name="faqs">
          <FAQs title={faq.title} faqs={faq.faqs} />
        </ErrorBoundaryWithAnalytics>
      )}
      {showReviews && (
        <ErrorBoundaryWithAnalytics name="reviews">
          <Reviews
            title={reviews.title}
            reviews={reviews.reviews}
            name={name}
          />
        </ErrorBoundaryWithAnalytics>
      )}
      <LazyLoadWrapper>
        <ErrorBoundaryWithAnalytics name="nearby">
          <Nearby
            title={nearby?.title}
            linkToLocator={nearby?.linkToLocator}
            buttonText={nearby?.cta?.label}
            buttonLink={nearby?.cta?.link}
            coordinate={yextDisplayCoordinate}
            id={id}
          />
        </ErrorBoundaryWithAnalytics>
      </LazyLoadWrapper>
    </>
  );
};

export default EntityLayout;
