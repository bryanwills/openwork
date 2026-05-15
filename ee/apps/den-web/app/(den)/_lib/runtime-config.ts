export type DenWebRuntimeConfig = {
  openworkAppConnectUrl: string;
  openworkAuthCallbackUrl: string;
};

export const EMPTY_RUNTIME_CONFIG: DenWebRuntimeConfig = {
  openworkAppConnectUrl: "",
  openworkAuthCallbackUrl: ""
};

let runtimeConfigPromise: Promise<DenWebRuntimeConfig> | null = null;

function normalizeRuntimeConfig(value: unknown): DenWebRuntimeConfig {
  if (typeof value !== "object" || value === null) {
    return EMPTY_RUNTIME_CONFIG;
  }

  const record = value as Record<string, unknown>;
  return {
    openworkAppConnectUrl: typeof record.openworkAppConnectUrl === "string" ? record.openworkAppConnectUrl.trim() : "",
    openworkAuthCallbackUrl: typeof record.openworkAuthCallbackUrl === "string" ? record.openworkAuthCallbackUrl.trim() : ""
  };
}

export function getRuntimeConfig(): Promise<DenWebRuntimeConfig> {
  if (!runtimeConfigPromise) {
    runtimeConfigPromise = fetch("/api/runtime-config", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) {
          return EMPTY_RUNTIME_CONFIG;
        }

        return normalizeRuntimeConfig(await response.json());
      })
      .catch(() => EMPTY_RUNTIME_CONFIG);
  }

  return runtimeConfigPromise;
}
