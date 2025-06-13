import { getConnection } from "@/app/lib/db";
import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");

//     if (!id) {
//       return NextResponse.json({ error: "Missing ID" }, { status: 400 });
//     }

//     const db = await getConnection();
//     const result = await db
//       .request()
//       .input("id", id)
//       .query("SELECT * FROM app_user WHERE id = @id");
//     const user = result.recordset[0];
//     return NextResponse.json(user);
//   } catch (err) {
//     console.error("SQL Server error:", err);
//     return NextResponse.json(
//       { error: "Database query failed" },
//       { status: 500 }
//     );
//   }
// }

//uusi käyttäjä
export async function POST(request: Request) {
  try {
    const { username, user_password } = await request.json();

    const db = await getConnection();
    await db
      .request()
      .input("username", username)
      .input("user_password", user_password)
      .query(
        "INSERT INTO app_user (username, user_password) VALUES (@username, @user_password)"
      );

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("SQL Server error:", err);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
