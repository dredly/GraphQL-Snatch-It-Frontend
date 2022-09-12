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

export const GAME_BY_ID = gql`
	query gameById($gameId: ID!) {
		gameById(gameID: $gameId) {
			...GameDetails
		}
	}
	${GAME_DETAILS}
`