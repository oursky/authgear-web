import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import CustomerStoryBody from '@/components/customer-story/CustomerStoryBody';
import { getCustomerStories, getCustomerStoryBySlug, strapiImageUrl } from '@/lib/strapi';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const res = await getCustomerStories({ pagination: { pageSize: 200 } });
    return (res.data ?? []).map((s) => ({ slug: s.attributes.slug }));
  } catch (error) {
    // During Docker build, Strapi may not be available
    // Return empty array to allow build to succeed (pages will be generated on-demand)
    console.warn('[customer-stories] Failed to generate static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await getCustomerStoryBySlug(slug);
  if (!story) return { title: 'Story Not Found' };
  return {
    title: story.attributes.title,
    description: story.attributes.excerpt,
  };
}

export default async function CustomerStoryPage({ params }: Props) {
  const { slug } = await params;
  const story = await getCustomerStoryBySlug(slug);
  if (!story) notFound();

  const {
    title,
    content,
    companyLogo,
    coverImage,
    companyIndustry,
    loginMethodsTech,
    metric1_num,
    metric1_Text,
    metric2_num,
    metric2_Text,
    metric3_num,
    metric3_Text,
  } = story.attributes;
  const logoUrl = strapiImageUrl(companyLogo);
  const coverUrl = strapiImageUrl(coverImage);

  return (
    <div className="page-wrapper">
      <section className="ds-customer-story-hero">
        {coverUrl ? (
          <>
            <div className="ds-customer-story-hero__media">
              <Image
                src={coverUrl}
                alt=""
                fill
                priority
                className="ds-customer-story-hero__img"
                sizes="100vw"
              />
            </div>
            <div className="ds-customer-story-hero__overlay" aria-hidden />
          </>
        ) : null}
        <div className="ds-customer-story-hero__inner">
          <div className="ds-container ds-container--hero">
            <div className="ds-customer-story-hero__intro">
              <p className="ds-section-eyebrow ds-section-eyebrow--on-dark">Customer Stories</p>
              <h1 className="ds-hero-banner__title">{title}</h1>
            </div>
          </div>
        </div>
      </section>

      <div className="section case-study-post">
        <div className="container-default w-container">
          <CustomerStoryBody
            content={content}
            companyLogoUrl={logoUrl}
            companyLogoAlt={title}
            companyIndustry={companyIndustry}
            loginMethodsTech={loginMethodsTech}
            metric1_num={metric1_num}
            metric1_Text={metric1_Text}
            metric2_num={metric2_num}
            metric2_Text={metric2_Text}
            metric3_num={metric3_num}
            metric3_Text={metric3_Text}
            labels={{
              industry: 'Industry',
              loginMethods: 'Login methods',
              technicalDetails: 'Technical details',
              noContent: 'No content yet.',
              metricsAriaLabel: 'Key metrics',
            }}
          />
        </div>
      </div>
    </div>
  );
}
