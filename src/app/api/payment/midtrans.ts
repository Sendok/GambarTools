import type { NextApiRequest, NextApiResponse } from 'next';
import midtransClient from 'midtrans-client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, name, userId } = req.body;

  // Ganti dengan server key Anda di .env.local
  const snap = new midtransClient.Snap({
    isProduction: true, // ganti false jika masih sandbox
    serverKey: process.env.MIDTRANS_SERVER_KEY!,
  });

  const parameter = {
    transaction_details: {
      order_id: 'ORDER-' + Date.now(),
      gross_amount: 10000, // 10.000 IDR (ganti sesuai harga Anda)
    },
    customer_details: {
      first_name: name,
      email,
      user_id: userId,
    },
    item_details: [
      {
        id: 'premium_onetime',
        price: 10000,
        quantity: 1,
        name: 'GambarTools Premium Lifetime',
      },
    ],
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    res.status(200).json({ token: transaction.token });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create transaction' });
  }
}