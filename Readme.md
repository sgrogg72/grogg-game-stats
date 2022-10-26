A proof data ingest or ETL (Extract, Transform, Load) for nhl data using the nhl public api.  Consists of a Node cron job process that processes the data and saves it to a Sqlite database.

## Getting Started

### Create database

The database is sqlite database that consists one table `GameData`.  To create the database and table run:

```
yarn createGameData
```

### Test

```
yarn test
```

### Run

```
yarn start
```
## Design

```mermaid
sequenceDiagram
    Games Listener->>NHL Service: fetch todays schedule
    NHL Service->>NHL Public Api: get schedule by current date
    NHL Public Api-->>NHL Service: return api schedule
    NHL Service-->>Games Listener: return simplified data
    Games Listener->>Live Game Listener: create for each in-progress game
    Live Game Listener->>NHL Service: fetch live game
    NHL Service->>NHL Public Api: get live game
    NHL Public Api-->>NHL Service: return live game data
    NHL Service-->>Live Game Listener: return simplified game
    Live Game Listener->>Database: save live data
```

### Games Listener
A Schedule Cron Job that retrieves the schedule games for the day.  If there are games that are in-progress, the listener will create a listener for each in-progress game.  The Listener manages all the in-progress game listeners and is responsible for tracking and cleaning up all live game listeners.

### Live Game Listener
A Cron Job that fetches the live game data from the NHL Service and processes the return data and saves a snapshot of the data at that time to a Sqlite database.
### NHL Service
Interface to extract data from the NHL Public API.  This service is responsible for transforming data returned from the public api and condensing it into smaller objects to be used by the caller of the service.
### NHL Public API
Use to fetch raw live game data to ingest into the database.
### Database
Sqlite database `sqlite/game.db` that store a snapshot of player stats.  Using Sqlite3 and library to do run basic queries.  This was designed to only be a temporary store for the data that could be consumed by a consumer.  

#### Model
```typescript
export interface GameDataModel {
  playerId: string;
  playerName: string;
  teamId: string;
  teamName: string;
  playerAge?: string;
  playerNumber: string;
  playerPosition: string;
  assists: string;
  goals: string;
  hits: string;
  points: string;
  penaltyMinutes: string;
  opponentTeam: string;
  createdUnixTime?: number; //unix timestamp integer
```

## Improvements

Better logging support.
More Integration Tests and Unit Test code coverage.
Independent pieces / services that have single responsibility.
Better linting and code formatting.
Easier to use data model.  Simple ORM used to inject data.
Database / Storage - I would have liked this to be more of a data stream.
Better understanding of NHL Public API.


## Future Design Considerations

ETL(Extract Transform Load) Work Flow State Machine.  AWS Lambda based Step Functions would be a good start to improved performance and scalability.  Also, get a lot better error handling when issues wrong.  Can use work flow step script to retry and catch errors that can be sent to other workflow steps.
1. Trigger - CloudWatch Event scheduled to trigger State Machine to trigger ETL Workflow.  Only issue here is that there is a 1 minute constraint on how fast you can listen for updates.  We would need to get creative here to figure out a way to extract data at a faster rate.
2. Extract and Transform - AWS Lambda use to extract needed data from public API.  `/service/nhl` Could be the start of a lambda based service that does this.  It can also do some of the transformation of data as well.  GraphQL could be an option here for extracting and transforming data.
3. Load - Separate work flow step for persisting transformed data into RDS or a Data warehouse.  Giving more flexibility like Sqlite.
4. Consumption - Potentially we could load the as data streams (Kinesis) that could be easily consumed by AWS Lambda event to get more realtime data feeds.
5. Deployment Automation - Use Serverless / Terraform to automate deployment process.