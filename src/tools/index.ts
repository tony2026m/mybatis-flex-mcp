import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import listApi from "./list-api";
import getApiDoc from "./get-api-doc";
import getChangelog from "./get-changelog";
import getApiInfo from "./get-mybatis-flex-info";

export default function registryTools(server: McpServer) {
  [listApi, getApiDoc, getChangelog, getApiInfo].forEach((registryFn) => {
    registryFn(server)
  })
}
