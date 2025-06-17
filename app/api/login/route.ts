// // app/api/login/route.ts

// import { getConnection } from "@/app/lib/db";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   const { username, password } = await request.json();

//   if (!username || !password) {
//     return NextResponse.json({ error: "missing username or password" });
//   }
//   // Tässä toteutat autentikoinnin esim. tietokannan tarkistuksella
//   const db = await getConnection();
//   const sql = `select * from app_user WHERE username = ${username} AND user_password = ${password}`;
//   const res = await db.request().query(sql);

//   if (res) {
//     return NextResponse.json(res);
//   }

//   // if (username === "" && password === "") {
//   //   return NextResponse.json({ success: true, message: "Login successful" });
//   // }

//   return NextResponse.json(
//     { success: false, message: "Invalid credentials" },
//     { status: 401 }
//   );
// }

import { getConnection } from "@/app/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Missing username or password" },
        { status: 400 }
      );
    }

    const db = await getConnection();
    const res = await db
      .request()
      .input("username", username)
      .input("password", password)
      .query("SELECT * FROM app_user WHERE username = @username");

    const user = res.recordset[0];

    const isMatch = await bcrypt.compare(password, user.user_password); //perjaatteessa hashaa passwordin ja kattoo tulisko sama cryptattu string

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
