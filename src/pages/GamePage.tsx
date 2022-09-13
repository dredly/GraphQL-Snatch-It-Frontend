import { useQuery, useSubscription, useApolloClient } from "@apollo/client"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { GAME_BY_ID } from "../graphql/queries"
import { GAME_UPDATED } from "../graphql/subscriptions"
import { Game } from "../types"
import PlayerInGame from "../components/PlayerInGame"

const GamePage = () => {
    const client = useApolloClient()

    const [selectedWordIds, setSelectedWordIds] = useState<string[]>([])

    const gameId = useParams().id
    const queryResult = useQuery(GAME_BY_ID, {
        variables: {
            gameId
        }
    })

    useSubscription(GAME_UPDATED, {
        onSubscriptionData: ({ subscriptionData }) => {
			const updatedGame = subscriptionData.data.gameUpdated
			client.cache.updateQuery({query: GAME_BY_ID}, () => {
				return {
					gameById: updatedGame,
				}
			})
		}
    })

    if (queryResult.loading) {
		return <div>...loading</div>;
	}

	if (queryResult.error) {
		return <div>Query error</div>
	}
    
    const game: Game = queryResult.data.gameById;

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