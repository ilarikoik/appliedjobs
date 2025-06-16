import { getConnection } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId, role, company, location, date, link, status } =
      await request.json();
    const db = await getConnection();
    const res = await db
      .request()
      .input("id", userId)
      .input("role", role)
      .input("company", company)
      .input("location", location)
      .input("date", date)
      .input("link", link)
      .input("status", status)
      .query(
        "INSERT INTO jobs_applied (app_user_id, job_role, job_employee, job_location, job_applied_date, job_link, job_status) VALUES (@id, @role, @company, @location, @date, @link, @status)"
      );

    console.log(res);

    if (res.rowsAffected && res.rowsAffected[0] > 0) {
      return NextResponse.json({
        success: true,
        message: "Post job successful",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Insert failed",
      });
    }
  } catch (error) {
    console.error("Insert error:", error);
    return NextResponse.json(
      { error: "Error while applying job" },
      { status: 500 }
    );
  }
}
