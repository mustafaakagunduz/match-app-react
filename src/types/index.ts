export type UserType = 'candidate' | 'employer' | null;

// src/types/index.ts içinde
export interface AnalysisRequest {
    userType: UserType;
    jobDescription: string;
    cv: string;
    language: 'tr' | 'en'; // Dil bilgisini ekledik
}

export interface AnalysisResponse {
    success: boolean;
    content?: string;
    error?: string;
}