"use client"
import React, { useState } from 'react';
import { Heart, Copy, Check, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitch from './ThemeSwitch';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
    const { t } = useLanguage();
    const [copiedStates, setCopiedStates] = useState({
        name: false,
        triban: false,
        usdiban: false,
        euiban: false,
        swift: false
    });

    const handleCopy = async (text: string, type: 'name' | 'triban' | 'usdiban' | 'euiban' | 'swift') => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedStates(prev => ({ ...prev, [type]: true }));
            setTimeout(() => {
                setCopiedStates(prev => ({ ...prev, [type]: false }));
            }, 2000);
        } catch (err) {
            console.error('Kopyalama başarısız oldu:', err);
        }
    };

    const name = "Mustafa İhsan Akagündüz";
    const triban = "TR92 0001 2009 8900 0001 0489 73";
    const usdiban = "TR49 0001 2009 8900 0023 0050 18";
    const euiban = "TR20 0001 2009 8900 0035 0018 21";
    const swiftCode = "TRHBTR2A";

    return (
        <div className="fixed top-4 right-4 z-50 flex gap-2">
            <ThemeSwitch />
            <LanguageSwitcher />

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white border-0 backdrop-blur-sm transition-all">
                        <FileText className="w-4 h-4 mr-2" />
                        {t('header.kvkk')}
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl dark:bg-gray-800 dark:text-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4 text-center">
                            {t('kvkk.title')}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                            {t('kvkk.p1')}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                            {t('kvkk.p2')}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                            {t('kvkk.p3')}
                        </p>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white border-0 backdrop-blur-sm transition-all">
                        <Heart className="w-4 h-4 mr-2" />
                        {t('header.support')}
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl dark:bg-gray-800 dark:text-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4 text-center">
                            {t('support.title')}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                            {t('support.p1')}
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                            {t('support.p2')}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                            {t('support.p3')}
                        </p>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="font-medium text-gray-900 dark:text-white">{name}</p>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    onClick={() => handleCopy(name, 'name')}
                                >
                                    {copiedStates.name ? (
                                        <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </Button>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{t('support.bank.tl')}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="font-mono text-gray-600 dark:text-gray-300">{triban}</p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                            onClick={() => handleCopy(triban, 'triban')}
                                        >
                                            {copiedStates.triban ? (
                                                <Check className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{t('support.bank.usd')}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="font-mono text-gray-600 dark:text-gray-300">{usdiban}</p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                            onClick={() => handleCopy(usdiban, 'usdiban')}
                                        >
                                            {copiedStates.usdiban ? (
                                                <Check className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{t('support.bank.eur')}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="font-mono text-gray-600 dark:text-gray-300">{euiban}</p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                            onClick={() => handleCopy(euiban, 'euiban')}
                                        >
                                            {copiedStates.euiban ? (
                                                <Check className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{t('support.bank.swift')}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="font-mono text-gray-600 dark:text-gray-300">{swiftCode}</p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                            onClick={() => handleCopy(swiftCode, 'swift')}
                                        >
                                            {copiedStates.swift ? (
                                                <Check className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-blue-600 dark:text-blue-400 font-medium text-center">
                            {t('support.thanks')}
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Header;