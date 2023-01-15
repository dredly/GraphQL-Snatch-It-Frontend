import styled from "styled-components"

interface Props {
    rotation: number
}

const Tile = styled.div<Props>`
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
    transform: rotate(${props => props.rotation}turn);
`;

const LetterTile = ({ letter, rotation }: { letter: string, rotation: number }) => {

    return <Tile rotation={rotation}><p>{letter}</p></Tile>
}

export default LetterTile
