import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {getChangelog} from "../utils/components";

/** 获取组件更新历史changelog */
const registryTool = (server: McpServer) => {
  server.tool(
    "get-changelog",
    `获取 Mybatis-Flex（mybatis-flex）的更新日志 Changelog
适用场景：
1. 需要了解框架的更新历史时
2. 需要知道框架更新、新增了哪些特性、功能时
`,
    async () => {
      const changelog = await getChangelog();
      return {
        content: [
          {
            type: "text",
            text: `Mybatis-Flex Changelog：${changelog}`,
          },
        ],
      };
    },
  );
}

export default registryTool;
