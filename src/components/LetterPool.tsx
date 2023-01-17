import { Letter } from "../types"
import LetterTile from "./LetterTile"

const LetterPool = ({ letters }: { letters: Letter[] }) => {
    return (
        <div>
            {letters.map(lett => <LetterTile letter={lett.value} key={lett.id} rotation={lett.rotation} />)}
        </div>
    )
}

export default LetterPool