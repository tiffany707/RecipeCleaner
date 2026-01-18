import express from "express";
import { chromium } from "playwright";

const router = express.Router();

const runScraper = async () => {
    try{
        const browser = await chromium.launch( {headless: false, slowMo: 1000} );
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://www.allrecipes.com/recipe/31144/sweet-and-sour-pork-iii/");
        const title = await page.locator(".article-heading.text-headline-400").innerText();
        const details = await page.locator(".mm-recipes-details__content").innerText();
        let ingredients = await page.locator('.comp.mm-recipes-lrs-ingredients.mntl-block li').allInnerTexts();
        ingredients = ingredients.join('\n');
        const garnish = await page.locator('.mm-recipes-structured-ingredients__list').nth(1).innerText();
        const directions = await page.locator(".comp.mntl-sc-block.mntl-sc-block-startgroup.mntl-sc-block-group--OL").allInnerTexts();
        console.log("hi im scraper")
        
        await browser.close();
        return [title, details, ingredients, garnish, directions];
    }
    catch(e){
        console.log(e.message);
    }
    
}

router.post('/', async (req, res) =>{
    try{
        const data = await runScraper();
        res.json({
            title: data[0],
            details: data[1],
            ingredients: data[2],
            garnish: data[3],
            directions: data[4]
        });
    }catch(e){
        res.status(500).send(`
            <h1>Scrape Failed</h1>
            <p>Error: ${e.message}</p>
            <p>Check your terminal for details.</p>
        `);
    }
})



export default router;


