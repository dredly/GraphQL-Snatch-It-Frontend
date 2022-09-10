import { Word } from "../types";

export const count = (arr: string[], val: string) => {
    return arr.filter(item => item === val).length;
}

export const getWordString = (word: Word) => {
    return word.letters.map(lett => lett.value.toLowerCase()).join('');
}