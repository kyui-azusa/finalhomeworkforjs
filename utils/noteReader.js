import fs from 'fs/promises'

export async function readNote(path, encoding='utf-8') {
    const data = await fs.readFile(path, encoding)
    return data
}