import { GameInfo } from "../types"

const Game = (props: GameInfo) => {
	return (
		<div>
			<h2>{`${props.players[0].name}'s game`}</h2>
			<p>Not yet started</p>
		</div>
	)
}

export default Game