import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CreditCard, CheckCircle } from 'lucide-react';
import { Footer } from '@/components/footer';

export default function CheckoutPage() {
  const features = [
    'Ad-free experience',
    'High-resolution downloads',
    'Batch processing (coming soon)',
    'Priority support',
  ];

  return (
    <>
      <div className="w-full bg-secondary/30">
        <div className="container mx-auto px-4 py-12 md:py-24 flex items-center justify-center">
          <Card className="w-full max-w-2xl shadow-2xl">
            <CardHeader className="text-center p-8">
              <CardTitle className="text-3xl font-bold font-headline">Complete Your Purchase</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Unlock all premium features of EditClean.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Premium Plan</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">$10</span>
                    <span className="text-muted-foreground">/ month</span>
                  </div>
                   <ul className="space-y-3 mt-6 text-muted-foreground">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-accent" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card rounded-lg p-6 border">
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                  <div className="flex justify-between items-center">
                    <span>Premium Plan (Monthly)</span>
                    <span>$10.00</span>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total</span>
                    <span>$10.00 USD</span>
                  </div>
                </div>
              </div>

               <Separator className="my-8" />

              <div>
                <h3 className="text-xl font-semibold mb-4 text-center">Select Payment Method</h3>
                 <div className="space-y-4">
                    <Button size="lg" className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white">
                        <CreditCard className="mr-2"/>
                        Pay with Card (Stripe)
                    </Button>
                     <Button size="lg" variant="outline" className="w-full h-14 bg-black text-white hover:bg-gray-800 hover:text-white border-white/20">
                        Pay with Apple / Google Pay
                    </Button>
                    <Button size="lg" className="w-full h-14 bg-[#00457C] hover:bg-[#003057] text-white">
                         Pay with PayPal
                    </Button>
                    <p className="text-center text-xs text-muted-foreground mt-2">
                        All payments are secure and encrypted.
                    </p>
                </div>
              </div>
            </CardContent>
             <CardFooter className="bg-secondary/50 p-4 text-center">
                 <p className="text-xs text-muted-foreground w-full">
                    By completing your purchase, you agree to our Terms of Service. You can cancel your subscription at any time.
                 </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
