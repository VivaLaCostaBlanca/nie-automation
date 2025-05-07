// gmail.js
import { google } from 'googleapis';
import { authenticate } from './auth.js';

const LABEL_ID = 'Label_8884046793287535807'; // <- Replace with the real ID

export async function getLatestClientData() {
  const auth = await authenticate();
  const gmail = google.gmail({ version: 'v1', auth });

  const res = await gmail.users.messages.list({
    userId: 'me',
    labelIds: [LABEL_ID], // ✅ Now using the correct ID
    q: 'subject:"NIE to go NEW got a new submission"',
    maxResults: 1,
  });


  const message = res.data.messages?.[0];
  if (!message) throw new Error('No matching email found');

  const msgRes = await gmail.users.messages.get({
    userId: 'me',
    id: message.id,
    format: 'full',
  });

  const bodyPart = msgRes.data.payload.parts?.find(
    (part) => part.mimeType === 'text/plain'
  );

  const bodyData = bodyPart?.body?.data;
  if (!bodyData) throw new Error('Could not read email body');

  const decodedBody = Buffer.from(bodyData, 'base64').toString('utf-8');
  return decodedBody;
}
