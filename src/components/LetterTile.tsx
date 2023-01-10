import styled from "styled-components"

const tileStyles = `
    box-sizing: border-box;
    border: 1px solid #221d0c;
    box-shadow: inset -0.1em -0.1em 0 0 #221d0c38;
    background: #ccae4b;
    width: 50px;
    height: 50px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    cursor: pointer;
`

const Tile = styled.div`${tileStyles}`;

const RotatedTile = styled.div`${tileStyles}transform: rotate(${Math.random()}turn)`

const LetterTile = ({ letter, randomRotation }: { letter: string, randomRotation: boolean }) => {
    if (randomRotation) {
        return (
            <RotatedTile><p>{letter}</p></RotatedTile>
        )
    }
    return <Tile><p>{letter}</p></Tile>
}

export default LetterTile
