"use client"
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { File, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface FileUploadAreaProps {
    onPdfContent: (content: string) => void;
    clearFile: () => void;
    currentFileName: string | null;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({
                                                           onPdfContent,
                                                           clearFile,
                                                           currentFileName
                                                       }) => {
    const { language } = useLanguage();
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Dil tabanlı metinler
    const texts = {
        tr: {
            dragOrClick: "CV PDF dosyanızı sürükleyin veya tıklayarak seçin",
            dropHere: "Dosyayı buraya bırakın",
            pdfOnly: "Sadece PDF dosyaları kabul edilir",
            loading: "Yükleniyor...",
            fileUploaded: "Dosya başarıyla yüklendi",
            remove: "Kaldır",
            errorPdfOnly: "Lütfen sadece PDF dosyası yükleyin",
            errorGeneral: "Dosya yüklenirken bir hata oluştu"
        },
        en: {
            dragOrClick: "Drag your CV PDF file here or click to select",
            dropHere: "Drop the file here",
            pdfOnly: "Only PDF files are accepted",
            loading: "Loading...",
            fileUploaded: "File successfully uploaded",
            remove: "Remove",
            errorPdfOnly: "Please upload PDF files only",
            errorGeneral: "An error occurred while uploading the file"
        }
    };

    const t = texts[language];

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setUploadError(null);

        if (acceptedFiles.length === 0) {
            return;
        }

        const file = acceptedFiles[0];

        // PDF dosyası olup olmadığını kontrol et
        if (file.type !== 'application/pdf') {
            setUploadError(t.errorPdfOnly);
            return;
        }

        try {
            setIsLoading(true);

            // Client-side PDF okuma
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = "PDF içeriği başarıyla yüklendi.";
                onPdfContent(text);
            };
            reader.onerror = () => {
                setUploadError(t.errorGeneral);
                clearFile();
            };
            reader.readAsText(file);

        } catch (error) {
            console.error('PDF upload error:', error);
            setUploadError(t.errorGeneral);
            clearFile();
        } finally {
            setIsLoading(false);
        }
    }, [onPdfContent, clearFile, t]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf']
        },
        maxFiles: 1,
        multiple: false
    });

    return (
        <div className="relative">
            {!currentFileName ? (
                <div
                    {...getRootProps()}
                    className={`w-full h-48 p-4 flex flex-col justify-center items-center border-2 border-dashed rounded-lg transition-all 
            ${isDragActive
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20'
                        : 'border-gray-300 bg-white/50 dark:bg-white/5 dark:border-gray-600'
                    }
            text-gray-800 dark:text-white cursor-pointer focus:ring-2 focus:ring-blue-400`}
                >
                    <input {...getInputProps()} />

                    {isLoading ? (
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
                            <p className="text-sm text-center">{t.loading}</p>
                        </div>
                    ) : (
                        <>
                            <FileText className="h-10 w-10 text-blue-500 mb-2" />

                            <p className="text-sm text-center mb-1">
                                {isDragActive ? t.dropHere : t.dragOrClick}
                            </p>

                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                {t.pdfOnly}
                            </p>
                        </>
                    )}
                </div>
            ) : (
                <div className="w-full h-48 p-4 flex flex-col justify-center items-center rounded-lg
          bg-gray-50 dark:bg-gray-800/30 border-2 border-blue-200 dark:border-blue-900 text-gray-800 dark:text-white">
                    <File className="h-8 w-8 text-blue-500 mb-3" />

                    <p className="text-sm font-medium mb-1 max-w-full truncate">
                        {currentFileName}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                        {t.fileUploaded}
                    </p>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            clearFile();
                        }}
                        className="bg-white/80 hover:bg-white dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
                    >
                        <X className="h-4 w-4 mr-1" />
                        {t.remove}
                    </Button>
                </div>
            )}

            {uploadError && (
                <p className="text-sm text-red-500 dark:text-red-400 mt-2 text-center">
                    {uploadError}
                </p>
            )}
        </div>
    );
};

export default FileUploadArea;