const webdriver = require('selenium-webdriver');
const { By, until } = webdriver;
const capabilities = require('./capabilities.json');


const chai = require("chai");
const expect = chai.expect;
chai.config.showDiff = true;

const watchUrl = 'https://www.farfetch.com/kz/shopping/men/rolex-cosmograph-daytona-rainbow-pre-owned-40-2013-item-18686575.aspx?storeid=13792';
const serverUrl = 'http://dimapoltoran_IjBl9W:A7pxi2zMYatbDpsC8LG6@hub-cloud.browserstack.com/wd/hub';
const itemIdOnWebPageXPath = `/html[@class='js-focus-visible']/body[@class='bob ff-body basis rebrand']/div[@id='root']/main[@id='content']/div[@class='ltr-1gvuy1w']/div[@class='ltr-iz4znq'][2]/div[@class='ltr-qnrqdc ec0lgv50']/div[@class='ltr-15zze7j e1cotvmw0']/div[@id='tabpanel-0']/div[@class='ltr-cq35i5 exjav154']/div[@class='ltr-15eja7h exjav152']/div[@class='ltr-13pqkh2 exjav150']/div[@class='ltr-92qs1a'][3]/p[@class='ltr-4y8w0i-Body e1s5vycj0'][1]/span[@class='ltr-4y8w0i-Body e1s5vycj0']`;
const itemPriceOnWebPageCssSelector = 'p.e54eo9p0'
const itemDescriptionOnWebPageCssSelector = 'p.ltr-13ze6d5-Body'
const addToBagButtonCssSelector = 'button.ltr-1oj5gxo';
const goToCarButtonCssSelector = 'a.ltr-1oj5gxo'
const itemIdOnBagPageXPath = `/html[@class='js-focus-visible']/body[@class='bob ff-body basis rebrand']/div[@id='root']/main[@id='content']/div[@class='_ee889c _a676cb']/div[@class='_a8f651']/div[@class='_a57d8d']/ul/li[@class='_b632f1']/ul[@class='_c92854']/li[@class='_f9e55c']/div[@class='_e73fa1']/div[@class='_cfd662']/div[@class='_b825c7']/p[@class='_b1d204 ltr-1gp3mca-Footnote e1s5vycj0']/span[2]`;

const itemPriceCartCssSelector = 'p.eq12nrx0'
const itemDescriptionOnCartPage = 'a.emq1nyo0';



describe("Add a Watch to the Cart test", () =>
{
  it('Should add a Watch to the Cart', async function ()
  {
    let driver = new webdriver.Builder()
      .usingServer(serverUrl)
      .withCapabilities({
        ...capabilities,
        ...capabilities['browser'] && { browserName: capabilities['browser'] }  // Because NodeJS language binding requires browserName to be defined
      })
      .build();

    await driver.get(watchUrl);
    await driver.manage().window().maximize();


    //Item page
    const itemId = await driver.findElement(By.xpath(itemIdOnWebPageXPath)).getText();
    const itemDescriprion = await driver.findElement(By.css(itemDescriptionOnWebPageCssSelector)).getText();
    const itemPrice = await driver.findElement(By.css(itemPriceOnWebPageCssSelector)).getText();

    await driver.wait(until.elementLocated(By.css(addToBagButtonCssSelector)), 5000);
    await driver.findElement(By.css(addToBagButtonCssSelector)).click();

    await driver.wait(until.elementLocated(By.css(goToCarButtonCssSelector)), 5000);
    await driver.findElement(By.css(goToCarButtonCssSelector)).click();

    //Cart Page
    const itemPriceFromCart = await driver.findElement(By.css(itemPriceCartCssSelector)).getText();
    const itmeIdFromCart = await driver.findElement(By.xpath(itemIdOnBagPageXPath)).getText();
    const itmeDescriptionFromCart = await driver.findElement(By.css(itemDescriptionOnCartPage)).getText();


    await driver.quit();



    expect(itemId).to.equal(itmeIdFromCart);
    expect(itemPrice).to.equal(itemPriceFromCart);
    expect(itemDescriprion).to.equal(itmeDescriptionFromCart);
  }).timeout(60000);
});