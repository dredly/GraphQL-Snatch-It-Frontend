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
        {id: '1', value: 'T'},
        {id: '2', value: 'R'},
        {id: '3', value: 'O'},
        {id: '4', value: 'G'},
        {id: '5', value: 'D'},
        {id: '6', value: 'O'},
        {id: '7', value: 'R'},
    ]
}

const testWord2: Word = {
    id: '2',
    letters: [
        {id: '8', value: 'P'},
        {id: '9', value: 'A'},
        {id: '10', value: 'T'},
    ]
}

const testWord3: Word = {
    id: '3',
    letters: [
        {id: '11', value: 'S'},
        {id: '12', value: 'P'},
        {id: '13', value: 'I'},
        {id: '14', value: 'T'},
        {id: '15', value: 'E'},
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
        unflipped: []
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