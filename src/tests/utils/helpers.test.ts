import { 
    count, 
    getWordString, 
    isSubset, 
    setDifference, 
    getLettersAdded, 
    findWordInGameById 
} from '../../utils/helpers';
import { Word, Player, Game } from '../../types'

const testWord: Word = {
    id: '1',
    letters: [
        {id: '1', value: 'T', rotation: 0},
        {id: '2', value: 'R', rotation: 0},
        {id: '3', value: 'O', rotation: 0},
        {id: '4', value: 'G', rotation: 0},
        {id: '5', value: 'D', rotation: 0},
        {id: '6', value: 'O', rotation: 0},
        {id: '7', value: 'R', rotation: 0},
    ]
}

const testWord2: Word = {
    id: '2',
    letters: [
        {id: '8', value: 'P', rotation: 0},
        {id: '9', value: 'A', rotation: 0},
        {id: '10', value: 'T', rotation: 0},
    ]
}

const testWord3: Word = {
    id: '3',
    letters: [
        {id: '11', value: 'S', rotation: 0},
        {id: '12', value: 'P', rotation: 0},
        {id: '13', value: 'I', rotation: 0},
        {id: '14', value: 'T', rotation: 0},
        {id: '15', value: 'E', rotation: 0},
    ]
}

const testPlayer1: Player = {
    id: '1',
    name: 'Miguel',
    ready: true,
    words: [testWord, testWord2]
}

const testPlayer2: Player = {
    id: '2',
    name: 'Miguelito',
    ready: true,
    words: [testWord3]
}

const testGame: Game = {
    id: '1',
    players: [testPlayer1, testPlayer2],
    letters: {
        flipped: [],
        unflipped: [],
        flippedPositions: []
    }
}

test('count function', () => {
    expect(count(['a', 'b', 'b', 'c'], 'c')).toBe(1)
    expect(count(['a', 'b', 'b', 'c'], 'b')).toBe(2)
    expect(count([], 'c')).toBe(0)
})

test('getWordString function', () => {
    expect(getWordString(testWord)).toBe('trogdor')
})

test('setDifference function', () => {
    const setA = new Set([1, 2, 3, 4, 5]);
    const setB = new Set([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(setDifference(setA, setB)).toEqual(new Set([]))
    expect(setDifference(setB, setA)).toEqual(new Set([6, 7, 8]))
})

test('isSubset function', () => {
    const setA = new Set([1, 2, 3]);
    const setB = new Set([1, 2, 3, 4, 5, 6]);
    const setC = new Set([1, 2, 3, 8]);
    expect(isSubset(setA, setB)).toBe(true);
    expect(isSubset(setB, setA)).toBe(false);
    expect(isSubset(setC, setB)).toBe(false);
    expect(isSubset(setB, setC)).toBe(false);
})

test('getLettersAdded function', () => {
    expect(getLettersAdded(testWord, 'trogdorina')).toBe('ain')
    expect(getLettersAdded(testWord2, 'parts')).toBe('rs')
})

test('findWordInGameById function', () => {
    expect(findWordInGameById('1', testGame.players)).toEqual(testWord)
    expect(findWordInGameById('3', testGame.players)).toEqual(testWord3)
    expect(() => findWordInGameById('4', testGame.players)).toThrowError()
})