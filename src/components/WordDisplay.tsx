import styled from "styled-components"
import { Word } from "../types"
import LetterTile from "./LetterTile"

const LetterRow = styled.div`
    display: flex;
`

const WordDisplay = ({ word }: { word: Word }) => {
    return (
        <LetterRow>
            {word.letters.map(lett => <LetterTile letter={lett.value} randomRotation={false} key={lett.id} />)}
        </LetterRow>
    )
}

export default WordDisplay