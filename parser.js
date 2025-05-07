export default function parseEmail(body) {
  // Normalize non-breaking spaces and line endings
  const cleanBody = body.replace(/\u00A0/g, ' ').replace(/\r/g, '').trim();

  // Smarter get() to handle fields with/without line breaks
  const get = (label) => {
    const regex = new RegExp(`${label}\\s*:\\s*(.*?)\\s*(\\n|$)`, 'i');
    const match = cleanBody.match(regex);
    return match ? match[1].trim() : '';
  };

  const firstName = get('First name/s');
  const lastName = get('Last name');
  const fullName = [firstName, lastName].filter(Boolean).join(' ');

  const rawAddress = get('Multi-line address');

  // More robust address parser to handle both: 
  // "Streetname 23 12345 City" and "23, Streetname 12345 City"
  let via = '', numero = '', codigoPostal = '', city = '';

  const commaSplit = rawAddress.match(/^(\d+),\s*(.*?)\s+(\d{4,5})\s+(.*?)\s+[A-Z]{2}$/i);
  const normalSplit = rawAddress.match(/^(.*?)\s+(\d+)\s+(\d{4,5})\s+(.*?)\s+[A-Z]{2}$/i);

  if (commaSplit) {
    numero = commaSplit[1];
    via = commaSplit[2];
    codigoPostal = commaSplit[3];
    city = commaSplit[4];
  } else if (normalSplit) {
    via = normalSplit[1];
    numero = normalSplit[2];
    codigoPostal = normalSplit[3];
    city = normalSplit[4];
  }

  return {
    nif: get('Passport number'),
    nombre: fullName,
    calle: 'Calle',
    via,
    numero,
    telefono: get('Phone'),
    municipio: city,
    provincia: city,
    codigoPostal,
    localidad: 'Alicante',
  };
}
