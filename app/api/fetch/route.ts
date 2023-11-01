import { NextResponse } from "next/server"

export async function GET(request: Request, response: Response) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("link")
  const responseHeaders = new Headers(response.headers)

  if (!url) {
    return NextResponse.json({ data: "No URL" })
  }

  /*
    return response to like this:

      {
      "success" : 1,
      "meta": {
          "title" : "CodeX Team",
          "description" : "Club of web-development, design and marketing. We build team learning how to build full-valued projects on the world market.",
          "image" : {
              "url" : "https://codex.so/public/app/img/meta_img.png"
          }
        }
      }
   */

  responseHeaders.set(
    "User-Agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
  )

  const data = await fetch(url)

  const meta = {
    title: data.headers.get("title"),
    description: data.headers.get("description"),
    image: {
      url: data.headers.get("image"),
    },
  }

  return new Response(JSON.stringify({ success: 1, meta }), {
    headers: responseHeaders,
  })
}
