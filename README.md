# MCP Server Starter

一个用于快速开发 Model Context Protocol (MCP) 服务器的 TypeScript 模板项目。MCP 是一个用于 AI 模型和应用程序之间通信的协议，本项目提供了基础的开发框架和工具集成。

## 功能特点

- 基于 TypeScript 的 MCP 服务器实现
- 完整的 API 请求工具封装
- 内置的错误处理和类型检查
- 支持自定义工具注册和扩展
- 提供基础示例实现

## 快速开始

### 安装

```bash
# 使用 npm
npm install @jojojs/mcp-server-starter

# 使用 pnpm
pnpm add @jojojs/mcp-server-starter

# 使用 yarn
yarn add @jojojs/mcp-server-starter
```

### 基本使用

1. 创建一个新的 MCP 服务器实例：

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"

const server = new McpServer({
  name: "my-mcp-server",
  version: "1.0.0",
})

// 启动服务器
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error("MCP Server running on stdio")
}

main().catch((error) => {
  console.error("Fatal error:", error)
  process.exit(1)
})
```

2. 注册自定义工具：

```typescript
import { z } from "zod"

server.tool(
  "search_knowledge_base",
  "从知识库中检索相关信息",
  {
    query: z.string().describe("用户的查询内容"),
  },
  async ({ query }) => {
    // 实现你的工具逻辑
    return {
      content: [
        {
          type: "text",
          text: "检索结果...",
        },
      ],
    }
  }
)
```

## API 工具使用

项目提供了 API 请求工具封装，使用示例：

```typescript
import { api } from "@jojojs/mcp-server-starter/common/api"

// 配置 API
api.configureApi({
  baseUrl: "http://your-api-url",
  headers: {
    Authorization: "Bearer your-token",
  },
})

// 发送请求
const response = await api.post("/endpoint", {
  key: "value",
})
```

## 开发调试

```bash
# 安装依赖
pnpm install

# 开发模式运行
pnpm dev

# 构建项目
pnpm build
```

## 项目结构

```
src/
  ├── index.ts          # 入口文件
  ├── common/
  │   └── api.ts        # API 工具封装
  └── tools/
      └── index.ts      # 工具注册和实现
```
