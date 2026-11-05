import { NextResponse } from "next/server";
import { createPublicClient } from "@/lib/supabase/public";

export async function GET() {
  const supabase = createPublicClient();

  const { count, error } = await supabase
    .from("perfumes")
    .select("*", { count: "exact", head: true });

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, perfumes: count });
}