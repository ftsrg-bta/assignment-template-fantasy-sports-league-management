import { Context, Contract, Default, Info, Returns, Transaction, Property, Object } from 'fabric-contract-api'

@Object()
export class Player {
    @Property('name', 'string')
    public name: string
    @Property('id', 'string')
    public id: string
}

@Object()
export class ScoreMapping {
    @Property('goals', 'number')
    public goals: number
    @Property('assists', 'number')
    public assists: number
    @Property('passes', 'number')
    public passes: number
    @Property('tackles', 'number')
    public tackles: number
    @Property('saves', 'number')
    public saves: number
    @Property('minutesPlayed', 'number')
    public minutesPlayed: number
}

@Object()
export class SetupDto{
    @Property('minBet', 'number')
    public minBet: number
    @Property('maxBet', 'number')
    public maxBet: number
    @Property('teamSize', 'number')
    public teamSize: number
    @Property('initialPlayers', 'Player[]')
    public initialPlayers: Player[]
    @Property('scoreMapping', 'ScoreMapping')
    public scoreMapping: ScoreMapping
}

@Object()
export class VariablesDto {
    @Property('minBet', 'number')
    public minBet: number
    @Property('maxBet', 'number')
    public maxBet: number
    @Property('teamSize', 'number')
    public teamSize: number
    @Property('phase', 'string')
    public phase: string
    @Property('scoreMapping', 'ScoreMapping')
    public scoreMapping: ScoreMapping
}

@Object()
export class Team {
    @Property('name', 'string')
    public name: string
    @Property('players', 'Player[]')
    public players: Player[]
    @Property('bet', 'number')
    public bet: number
}

@Object()
export class Stats {
    @Property('goals', 'number')
    public goals: number
    @Property('assists', 'number')
    public assists: number
    @Property('passes', 'number')
    public passes: number
    @Property('tackles', 'number')
    public tackles: number
    @Property('saves', 'number')
    public saves: number
    @Property('minutesPlayed', 'number')
    public minutesPlayed: number
}

@Object()
export class PlayerStats {
    @Property('playerId', 'string')
    public playerId: string
    @Property('matchId', 'string')
    public matchId: string
    @Property('stats', 'Stats')
    public stats: Stats
}

@Object()
export class MatchResult {
    @Property('matchId', 'string')
    public matchId: string
    @Property('playerStats', 'PlayerStats[]')
    public playerStats: PlayerStats[]
}

@Object()
export class TeamPoints {
    @Property('teamName', 'string')
    public teamName: string
    @Property('points', 'number')
    public points: number
    @Property('bet', 'number')
    public bet: number
}
@Object()
export class EndResultDto {
    @Property('winner', 'string')
    public winner: string
    @Property('winnings', 'number')
    public winnings: number
    @Property('teamPoints', 'TeamPoints[]')
    public teamPoints: TeamPoints[]
}


export enum ObjectTypes {
    Player = 'Player',
    Team = 'Team',
    PlayerStats = 'PlayerStats'
}
export enum ValueKeys {
    minBet = 'minBet',
    maxBet = 'maxBet',
    teamSize = 'teamSize',
    phase = 'phase',
    scoreMapping = 'scoreMapping'
}
export enum Phase {
    Setup = 'Setup',
    Draft = 'Draft',
    Play = 'Play',
    End = 'End'
}

