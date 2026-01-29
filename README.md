# @tony2026m/mybatis-flex-mcp

[![npm version](https://img.shields.io/npm/v/@tony2026m/mybatis-flex-mcp.svg)](https://www.npmjs.com/package/@tony2026m/mybatis-flex-mcp)
[![license](https://img.shields.io/npm/l/@tony2026m/mybatis-flex-mcp.svg)](https://github.com/tony2026m/mybatis-flex-mcp/blob/main/LICENSE)

> An MCP (Model Context Protocol) service for Mybatis-Flex API query | 一个减少 Mybatis-Flex 框架实现数据库操作代码时产生幻觉的 MCP 服务

## 📖 简介

`@tony2026m/mybatis-flex-mcp` 是一个专为 MyBatis-Flex ORM 框架设计的 MCP 服务器，提供：

- 🔍 **API 列表查询** - 快速浏览 MyBatis-Flex 所有可用的功能和 API
- 📚 **功能文档查询** - 获取详细的功能使用文档、API 说明和使用场景
- 💡 **代码示例获取** - 提供实际可运行的代码示例
- 📝 **更新日志查询** - 了解 MyBatis-Flex 的版本变更历史
- 🎯 **系统提示词** - 内置专业的 MyBatis-Flex 使用指导
- ⚡ **缓存机制** - 提供高性能的文档查询体验

## 什么时候需要自行提取文档？

1. 你想使用最新版本的 MyBatis-Flex 文档
2. 你想使用特定版本的 MyBatis-Flex 文档

### 提取 MyBatis-Flex 文档

```bash
# 克隆 MyBatis-Flex 仓库
git clone https://github.com/mybatis-flex/mybatis-flex.git ./.temp/mybatis-flex --depth 1 --branch master --single-branch --filter=blob:none

# 在当前目录执行提取文档命令
npx @tony2026m/mybatis-flex-mcp extract [mybatis-flex repo path]  # 默认提取路径为 ./.temp/mybatis-flex
```

## 🚀 快速开始

### 作为 MCP 服务器使用（推荐）

在 Cursor 或其他支持 MCP 的 AI 编辑器中配置：

```json
{
  "mcpServers": {
    "Mybatis-Flex": {
      "command": "npx",
      "args": ["@tony2026m/mybatis-flex-mcp"]
    }
  }
}
```

或者使用本地安装：

```bash
npm install -g @tony2026m/mybatis-flex-mcp
```

然后配置：

```json
{
  "mcpServers": {
    "Mybatis-Flex": {
      "command": "mybatis-flex-mcp"
    }
  }
}
```

### 直接运行

```bash
# 使用 npx（无需安装）
npx @tony2026m/mybatis-flex-mcp

# 或全局安装后运行
npm install -g @tony2026m/mybatis-flex-mcp
mybatis-flex-mcp
```

## 🛠️ 可用工具

MCP 服务器提供以下工具：

### 1. `list-api`
列出所有可用的 MyBatis-Flex 功能和 API

**使用场景：**
- 当用户进行后端开发，需要使用 MyBatis-Flex 进行数据库操作时
- 查看框架提供的所有功能模块和 API

### 2. `get-api-doc`
获取特定功能或 API 的详细文档

**参数：**
- `apiName` - API 或功能名称（如 "QueryWrapper"、"IService"、"@Table 注解" 等）

**使用场景：**
- 用户询问如何使用特定 API 或功能
- 需要查看 API 的介绍、使用限制、使用场景、示例代码等

### 3. `get-changelog`
获取 MyBatis-Flex 的更新日志

**使用场景：**
- 了解 MyBatis-Flex 的版本变更历史
- 查看特定版本的新增功能和修复

### 4. `get-mybatis-flex-info`
获取 MyBatis-Flex 的概况信息和当前版本

**使用场景：**
- 了解 MyBatis-Flex 框架的基本信息
- 查看当前文档对应的版本

## 📚 支持的功能模块

本 MCP 服务涵盖 MyBatis-Flex 的所有核心功能：

- **简介模块**: 快速开始、Maven 依赖、数据库支持等
- **基础功能**: 增删改查、QueryWrapper、链式操作、关联查询、批量操作等
- **核心功能**: 注解配置、逻辑删除、乐观锁、数据填充、多数据源、读写分离、数据权限、多租户等
- **其他功能**: 代码生成器、APT 设置、常见问题等

## 📦 系统要求

- Node.js >= 20.0.0
- 支持 MCP 协议的客户端（如 Cursor、Claude Desktop 等）

## 🔧 开发

```bash
# 克隆仓库
git clone https://github.com/tony2026m/mybatis-flex-mcp.git
cd mybatis-flex-mcp

# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 测试
pnpm test

# 使用 MCP Inspector 调试
pnpm inspector
```

## 📄 许可证

MIT License - 详见 [LICENSE](./LICENSE) 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 👨‍💻 作者

**tony2026m**
- Email: mly7758@163.com

## 🙏 致谢

本项目基于 [MyBatis-Flex](https://mybatis-flex.com/) 官方文档构建。

## 📝 更新日志

查看 [CHANGELOG.md](./CHANGELOG.md) 了解版本历史。
