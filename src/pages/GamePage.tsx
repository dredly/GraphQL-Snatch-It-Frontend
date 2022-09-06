import { useQuery, useMutation, useSubscription, useApolloClient } from "@apollo/client"
import { useParams } from "react-router-dom"
import { FLIP_LETTER } from "../mutations"
import { GAME_BY_ID } from "../queries"
import { LETTER_FLIPPED, PLAYER_READY } from "../subscriptions"
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

    const [flip] = useMutation(FLIP_LETTER)

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

    useSubscription(PLAYER_READY, {
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

    const handleFlip = () => {
        console.log('Flipping')
        flip({variables: {gameId}})
    }

    return (
        <div>
            {game.players.map(p => {
                return (
                    <PlayerInGame player={p} key={p.id} />
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

export default GamePage