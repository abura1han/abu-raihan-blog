import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export default async function authMiddleware(
  req: NextRequest,
  ev: NextFetchEvent
) {
  const { access_token } = req.cookies;
  try {
    const response = NextResponse.next();

    //   If request method is GET then redirect to login page
    if (
      req.method === "GET" &&
      req.url === `${process.env.site_url}admin/login`
    ) {
      return response;
    }

    //   Is access_token header exist
    if (!access_token) {
      return new Response(
        JSON.stringify({
          success: false,
          statusCode: 401,
          error: "Unauthorized access blocked",
        }),
        {
          status: 401,
          statusText: "Unauthorized access blocked",
        }
      );
    }

    //   Is access token valid
    await jwt.verify(access_token, String(process.env.access_token_secret));

    return response;
  } catch (error: any) {
    console.error(error);
    if (error.name === "JsonWebTokenError") {
      return new Response(
        JSON.stringify({
          success: false,
          statusCode: 401,
          error: error.message,
        }),
        {
          status: 401,
        }
      );
    }

    if (error.name === "TokenExpiredError") {
      return new Response(
        JSON.stringify({
          success: false,
          statusCode: 401,
          error: error.message,
        }),
        {
          status: 401,
        }
      );
    }

    new Response(
      JSON.stringify({
        success: false,
        statusCode: 500,
        error: "Server error",
      }),
      {
        status: 500,
      }
    );
  }
}
