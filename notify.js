import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export async function sendWhatsApp(msg) {
  const phone = process.env.WHATSAPP_PHONE;
  const apikey = process.env.CALLMEBOT_APIKEY;

  const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(msg)}&apikey=${apikey}`;
  await axios.get(url);
}
