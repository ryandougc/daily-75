const fs = require('node:fs/promises')


const run = async () => {
     let htmlData = await fs.readFile('./scraper/data-html/1-two-sum.html', "utf8")

     console.log(htmlData)

    return await htmlData
}

console.log(run())