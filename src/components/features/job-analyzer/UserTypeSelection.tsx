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

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl mx-auto px-4 py-8"
            >
                <h1 className="text-4xl font-bold text-center text-white mb-8">
                    {t('userType.title')}
                </h1>

                <Card className="mb-8 bg-white/10 backdrop-blur-lg border-0">
                    <CardContent className="p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">{t('system.howItWorks')}</h2>
                        <div className="text-gray-200 space-y-4">
                            <p>
                                {t('system.description')}
                            </p>
                            <p>
                                <span className="font-semibold text-blue-300">{t('candidate.title')} : </span> {t('candidate.info')}
                            </p>
                            <p>
                                <span className="font-semibold text-blue-300">{t('employer.title')} : </span> {t('employer.info')}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Card
                            className="cursor-pointer bg-white/5 backdrop-blur-sm border-0 hover:bg-white/10 transition-all"
                            onClick={() => onUserTypeChange('candidate')}
                        >
                            <CardContent className="p-8 flex flex-col items-center">
                                <UserCircle className="w-16 h-16 text-blue-400 mb-4" />
                                <h2 className="text-2xl font-semibold mb-2 text-white">{t('candidate.title')}</h2>
                                <p className="text-gray-300 text-center">
                                    {t('candidate.description')}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Card
                            className="cursor-pointer bg-white/5 backdrop-blur-sm border-0 hover:bg-white/10 transition-all"
                            onClick={() => onUserTypeChange('employer')}
                        >
                            <CardContent className="p-8 flex flex-col items-center">
                                <Building2 className="w-16 h-16 text-blue-400 mb-4" />
                                <h2 className="text-2xl font-semibold mb-2 text-white">{t('employer.title')}</h2>
                                <p className="text-gray-300 text-center">
                                    {t('employer.description')}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default UserTypeSelection;