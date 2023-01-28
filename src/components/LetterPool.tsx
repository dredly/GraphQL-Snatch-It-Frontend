import { Letter } from "../types"
import LetterTile from "./LetterTile"
import styled from "styled-components"
import { findLetterById } from "../utils/helpers"

const LetterTileBuffer = styled.div`
    display: grid;
    place-items: center;
    width: 80px;
    height: 80px;
`

const LetterPool = ({ letters, letterPositions }: { letters: Letter[], letterPositions: Map<number, string> }) => {
    const maxPosition = Math.max(...letterPositions.keys())
    const allPositions = [...Array(maxPosition).keys()]

    return (
        <div>
            {allPositions.map(pos => {
                if ([...letterPositions.keys()].includes(pos)) {
                    const letterId = letterPositions.get(pos)
                    if (!letterId) {
                        throw new Error("Could not find letterId from letterPostitions")
                    }
                    const letter = findLetterById(letterId, letters)
                    return (
                        <LetterTileBuffer key={letter.id}>
                            <LetterTile letter={letter.value} rotation={letter.rotation} />
                         </LetterTileBuffer>
                    )
                } else {
                    return <LetterTileBuffer key={pos} />
                }
            })}
        </div>
    )
}

export default LetterPool