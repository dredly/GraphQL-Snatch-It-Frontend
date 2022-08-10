export interface Player {
	name: string
	ready: boolean
	id: string
}

export interface GameInfo {
	players: Player[]
	id: string
}