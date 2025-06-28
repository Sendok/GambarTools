'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle } from 'lucide-react';
import { Footer } from '@/components/footer';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { auth } from '@/lib/firebase';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const db = getFirestore();

export default function CheckoutPage() {
	const features = [
		'Ad-free experience',
		'High-resolution downloads',
		'Batch processing (coming soon)',
		'Priority support',
	];

	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		const unsub = auth.onAuthStateChanged(setUser);
		return () => unsub();
	}, []);

	useEffect(() => {
		if (!window.snap) {
			const script = document.createElement('script');
			script.src = 'https://app.midtrans.com/snap/snap.js';
			script.setAttribute('data-client-key', 'MIDTRANS_CLIENT_KEY_ANDA');
			script.async = true;
			document.body.appendChild(script);
		}
	}, []);

	// Ganti dengan client-id PayPal Anda
	const PAYPAL_CLIENT_ID = 'ARuW5fjQnXVs5No8AH6RxZqRWEtofod9ie7aId6rNw4l6wPHsR0J39lyPIzn135jzoliypcmJGUS1xwk';

	// Logic setelah pembayaran sukses
	const handleApprove = async () => {
		if (!user) return;
		// Pastikan dokumen user ada
		const userDocRef = doc(db, 'users', user.uid);
		const userDoc = await getDoc(userDocRef);
		if (!userDoc.exists()) {
			await setDoc(userDocRef, {
				email: user.email,
				displayName: user.displayName,
				billingPlan: 'premium_onetime',
				createdAt: new Date(),
				billingUpdatedAt: new Date(),
			});
		} else {
			await setDoc(
				userDocRef,
				{
					billingPlan: 'premium_onetime',
					billingUpdatedAt: new Date(),
				},
				{ merge: true }
			);
		}
		alert('Payment successful! Your account is now Premium.');
		window.location.href = '/profile/billing';
	};

	return (
		<>
			<div className="w-full bg-secondary/30">
				<div className="container mx-auto px-4 py-12 md:py-24 flex items-center justify-center">
					<Card className="w-full max-w-2xl shadow-2xl">
						<CardHeader className="text-center p-8">
							<CardTitle className="text-3xl font-bold font-headline">
								Complete Your Purchase
							</CardTitle>
							<CardDescription className="text-lg text-muted-foreground">
								Unlock all premium features of GambarTools with a one-time payment.
								Enjoy lifetime access—no subscription, no recurring fees!
							</CardDescription>
						</CardHeader>
						<CardContent className="p-8">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								<div>
									<h3 className="text-xl font-semibold mb-4">Premium Plan</h3>
									<div className="flex items-baseline gap-2">
										<span className="text-4xl font-bold">$10</span>
										<span className="text-muted-foreground">/ one time</span>
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
										<span>Premium Plan (Lifetime)</span>
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
								<h3 className="text-xl font-semibold mb-4 text-center">
									Pay Securely with PayPal
								</h3>
								<div className="space-y-4 flex flex-col items-center">
									{/* PayPal */}
									<PayPalScriptProvider
										options={{ 'client-id': PAYPAL_CLIENT_ID, currency: 'USD' }}
									>
										<div className="w-full flex justify-center">
											<div className="w-full max-w-xs md:max-w-sm">
												<PayPalButtons
													style={{
														layout: 'vertical',
														color: 'gold',
														shape: 'rect',
														label: 'paypal',
														height: 48,
														tagline: false,
													}}
													className="w-full"
													createOrder={(data, actions) => {
														return actions.order.create({
															purchase_units: [
																{
																	amount: { value: '10.00' },
																	description: 'GambarTools Premium Lifetime Access',
																},
															],
														});
													}}
													onApprove={async (data, actions) => {
														await actions.order?.capture();
														await handleApprove();
													}}
												/>
											</div>
										</div>
									</PayPalScriptProvider>
									<p className="text-center text-xs text-muted-foreground mt-2">
										All payments are secure and encrypted.
									</p>
								</div>
							</div>
						</CardContent>
						<CardFooter className="bg-secondary/50 p-4 text-center">
							<p className="text-xs text-muted-foreground w-full">
								By completing your purchase, you agree to our Terms of Service. This
								is a one-time payment for lifetime access. No recurring charges.
							</p>
						</CardFooter>
					</Card>
				</div>
			</div>
			<Footer />
		</>
	);
}
