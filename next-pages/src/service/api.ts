const BASE_URL = "http://localhost:3080";

interface FetchOptions extends RequestInit {
  body?: any; // corpo pode ser qualquer tipo (objeto, string etc)
}

async function apiFetch(path: string, options: FetchOptions = {}) {
  let token: string | null = null;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const config: RequestInit = {
    ...options,
    headers,
  };

  if (config.body && typeof config.body !== "string") {
    config.body = JSON.stringify(config.body);
  }

  // Verifica se path é URL absoluta (começa com http ou https)
  const url = path.startsWith("http://") || path.startsWith("https://")
    ? path
    : `${BASE_URL}${path.startsWith("/") ? path : "/" + path}`;

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`HTTP error! status: ${response.status} - ${errorBody}`);
  }

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

export default apiFetch;
