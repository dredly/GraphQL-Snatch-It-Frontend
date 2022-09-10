import { PlayerInfo, Game } from "../types";
import { useContext, SyntheticEvent } from "react"
import { useMutation } from "@apollo/client";
import { UserContext } from ".."
import { DECLARE_READINESS, WRITE_WORD } from "../mutations";
import WriteWordForm from "./WriteWordForm";
import { scrabbleDict } from "../utils/dictSet";
import { lettersAvailable, isWord } from "../utils/wordChecking";

const PlayerInGame = ({player, game}: {player: PlayerInfo, game: Game}) => {
    const currentPlayerId = useContext(UserContext)

    const [toggleReady] = useMutation(DECLARE_READINESS)
	const [writeWord] = useMutation(WRITE_WORD)

	const toggleReadiness = () => {
		toggleReady({variables: {
			playerId: currentPlayerId
		}})
	}

	const submitWord = (evt: SyntheticEvent) => {
		evt.preventDefault();
		const target = evt.target as typeof evt.target & {
			wordInput: {value: string}
		}
		const wordAttempt = target.wordInput.value
		if (lettersAvailable(wordAttempt, game.letters.flipped) && isWord(wordAttempt, scrabbleDict)) {
			target.wordInput.value = ''
			writeWord({variables: {
				playerId: currentPlayerId,
				gameId: game.id,
				letterIds: []
			}})
		} else {
			console.log('Invalid')
		}
	}

    return (
        <div>
            {player.name} - {player.ready ? 'READY' : 'NOT READY'}
			{player.id === currentPlayerId && !player.ready
				? <button onClick={toggleReadiness}>
                    Ready to flip
				</button> 
				: null
			}
			{player.id === currentPlayerId
				? <WriteWordForm onSubmit={submitWord}/>
				: null
			}
        </div>
    )
}

export default PlayerInGame