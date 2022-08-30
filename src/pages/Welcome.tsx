import JoinForm from "../components/JoinForm"

const Welcome = ({ setCurrentPlayer }: {setCurrentPlayer: React.Dispatch<React.SetStateAction<string>>}) => {
    return (
        <div>
            <h1>Welcome to Snatch It</h1>
            <a href="/">Rules</a>
            <JoinForm setCurrentPlayer={setCurrentPlayer}/>
        </div>
    )
}

export default Welcome