import { PlayerInfo, Game, Letter } from "../types";
import { useContext, SyntheticEvent } from "react"
import { useMutation } from "@apollo/client";
import { UserContext } from ".."
import { DECLARE_READINESS } from "../mutations";
import WriteWordForm from "./WriteWordForm";

const PlayerInGame = ({player, game}: {player: PlayerInfo, game: Game}) => {
    const currentPlayerId = useContext(UserContext)

    const [toggleReady] = useMutation(DECLARE_READINESS)

	const toggleReadiness = () => {
		toggleReady({variables: {
			playerId: currentPlayerId
		}})
	}

	const count = (arr: string[], val: string) => {
		return arr.filter(item => item === val).length;
	}

	const lettersAvailable = (wordAttempt: string, letterPool: Letter[]) => {
		const wordCharArray = wordAttempt.toLowerCase().split('')
		const availableCharArray = letterPool.map(lett => lett.value.toLowerCase())
		for (const lett of wordCharArray) {
			if (count(wordCharArray, lett) > count(availableCharArray, lett)) {
				return false
			}
		}
		return true;
	}

	const submitWord = (evt: SyntheticEvent) => {
		evt.preventDefault();
		const target = evt.target as typeof evt.target & {
			wordInput: {value: string}
		}
		console.log('Written word', target.wordInput.value)
		if (lettersAvailable(target.wordInput.value, game.letters.flipped)) {
			console.log('Valid!')
			target.wordInput.value = ''
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