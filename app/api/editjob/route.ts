import { getConnection } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { postId, userId, role, company, location, date, link, status } =
      await request.json();
    const db = await getConnection();
    const res = await db
      .request()
      .input("postId", postId)
      .input("userId", userId)
      .input("role", role)
      .input("company", company)
      .input("location", location)
      .input("date", date)
      .input("link", link)
      .input("status", status)
      .query(
        "UPDATE jobs_applied SET job_role = @role, job_employee = @company, job_location = @location, job_applied_date = @date, job_link = @link, job_status = @status WHERE id = @postId AND app_user_id = @userId;"
      );

    if (res.rowsAffected && res.rowsAffected[0] > 0) {
      return NextResponse.json({
        success: true,
        message: "Update job successful",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Update failed",
      });
    }
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Error editing job" }, { status: 500 });
  }
}
