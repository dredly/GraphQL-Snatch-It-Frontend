import { Letter } from "../types"
import { count } from "./helpers"

export const lettersAvailable = (wordAttempt: string, letterPool: Letter[]) => {
    const wordCharArray = wordAttempt.toLowerCase().split('')
    const availableCharArray = letterPool.map(lett => lett.value.toLowerCase())
    for (const lett of wordCharArray) {
        if (count(wordCharArray, lett) > count(availableCharArray, lett)) {
            return false
        }
    }
    return true;
}

export const isWord = (wordAttempt: string, dictSet: Set<string>) => {
    return dictSet.has(wordAttempt.toUpperCase());
}

// export const getLettersForWord = (word: string, letterPool: Letter[]) => {
//     const wordCharArray = word.toLowerCase().split('')
//     const availableLetters = [...letterPool]
//     const lettersForWord = []
//     for (const char of wordCharArray) {
//         const letter = availableLetters.find(lett => lett.value.toLowerCase() === char);
//         if (!letter) {
//             throw new Error('Letter not available')
//         }
//         availableLetters.splice(availableLetters.indexOf(letter), 1)
//         lettersForWord.push(letter)
//     }
//     return {
//         word: lettersForWord,
//         remaining: availableLetters
//     }
// }