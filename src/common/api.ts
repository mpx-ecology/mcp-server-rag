import fetch from "node-fetch"

if (!globalThis.fetch) {
  globalThis.fetch = fetch as unknown as typeof global.fetch
}

export interface ApiConfig {
  baseUrl?: string
  headers?: Record<string, string>
  timeout?: number
}

const DEFAULT_CONFIG: ApiConfig = {
  baseUrl: "https://api.dify.ai/v1",
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
    "Content-Type": "application/json",
    // TODO secret management
  },
  timeout: 30000,
}

let currentConfig: ApiConfig = { ...DEFAULT_CONFIG }

export function configureApi(config: Partial<ApiConfig>) {
  currentConfig = { ...currentConfig, ...config }
}

export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

export interface RequestOptions {
  method?: HttpMethod
  headers?: Record<string, string>
  body?: any
  timeout?: number
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body: any
  ) {
    super(`API Error: ${status} ${statusText}`)
    this.name = "ApiError"
  }
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {},
  params?: Record<string, string | number>
): Promise<T> {
  const {
    method = "GET",
    headers = {},
    body,
    timeout = currentConfig.timeout,
  } = options
  let url = `${currentConfig.baseUrl}${endpoint}`

  if (params) {
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      queryParams.append(key, String(value))
    })
    url += `?${queryParams.toString()}`
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  console.log("---> debug", url, method, currentConfig.headers, body)

  try {
    const response = await fetch(url, {
      method,
      headers: {
        ...currentConfig.headers,
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    })

    if (!response.ok) {
      console.log('---> debug', response)
      throw new ApiError(
        response.status,
        response.statusText,
        await response.json().catch(() => null)
      )
    }

    const data = (await response.json()) as ApiResponse<T>

    console.log("---> debug response", data)

    if (data.code !== 0) {
      throw new Error(`API returned error: ${data.message || "Unknown error"}`)
    }

    return data.data
  } finally {
    clearTimeout(timeoutId)
  }
}

// Helper methods
export const api = {
  get: <T>(endpoint: string, params?: Record<string, string | number>) =>
    apiRequest<T>(endpoint, { method: "GET" }, params),

  post: <T>(
    endpoint: string,
    body: any,
    params?: Record<string, string | number>
  ) => apiRequest<T>(endpoint, { method: "POST", body }, params),

  put: <T>(
    endpoint: string,
    body: any,
    params?: Record<string, string | number>
  ) => apiRequest<T>(endpoint, { method: "PUT", body }, params),

  delete: <T>(endpoint: string, params?: Record<string, string | number>) =>
    apiRequest<T>(endpoint, { method: "DELETE" }, params),

  patch: <T>(
    endpoint: string,
    body: any,
    params?: Record<string, string | number>
  ) => apiRequest<T>(endpoint, { method: "PATCH", body }, params),
}
