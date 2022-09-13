import { Player, Game } from "../types";
import React from "react";
import { useContext, SyntheticEvent } from "react"
import { useMutation } from "@apollo/client";
import { UserContext } from ".."
import { DECLARE_READINESS, WRITE_WORD } from "../graphql/mutations"
import WriteWordForm from "./WriteWordForm";
import { scrabbleDict } from "../utils/dictSet";
import { lettersAvailable, isWord } from "../utils/wordChecking";
import { getWordString } from "../utils/helpers";

interface Props {
	player: Player
	game: Game
	selectedWordIds: string[]
	setSelectedWordIds: React.Dispatch<React.SetStateAction<string[]>>
}

const PlayerInGame = ({player, game, selectedWordIds, setSelectedWordIds}: Props) => {
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
				word: wordAttempt,
			}})
		} else {
			console.log('Invalid')
		}
	}

	const submitSnatchedWord = (evt: SyntheticEvent) => {
		evt.preventDefault();
		const target = evt.target as typeof evt.target & {
			wordInput: {value: string}
		}
		const wordAttempt = target.wordInput.value
		if (isWord(wordAttempt, scrabbleDict)) {
			console.log(`Snatching -- word attempt = ${wordAttempt}`);
		} else {
			console.log('Invalid')
		}
		
	}

	const selectWord = (wordId: string) => {
		setSelectedWordIds(selectedWordIds.concat(wordId));
	}

	const clearWords = () => {
		setSelectedWordIds([]);
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
				? 
					<>
						<WriteWordForm 
							onSubmit={selectedWordIds.length ?  submitSnatchedWord : submitWord} 
							submitButtonText={selectedWordIds.length ? 'Snatch it!' : 'Write'}
						/>
						<button onClick={clearWords}>Clear selection</button>
					</>
				: null
			}
			<h4>Words</h4>
			<ul>
				{player.words.map(word => (
					<li key={word.id}>
						<button onClick={() => selectWord(word.id)}>{getWordString(word)}</button>
					</li>
				))}
			</ul>
        </div>
    )
}

export default PlayerInGame