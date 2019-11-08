// import the Puppeteer library in our script
const puppeteer = require('puppeteer');

// chrome settings we would put in the browser launch but it's giing me an error
const chromeOptions = {
    executablePath:'google-chrome',
    slowMo: 10,
    //headless:false // in order to see chrome
 };

 (async () => {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.setViewport({width:1535, height:756}); //larger viewport is unnecessary
   
    await page.goto('http://localhost:8080');
    await page.screenshot({path:'home.png'});
   // take a ss of the register facility page
    await page.goto('http://localhost:8080/register', {waitUntil: 'networkidle2'}); //networkidle2 means 'wait until everything loads'
    await page.screenshot({path:'home.png', fullsceen: true});
    await page.waitFor(2000);

    // waits for page page
    //await page.waitForSelector('#input-12');
    
    //focuses the element for inputting a facility name
    await page.focus('#input-12');
    await page.keyboard.type("test facility");
    await page.screenshot({path:'fName.png', fullsceen: true});
    //await page.waitFor(1000); // wait a second

    await page.focus('#input-15');
    await page.keyboard.type("desc");
    await page.screenshot({path:'description.png', fullsceen: true});

    await page.focus('#input-26');
    await page.keyboard.type("01:01");

    await page.focus('#input-33');
    await page.keyboard.type("03:15");

    await page.screenshot({path:'from.png', fullsceen: true});

    await page.focus('#input-19');
    await page.click('#input-19')
    await page.screenshot({path:'press.png', fullsceen: true});

    await page.focus('#list-19');
    //await page.waitFor(1000); // wait a second
    await page.click('#wednesday-list-item-55')
    await page.screenshot({path:'itswednesdaymydudes.png', fullsceen: true});

    //await page.focus('#input-33');
    //await page.keyboard.type("");
    //await page.click('#input-33');
   // v-menu__content theme--light menuable__content__active
    //await page.waitForSelector('.v-menu__content theme--light menuable__content__active');
    //await page.waitFor(500); // wait a second
    //await page.focus('.v-picker__body');
    //await page.click();
    //await page.waitFor(500);
    //await page.click('#wednesday-list-item-60')
    //await page.screenshot({path:'To.png', fullsceen: true});

    await page.focus('#input-39');
    await page.evaluate( () => document.getElementById("input-39").value = "")
    await page.keyboard.type("test@testmail.com");

    await page.focus('#input-43');
    await page.evaluate( () => document.getElementById("input-43").value = "")
    await page.keyboard.type("45111111");

    await page.focus('#input-47');
    await page.evaluate( () => document.getElementById("input-47").value = "")
    await page.keyboard.type("D.111");

    await page.focus('#input-51');
    await page.evaluate( () => document.getElementById("input-51").value = "")
    await page.keyboard.type("Test additional info");
    await page.screenshot({path:'finished.png', fullsceen: true});


    //const fName = await page.waitForXPath();
    // await page.waitFor('.wpcf7-form');
    // const name= await page.waitForXPath("/html/body/div[1]/div/div/div/form/p[1]/label/span/input");
    // await name.type("testing");
    // const email= await page.waitForXPath("/html/body/div[1]/div/div/div/form/p[2]/label/span/input");
    // await email.type("test@webkul.com");
    // const subject= await page.waitForXPath('/html/body/div[1]/div/div/div/form/p[3]/label/span/input');
    // await subject.type("Regular testing the contacts page");
    // const message= await page.waitForXPath("/html/body/div[1]/div/div/div/form/p[4]/label/span/textarea");
    // await message.type("Regular testing the contacts page with puppeteer");
    // await page.screenshot({path:'filled.png'});
    // await page.waitFor(2000);
    // const button = await page.waitForSelector(".wpcf7-submit");
    // await button.click();
    // await page.waitFor(2000);
    // await page.waitForSelector('.wpcf7-mail-sent-ok');
    // await page.screenshot({path:"submitmessage.png"});
    await browser.close();
  })()