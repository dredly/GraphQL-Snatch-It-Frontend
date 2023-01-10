import JoinForm from "../components/JoinForm"
import LetterTile from "../components/LetterTile"

const Welcome = ({ setCurrentPlayer }: {setCurrentPlayer: React.Dispatch<React.SetStateAction<string>>}) => {
    return (
        <div>
            <h1>Welcome to Snatch It</h1>
            <a href="/">Rules</a>
            <JoinForm setCurrentPlayer={setCurrentPlayer}/>
            <LetterTile />
        </div>
    )
}

export default Welcome