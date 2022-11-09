import * as path from 'path'
import * as fs from 'fs'

export class AlgorithmTemplate {
    templateFiles: string[] 
    templateFileNames: object

    constructor() {
        this.templateFiles = this.getTemplateFiles()
        this.templateFileNames = this.getTemplateNames()
    }

    private getTemplateFiles(): string[] {
        const dir = path.join(__dirname, '../../scraper/algorithm-html-files')
    
        const files = fs.readdirSync(dir)

        // Sort files in numbered order
        const r = /\d{1,2}/

        this.templateFiles.sort((f1, f2) => {
            var match1 = r.exec(f1);
            var num1 = match1[0];

            var match2 = r.exec(f2);
            var num2 = match2[0];

            return parseInt(num1, 10) - parseInt(num2, 10);
        });
    
        return files
    }

    private getTemplateNames(): object {
        const fileNamesDicionary = {}
        let i = 1

        for(const file of this.templateFiles) {
            fileNamesDicionary[i] = file
            i++
        }

        return fileNamesDicionary
    }

    private getAlgorithmTemplateName(algId: string): string {
        const foundAlg = this.templateFileNames[algId]

        if(foundAlg) return foundAlg
        else return undefined
    } 

    public async getAlgorithmTemplate(algId: number): Promise<string> {
        const algIdStr = algId.toString()
        
        const algName = this.getAlgorithmTemplateName(algIdStr)

        const html = await fs.promises.readFile(`./scraper/algorithm-html-files/${algName}.html`, "utf8")

        if(html) return html
        else return undefined
    }
}