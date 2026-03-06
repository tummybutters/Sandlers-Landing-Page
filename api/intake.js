export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!process.env.INTAKE_WEBHOOK_URL) {
        return res.status(500).json({ error: 'INTAKE_WEBHOOK_URL is not configured' });
    }

    try {
        const webhookResponse = await fetch(process.env.INTAKE_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body || {}),
        });

        if (!webhookResponse.ok) {
            const text = await webhookResponse.text();
            return res.status(502).json({
                error: 'Upstream webhook failed',
                status: webhookResponse.status,
                details: text.slice(0, 500),
            });
        }

        return res.status(200).json({ ok: true });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to reach intake webhook' });
    }
}
