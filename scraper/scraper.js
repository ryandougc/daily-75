const puppeteer = require('puppeteer')
const fs        = require('fs');
const { pathToFileURL } = require('url');
const axios = require('axios')
const cheerio = require('cheerio')


const removeBaseURL = async(url) => {
    const keyword = url.slice(30, url.length)

    return keyword
}


const getSiteData = async () => {
    try {
        const { data }  = await axios.get('https://www.techinterviewhandbook.org/grind75')
        const $         = cheerio.load(data)
    
        const links = []
    
        $('[role=listitem]').find('a').each(function (index, element) {
            links.push($(element).attr('href'));
          });
    
        return links
    } catch(err) {
        console.log(err)
    }
}

const getAlgData = async (links) => {
    try {
        const browser = await puppeteer.launch();
        const [page] = await browser.pages();

        for(let i = 0; i < links.length; i++) {
            await page.goto(links[i], { waitUntil: 'networkidle0' });

            const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    
            const $ = cheerio.load(data)
    
            const pageDataHtml = $('.question-content__JfgR').html()
    
            const fileNameHtml = await removeBaseURL(links[i])
        
            await fs.writeFileSync(`./scraper/algorithm-html-files/${i+1}-${fileNameHtml}.html`, pageDataHtml, function(err) {
                if(err) {
                    return console.log(err);
                }
            }); 
        }

        console.log("All algorithms have been scraped and saved")
    } catch(err) {
        console.log(err)
    }
}



const run = async () => {
    const data = await getSiteData()

    await getAlgData(data)
}

run()