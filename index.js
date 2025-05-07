const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const parseEmail = require('./parser');
const fillForm = require('./fillForm');

dotenv.config();

const app = express();
app.use(bodyParser.text());

app.post('/process', async (req, res) => {
  try {
    const emailBody = req.body;
    const clientData = parseEmail(emailBody);
    console.log('📦 Parsed Data:', clientData);

    const fileUrl = await fillForm(clientData);
    res.status(200).send(`✅ Form filled and uploaded: ${fileUrl}`);
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).send('Something went wrong.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

