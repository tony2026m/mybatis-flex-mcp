import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { loadApisList } from "../utils/components";

/** 列出所有可用的 Mybatis-Flex API */
const registryTool = (server: McpServer) => {
  server.tool(
    "list-api", `当用户根据业务需求和PRD进行后端开发，需要使用 Mybatis-Flex（mybatis-flex）框架进行数据库操作时使用此工具。
此工具仅返回框架可用的功能(API)列表。
调用此工具后，你必须根据你的业务需求、来选择符合你业务需求的功能api，进行数据库的构建和数据操作
`,
      async () => {
      const apis = await loadApisList();
      return {
        content: [
          {
            type: "text",
            text: `以下是Mybatis-Flex可用的功能：${JSON.stringify(apis)}`,
          },
        ],
      };
    });
}

export default registryTool;
