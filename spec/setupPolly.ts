import { Polly } from "@pollyjs/core";
import NodeHttpAdapter from "@pollyjs/adapter-node-http";
import FSPersister from "@pollyjs/persister-fs";
import { MODES } from "@pollyjs/utils";
import { setupPolly, Context } from "setup-polly-jest";
import path from "path";

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

const excludedQueryParams = ["access_token", "apikey", "key"];

export const cleanRecording = (context: Context): void => {
  context.polly.server
    .any()
    .on("beforePersist", (req, { request, response }) => {
      request.queryString = request.queryString.filter(
        ({ name }: { name: string }) => !excludedQueryParams.includes(name)
      );
      const url = new URL(request.url);
      excludedQueryParams.forEach((param) => url.searchParams.delete(param));
      request.url = url.toString();
      excludedQueryParams.forEach((param) => {
        response.content.text = response.content.text.replace(
          new RegExp(`${param}=[^&]+&`),
          ""
        );
      });
    });
};

export default (): Context =>
  setupPolly({
    mode: MODES.REPLAY,
    recordIfMissing: process.env.POLLY_RECORD
      ? process.env.POLLY_RECORD === "1"
      : false,
    recordFailedRequests: true,
    adapters: ["node-http"],
    persister: "fs",
    persisterOptions: {
      fs: {
        recordingsDir: path.resolve(__dirname, "./recordings"),
      },
    },
    matchRequestsBy: {
      url: {
        query: (query) => {
          const filteredQuery = { ...query };
          excludedQueryParams.forEach((param) => delete filteredQuery[param]);

          return filteredQuery;
        },
      },
    },
  });
