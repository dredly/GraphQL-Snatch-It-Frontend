import { gql } from "@apollo/client";
import { GAME_IN_LOBBY_DETAILS, GAME_DETAILS } from "./fragments";

export const ALL_GAMES = gql`
  	query {
    	allGames {
    		...GameInLobbyDetails
  		}
  	}
	${GAME_IN_LOBBY_DETAILS}
`;

export const ONE_GAME_IN_PROGRESS = gql`
	query oneGameInProgress($gameId: ID!) {
		oneGameInProgress(gameID: $gameId) {
			...GameDetails
		}
	}
	${GAME_DETAILS}
`;

export const GAME_EXISTS = gql`
	query gameExists($gameId: ID!) {
		gameExists(gameID: $gameId)
	}
`