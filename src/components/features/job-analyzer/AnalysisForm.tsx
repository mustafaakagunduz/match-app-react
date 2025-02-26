"use client"
import { useState } from 'react';
import { UserType } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { extractLetter } from '@/utils/helpers';
import { useLanguage } from '@/contexts/LanguageContext';
import LoadingGame from './LoadingGame';
import AnalysisResult from './AnalysisResult';

interface AnalysisFormProps {
    userType: UserType;
    onBack: () => void;
}

const AnalysisForm = ({ userType, onBack }: AnalysisFormProps) => {
    const [jobDescription, setJobDescription] = useState('');
    const [cv, setCv] = useState('');
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState('');
    const [error, setError] = useState('');
    const [letter, setLetter] = useState('');
    const { t, language } = useLanguage();

    const analyzeJob = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userType,
                    jobDescription,
                    cv,
                    language, // Dil bilgisini API'ye gönderiyoruz
                }),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error);
            }

            const letterText = extractLetter(data.content);
            setLetter(letterText);
            setAnalysis(data.content);

        } catch (error) {
            console.error('Error analyzing:', error);
            setError(t('form.error.message'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center py-8">
            <AnimatePresence mode="wait">
                <motion.div
                    key="form-content"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-6xl mx-auto px-4"
                >
                    <div className="bg-white/70 backdrop-blur-lg rounded-lg shadow-lg p-8 dark:bg-white/10 dark:shadow-2xl relative">
                        <Button
                            variant="ghost"
                            onClick={onBack}
                            className="absolute left-6 top-6 text-gray-700 hover:bg-gray-100/50 dark:text-white dark:hover:bg-white/10"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-8">
                                {userType === 'candidate'
                                    ? t('candidate.analysis.title')
                                    : t('employer.analysis.title')
                                }
                            </h1>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div>
                  <textarea
                      className="w-full h-48 p-4 bg-white/50 border-0 rounded-lg text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:bg-white/80 dark:bg-white/5 dark:text-white dark:placeholder-gray-400 dark:focus:bg-white/10"
                      placeholder={t('form.jobDescription.placeholder')}
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                  />
                                </div>
                                <div>
                  <textarea
                      className="w-full h-48 p-4 bg-white/50 border-0 rounded-lg text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:bg-white/80 dark:bg-white/5 dark:text-white dark:placeholder-gray-400 dark:focus:bg-white/10"
                      placeholder={t('form.cv.placeholder')}
                      value={cv}
                      onChange={(e) => setCv(e.target.value)}
                  />
                                </div>
                            </div>

                            <div className="text-center mb-8">
                                <Button
                                    disabled={loading || !jobDescription || !cv}
                                    onClick={analyzeJob}
                                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-600 dark:disabled:bg-blue-800 dark:disabled:opacity-50"
                                >
                                    {loading ? t('form.analyzing.button') : t('form.analyze.button')}
                                </Button>
                            </div>

                            {error && (
                                <div className="text-red-600 dark:text-red-400 text-center mb-6">
                                    {error}
                                </div>
                            )}

                            {loading && <LoadingGame />}

                            {analysis && !loading && <AnalysisResult analysis={analysis} letter={letter} />}
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default AnalysisForm;