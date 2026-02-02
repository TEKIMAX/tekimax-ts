export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = error => reject(error)
    })
}

export const parseThinking = (content: string) => {
    const startTag = '<think>'
    const endTag = '</think>'

    const startIndex = content.indexOf(startTag)

    // Case 1: No think tag found
    if (startIndex === -1) {
        return { think: null, rest: content }
    }

    const endIndex = content.indexOf(endTag, startIndex)

    // Case 2: Streaming (think tag started but not closed)
    if (endIndex === -1) {
        return {
            think: content.substring(startIndex + startTag.length),
            rest: '' // Still thinking, no rest content yet
        }
    }

    // Case 3: Complete think block
    return {
        think: content.substring(startIndex + startTag.length, endIndex),
        rest: (content.substring(0, startIndex) + content.substring(endIndex + endTag.length)).trim()
    }
}
