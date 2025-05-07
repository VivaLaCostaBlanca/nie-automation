// listLabels.js
import { google } from 'googleapis';
import { authenticate } from './auth.js';

(async () => {
  const auth = await authenticate();
  const gmail = google.gmail({ version: 'v1', auth });

  const res = await gmail.users.labels.list({ userId: 'me' });
  console.log('📋 Available labels:');
  res.data.labels.forEach(label => {
    console.log(`- ${label.name} (ID: ${label.id})`);
  });
})();
