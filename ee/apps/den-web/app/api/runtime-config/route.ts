import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function readPublicRuntimeEnv(name: string) {
  return process.env[name]?.trim() ?? "";
}

export function GET() {
  return NextResponse.json(
    {
      openworkAppConnectUrl: readPublicRuntimeEnv("DEN_WEB_OPENWORK_APP_CONNECT_URL"),
      openworkAuthCallbackUrl: readPublicRuntimeEnv("DEN_WEB_OPENWORK_AUTH_CALLBACK_URL")
    },
    {
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}
