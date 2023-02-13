import JoinForm from "../components/JoinForm"
import WordDisplay from "../components/WordDisplay"
import { Word } from "../types"

const Welcome = ({ setCurrentPlayer }: {setCurrentPlayer: React.Dispatch<React.SetStateAction<string>>}) => {
    const HELLO: Word = {
        id: "1",
        letters: [
            { id: "2", value: "H", rotation: 0 },
            { id: "3", value: "E", rotation: 0 },
            { id: "4", value: "L", rotation: 0 },
            { id: "5", value: "L", rotation: 0 },
            { id: "6", value: "O", rotation: 0 }
        ]
    }
    return (
        <div>
            <h1>Welcome to Snatch It</h1>
            <h2>For best experience please play on desktop</h2>
            <a href="/">Rules</a>
            <JoinForm setCurrentPlayer={setCurrentPlayer}/>
            <WordDisplay word={HELLO} handleClick = { () => console.log("hi") }/>
        </div>
    )
}

export default Welcome