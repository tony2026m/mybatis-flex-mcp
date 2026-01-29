import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {getApiInfo} from "../utils/components";

/** 获取组件示例代码 */
const registryTool = (server: McpServer) => {
  server.tool(
    "get-mybatis-flex-info",
    `获取 Mybatis-Flex（mybatis-flex）简介、概况信息、version
适用场景：
1. 用户询问什么是 Mybatis-Flex（mybatis-flex）
2. 用户需要知道 Mybatis-Flex（mybatis-flex）的版本信息时
`,
    async () => {
      const apiInfo = await getApiInfo();
      return {
        content: [
          {
            type: "text",
            text: `Mybatis-Flex（mybatis-flex）的概况信息：${apiInfo}`,
          },
        ],
      };
    },
  );
}

export default registryTool;
