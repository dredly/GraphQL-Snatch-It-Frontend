import { useQuery } from "@apollo/client"
import { useState, useContext } from "react"
import { ONE_GAME_IN_PROGRESS } from "../graphql/queries"

import { Game } from "../types"
import PlayerInGame from "../components/PlayerInGame"
import { GameInProgressContext } from ".."

const GamePage = () => {
    const [selectedWordIds, setSelectedWordIds] = useState<string[]>([])

    const gameId = useContext(GameInProgressContext)

    const queryResult = useQuery(ONE_GAME_IN_PROGRESS, {
        variables: {
            gameId
        }
    })

    if (queryResult.loading) {
		return <div>...loading</div>;
	}

	if (queryResult.error) {
        console.log('error', queryResult.error)
		return <div>Query error</div>
	}
    
    const game: Game = queryResult.data.oneGameInProgress;

    return (
        <div>
            {game.players.map(p => {
                return (
                    <PlayerInGame 
                        player={p} game={game} key={p.id}
                        selectedWordIds={selectedWordIds}
                        setSelectedWordIds={setSelectedWordIds} 
                    />
                )
            })}
            <h3>Letter Pool</h3>
            {game.letters.flipped.map(fl => {
                return (
                    <span key={fl.id}>{fl.value}</span>
                )
            })}
        </div>
    )
}

export default GamePage