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