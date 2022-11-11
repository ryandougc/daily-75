import { AlgorithmTemplate } from '../models/algorithmTemplate.model'

export async function getAlgorithmTemplateService(algId: number): Promise<string> {
    try {
        const algTemplate = new AlgorithmTemplate()
    
        const algorithmTemplate = await algTemplate.getAlgorithmTemplate(algId)
    
        return algorithmTemplate
    } catch(err) {
        console.log(err)

        return undefined
    } 
}