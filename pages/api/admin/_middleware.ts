import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export default async function authMiddleware(
  req: NextRequest,
  ev: NextFetchEvent
) {
  const authorization = req.headers.get("authorization");
  try {
    const response = NextResponse.next();

    //   If request method is GET then redirect to login page
    if (
      req.method === "POST" &&
      req.url === `${process.env.api_url}admin/create-user`
    ) {
      return response;
    }

    //   Is authorization header exist
    if (!authorization) {
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
    const accessToken = authorization.split(" ");
    if (accessToken.length < 1) {
      return new Response(
        JSON.stringify({
          success: false,
          statusCode: 401,
          error: "Invalid access token",
        })
      );
    }

    //   Is access token valid
    await jwt.verify(accessToken[1], String(process.env.access_token_secret));

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
