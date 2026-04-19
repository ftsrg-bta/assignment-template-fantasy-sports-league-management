# Fantasy Sports League Management – Specification

> [!IMPORTANT]
> **Please make sure to review the authoritative assignment requirements at the [assignments wiki](https://github.com/ftsrg-bta/assignments/wiki).**


## Overview

Fantasy sports leagues allow participants to create virtual teams made up of real soccer players.  Teams earn points based on how well their chosen players perform in real matches, using simple metrics like goals scored, assists, passes completed, and others.  At the end of the season, the teams with the most points share rewards from a betting pool.

In this homework, you will create a smart contract (chaincode) for managing a Fantasy Soccer League using Hyperledger Fabric.  Your solution will follow a provided interface and data structures (DTOs).


## Getting Started

We recommend using the [Hyperledger Fabric Debugger for VS Code](https://marketplace.visualstudio.com/items?itemName=Spydra.hyperledger-fabric-debugger), as the project is already configured for it.  Make sure to install its prerequisites.



## Your Task

Implement a smart contract that manages the entire Fantasy Soccer League lifecycle.  Your chaincode should clearly handle four main phases:

### 1. Setup Phase

- **Initialization:** The administrator sets:
  - Minimum and maximum betting amounts.
    - The maximum bet must be strictly greater than the minimum bet.  A bet may be placed when `minBet <= bet <= maxBet`.
    - Both the minimum and maximum bets must be positive numbers.
  - Team size (number of players each team must have).
    - Team size must be a positive integer.
  - Initial list of available soccer players.
    - This initial number of players must honour the team size value.
  - Scoring rules based on soccer statistics.
    - Statistical values like `goals`, `assists`, `passes`, etc must be nonnegative numbers.
  - Captain multiplier: an integer of at least `1`.  The performance stats of each team’s designated captain are multiplied by this value when computing that team’s match score.
  - Initialization must be possible to call on a completely blank ledger state.
  - Attempting to initialize a second time is an error.

- **Player Management:** Administrator can add new players to the league.

### 2. Draft Phase

- **Team Registration:** Users create unique teams by choosing players from the available pool.
  - The same player may be selected by more than one team.
  - Each team must designate one of its selected players as **captain** (`captainPlayerId`).  The captain must be one of the team’s own selected players.  The `Team` asset stores `captainPlayerId` and `GetTeam` returns it.
- **Betting:** Users place bets within the limits defined during setup.

### 3. Play Phase

- **Recording Match Results:** Administrator inputs player performance data for matches (exactly 6 metrics per player: goals, assists, passes, tackles, saves, and minutes played).
  - All metrics must be nonnegative values.
  - A given match’s results may only be recorded once.
  - The match IDs in the `PlayerStats` included in the match result must agree with the match ID of the parent `MatchResult`.
  - No metrics may be recorded for nonexistent players.
- **Scoring:** The chaincode calculates the total points for each team based on their players’ performances.

### 4. End Phase

- **Ranking:** Teams are ranked by total points accumulated throughout the season.
  - If two or more teams have equal points, the team that registered first is ranked higher.  There may only be one final winner.
- **Payout:** The teams can check their ranking and the amount they will receive from the betting pool.

### Payout Logic

Teams are ranked by total points.  Total points are calculated as the sum of all players’ points in the team.  A player’s points are calculated by multiplying their performance metrics by the corresponding scoring rules defined during the setup phase.  The captain is an exception: each of the captain’s six performance metrics is first multiplied by `captainMultiplier` before applying the scoring rules.

The winning team’s reward is the sum of all bets.


## Data model

The included classes in the repository define the data model for your chaincode.  Please use the included serializer to serialize and deserialize the objects.
They have to be written to the chaincode state to the following keys:

| Composite Key Object Type | Keys (Attributes)     | Class         |
|---------------------------|-----------------------|---------------|
| `Player`                  | `id`                  | `Player`      |
| `Team`                    | `name`                | `Team`        |
| `PlayerStats`             | `playerId`, `matchId` | `PlayerStats` |

Also, the following single key-value pairs are used to store the league configuration:

| Key                 | Type                                          |
|-------------------- |-----------------------------------------------|
| `minBet`            | `number`                                      |
| `maxBet`            | `number`                                      |
| `teamSize`          | `number`                                      |
| `phase`             | `"Setup"` or `"Draft"` or `"Play"` or `"End"` |
| `scoreMapping`      | `ScoreMapping`                                |
| `captainMultiplier` | `number`                                      |

Please note that the `phase` key is used to determine the current phase of the league.  The chaincode should enforce that only valid actions can be performed in each phase.


## Error Handling

> [!NOTE]
> Unless stated otherwise, failing any requirement must result in the transaction **reverting;** ie, throwing a chaincode exception.

Your smart contract must include clear and helpful error messages for invalid actions (such as duplicate entries, bets outside allowed ranges, invalid team compositions, and actions attempted in the wrong lifecycle phase).

### Operation Phases

Each operation is valid **only** in the phase(s) listed for it.  Any attempt to invoke an operation outside its permitted phase(s) must throw an error.  Specifically:

- `AddPlayer` — Setup phase only.
- `AddTeamAndBet` — Draft phase only.
- `AddMatchResult` — Play phase only.
- `StartDraft` — Setup phase only.
- `StartSeason` — Draft phase only.
- `EndSeason` — Play phase only.
- `GetPointsForTeam`, `GetResults` — End phase only.
- Read operations (`GetPlayer`, `GetAllPlayers`, `GetTeam`, `GetAllTeams`, `GetMatchResult`, `GetAllMatchResults`, `GetGameVariables`) — available in all phases after initialisation.


## Additional Requirements

- Follow exactly the provided chaincode interface and DTO structures (available in the provided repository).
- Document clearly:
  - How state-changing methods update the blockchain.
  - What data query methods return.
- Implement correct scoring calculations.
- Include robust error handling using chaincode exceptions.
- Unless explicitly stated otherwise, string parameters like the `id` and `name` of a `Player` must be non-emty strings (cannot be `null`, `undefined`, `""`, or whitespace-only).


## Testing

Write automated tests following standard Hyperledger Fabric conventions.  Tests should cover:

- Initialization and league setup
- Adding players
- Team registration and betting
- Match result recording
- Team score calculations
- Ranking and payout distribution


## Assignment Owner 

| Year | Owner                                                                                       |
|:----:|:-------------------------------------------------------------------------------------------:|
| 2026 | Martin Farkas `<martin.farkas@edu.bme.hu>` [@BlackLight54](https://github.com/BlackLight54) |
| 2025 | Martin Farkas `<martin.farkas@edu.bme.hu>` [@BlackLight54](https://github.com/BlackLight54) |
