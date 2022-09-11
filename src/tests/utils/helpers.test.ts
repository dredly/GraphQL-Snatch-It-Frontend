import { count, getWordString, isSubset, setDifference, getLettersAdded } from '../../utils/helpers';

const testWord = {
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

const testWord2 = {
    id: '2',
    letters: [
        {id: '8', value: 'P'},
        {id: '9', value: 'A'},
        {id: '10', value: 'T'},
    ]
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