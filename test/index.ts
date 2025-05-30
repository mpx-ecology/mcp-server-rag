import { api } from "./../src/common/api"

const fn = async (query: string) => {
  const result = await api.post("chat-messages", {
    query,
    inputs: {},
    user: "guest",
    response_mode: "blocking",
  })

  const content = result.answer?.trim()
  console.log(content)
}

fn("Mpx 输出 RN 支持哪些 CSS 选择器？")
