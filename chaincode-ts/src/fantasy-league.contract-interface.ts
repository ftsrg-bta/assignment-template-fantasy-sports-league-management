import { Context, Contract, Default, Info, Transaction } from 'fabric-contract-api'
import { EndResultDto, MatchResult, Player, SetupDto, Team } from './data-model'

export interface IFantasyLeague {
    // ===== CLEAR =====
    ClearState(ctx: Context): Promise<void>;

    // ===== LIFECYCLE =====
    Initalize(ctx: Context, dto: SetupDto): Promise<void>
    StartDraft(ctx: Context): Promise<void>
    StartSeason(ctx: Context): Promise<void>
    EndSeason(ctx: Context): Promise<void>
    // ===== VARIABLES =====
    GetGameVariables(ctx: Context): Promise<any>;

    // ===== PLAYERS =====
    AddPlayer(ctx: Context, player: Player): Promise<void>
    GetPlayer(ctx: Context, playerId: string): Promise<Player>;
    GetAllPlayers(ctx: Context): Promise<Player[]>;

    // ===== TEAMS =====
    AddTeamAndBet(ctx: Context, team: Team): Promise<void>
    GetTeam(ctx: Context, teamId: string): Promise<Team>;
    GetAllTeams(ctx: Context): Promise<Team[]>;


    // ===== MATCHES =====
    AddMatchResult(ctx: Context, result: MatchResult): Promise<void> 
    GetMatchResult(ctx: Context, matchId: string): Promise<MatchResult>;
    GetAllMatchResults(ctx: Context): Promise<MatchResult[]>;
    // ===== RESULTS=====
    getPointsForTeam(ctx: Context, teamName: string): Promise<number>
    getResults(ctx: Context): Promise<EndResultDto>


}
