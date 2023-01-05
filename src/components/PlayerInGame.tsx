import { Player, Game, Message } from "../types";
import React from "react";
import { useContext, SyntheticEvent } from "react"
import { useMutation } from "@apollo/client";
import { UserContext } from ".."
import { DECLARE_READINESS, WRITE_WORD, SNATCH_WORD } from "../graphql/mutations"
import WriteWordForm from "./WriteWordForm";
import { scrabbleDict } from "../utils/dictSet";
import { lettersAvailable, isWord, canSnatch } from "../utils/wordChecking";
import { getWordString, findWordInGameById } from "../utils/helpers";

interface Props {
	player: Player
	game: Game
	selectedWordIds: string[]
	setSelectedWordIds: React.Dispatch<React.SetStateAction<string[]>>
	setMessage: React.Dispatch<React.SetStateAction<Message | null>>
}

const PlayerInGame = ({player, game, selectedWordIds, setSelectedWordIds, setMessage}: Props) => {
    const currentPlayerId = useContext(UserContext)

    const [toggleReady] = useMutation(DECLARE_READINESS)
	const [writeWord] = useMutation(WRITE_WORD)
	const [snatchWord] = useMutation(SNATCH_WORD)

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
			setMessage({ text: "Sorry, that word is invalid" })
		}
	}

	const submitSnatchedWord = (evt: SyntheticEvent) => {
		evt.preventDefault();
		const target = evt.target as typeof evt.target & {
			wordInput: {value: string}
		}
		const wordAttempt = target.wordInput.value
		// Just use the first selected word for now if there are more than one
		const snatchFrom = findWordInGameById(selectedWordIds[0], game.players);
		if (isWord(wordAttempt, scrabbleDict) && canSnatch(
			wordAttempt, snatchFrom, game.letters.flipped
		)) {
			target.wordInput.value = ''
			snatchWord({
				variables: {
					playerId: currentPlayerId,
					gameId: game.id,
					word: wordAttempt,
					snatchFromId: selectedWordIds[0]
				}
			})
		} else {
			setMessage({ text: "Sorry, that word is invalid" })
		}
		setSelectedWordIds([])
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