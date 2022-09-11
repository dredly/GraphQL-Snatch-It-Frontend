import { Word } from "../types";

export const count = (arr: unknown[], val: unknown) => {
    return arr.filter(item => item === val).length;
}

export const getWordString = (word: Word) => {
    return word.letters.map(lett => lett.value.toLowerCase()).join('');
}

export const setDifference = (a: Set<unknown>, b: Set<unknown>) =>  {
    return new Set(Array.from(a).filter(item => !b.has(item)));
}

export const isSubset =  (a: Set<unknown>, b: Set<unknown>) => {
    // Checks whether a is a subset of b
    return setDifference(a, b).size === 0
}

export const getLettersAdded = (wordToSnatch: Word, fullWordAttempt: string) => {
    const wordToSnatchArray = getWordString(wordToSnatch).split('');
    const fullWordAttemptArray = fullWordAttempt.split('');
    for (const char of wordToSnatchArray) {
        const foundIdx = fullWordAttemptArray.indexOf(char);
        delete fullWordAttemptArray[foundIdx];
    }
    // Sorting is just so that the function is easier to test
    return fullWordAttemptArray.sort().join('');
}