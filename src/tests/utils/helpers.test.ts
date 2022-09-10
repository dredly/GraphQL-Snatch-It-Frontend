import { count, getWordString } from '../../utils/helpers';

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

test('count function', () => {
    expect(count(['a', 'b', 'b', 'c'], 'c')).toBe(1)
    expect(count(['a', 'b', 'b', 'c'], 'b')).toBe(2)
    expect(count([], 'c')).toBe(0)
})

test('getWordString function', () => {
    expect(getWordString(testWord)).toBe('trogdor')
})