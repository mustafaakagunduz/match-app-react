"use client"
import { useState } from 'react';
import { UserType } from '@/types';
import UserTypeSelection from './UserTypeSelection';
import AnalysisForm from './AnalysisForm';

const JobAnalyzer = () => {
    const [userType, setUserType] = useState<UserType>(null);

    const handleUserTypeChange = (type: UserType) => {
        setUserType(type);
    };

    const handleBack = () => {
        setUserType(null);
    };

    return userType ? (
        <AnalysisForm userType={userType} onBack={handleBack} />
    ) : (
        <UserTypeSelection onUserTypeChange={handleUserTypeChange} />
    );
};

export default JobAnalyzer;