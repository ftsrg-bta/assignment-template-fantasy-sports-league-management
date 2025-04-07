# Fantasy Sports League Management

## Getting Started

We recommend using the [Hyperledger Fabric Debugger for VSC](https://marketplace.visualstudio.com/items?itemName=Spydra.hyperledger-fabric-debugger), as the project is already configured for it.
Make sure to install its prerequisites.


## Overview

Fantasy sports leagues allow participants to create virtual teams made up of real soccer players.
Teams earn points based on how well their chosen players perform in real matches, using simple metrics like goals scored, assists, passes completed, and others.
At the end of the season, the teams with the most points share rewards from a betting pool.

In this homework, you will create a smart contract (chaincode) for managing a Fantasy Soccer League using Hyperledger Fabric.
Your solution will follow a provided interface and data structures (DTOs), and it will be compared against your classmates' solutions as part of an experiment.


## Technical Environment

- **Blockchain Platform:** Hyperledger Fabric (latest version)
- **Programming Language:** TypeScript


## Your Task

Implement a smart contract that manages the entire Fantasy Soccer League lifecycle.
Your chaincode should clearly handle four main phases:

### 1. Setup Phase

- **Initialization:** The administrator sets:
  - Minimum and maximum betting amounts.
  - Team size (number of players each team must have).
  - Initial list of available soccer players.
  - Scoring rules based on soccer statistics.

- **Player Management:** Administrator can add new players to the league.

### 2. Draft Phase

- **Team Registration:** Users create unique teams by choosing players from the available pool.
- **Betting:** Users place bets within the limits defined during setup.

### 3. Play Phase

- **Recording Match Results:** Administrator inputs player performance data for matches (exactly 6 metrics per player: goals, assists, passes, tackles, saves, and minutes played).
- **Scoring:** The chaincode calculates the total points for each team based on their players' performances.

### 4. End Phase

- **Ranking:** Teams are ranked by total points accumulated throughout the season.
- **Payout:** The teams can check their ranking and the amount they will receive from the betting pool.

### Payout Logic

Teams are ranked by total points. Total points are calculated as the sum of all players' points in the team. A player's points are calculated by multiplying their performance metrics by the corresponding scoring rules defined during the setup phase. 


## Data model

The included classes in the repository define the data model for your chaincode.
Please use the included serializer to serialize and deserialize the objects.
They have to be written to the chaincode state to the following keys:

| Composite Key Object Type | Keys (Attributes)     | Class         |
|---------------------------|-----------------------|---------------|
| `Player`                  | `id`                  | `Player`      |
| `Team`                    | `name`                | `Team`        |
| `PlayerStats`             | `playerId`, `matchId` | `PlayerStats` |

Also, the following single key-value pairs are used to store the league configuration:

| Key            | Type                                          |
|----------------|-----------------------------------------------|
| `minBet`       | `number`                                      |
| `maxBet`       | `number`                                      |
| `teamSize`     | `number`                                      |
| `phase`        | `"Setup"` or `"Draft"` or `"Play"` or `"End"` |
| `scoreMapping` | `ScoreMapping`                                |

Please note that the `phase` key is used to determine the current phase of the league.
The chaincode should enforce that only valid actions can be performed in each phase.


## Error Handling

Your smart contract must include clear and helpful error messages for invalid actions (such as duplicate entries, bets outside allowed ranges, invalid team compositions, and actions attempted in the wrong lifecycle phase).


## Requirements

- Follow exactly the provided chaincode interface and DTO structures (available in the provided repository).
- Document clearly:
  - How state-changing methods update the blockchain.
  - What data query methods return.
- Implement correct scoring calculations.
- Include robust error handling using chaincode exceptions.


## Testing

Write automated tests following standard Hyperledger Fabric conventions. Tests should cover:

- Initialization and league setup
- Adding players
- Team registration and betting
- Match result recording
- Team score calculations
- Ranking and payout distribution


## Acceptance Criteria

> [!IMPORTANT]
> Your submission will be accepted if:
> 
> - Your chaincode compiles and runs successfully.
> - You adhere strictly to the provided interface and DTO definitions.
> - You correctly manage lifecycle phases with clear state transitions.
> - Errors are handled properly with clear exception messages.
> - All tests pass successfully.
> - Documentation is clear and complete.
>
> More information: https://github.com/ftsrg-bta/assignments/wiki


**Good luck, and have fun!**


## Assignment Owner 

| Year | Owner                                                                                       |
|:----:|:-------------------------------------------------------------------------------------------:|
| 2025 | Martin Farkas `<martin.farkas@edu.bme.hu>` [@BlackLight54](https://github.com/BlackLight54) |
