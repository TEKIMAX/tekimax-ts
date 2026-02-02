export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = error => reject(error)
    })
}

export const parseThinking = (content: string) => {
    const thinkRegex = /<think>([\s\S]*?)<\/think>/
    const match = content.match(thinkRegex)
    if (match) {
        return {
            think: match[1],
            rest: content.replace(thinkRegex, '').trim()
        }
    }
    // Handle partial streaming thinking
    if (content.startsWith('<think>')) {
        return {
            think: content.replace('<think>', ''),
            rest: '' // Still thinking
        }
    }
    return { think: null, rest: content }
}
