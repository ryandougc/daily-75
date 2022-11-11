import * as path from 'path'
import * as fs from 'fs'

export class AlgorithmTemplate {
    templateFileNames: Array<string>
    templateFileDictionary: object

    constructor() {
        this.templateFileNames = this.getTemplateFileNames()
        this.templateFileDictionary = this.createTemplateFileDictionary()
    }

    private getTemplateFileNames(): Array<string> {
        const dir = path.join(__dirname, '../../scraper/algorithm-html-files')
    
        const files = fs.readdirSync(dir)

        // Sort files in numbered order
        const r = /\d{1,2}/

        files.sort((f1, f2) => {
            var match1 = r.exec(f1);
            var num1 = match1[0];

            var match2 = r.exec(f2);
            var num2 = match2[0];

            return parseInt(num1, 10) - parseInt(num2, 10);
        });
    
        return files
    }

    private createTemplateFileDictionary(): object {
        const fileNamesDicionary = {}
        let i = 1

        for(const file of this.templateFileNames) {
            fileNamesDicionary[i] = file
            i++
        }

        return fileNamesDicionary
    }

    private getAlgorithmTemplateName(algId: string): string {
        const foundAlg = this.templateFileDictionary[algId]

        if(foundAlg) return foundAlg
        else return undefined
    } 

    public async getAlgorithmTemplate(algId: number): Promise<string> {
        const algIdStr = algId.toString()
        
        const algName = this.getAlgorithmTemplateName(algIdStr)

        const html = await fs.promises.readFile(`./scraper/algorithm-html-files/${algName}`, "utf8")

        if(html) return html
        else return undefined
    }
}