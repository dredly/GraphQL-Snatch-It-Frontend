import { useQuery, useMutation } from "@apollo/client"
import { useParams } from "react-router-dom"
import { FLIP_LETTER } from "../mutations"
import { GAME_BY_ID } from "../queries"
import { Game } from "../types"

const InGame = () => {
    const gameId = useParams().id
    const queryResult = useQuery(GAME_BY_ID, {
        variables: {
            gameId
        }
    })

    const [flip] = useMutation(FLIP_LETTER)

    if (queryResult.loading) {
		return <div>...loading</div>;
	}

	if (queryResult.error) {
		return <div>Query error</div>
	}
    
    const game: Game = queryResult.data.gameById;
    const flippedLetters = game.letters.filter(lett => lett.exposed)

    const handleFlip = () => {
        console.log('Flipping')
        flip({variables: {gameId}})
    }

    return (
        <div>
            {game.players.map(p => {
                return (
                    <div key={p.id}><h3>{p.name}</h3></div>
                )
            })}
            <button onClick={handleFlip}>Flip letter</button>
            <h3>Letter Pool</h3>
            {flippedLetters.map(fl => {
                return (
                    <span key={fl.id}>{fl.value}</span>
                )
            })}
        </div>
    )
}

export default InGame