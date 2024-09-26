import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cookie from 'cookie-parser'

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.get('/about', ()=>{
    res.send("About")
})
app.use(cookie())
app.use('/function', express.static('./script'))
app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'page/index.html'));
});

app.listen(3000, ()=>{
    console.log("App Is Starting In port 3000")
})