import { GameInfo } from "../types"
import Game from "./Game"

const Lobby = ({games}: {games: GameInfo[]}) => {
	return (
		<div>
			<h1>{games.length} games currently open</h1>
			{games.map(g => (
				<Game players={g.players} id={g.id} key={g.id} />
			))}
		</div>
	)
}

export default Lobby