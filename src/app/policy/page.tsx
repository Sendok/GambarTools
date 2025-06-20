import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Footer } from '@/components/footer';

export default function PolicyPage() {
  const PlaceholderText = () => (
    <div className="space-y-4 text-muted-foreground">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
      </p>
      <p>
        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.
      </p>
      <h3 className="text-xl font-semibold text-foreground pt-4">1. Information We Collect</h3>
      <p>
        Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti.
      </p>
       <h3 className="text-xl font-semibold text-foreground pt-4">2. How We Use Your Information</h3>
      <p>
        Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui.
      </p>
    </div>
  );

  return (
    <>
      <div className="w-full">
         <section className="py-12 md:py-24 lg:py-32 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">Legal Documents</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Our Privacy Policy and Terms of Service.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4">
             <Card>
                <CardContent className="p-6 md:p-10">
                    <Tabs defaultValue="privacy">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
                            <TabsTrigger value="terms">Terms of Service</TabsTrigger>
                        </TabsList>
                        <TabsContent value="privacy" className="pt-8">
                            <CardHeader className="p-0 mb-6">
                                <CardTitle className="text-3xl font-headline">Privacy Policy</CardTitle>
                                <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
                            </CardHeader>
                            <PlaceholderText />
                        </TabsContent>
                        <TabsContent value="terms" className="pt-8">
                            <CardHeader className="p-0 mb-6">
                                <CardTitle className="text-3xl font-headline">Terms of Service</CardTitle>
                                <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
                            </CardHeader>
                            <PlaceholderText />
                        </TabsContent>
                    </Tabs>
                </CardContent>
             </Card>
          </div>
        </section>
      </div>
       <Footer />
    </>
  );
}
