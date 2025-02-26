// src/app/api/extract-pdf/route.ts
import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";

// PDF'den metin çıkarma işlemi
export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { success: false, error: "Dosya yüklenmedi" },
                { status: 400 }
            );
        }

        // PDF dosyası olup olmadığını kontrol et
        if (file.type !== "application/pdf") {
            return NextResponse.json(
                { success: false, error: "Sadece PDF dosyaları kabul edilir" },
                { status: 400 }
            );
        }

        // File nesnesini buffer'a dönüştürme
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        try {
            // PDF'den metni çıkarmak için pdf-parse kullan
            const pdfData = await pdfParse(buffer);
            const extractedText = pdfData.text || "";

            return NextResponse.json({
                success: true,
                text: extractedText
            });
        } catch (error) {
            console.error("PDF parsing error:", error);
            return NextResponse.json(
                { success: false, error: "PDF içeriği okunamadı. Lütfen metni elle giriniz." },
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