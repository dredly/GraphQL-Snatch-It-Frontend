import { gql } from "@apollo/client";

export const CREATE_PLAYER = gql`
	mutation createPlayer($name: String!) {
		createPlayer(name: $name) {
			id
			name
  		}
	}
`;