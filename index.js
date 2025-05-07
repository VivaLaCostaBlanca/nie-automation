const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const parseEmail = require('./parser'); // Make sure parser.js also uses module.exports
const { fillPoliceForm } = require('./formFiller');

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
