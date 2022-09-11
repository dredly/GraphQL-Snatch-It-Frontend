import { gql } from "@apollo/client";

export const GAME_ADDED = gql`
	subscription {
		gameAdded {
			id
			started
			players {
				id
				name
				ready
			}
		}
	}
`

export const GAME_INFO_UPDATED = gql`
	subscription {
		gameUpdated {
			id
			started
			players {
				id
				name
				ready
			}
		}
	}
`

export const GAME_STARTED = gql`
	subscription {
		gameStarted {
			id
			started
			players {
				id
				name
				ready
			}
		}
	}
`

export const GAME_UPDATED = gql`
	subscription {
		gameUpdated {
			id
			started
			players {
				id
				name
				ready
				words {
					id
					letters {
						id
						value
					}
				}
			}
			letters {
				unflipped {
					id
					value
				}
				flipped {
					id
					value
				}
			}
		}
	}
`