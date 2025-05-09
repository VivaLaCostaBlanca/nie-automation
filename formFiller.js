import { Builder, By } from 'selenium-webdriver';
import * as firefox from 'selenium-webdriver/firefox.js';

export async function fillPoliceForm(data) {
  const options = new firefox.Options()
    .addArguments('-headless') // ✅ Use this instead of .headless()
    .addArguments('--no-sandbox')
    .addArguments('--disable-dev-shm-usage');

  const driver = await new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options)
    .build();

  const safeSend = async (id, value) => {
    if (value) {
      try {
        const element = await driver.findElement(By.id(id));
        await element.sendKeys(value);
      } catch (err) {
        console.warn(`⚠️ Could not fill field ${id}:`, err.message);
      }
    } else {
      console.warn(`⚠️ Skipping empty field: ${id}`);
    }
  };

  try {
    await driver.get('https://sede.policia.gob.es/Tasa790_012/ImpresoRellenar');

    await safeSend('nif', data.nif);
    await safeSend('nombre', data.nombre);
    await safeSend('calle', data.calle);
    await safeSend('via', data.via);
    await safeSend('numero', data.numero);
    await safeSend('telefono', data.telefono);
    await safeSend('municipio', data.municipio);
    await safeSend('provincia', data.provincia);
    await safeSend('codigoPostal', data.codigoPostal);
    await safeSend('localidad', data.localidad);

    try {
      await driver.findElement(By.id('tasa21Input')).click();
      await driver.findElement(By.id('efectivo')).click();
    } catch (err) {
      console.warn(`⚠️ Could not click tasa or efectivo:`, err.message);
    }

    console.log('✅ Form filled. Please complete CAPTCHA manually.');
    await driver.sleep(180000); // Wait 3 minutes
  } catch (err) {
    console.error('❌ Error filling form:', err);
  } finally {
    await driver.quit();
  }
}


