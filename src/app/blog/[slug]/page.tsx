import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '../blogData';

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) return notFound();

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Link href="/blog" className="text-accent hover:underline mb-8 inline-block">&larr; Back to Blog</Link>
      <div className="mb-8">
        <Image
          src={post.image}
          alt={post.title}
          width={800}
          height={400}
          className="rounded-lg w-full object-cover"
        />
      </div>
      <h1 className="text-4xl font-bold font-headline mb-4">{post.title}</h1>
      <p className="text-muted-foreground mb-6">{post.description}</p>
      <div className="prose max-w-none">
        {post.content}
      </div>
    </div>
  );
}