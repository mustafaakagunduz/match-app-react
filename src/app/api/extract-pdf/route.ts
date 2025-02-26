import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const pdfParse = (await import("pdf-parse")).default;
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { success: false, error: "Dosya yüklenmedi" },
                { status: 400 }
            );
        }

        if (file.type !== "application/pdf") {
            return NextResponse.json(
                { success: false, error: "Sadece PDF dosyaları kabul edilir" },
                { status: 400 }
            );
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        try {
            const pdfData = await pdfParse(buffer);
            return NextResponse.json({
                success: true,
                text: pdfData.text || "",
            });
        } catch (error) {
            console.error("PDF parsing error:", error);
            return NextResponse.json(
                { success: false, error: "PDF içeriği okunamadı." },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error("Error processing PDF:", error);
        return NextResponse.json(
            { success: false, error: error.message || "PDF işleme hatası" },
            { status: 500 }
        );
    }
}
