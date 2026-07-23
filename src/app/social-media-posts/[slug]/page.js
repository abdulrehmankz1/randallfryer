import { notFound } from "next/navigation";
import SocialMediaPostDetailPage from "@/sections/pages/SocialMediaPostDetailPage";
import CarouselDetailPage from "@/sections/pages/CarouselDetailPage";
import {
  SOCIAL_POSTS,
  CAROUSELS,
  getSocialPost,
  getCarousel,
} from "@/data/socialPosts";

export function generateStaticParams() {
  return [...SOCIAL_POSTS, ...CAROUSELS].map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = getSocialPost(slug) || getCarousel(slug);
  if (!item) return { title: "Post not found" };
  return {
    title: `${item.title} Social Media Posts`,
    description: item.concept,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = getSocialPost(slug);
  if (post) return <SocialMediaPostDetailPage post={post} />;

  const carousel = getCarousel(slug);
  if (carousel) return <CarouselDetailPage carousel={carousel} />;

  return notFound();
}
