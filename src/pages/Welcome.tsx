import JoinForm from "../components/JoinForm"
import LetterTile from "../components/LetterTile"

const Welcome = ({ setCurrentPlayer }: {setCurrentPlayer: React.Dispatch<React.SetStateAction<string>>}) => {
    return (
        <div>
            <h1>Welcome to Snatch It</h1>
            <h2>For best experience please play on desktop</h2>
            <a href="/">Rules</a>
            <JoinForm setCurrentPlayer={setCurrentPlayer}/>
            <LetterTile randomRotation={true} />
            <LetterTile randomRotation={false} />
        </div>
    )
}

export default Welcome