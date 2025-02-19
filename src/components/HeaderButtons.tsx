'use client'
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

const HeaderButtons = () => {
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
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <FileText className="w-4 h-4 mr-2" />
                        KVKK Metni
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-blue-600 mb-4 text-center">
                            KVKK Aydınlatma Metni
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed text-justify">
                            Bu uygulama, iş başvuru süreçlerinde yardımcı olmak amacıyla geliştirilmiş bir araçtır.
                            Uygulamamız, girdiğiniz verileri yalnızca analiz amacıyla kullanmakta olup, herhangi bir
                            şekilde kaydetmemekte veya üçüncü taraflarla paylaşmamaktadır.
                        </p>
                        <p className="text-gray-700 leading-relaxed text-justify">
                            Yapay zeka analizi için kullanılan veriler, yalnızca analiz süresi boyunca geçici olarak
                            işlenmekte ve sonrasında otomatik olarak silinmektedir. Hiçbir kişisel veri kalıcı olarak
                            saklanmamaktadır.
                        </p>
                        <p className="text-gray-700 leading-relaxed text-justify">
                            6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, verilerinizin güvenliği bizim
                            için önceliklidir.
                        </p>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Heart className="w-4 h-4 mr-2" />
                        Beni Destekle
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl">
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
                                    {copiedStates.name ? (
                                        <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </Button>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">TL IBAN</p>
                                    <div className="flex items-center justify-between">
                                        <p className="font-mono text-gray-600">{triban}</p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-500 hover:text-gray-700"
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
                                    <p className="text-sm font-medium text-gray-500 mb-1">USD IBAN</p>
                                    <div className="flex items-center justify-between">
                                        <p className="font-mono text-gray-600">{usdiban}</p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-500 hover:text-gray-700"
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
                                    <p className="text-sm font-medium text-gray-500 mb-1">EUR IBAN</p>
                                    <div className="flex items-center justify-between">
                                        <p className="font-mono text-gray-600">{euiban}</p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-500 hover:text-gray-700"
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
                                    <p className="text-sm font-medium text-gray-500 mb-1">Halkbank SWIFT Kodu</p>
                                    <div className="flex items-center justify-between">
                                        <p className="font-mono text-gray-600">{swiftCode}</p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-500 hover:text-gray-700"
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
                        <p className="text-blue-600 font-medium text-center">
                            Desteğiniz için şimdiden teşekkür ederiz! 🙏
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default HeaderButtons;