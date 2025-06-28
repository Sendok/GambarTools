'use client';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const db = getFirestore();

export default function BillingPage() {
  const [user, setUser] = useState<any>(null);
  const [billingPlan, setBillingPlan] = useState('free');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      if (!u) router.push('/login');
      setUser(u);
      if (u) {
        const userDoc = await getDoc(doc(db, 'users', u.uid));
        setBillingPlan(userDoc.exists() ? userDoc.data().billingPlan : 'free');
      }
      setLoading(false);
    });
    return () => unsub();
  }, [router]);

  // Simulasi proses payment (ganti dengan payment gateway asli)
  const handleCheckout = async () => {
    if (!user) return;
    // TODO: Integrasi payment gateway di sini
    // Setelah sukses, update Firestore:
    await updateDoc(doc(db, 'users', user.uid), {
      billingPlan: 'premium_onetime',
      billingUpdatedAt: new Date(),
    });
    setBillingPlan('premium_onetime');
    alert('Payment successful! Your plan is now upgraded.');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Billing Plan</h1>
      <div className="mb-6">
        <span className="font-semibold">Current Plan: </span>
        <span className={
          billingPlan === 'free'
            ? 'text-yellow-600'
            : 'text-green-600'
        }>
          {billingPlan === 'free'
            ? 'Free'
            : 'Premium (One Time Payment)'}
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <Button
          className="bg-cyan-500 hover:bg-cyan-600 text-white"
          disabled={billingPlan === 'premium_onetime'}
          onClick={handleCheckout}
        >
          {billingPlan === 'premium_onetime' ? 'Active' : 'Upgrade to Premium ($10 One Time)'}
        </Button>
      </div>
    </div>
  );
}