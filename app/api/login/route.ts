// app/api/login/route.ts

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Tässä toteutat autentikoinnin esim. tietokannan tarkistuksella
  if (username === "" && password === "") {
    return NextResponse.json({ success: true, message: "Login successful" });
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}
