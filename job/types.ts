import { Job } from "node-schedule";

export interface Jobs {
  [key: string]: Job;
}