import { notFound } from "next/navigation";
import SocialMediaPostDetailPage from "@/sections/pages/SocialMediaPostDetailPage";
import { SOCIAL_POSTS, getSocialPost } from "@/data/socialPosts";

export function generateStaticParams() {
  return SOCIAL_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getSocialPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} — Social Media Posts`,
    description: post.concept,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = getSocialPost(slug);
  if (!post) return notFound();
  return <SocialMediaPostDetailPage post={post} />;
}
