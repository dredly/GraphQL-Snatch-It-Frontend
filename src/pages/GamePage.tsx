import { useQuery, useSubscription, useApolloClient } from "@apollo/client"
import { useParams } from "react-router-dom"
import { GAME_BY_ID } from "../queries"
import { LETTER_FLIPPED, PLAYER_READY_TO_FLIP } from "../subscriptions"
import { Game } from "../types"
import PlayerInGame from "../components/PlayerInGame"

const GamePage = () => {
    const client = useApolloClient()

    const gameId = useParams().id
    const queryResult = useQuery(GAME_BY_ID, {
        variables: {
            gameId
        }
    })

    useSubscription(LETTER_FLIPPED, {
        onSubscriptionData: ({ subscriptionData }) => {
			const updatedGame = subscriptionData.data.letterFlipped
			client.cache.updateQuery({query: GAME_BY_ID}, () => {
				return {
					gameById: updatedGame,
				}
			})
		}
    })

    useSubscription(PLAYER_READY_TO_FLIP, {
        onSubscriptionData: ({ subscriptionData }) => {
			const updatedGame = subscriptionData.data.playerReady
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
    const flippedLetters = game.letters.filter(lett => lett.exposed)


    return (
        <div>
            {game.players.map(p => {
                return (
                    <PlayerInGame player={p} key={p.id} />
                )
            })}
            <h3>Letter Pool</h3>
            {flippedLetters.map(fl => {
                return (
                    <span key={fl.id}>{fl.value}</span>
                )
            })}
        </div>
    )
}

export default GamePage