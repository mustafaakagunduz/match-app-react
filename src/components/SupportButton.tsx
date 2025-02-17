'use client'
import React, { useState } from 'react';
import { Heart, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

const SupportButton = () => {
    const [copiedName, setCopiedName] = useState(false);
    const [copiedIBAN, setCopiedIBAN] = useState(false);

    const handleCopy = async (text: string, type: 'name' | 'iban') => {
        try {
            await navigator.clipboard.writeText(text);
            if (type === 'name') {
                setCopiedName(true);
                setTimeout(() => setCopiedName(false), 2000);
            } else {
                setCopiedIBAN(true);
                setTimeout(() => setCopiedIBAN(false), 2000);
            }
        } catch (err) {
            console.error('Kopyalama başarısız oldu:', err);
        }
    };

    const name = "Mustafa İhsan Akagündüz";
    const iban = "TR71 0001 2001 5450 0001 1087 30";

    return (
        <div className="fixed top-4 right-4 z-50">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Heart className="w-4 h-4 mr-2" />
                        Beni Destekle
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-blue-600 mb-4 text-center">
                            Projeye Destek Olun
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed text-justify">
                            Merhaba! Bu projeyi daha da ileriye taşımak ve size daha iyi bir deneyim sunmak için çalışıyoruz.

                        </p>

                        <p className="text-gray-700 leading-relaxed text-justify">
                            Desteğinizle, daha gelişmiş yapay zeka API'larını kullanabilir ve size çok daha verimli,
                            detaylı analizler sunabiliriz.
                        </p>
                        <p className="text-gray-700 leading-relaxed text-justify">
                            Her katkı, bu projenin geleceği için çok değerli!
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="font-medium text-gray-900">{name}</p>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={() => handleCopy(name, 'name')}
                                >
                                    {copiedName ? (
                                        <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </Button>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="font-mono text-gray-600">{iban}</p>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={() => handleCopy(iban, 'iban')}
                                >
                                    {copiedIBAN ? (
                                        <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                        <p className="text-blue-600 font-medium text-center">
                            Desteğiniz için şimdiden teşekkür ederiz! 🙏
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SupportButton;