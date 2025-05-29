import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import { api } from "../common/api.js"

export function registerTools(server: McpServer) {
  server.tool(
    "search_knowledge_base",
    "Search the knowledge base for relevant information",
    {
      query: z.string().describe("The user's question or query"),
    },
    async ({ query }) => {
      try {
        // 这里我们假设你的 API 端点是 /api/rag/search
        // 实际使用时请替换成你的真实 API 端点
        const result = await api.post<{ text: string }>("/api/rag/search", {
          query,
        })

        const content = result.text.trim()
        if (!content) {
          return {
            content: [
              {
                type: "text",
                text: "No relevant information found in the knowledge base.",
              },
            ],
          }
        }

        return {
          content: [
            {
              type: "text",
              text: content,
            },
          ],
        }
      } catch (error: any) {
        const errorMessage = error?.message || "Unknown error"
        return {
          content: [
            {
              type: "text",
              text: `Error querying knowledge base: ${errorMessage}`,
            },
          ],
          isError: true,
        }
      }
    }
  )
}
