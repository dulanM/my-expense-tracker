import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";

import { adminDb } from "@/lib/firebase-admin";
import { parseExpenseMessage } from "@/lib/expense-parser";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = body.message;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Message is required",
        },
        { status: 400 }
      );
    }
    const parsedExpense = parseExpenseMessage(message);

    if (!parsedExpense) {
      return NextResponse.json(
        {
          success: false,
          error: "Could not parse expense message",
        },
        { status: 400 }
      );
    }

    const docRef = await adminDb.collection("expenses").add({
      ...parsedExpense,
      rawPayload: message,
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      id: docRef.id,
      expense: parsedExpense,
    });
  } catch (error: any) {
    console.error("Expense webhook error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const snapshot = await adminDb
      .collection("expenses")
      .orderBy("createdAt", "desc")
      .get();

    const expenses = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        merchant: data.merchant,
        amount: data.amount,
        currency: data.currency,
        category: data.category,
        date: data.date,
        time: data.time,
      };
    });

    return NextResponse.json({
      success: true,
      expenses,
    });
  } catch (error: any) {
    console.error("Get expenses error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}