import express from "express";
import { chromium } from "playwright";

const router = express.Router();

//retrieves information from allrecipes.com
const runScraper = async (url) => {
    try{
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(url);
        const title = await page.locator(".article-heading.text-headline-400").innerText();
        const details = await page.locator(".mm-recipes-details__content div").allInnerTexts();
        let ingredients = await page.locator('.comp.mm-recipes-lrs-ingredients.mntl-block li').allInnerTexts();
        const directions = await page.locator(".comp.mntl-sc-block.mntl-sc-block-startgroup.mntl-sc-block-group--OL p").allInnerTexts();
        
        await browser.close();
        return [title, details, ingredients, directions];
    }
    catch(e){
        console.log(e.message);
    }
    
}

router.post('/', async (req, res) =>{
    try{
        const data = await runScraper(req.body.text);
        res.json({
            title: data[0],
            details: data[1],
            ingredients: data[2],
            directions: data[3]
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


