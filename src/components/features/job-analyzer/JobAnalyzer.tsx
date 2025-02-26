"use client"
import { useState, useEffect } from 'react';
import { UserType } from '@/types';
import UserTypeSelection from './UserTypeSelection';
import AnalysisForm from './AnalysisForm';

const JobAnalyzer = () => {
    const [userType, setUserType] = useState<UserType>(null);
    const [isReady, setIsReady] = useState(false);

    // Sayfa tamamen yüklendikten sonra UI'ı göster
    useEffect(() => {
        // CSS stillerinin tamamen uygulanması için biraz daha uzun bir gecikme
        const timer = setTimeout(() => {
            setIsReady(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const handleUserTypeChange = (type: UserType) => {
        setUserType(type);
    };

    const handleBack = () => {
        setUserType(null);
    };

    // Eğer sayfa hazır değilse boş bir yükleyici göster
    if (!isReady) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center">
                {/* Yükleme göstergesi veya boş bir div */}
            </div>
        );
    }

    return userType ? (
        <AnalysisForm userType={userType} onBack={handleBack} />
    ) : (
        <UserTypeSelection onUserTypeChange={handleUserTypeChange} />
    );
};

export default JobAnalyzer;