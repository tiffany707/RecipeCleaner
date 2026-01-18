import express from "express";
import scrapeRouter from "./router.js"

const app = express();
app.use(express.json());

app.use("/scraper", scrapeRouter);

app.get("/", (req, res) => {
    res.send("hello");
})

app.listen(5000, (res,req) =>{
    console.log("listening");
})
