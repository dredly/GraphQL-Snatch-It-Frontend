import styled from "styled-components"
import { Word } from "../types"
import LetterTile from "./LetterTile"

const LetterRow = styled.div`
    display: flex;
    width: min-content;
    background: green;
    margin-top: 16px;
`

const WordDisplay = ({ word, handleClick }: { word: Word, handleClick: () => void }) => {
    return (
        <LetterRow onClick={handleClick}>
            {word.letters.map(lett => <LetterTile letter={lett.value} rotation={0} key={lett.id} />)}
        </LetterRow>
    )
}

export default WordDisplay