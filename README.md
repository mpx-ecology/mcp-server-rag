# MCP Server for Mpx Docs RAG

## Usage

### VS Code

在 `setting.json` 中配置 MCP Server

1. 通过 npm 包加载（推荐）

> 目前暂未发布 npm 包，请先使用下面的方式 2 本地调试体验

```json
{
  // ..
  "mcp": {
    "servers": {
      "mcp-server-mpx-rag": {
        "type": "stdio",
        "command": "npx",
        "args": ["-y", "@mpxjs/mcp-server-rag"]
      }
    }
  }
}
```

2. 本地 clone 编译项目后调试：

```json
{
  // ..
  "mcp": {
    "servers": {
      "mcp-server-mpx-rag": {
        "type": "stdio",
        "command": "node",
        "args": ["/Users/didi/mycode/github/mcp-server-rag/dist/index.js"]
      }
    }
  }
}
```
