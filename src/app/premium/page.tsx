import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/components/footer';

const features = [
  { name: 'Standard Resolution', free: true, premium: true },
  { name: 'Ad-Free Experience', free: false, premium: true },
  { name: 'High-Resolution Downloads', free: false, premium: true },
  { name: 'AI Custom Backgrounds', free: true, premium: true },
  { name: 'Unlimited Edits', free: true, premium: true },
  { name: 'Batch Processing', free: false, premium: true, soon: true },
  { name: 'Priority Support', free: false, premium: true },
];

export default function PremiumPage() {
  return (
    <>
      <div className="w-full">
        <section className="py-12 md:py-24 lg:py-32 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
              Go <span className="text-accent">Premium</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Unlock the full potential of GambarTools with our premium features. No ads, higher quality, and priority support.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4 flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="flex flex-col">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold font-headline">Free</CardTitle>
                  <CardDescription>For casual users and testing</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-4xl font-bold text-center mb-6">$0</div>
                  <ul className="space-y-3 text-muted-foreground">
                    {features.slice(0, 4).map((f) => (
                      <li key={f.name} className="flex items-center gap-2">
                        {f.free ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-red-500" />}
                        <span>{f.name}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" disabled>
                    Your Current Plan
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-2 border-accent shadow-2xl flex flex-col relative overflow-hidden">
                <div className="bg-accent text-accent-foreground text-center py-1 text-sm font-semibold">Most Popular</div>
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold font-headline">Premium Monthly</CardTitle>
                  <CardDescription>For professionals and power users</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                   <div className="text-5xl font-bold text-center mb-6">$10<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                   <ul className="space-y-3 text-foreground">
                    {features.map((f) => (
                      <li key={f.name} className="flex items-center gap-2">
                         <Check className="h-5 w-5 text-accent" />
                         <span>{f.name} {f.soon && <span className="text-xs text-accent">(Soon)</span>}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-white w-full" size="lg">
                    <Link href="/checkout">Choose Monthly</Link>
                  </Button>
                </CardFooter>
              </Card>
              
               <Card className="flex flex-col">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold font-headline">Premium Yearly</CardTitle>
                  <CardDescription>Save 20% with annual billing</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-4xl font-bold text-center mb-6">$96<span className="text-lg font-normal text-muted-foreground">/yr</span></div>
                   <ul className="space-y-3 text-muted-foreground">
                    {features.map((f) => (
                       <li key={f.name} className="flex items-center gap-2">
                         <Check className="h-5 w-5 text-accent" />
                         <span>{f.name} {f.soon && <span className="text-xs text-accent">(Soon)</span>}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                   <Button asChild variant="outline" className="w-full">
                    <Link href="/checkout">Choose Yearly</Link>
                  </Button>
                </CardFooter>
              </Card>

            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
