import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import parseEmail from './parser.js';
import fillForm from './fillForm.js';

dotenv.config();

const app = express();
app.use(bodyParser.text()); // we expect raw email content as plain text

app.post('/process', async (req, res) => {
  try {
    const emailBody = req.body;
    const clientData = parseEmail(emailBody);
    console.log('📦 Parsed Data:', clientData);

    const fileUrl = await fillForm(clientData); // creates filled PDF and returns URL
    res.status(200).send(`✅ Form filled and uploaded: ${fileUrl}`);
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).send('Something went wrong.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
