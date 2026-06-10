export function formatApiError(payload, fallback) {
  if (!payload || typeof payload !== "object") return fallback;
  if (typeof payload.detail === "string") return payload.detail;
  if (typeof payload.message === "string") return payload.message;

  const messages = Object.entries(payload).flatMap(([field, value]) => {
    const label = field.replaceAll("_", " ");
    if (Array.isArray(value)) return value.map((item) => `${label}: ${item}`);
    if (typeof value === "string") return [`${label}: ${value}`];
    return [];
  });

  return messages.length ? messages.join(" ") : fallback;
}

export async function readJsonResponse(response, fallback) {
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new Error(formatApiError(payload, fallback));
  }

  return payload;
}

export function buildQuery(params) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      searchParams.set(key, String(value).trim());
    }
  });

  return searchParams.toString();
}
