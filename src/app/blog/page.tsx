import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    title: '5 Tips to Make Your Product Photos Pop',
    description: 'Learn how to take your e-commerce photos from good to great with these simple tips.',
    image: 'https://placehold.co/600x400.png',
    hint: 'photography tips',
    slug: '5-tips-product-photos',
  },
  {
    title: 'Why AI is a Game-Changer for Small Businesses',
    description: 'Discover how artificial intelligence can level the playing field for UMKM and small enterprises.',
    image: 'https://placehold.co/600x400.png',
    hint: 'business technology',
    slug: 'ai-for-small-business',
  },
  {
    title: 'Our New Feature: AI-Powered Backgrounds',
    description: 'We are excited to launch our new AI background generator. Here is how it works.',
    image: 'https://placehold.co/600x400.png',
    hint: 'artificial intelligence',
    slug: 'feature-ai-backgrounds',
  },
   {
    title: 'Choosing the Right Colors for Your Brand',
    description: 'Color psychology is key. Learn how to pick colors that resonate with your target audience.',
    image: 'https://placehold.co/600x400.png',
    hint: 'color palette',
    slug: 'brand-colors',
  },
  {
    title: 'How to Optimize Images for Shopee and Tokopedia',
    description: 'A step-by-step guide to resizing and formatting your images for major e-commerce platforms.',
    image: 'https://placehold.co/600x400.png',
    hint: 'ecommerce optimization',
    slug: 'optimize-images-ecommerce',
  },
  {
    title: 'The Ultimate Guide to Product Photography Lighting',
    description: 'Master lighting to create professional-looking product shots with any camera.',
    image: 'https://placehold.co/600x400.png',
    hint: 'photo lighting',
    slug: 'product-photography-lighting',
  },
];

export default function BlogPage() {
  return (
    <>
      <div className="w-full">
        <section className="py-12 md:py-24 lg:py-32 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">EditClean Blog</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Tips, tricks, and updates to help you create stunning product photos.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.slug} className="overflow-hidden flex flex-col group">
                  <CardHeader className="p-0">
                     <div className="aspect-video overflow-hidden">
                        <Image
                            src={post.image}
                            alt={post.title}
                            width={600}
                            height={400}
                            data-ai-hint={post.hint}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <CardTitle className="text-xl font-bold font-headline mb-2">{post.title}</CardTitle>
                    <CardDescription className="text-muted-foreground flex-grow">{post.description}</CardDescription>
                     <Link href="#" className="flex items-center gap-2 mt-4 text-accent font-semibold">
                      Read More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
