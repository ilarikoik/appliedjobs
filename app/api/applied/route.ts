import { getConnection } from "@/app/lib/db";
import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");
//     const db = await getConnection();
//     const res = await db.request().input("id", id).query(
//       // "INSERT INTO app_user (username, user_password) VALUES (@username, @user_password)"
//       "SELECT * FROM jobs_applied WHERE app_user_id = @id"
//     );

//     if (res) {
//       return NextResponse.json({
//         success: true,
//         message: "Fetch jobs successful",
//         jobs_applied: res,
//       });
//     }
//   } catch (error) {
//     console.error("Fetch error:", error);
//     return NextResponse.json(
//       { error: "Error while fetching applied jobs" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    const db = await getConnection();
    const res = await db
      .request()
      .input("id", id)
      .query(
        "SELECT * FROM jobs_applied WHERE app_user_id = @id ORDER BY  id DESC"
      );

    if (res) {
      return NextResponse.json({
        success: true,
        message: "Fetch jobs successful",
        jobs_applied: res.recordsets,
      });
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Error while fetching applied jobs" },
      { status: 500 }
    );
  }
}
