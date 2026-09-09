import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";

import { adminDb } from "@/lib/firebase-admin";

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        if (!body.category) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Category is required",
                },
                { status: 400 }
            );
        }

        await adminDb
            .collection("expenses")
            .doc(id)
            .update({
                category: body.category,
            });

        return NextResponse.json({
            success: true,
            id,
            category: body.category,
        });
    } catch (error: any) {
        console.error("Update expense error:", error);

        return NextResponse.json(
            {
                success: false,
                error: error?.message || "Failed to update expense",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;

        await adminDb
            .collection("expenses")
            .doc(id)
            .delete();

        return NextResponse.json({
            success: true,
            id,
        });
    } catch (error: any) {
        console.error("Delete expense error:", error);

        return NextResponse.json(
            {
                success: false,
                error: error?.message || "Failed to delete expense",
            },
            { status: 500 }
        );
    }
}