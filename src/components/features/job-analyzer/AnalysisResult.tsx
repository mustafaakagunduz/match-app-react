"use client"
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { copyToClipboard } from '@/utils/helpers';
import { useLanguage } from '@/contexts/LanguageContext';

interface AnalysisResultProps {
    analysis: string;
    letter: string;
}

const AnalysisResult = ({ analysis, letter }: AnalysisResultProps) => {
    const [copied, setCopied] = useState(false);
    const { t } = useLanguage();

    const handleCopy = async (text: string) => {
        const success = await copyToClipboard(text);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <Card className="bg-gray-800/90 backdrop-blur-sm border-0">
                <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        {t('analysis.result.title')}
                    </h2>
                    <div className="text-white/90 leading-relaxed whitespace-pre-line">
                        {analysis.replace(letter, '')}
                    </div>
                </CardContent>
            </Card>

            {letter && (
                <Card className="bg-gray-800/90 backdrop-blur-sm border-0">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-white">
                                {t('analysis.letter.title')}
                            </h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                                onClick={() => handleCopy(letter)}
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4 mr-2" />
                                        {t('copied.button')}
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4 mr-2" />
                                        {t('copy.button')}
                                    </>
                                )}
                            </Button>
                        </div>
                        <div className="text-white/90 leading-relaxed whitespace-pre-line">
                            {letter}
                        </div>
                    </CardContent>
                </Card>
            )}
        </motion.div>
    );
};

export default AnalysisResult;