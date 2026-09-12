import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  const path = resolvedParams.path ? resolvedParams.path.join("/") : "event";

  if (!BACKEND_URL) {
    console.error("[api/v1 proxy]: Backend URL is not configured. Set BACKEND_API_URL or NEXT_PUBLIC_API_URL.");
    return new NextResponse(null, {
      status: 503,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
      },
    });
  }

  const url = `${BACKEND_URL}/api/v1/${path}`;

  const asNumber = req.headers.get("x-vercel-ip-as-number") || "";
  const asOrg = req.headers.get("x-vercel-ip-as-org") || "";
  const country = req.headers.get("x-vercel-ip-country") || "";
  const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";
  const ua = req.headers.get("user-agent") || "";

  try {
    const body = await req.text();
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": ua,
        "X-Forwarded-For": clientIp,
        "X-Vercel-IP-AS-Number": asNumber,
        "X-Vercel-IP-AS-Org": asOrg,
        "X-Vercel-IP-Country": country,
      },
      body,
    });

    return new NextResponse(null, {
      status: res.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
      },
    });
  } catch (err) {
    console.error("[api/v1 proxy error]:", err);
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
      },
    });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  const path = resolvedParams.path ? resolvedParams.path.join("/") : "";

  if (!BACKEND_URL) {
    return new NextResponse(null, { status: 503 });
  }

  const url = `${BACKEND_URL}/api/v1/${path}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": req.headers.get("user-agent") || "",
        "X-Forwarded-For": req.headers.get("x-forwarded-for") || "",
      },
    });

    const body = await res.arrayBuffer();
    const headers = new Headers();
    const contentType = res.headers.get("content-type");
    if (contentType) headers.set("Content-Type", contentType);
    headers.set("Access-Control-Allow-Origin", "*");

    return new NextResponse(body, { status: res.status, headers });
  } catch (err) {
    return new NextResponse(null, { status: 404 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
