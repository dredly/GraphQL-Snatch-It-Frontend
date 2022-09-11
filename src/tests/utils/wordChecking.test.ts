import { lettersAvailable, isWord, canSnatch } from "../../utils/wordChecking";
import { Letter, Word } from "../../types"
import { scrabbleDict } from "../../utils/dictSet";

const testLetterPool: Letter[] = [
    {
        id: '1', value: 'A'
    },
    {
        id: '2', value: 'B'
    },
    {
        id: '3', value: 'C'
    },
    {
        id: '4', value: 'D'
    },
    {
        id: '5', value: 'E'
    },
    {
        id: '6', value: 'F'
    },
    {
        id: '7', value: 'F'
    },
    {
        id: '8', value: 'R'
    },
    {
        id: '9', value: 'I'
    },
    {
        id: '13', value: 'S'
    }
]

const testWord: Word = {
    id: '1',
    letters: [
        {id: '10', value: 'C'},
        {id: '11', value: 'A'},
        {id: '12', value: 'P'}
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