import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { GAME_BY_ID } from "../queries"
import { GameInfo } from "../types"

const InGame = () => {
    const gameId = useParams().id
    console.log('gameId', gameId)
    const queryResult = useQuery(GAME_BY_ID, {
        variables: {
            gameId
        }
    })

    if (queryResult.loading) {
		return <div>...loading</div>;
	}

	if (queryResult.error) {
		return <div>Query error</div>
	}
    
    const game: GameInfo = queryResult.data.gameById;
    console.log('game', game);

    return (
        <div>
            {game.players.map(p => {
                return (
                    <div key={p.id}><h3>{p.name}</h3></div>
                )
            })}
        </div>
    )
}

export default InGame