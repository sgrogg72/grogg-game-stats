import { Response } from "node-fetch";

export class HTTPResponseError extends Error {
  response: Response;
	constructor(response: Response, ...args: []) {
		super(`HTTP Error Response: ${response.status} ${response.statusText}`, ...args);
		this.response = response;
	}
}