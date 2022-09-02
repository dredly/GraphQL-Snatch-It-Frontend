export interface Player {
	name: string
	ready: boolean
	id: string
}

export interface GameInfo {
	players: Player[]
	id: string
}

export interface Letter {
	id: string
	value: string
	exposed: boolean
}

export interface Game extends GameInfo {
	letters: Letter[]
}