import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

const SupportButton = () => {
    return (
        <div className="fixed top-4 left-4 z-50">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Heart className="w-4 h-4 mr-2" />
                        Beni Destekle
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-blue-600 mb-4">
                            Projeye Destek Olun
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                            Merhaba! Bu projeyi daha da ileriye taşımak ve size daha iyi bir deneyim sunmak için çalışıyoruz.
                            Desteğinizle, daha gelişmiş yapay zeka API'larını kullanabilir ve size çok daha verimli,
                            detaylı analizler sunabiliriz.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Her katkı, bu projenin geleceği için çok değerli!
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <p className="font-medium text-gray-900">Mustafa İhsan Akagündüz</p>
                            <p className="font-mono text-gray-600 mt-2">TR71 0001 2001 5450 0001 1087 30</p>
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