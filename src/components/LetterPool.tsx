import { FlippedPositionMapTuple, Letter } from "../types"
import LetterTile from "./LetterTile"
import styled from "styled-components"
import { findLetterById } from "../utils/helpers"

const LetterTileBuffer = styled.div`
    display: grid;
    place-items: center;
    width: 80px;
    height: 80px;
`

const LetterPoolContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 1200px;
`

const LetterPool = ({ letters, letterPositions }: { letters: Letter[], letterPositions: FlippedPositionMapTuple[] }) => {
    if (!letterPositions.length) return null

    console.log("letterPositions", letterPositions)

    const positions = letterPositions.map(ele => ele.value)
    const maxPosition = Math.max(...positions)
    const allPositions = [...Array(maxPosition + 1).keys()]

    return (
        <LetterPoolContainer>
            {allPositions.map(pos => {
                if (positions.includes(pos)) {
                    const letterPosition = letterPositions.find(lp => lp.value === pos)
                    if (!letterPosition) {
                        throw new Error("Could not find letter from letterPositions")
                    }
                    const letterId = letterPosition.key
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
        </LetterPoolContainer>
    )
}

export default LetterPool