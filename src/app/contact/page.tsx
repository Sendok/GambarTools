import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Footer } from '@/components/footer';
import { Mail, Phone, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <div className="w-full">
        <section className="py-12 md:py-24 lg:py-32 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">Get in Touch</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              We&apos;re here to help. Contact us with any questions or feedback.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold font-headline mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold">Email</h3>
                      <p className="text-muted-foreground">
                        Our support team will get back to you within 24 hours.
                      </p>
                      <a href="mailto:tummistudio3@gmail.com" className="text-accent hover:underline">
                        tummistudio3@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold">Phone</h3>
                      <p className="text-muted-foreground">
                        For urgent inquiries, please call us.
                      </p>
                      <a href="tel:+6285791566727" className="text-accent hover:underline">
                        +62 857-9156-6727
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold">Business Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9am - 5pm
                      </p>
                       <p className="text-muted-foreground">
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold font-headline">Send us a message</CardTitle>
                  <CardDescription>Fill out the form and we will get back to you.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" placeholder="Enter your name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="Enter your email" />
                        </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Your message" rows={6} />
                    </div>
                    <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white" size="lg">
                      Submit
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
