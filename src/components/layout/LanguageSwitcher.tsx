"use client"
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-white bg-blue-600 hover:bg-blue-700 border-0">
                    <Globe className="h-4 w-4 mr-2" />
                    {language === 'tr' ? 'TR' : 'EN'}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem
                    onClick={() => setLanguage('tr')}
                    className={`${language === 'tr' ? 'bg-blue-50 text-blue-600 font-medium' : ''}`}
                >
                    Türkçe
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setLanguage('en')}
                    className={`${language === 'en' ? 'bg-blue-50 text-blue-600 font-medium' : ''}`}
                >
                    English
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageSwitcher;