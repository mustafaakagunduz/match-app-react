/**
 * Metinden niyet mektubu veya ret mektubu içeriğini çıkarır
 */
export const extractLetter = (text: string): string => {
    let letterContent = '';
    if (text.includes('Niyet Mektubu:')) {
        letterContent = text.split('Niyet Mektubu:')[1].split(/\n\n|\nDeğerlendirme/)[0].trim();
    } else if (text.includes('Kişiselleştirilmiş Ret Mektubu:')) {
        letterContent = text.split('Kişiselleştirilmiş Ret Mektubu:')[1].split(/\n\n|\nDeğerlendirme/)[0].trim();
    }
    return letterContent;
};

/**
 * Verilen metni panoya kopyalar
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Kopyalama başarısız oldu:', err);
        return false;
    }
};