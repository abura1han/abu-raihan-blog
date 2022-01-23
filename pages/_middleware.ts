import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function authMiddleware(
  req: NextRequest,
  ev: NextFetchEvent
) {
  try {
    const response = NextResponse.next();

    return response;
  } catch (error) {
    console.error(error);
    new Response(
      JSON.stringify({ success: false, statusCode: 400, error: "Server error" })
    );
  }
}
