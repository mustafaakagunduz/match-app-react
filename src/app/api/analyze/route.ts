// src/app/api/analyze/route.ts server
import { NextResponse } from "next/server";
import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is not configured');
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json(
            { success: false, error: 'OpenAI API key is not configured' },
            { status: 500 }
        );
    }

    try {
        const { userType, jobDescription, cv } = await request.json();

        if (!userType || !jobDescription || !cv) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const candidatePrompt = `
      İş İlanı: ${jobDescription}
      CV: ${cv}

      Bu iş ilanı ve CV'yi birlikte değerlendir. Bu iş için uygun bir aday mıyım?

      Eğer uygunsam:
      1. İşe ne kadar uygun olduğumu açıkla
      2. Bu şirkete göndermek için bir niyet mektubu yaz

      Eğer uygun değilsem:
      1. Hangi becerileri edinmem gerekiyor?
      2. Bu becerileri nasıl edinebilirim?

      Önemli notlar:
      - Gerçekçi bir değerlendirme yap
      - Yanıtını düz metin olarak ver, markdown formatı (*,** gibi) kullanma
      - Başlıkları : ile ayır, örnek "İşe Uygunluk: ..."
      - Maddeler varsa - ile listele
      - Niyet Mektubunu ayrı bir başlık altında yaz: "Niyet Mektubu: ..."
    `;

        const employerPrompt = `
      İş İlanı: ${jobDescription}
      CV: ${cv}

      Bu CV'yi iş ilanı için değerlendir:

      Eğer aday uygunsa:
      1. Adayın pozisyona uyum yüzdesi nedir?
      2. Hangi becerileri eksik veya geliştirilmesi gerekiyor?

      Eğer uygun değilse:
      1. Kişiselleştirilmiş bir ret mektubu yaz

      Önemli notlar:
      - Gerçekçi bir değerlendirme yap
      - Yanıtını düz metin olarak ver, markdown formatı (*,** gibi) kullanma
      - Başlıkları : ile ayır, örnek "Uygunluk Değerlendirmesi: ..."
      - Maddeler varsa - ile listele
      - Ret mektubunu ayrı bir başlık altında yaz: "Kişiselleştirilmiş Ret Mektubu: ..."
    `;

        const prompt = userType === 'candidate' ? candidatePrompt : employerPrompt;

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-4o-mini",
        });

        return NextResponse.json({
            success: true,
            content: completion.choices[0]?.message?.content || ''
        });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'İşlem sırasında bir hata oluştu.'
            },
            { status: 500 }
        );
    }
}