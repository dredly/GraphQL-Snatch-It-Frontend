import { lettersAvailable, isWord, canSnatch } from "../../utils/wordChecking";
import { Letter, Word } from "../../types"
import { scrabbleDict } from "../../utils/dictSet";

const testLetterPool: Letter[] = [
    {
        id: '1', value: 'A', rotation: 0
    },
    {
        id: '2', value: 'B', rotation: 0
    },
    {
        id: '3', value: 'C', rotation: 0
    },
    {
        id: '4', value: 'D', rotation: 0
    },
    {
        id: '5', value: 'E', rotation: 0
    },
    {
        id: '6', value: 'F', rotation: 0
    },
    {
        id: '7', value: 'F', rotation: 0
    },
    {
        id: '8', value: 'R', rotation: 0
    },
    {
        id: '9', value: 'I', rotation: 0
    },
    {
        id: '13', value: 'S', rotation: 0
    }
]

const testWord: Word = {
    id: '1',
    letters: [
        {id: '10', value: 'C', rotation: 0},
        {id: '11', value: 'A', rotation: 0},
        {id: '12', value: 'P', rotation: 0}
    ]
}

describe('lettersAvaible function', () => {
    it('works as intended', () => {
        expect(lettersAvailable('miguel', testLetterPool)).toBe(false)
        expect(lettersAvailable('cab', testLetterPool)).toBe(true)
    })
})

describe('isWord function', () => {
    it('works as intended', () => {
        expect(isWord('hill', scrabbleDict)).toBe(true)
        expect(isWord('skrskrn', scrabbleDict)).toBe(false)
    }) 
})

describe('canSnatch function', () => {
    it('returns true when the letters are available and its not just an extension of the existing word', () => {
        expect(canSnatch('pacer', testWord, testLetterPool)).toBe(true)
    })
    it('returns false when the letters are not available', () => {
        expect(canSnatch('spacing', testWord, testLetterPool)).toBe(false)
    })
    it('returns false when the letters are available but would be just extending the root word', () => {
        expect(canSnatch('caps', testWord, testLetterPool)).toBe(false)
    })
})