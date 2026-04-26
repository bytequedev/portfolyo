import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const password = body.password;
  const correctPassword = process.env.ADMIN_PASSWORD;
  if (password === correctPassword) {
    // Basit bir cookie ile giriş durumu
    return NextResponse.json({ ok: true }, {
      status: 200,
      headers: {
        "Set-Cookie": `admin_auth=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`
      }
    });
  }
  return NextResponse.json({ ok: false }, { status: 401 });
}
