import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("body", body);

    const docRef = await adminDb.collection("expenses").add({
      rawPayload: body,
      createdAt: FieldValue.serverTimestamp(),
    });

    console.log("Firestore document created:", docRef.id);

    return NextResponse.json({
      success: true,
      id: docRef.id,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}