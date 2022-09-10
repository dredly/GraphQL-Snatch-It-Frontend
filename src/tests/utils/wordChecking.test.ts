import { lettersAvailable } from "../../utils/wordChecking";
import { Letter } from "../../types"

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
]

test('lettersAvaible function', () => {
    const result = lettersAvailable('miguel', testLetterPool)
    expect(result).toBe(false)
})