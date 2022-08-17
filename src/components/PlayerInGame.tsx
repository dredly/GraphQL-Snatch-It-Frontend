import { Player } from "../types";

const PlayerInGame = ({player}: {player: Player}) => {
	return <div>
		{player.name} - {player.ready ? 'READY' : 'NOT READY'}
	</div>
}

export default PlayerInGame;