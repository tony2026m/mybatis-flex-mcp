# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-01-29

### Added
- 🎉 Initial release
- ✨ MCP server for MyBatis-Flex documentation query
- 📚 `list-api` tool - List all available MyBatis-Flex APIs and features
- 📖 `get-api-doc` tool - Get detailed API/feature documentation with usage examples
- 📝 `get-changelog` tool - Get MyBatis-Flex changelog and version history
- ℹ️ `get-mybatis-flex-info` tool - Get MyBatis-Flex overview and version info
- 🎯 Built-in system prompts for MyBatis-Flex usage guidance
- 💾 Caching mechanism for improved performance (using node-cache)
- 🌐 Support for ES Module
- 📦 Ready for npx usage
- 🛠️ Documentation extraction script for custom MyBatis-Flex versions

### Features
- Support for all MyBatis-Flex modules:
  - Introduction (Getting Started, Maven, Database Support)
  - Basic Features (CRUD, QueryWrapper, Chain Operations, Relations Query, Batch Operations)
  - Core Features (Annotations, Logic Delete, Optimistic Lock, Data Fill, Multi-datasource, Read-Write Splitting, Data Permission, Multi-tenancy)
  - Other Features (Code Generator, APT, FAQ)
- Comprehensive API documentation with code examples
- Version tracking and changelog
- Node.js >= 20.0.0 support
- Built on @modelcontextprotocol/sdk v1.25.3
- TypeScript support

### Technical Details
- Built with TypeScript 5.8.2
- Uses tsup for building
- Includes vfile-matter for markdown frontmatter parsing
- Zod for schema validation
- Python scripts for document extraction from MyBatis-Flex repository

[0.1.0]: https://github.com/tony2026m/mybatis-flex-mcp/releases/tag/v0.1.0
