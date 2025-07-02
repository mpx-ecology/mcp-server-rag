# MCP Server for Mpx Docs RAG

## Usage

### VS Code

在 `setting.json` 中配置 MCP Server

1. 通过 npm 包加载（推荐）

```json
{
  // ..
  "mcp": {
    "servers": {
      "mpx-rag": {
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
      "mpx-rag": {
        "type": "stdio",
        "command": "node",
        "args": ["/Users/didi/mycode/github/mcp-server-rag/dist/index.js"]
      }
    }
  }
}
```

## 演示

VS Code 中通过 Copilot Chat 调用 MCP Server 如下：

<img width="420" alt="mpx-rag" src="https://github.com/user-attachments/assets/2def560e-08ee-414a-a419-38ba05235bde" />
