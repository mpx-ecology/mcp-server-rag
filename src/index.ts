#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { registerTools } from "./tools/index.js"

const server = new McpServer({
  name: "mcp-server-starter",
  version: "0.0.1",
})

async function main() {
  registerTools(server)
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error("MCP Server running on stdio")
}

main().catch((error) => {
  console.error("Fatal error in main():", error)
  process.exit(1)
})
