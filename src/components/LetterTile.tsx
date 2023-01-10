import styled from "styled-components"

const Tile = styled.div`
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
    transform: rotate(${Math.random()}turn);
`

const LetterTile = () => {
    return (
        <Tile>
            <p>A</p>
        </Tile>
    )
}

export default LetterTile
