import { PlayerInfo, Game, Letter } from "../types";
import { useContext, SyntheticEvent } from "react"
import { useMutation } from "@apollo/client";
import { UserContext } from ".."
import { DECLARE_READINESS } from "../mutations";
import WriteWordForm from "./WriteWordForm";
import { scrabbleDict } from "../utils/dictSet";

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

	const isWord = (wordAttempt: string, dictSet: Set<string>) => {
		return dictSet.has(wordAttempt.toUpperCase());
	}

	const submitWord = (evt: SyntheticEvent) => {
		evt.preventDefault();
		const target = evt.target as typeof evt.target & {
			wordInput: {value: string}
		}
		const wordAttempt = target.wordInput.value
		if (lettersAvailable(wordAttempt, game.letters.flipped) && isWord(wordAttempt, scrabbleDict)) {
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