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

    // Dil değişkenini dışarıda tanımlıyoruz ki try/catch bloklarının dışında da erişilebilir olsun
    let language = 'tr';

    try {
        const requestData = await request.json();
        const { userType, jobDescription, cv } = requestData;

        // Dil bilgisini alıyoruz ve dışarıda tanımladığımız değişkene atıyoruz
        language = requestData.language || 'tr';

        if (!userType || !jobDescription || !cv) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Türkçe promptlar
        const candidatePromptTR = `
      İş İlanı: ${jobDescription}
      CV: ${cv}

      Bu iş ilanı ve CV'yi birlikte değerlendir. Bu iş için uygun bir aday mıyım?

      Eğer uygunsam:
      1. İşe ne kadar uygun olduğumu açıkla
      2. Bu şirkete göndermek için bir niyet mektubu yaz

      Eğer uygun değilsem:
      1. işe daha uygun bir aday olmak için hangi becerileri edinmem veya geliştirmem gerekiyor?
      2. Bu becerileri nasıl edinebilirim?

      Önemli notlar:
      - Gerçekçi bir değerlendirme yap
      - Yanıtını düz metin olarak ver, markdown formatı (*,** gibi) kullanma
      - Başlıkları : ile ayır, örnek "İşe Uygunluk: ..."
      - Maddeler varsa - ile listele
      - Niyet Mektubunu ayrı bir başlık altında yaz: "Niyet Mektubu: ..."
    `;

        const employerPromptTR = `
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

        // İngilizce promptlar
        const candidatePromptEN = `
      Job Description: ${jobDescription}
      CV: ${cv}

      Evaluate this job description and CV together. Am I a suitable candidate for this job?

      If I'm suitable:
      1. Explain how suitable I am for the job
      2. Write a cover letter to send to this company

      If I'm not suitable:
      1. What skills do I need to acquire or improve to become a more suitable candidate?
      2. How can I acquire these skills?

      Important notes:
      - Provide a realistic assessment
      - Give your answer as plain text, don't use markdown format (like *,**)
      - Separate titles with :, example "Job Suitability: ..."
      - List items with - if there are any
      - Write the cover letter under a separate heading: "Cover Letter: ..."
    `;

        const employerPromptEN = `
      Job Description: ${jobDescription}
      CV: ${cv}

      Evaluate this CV for the job listing:

      If the candidate is suitable:
      1. What is the candidate's compatibility percentage for the position?
      2. Which skills are lacking or need improvement?

      If not suitable:
      1. Write a personalized rejection letter

      Important notes:
      - Provide a realistic assessment
      - Give your answer as plain text, don't use markdown format (like *,**)
      - Separate titles with :, example "Compatibility Assessment: ..."
      - List items with - if there are any
      - Write the rejection letter under a separate heading: "Personalized Rejection Letter: ..."
    `;

        // Dil seçimine göre prompt belirleme
        let candidatePrompt = language === 'en' ? candidatePromptEN : candidatePromptTR;
        let employerPrompt = language === 'en' ? employerPromptEN : employerPromptTR;

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

        // Hata mesajlarını da dile göre ayarlayalım
        const errorMessage = error.message ||
            (language === 'en' ? 'An error occurred during the operation.' : 'İşlem sırasında bir hata oluştu.');

        return NextResponse.json(
            {
                success: false,
                error: errorMessage
            },
            { status: 500 }
        );
    }
}