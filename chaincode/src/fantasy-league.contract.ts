import { Context, Contract, Default, Info } from 'fabric-contract-api'
import { MatchResult, Player, SetupDto, Team, EndResultDto, VariablesDto } from './data-model.js'
import { IFantasyLeague } from './fantasy-league.contract-interface.js'


@Info({ title: 'FantasyLeague', description: 'Smart contract for playing fantasy leagues' })
@Default()
export class FantasyLeagueContract extends Contract implements IFantasyLeague {
    ClearState(ctx: Context): Promise<void> {
        throw new Error('Method not implemented.')
    }
    Initialize(ctx: Context, dto: SetupDto): Promise<void> {
        throw new Error('Method not implemented.')
    }
    StartDraft(ctx: Context): Promise<void> {
        throw new Error('Method not implemented.')
    }
    StartSeason(ctx: Context): Promise<void> {
        throw new Error('Method not implemented.')
    }
    EndSeason(ctx: Context): Promise<void> {
        throw new Error('Method not implemented.')
    }
    GetGameVariables(ctx: Context): Promise<VariablesDto> {
        throw new Error('Method not implemented.')
    }
    AddPlayer(ctx: Context, player: Player): Promise<void> {
        throw new Error('Method not implemented.')
    }
    GetPlayer(ctx: Context, playerId: string): Promise<Player> {
        throw new Error('Method not implemented.')
    }
    GetAllPlayers(ctx: Context): Promise<Player[]> {
        throw new Error('Method not implemented.')
    }
    AddTeamAndBet(ctx: Context, team: Team): Promise<void> {
        throw new Error('Method not implemented.')
    }
    GetTeam(ctx: Context, teamId: string): Promise<Team> {
        throw new Error('Method not implemented.')
    }
    GetAllTeams(ctx: Context): Promise<Team[]> {
        throw new Error('Method not implemented.')
    }
    AddMatchResult(ctx: Context, result: MatchResult): Promise<void> {
        throw new Error('Method not implemented.')
    }
    GetMatchResult(ctx: Context, matchId: string): Promise<MatchResult> {
        throw new Error('Method not implemented.')
    }
    GetAllMatchResults(ctx: Context): Promise<MatchResult[]> {
        throw new Error('Method not implemented.')
    }
    GetPointsForTeam(ctx: Context, teamName: string): Promise<number> {
        throw new Error('Method not implemented.')
    }
    GetResults(ctx: Context): Promise<EndResultDto> {
        throw new Error('Method not implemented.')
    }

    

}