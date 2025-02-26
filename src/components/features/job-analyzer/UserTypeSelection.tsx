"use client"
import { UserType } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { UserCircle, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface UserTypeSelectionProps {
    onUserTypeChange: (type: UserType) => void;
}

const UserTypeSelection = ({ onUserTypeChange }: UserTypeSelectionProps) => {
    const { t } = useLanguage();

    // Predefine styles to avoid FOUC (Flash of Unstyled Content)
    const cardStyles = "cursor-pointer backdrop-blur-sm border-0 shadow-md transition-colors duration-300";
    const lightModeStyles = "bg-white/70 hover:bg-white/90";
    const darkModeStyles = "dark:bg-white/5 dark:hover:bg-white/10 dark:shadow-xl";

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-6xl mx-auto px-4 py-8"
            >
                <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
                    {t('userType.title')}
                </h1>

                <Card className="mb-8 bg-white/80 dark:bg-white/10 backdrop-blur-lg border-0 shadow-md dark:shadow-xl">
                    <CardContent className="p-8">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">{t('system.howItWorks')}</h2>
                        <div className="text-gray-700 dark:text-gray-200 space-y-4">
                            <p>
                                {t('system.description')}
                            </p>
                            <p>
                                <span className="font-semibold text-blue-700 dark:text-blue-300">{t('candidate.title')}lar için:</span> {t('candidate.info')}
                            </p>
                            <p>
                                <span className="font-semibold text-blue-700 dark:text-blue-300">{t('employer.title')}ler için:</span> {t('employer.info')}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="transition-all duration-300">
                        <Card
                            className={`${cardStyles} ${lightModeStyles} ${darkModeStyles}`}
                            onClick={() => onUserTypeChange('candidate')}
                        >
                            <CardContent className="p-8 flex flex-col items-center">
                                <UserCircle className="w-16 h-16 text-blue-600 dark:text-blue-400 mb-4" />
                                <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">{t('candidate.title')}</h2>
                                <p className="text-gray-700 dark:text-gray-300 text-center">
                                    {t('candidate.description')}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="transition-all duration-300">
                        <Card
                            className={`${cardStyles} ${lightModeStyles} ${darkModeStyles}`}
                            onClick={() => onUserTypeChange('employer')}
                        >
                            <CardContent className="p-8 flex flex-col items-center">
                                <Building2 className="w-16 h-16 text-blue-600 dark:text-blue-400 mb-4" />
                                <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">{t('employer.title')}</h2>
                                <p className="text-gray-700 dark:text-gray-300 text-center">
                                    {t('employer.description')}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default UserTypeSelection;