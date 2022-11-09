import * as path    from 'path'
import * as fs      from 'fs'

import { AlgorithmTemplate } from '../models/algorithmTemplate.model'


export async function getAlgorithmTemplateService(algId: number): Promise<string> {
    const algTemplate = new AlgorithmTemplate()

    const algorithmTemplate = algTemplate.getAlgorithmTemplate(algId)

    return algorithmTemplate
}