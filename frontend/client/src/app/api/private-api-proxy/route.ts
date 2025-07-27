import { NextRequest } from "next/server";
import { GoogleAuth } from "google-auth-library";

export async function GET(request: NextRequest): Promise<Response> {
  const targetAudience = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || "10";
  const includeMeta = searchParams.get("includeMeta") || "false";

  const apiURL = `${targetAudience}/api/trading-insights?limit=${limit}&includeMeta=${includeMeta}`;

  try {
    const auth = new GoogleAuth();
    const client = await auth.getIdTokenClient(targetAudience);

    const response = await client.request({
      url: apiURL,
      headers: {
        "x-internal-auth": process.env.INTERNAL_API_SECRET!,
      },
    });

    return new Response(JSON.stringify(response.data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
    console.error("Cloud Run proxy error:", errorMessage);

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
