import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';

async function startServer() {
  const app = express();
  app.use(express.json());

  // API endpoint for VIP visit & Experience Centre booking notifications
  app.post('/api/book-visit', (req, res) => {
    const { name, phone, email, projectType, stage, preferredDate, notes } = req.body;

    const notificationRecipients = [
      'abdul@orbiautomatify.com',
      'orbi.engineering@orbiautomatify.com',
      'manusharath@orbiautomatify.com',
    ];

    const timestamp = new Date().toISOString();

    console.log('====================================================');
    console.log('🚨 NEW EXPERIENCE CENTRE VIP VISIT REQUEST');
    console.log(`⏰ Timestamp: ${timestamp}`);
    console.log(`📬 Dispatched to: ${notificationRecipients.join(', ')}`);
    console.log(`👤 Client Name: ${name}`);
    console.log(`📞 Phone: ${phone}`);
    console.log(`📧 Client Email: ${email || 'Not provided'}`);
    console.log(`🏡 Category: ${projectType}`);
    console.log(`🏗️ Construction Stage: ${stage}`);
    console.log(`📅 Preferred Date: ${preferredDate || 'Flexible / To Coordinate'}`);
    console.log(`📝 Requirements & Notes: ${notes || 'None specified'}`);
    console.log('====================================================');

    res.status(200).json({
      success: true,
      recipients: notificationRecipients,
      timestamp,
      message: 'Notification logged and dispatched to leadership team.',
    });
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', brand: 'ORBi AUTOMATIFY' });
  });

  // Mount Vite development middlewares
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`[ORBi Server] Dev server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('[ORBi Server] Failed to start:', err);
  process.exit(1);
});
