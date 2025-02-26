"use client"
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

import { useLanguage } from '@/contexts/LanguageContext';

interface AnalysisResultProps {
    analysis: string;
    letter: string;
}

const AnalysisResult = ({ analysis, letter }: AnalysisResultProps) => {
    const [copied, setCopied] = useState(false);
    const { t } = useLanguage();



    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-md dark:bg-gray-800/90 dark:shadow-xl">
                <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                        {t('analysis.result.title')}
                    </h2>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line dark:text-white/90">
                        {analysis.replace(letter, '')}
                    </div>
                </CardContent>
            </Card>


        </motion.div>
    );
};

export default AnalysisResult;