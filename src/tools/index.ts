import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import { api } from "../common/api.js"

export function registerTools(server: McpServer) {
  server.tool(
    "search_mpx_knowledge_base",
    "Search the Mpx RAG knowledge base for relevant information",
    {
      query: z.string().describe("The user's question or query"),
    },
    async ({ query }) => {
      try {
        const result = await api.post("chat-messages", {
          query,
          inputs: {},
          user: "guest",
          response_mode: "blocking",
        })

        const content = result.answer?.trim()
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
