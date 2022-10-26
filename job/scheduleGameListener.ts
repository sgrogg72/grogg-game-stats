import { liveGameJob } from "../listener/liveGameListener";
import { fetchScheduleByDate } from "../service/nhl";
import { GameStatusCode } from "../service/types";
import { Jobs } from "./types";

export const scheduleGameListener = async (currentJobs: Jobs) => {
  const jobs = {...currentJobs};

  const schedule = await fetchScheduleByDate(new Date());
  const gamesLive = schedule.games.filter(g =>
    g.gameStatusCode === GameStatusCode.inProgress ||
    g.gameStatusCode === GameStatusCode.inProgressCritical);

  const notLiveGames = schedule.games.filter(g =>
    g.gameStatusCode !== GameStatusCode.inProgress &&
    g.gameStatusCode !== GameStatusCode.inProgressCritical);
  // start game listeners
  gamesLive.forEach((game) => {
    const id = game.gamePk.toString();
    const foundIt = Object.keys(jobs).find((k) => k === id);
    if(!foundIt) {
      const job = liveGameJob(id);
      jobs[id] = job;
    }
  });

  // stop game listeners
  notLiveGames.forEach((game) => {
    const id = game.gamePk.toString();
    const foundIt = Object.keys(jobs).find((k) => k === id);
    if(foundIt) {
      jobs[foundIt].cancel();
      delete jobs[foundIt];
    }
  });
  return jobs;
}