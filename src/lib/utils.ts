import * as crypto from 'crypto'

export async function generateToken(size): Promise<string> {
    const randomBuffer = await crypto.randomBytes(size)

    const bufferString = randomBuffer.toString("hex")

    return bufferString
}

export async function generateHMAC(input: string): Promise<string> {
    const secret = process.env.HMAC_SECRET

    const hmac = crypto.createHmac('sha256', secret)
                        .update(input)
                        .digest('hex')

    return hmac
}