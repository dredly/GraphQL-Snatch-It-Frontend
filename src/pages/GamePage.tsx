import { useQuery, useSubscription, useApolloClient } from "@apollo/client"
import { useState, useContext } from "react"
import { ONE_GAME_IN_PROGRESS } from "../graphql/queries"

import { Game } from "../types"
import PlayerInGame from "../components/PlayerInGame"
import { GameInProgressContext } from ".."
import { GAME_UPDATED } from "../graphql/subscriptions"

const GamePage = () => {
    const client = useApolloClient()

    const [selectedWordIds, setSelectedWordIds] = useState<string[]>([])

    const gameId = useContext(GameInProgressContext)

    const queryResult = useQuery(ONE_GAME_IN_PROGRESS, {
        variables: {
            gameId
        }
    })

    useSubscription(GAME_UPDATED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const updatedGame: Game = subscriptionData.data.gameInProgressUpdated

            //Check if letters all used up
            if (!updatedGame.letters.unflipped.length) {
                console.log("NO MORE LETTERS");
            }

            client.cache.updateQuery({query: ONE_GAME_IN_PROGRESS}, () => {
				return {
					oneGameInProgress: updatedGame,
				}
			})
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