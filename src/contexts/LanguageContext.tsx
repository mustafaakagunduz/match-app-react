"use client"
import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import tr from '@/locales/tr';
import en from '@/locales/en';

type Language = 'tr' | 'en';
export type TranslationKey = keyof typeof tr | keyof typeof en;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
    const [language, setLanguageState] = useState<Language>('tr');
    const translations = { tr, en };

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        // Tarayıcıda dil tercihini kaydetmek için
        localStorage.setItem('preferredLanguage', lang);
    }, []);

    // Çeviri fonksiyonu
    const t = useCallback(
        (key: TranslationKey) => {
            return translations[language][key] || key;
        },
        [language]
    );

    // Sayfa yüklendiğinde tarayıcıdan dil tercihini almak için useEffect
    React.useEffect(() => {
        const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
        if (savedLanguage && (savedLanguage === 'tr' || savedLanguage === 'en')) {
            setLanguageState(savedLanguage);
        }
    }, []);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};