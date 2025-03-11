const puppeteer = require("puppeteer");
const cv = require("opencv4nodejs");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto(
    "https://www.google.com/maps/place/botafogo+campinas/data=!4m2!3m1!1s0x94c8c8a0e6d71c2f:0x3a584157fb1b4e52?sa=X&ved=1t:242&ictx=111"
  );

  // Captura screenshot específica (ajuste o zoom/área se necessário)
  await page.screenshot({
    path: "mapa.png",
    clip: { x: 0, y: 0, width: 1280, height: 720 },
  });
  // await browser.close();
})();
