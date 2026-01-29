import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getApiDocumentation } from "../utils/components";

/** 获取组件文档 */
const registryTool = (server: McpServer) => {
  server.tool(
    "get-api-doc",
    `通过名称，获取 Mybatis-Flex（mybatis-flex） 特定功能api的详细文档
适用场景：
1. 用户询问如何使用特定api或功能
2. 用户需要查看api、功能的 介绍，使用限制、使用场景、示例代码等`,
    { apiName: z.string().description("api或功能名称。例如：IService, QueryWrapper, @Table 注解等") },
    async ({ apiName }) => {
      const documentation = await getApiDocumentation(apiName);
      return {
        content: [
          {
            type: "text",
            text: `${apiName} 的文档：${documentation} 如有版本说明需要提醒用户需要使用某个版本及以上的版本`,
          },
        ],
      };
    },
  );
}

export default registryTool;
