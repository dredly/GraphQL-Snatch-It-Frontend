import { Letter, Word } from "../types"
import { count, getLettersAdded, getWordString } from "./helpers"
import porterStemmer from '@stdlib/nlp-porter-stemmer';


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

// Only snatch from one word and basic stemming for now
export const canSnatch = (wordAttempt: string, snatchFrom: Word, letterPool: Letter[]) => {
    const lettersAdded = getLettersAdded(snatchFrom, wordAttempt);
    return lettersAvailable(lettersAdded, letterPool) &&
        porterStemmer(wordAttempt) !== porterStemmer(getWordString(snatchFrom));
}