import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import parseEmail from './parser.js';
import fillForm from './formFiller.js'; // <-- this matches your actual filename

dotenv.config();

const app = express();
app.use(bodyParser.text());

app.post('/process', async (req, res) => {
  try {
    const emailBody = req.body;
    const clientData = parseEmail(emailBody);
    console.log('📦 Parsed Data:', clientData);

    await fillPoliceForm(clientData); // this doesn't return fileUrl yet
    res.status(200).send('✅ Police form filled.');
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).send('Something went wrong.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
