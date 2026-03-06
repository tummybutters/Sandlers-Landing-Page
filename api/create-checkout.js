import Stripe from 'stripe';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PRICE_ID) {
        return res.status(500).json({ error: 'Server configuration error' });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const {
        businessName,
        contactEmail,
        phoneNumber,
        businessAddress,
        domain1,
        domain2,
        domain3,
        businessDescription,
        serviceArea,
        primaryColor,
        secondaryColor,
        preferredContact,
    } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID,
                    quantity: 1,
                },
            ],
            payment_intent_data: {
                metadata: {
                    businessName: businessName || '',
                    phoneNumber: phoneNumber || '',
                    businessAddress: businessAddress || '',
                    domain1: domain1 || '',
                    domain2: domain2 || '',
                    domain3: domain3 || '',
                    businessDescription: (businessDescription || '').slice(0, 500),
                    serviceArea: serviceArea || '',
                    primaryColor: primaryColor || '',
                    secondaryColor: secondaryColor || '',
                    preferredContact: preferredContact || '',
                },
            },
            customer_email: contactEmail || undefined,
            success_url: `${process.env.BASE_URL}/?success=true`,
            cancel_url: `${process.env.BASE_URL}/`,
        });

        res.status(200).json({ url: session.url });
    } catch (err) {
        console.error('Stripe error:', err.message);
        res.status(500).json({ error: 'Could not create checkout session' });
    }
}
