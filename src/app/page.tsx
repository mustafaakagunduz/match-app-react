"use client"
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCircle, Building2, ArrowLeft, Copy } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingGame from './LoadingGame';

const JobAnalyzer = () => {
  const [userType, setUserType] = useState<'candidate' | 'employer' | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [cv, setCv] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [error, setError] = useState('');
  const [letter, setLetter] = useState('');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Kopyalama başarısız oldu:', err);
    }
  };

  const handleUserTypeChange = (type: 'candidate' | 'employer' | null) => {
    resetForm();
    setUserType(type);
  };

  const resetForm = () => {
    setJobDescription('');
    setCv('');
    setAnalysis('');
    setError('');
    setLetter('');
  };

  const extractLetter = (text: string) => {
    let letterContent = '';
    if (text.includes('Niyet Mektubu:')) {
      letterContent = text.split('Niyet Mektubu:')[1].split(/\n\n|\nDeğerlendirme/)[0].trim();
    } else if (text.includes('Kişiselleştirilmiş Ret Mektubu:')) {
      letterContent = text.split('Kişiselleştirilmiş Ret Mektubu:')[1].split(/\n\n|\nDeğerlendirme/)[0].trim();
    }
    return letterContent;
  };

  const analyzeJob = async () => {
    setLoading(true);
    setError('');
    try {
      const apiKey = process.env.API_KEY

      if (!apiKey) {
        throw new Error("API anahtarı bulunamadı");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const candidatePrompt = `
        İş İlanı: ${jobDescription}
        CV: ${cv}

        Bu iş ilanı ve CV'yi birlikte değerlendir. Bu iş için uygun bir aday mıyım?

        Eğer uygunsam:
        1. İşe ne kadar uygun olduğumu açıkla
        2. Bu şirkete göndermek için bir niyet mektubu yaz

        Eğer uygun değilsem:
        1. Hangi becerileri edinmem gerekiyor?
        2. Bu becerileri nasıl edinebilirim?

        Önemli notlar:
        - Gerçekçi bir değerlendirme yap
        - Yanıtını düz metin olarak ver, markdown formatı (*,** gibi) kullanma
        - Başlıkları : ile ayır, örnek "İşe Uygunluk: ..."
        - Maddeler varsa - ile listele
        - Niyet Mektubunu ayrı bir başlık altında yaz: "Niyet Mektubu: ..."
      `;

      const employerPrompt = `
        İş İlanı: ${jobDescription}
        CV: ${cv}

        Bu CV'yi iş ilanı için değerlendir:

        Eğer aday uygunsa:
        1. Adayın pozisyona uyum yüzdesi nedir?
        2. Hangi becerileri eksik veya geliştirilmesi gerekiyor?

        Eğer uygun değilse:
        1. Kişiselleştirilmiş bir ret mektubu yaz

        Önemli notlar:
        - Gerçekçi bir değerlendirme yap
        - Yanıtını düz metin olarak ver, markdown formatı (*,** gibi) kullanma
        - Başlıkları : ile ayır, örnek "Uygunluk Değerlendirmesi: ..."
        - Maddeler varsa - ile listele
        - Ret mektubunu ayrı bir başlık altında yaz: "Kişiselleştirilmiş Ret Mektubu: ..."
      `;

      const prompt = userType === 'candidate' ? candidatePrompt : employerPrompt;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const cleanText = response.text().replace(/\*\*/g, '');

      const letterText = extractLetter(cleanText);
      setLetter(letterText);
      setAnalysis(cleanText);
    } catch (error) {
      console.error('Error analyzing:', error);
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const renderUserTypeSelection = () => (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mx-auto px-4 py-8"
      >
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          İş Başvurusu Analizi
        </h1>

        {/* Açıklama Kartı */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Sistem Nasıl Çalışır?</h2>
            <div className="text-gray-600 space-y-3">
              <p>
                Bu sistem, iş başvuru süreçlerini hem adaylar hem de işverenler için kolaylaştırmak üzere tasarlanmış bir yapay zeka destekli analiz aracıdır.
              </p>
              <p>
                <span className="font-semibold">Adaylar için:</span> İş ilanı ve CV'nizi sisteme yükleyerek, pozisyona ne kadar uygun olduğunuzu öğrenebilir, kişiselleştirilmiş bir niyet mektubu alabilir ve geliştirmeniz gereken yönler hakkında öneriler alabilirsiniz.
              </p>
              <p>
                <span className="font-semibold">İşverenler için:</span> Aday CV'sini iş ilanınızla karşılaştırarak detaylı bir uyumluluk analizi alabilir, adayın güçlü ve geliştirilmesi gereken yönlerini görebilir ve gerektiğinde profesyonel bir ret mektubu oluşturabilirsiniz.
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
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleUserTypeChange('candidate')}
            >
              <CardContent className="p-6 flex flex-col items-center">
                <UserCircle className="w-16 h-16 text-blue-600 mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Aday</h2>
                <p className="text-gray-600 text-center">
                  İş başvurunuzu analiz edin ve uygunluğunuzu değerlendirin
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleUserTypeChange('employer')}
            >
              <CardContent className="p-6 flex flex-col items-center">
                <Building2 className="w-16 h-16 text-blue-600 mb-4" />
                <h2 className="text-2xl font-semibold mb-2">İşveren</h2>
                <p className="text-gray-600 text-center">
                  Aday CV'sini değerlendirin ve uygunluk analizi alın
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );

  const renderAnalysisForm = () => (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center py-8">
      <AnimatePresence mode="wait">
        <motion.div
          key="form-content"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-6xl mx-auto px-4"
        >
          <div className="bg-white rounded-lg shadow-md p-6 relative">
            <Button
              variant="default"
              onClick={() => handleUserTypeChange(null)}
              className="absolute left-6 top-6 bg-blue-600 hover:bg-blue-700"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </Button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
                {userType === 'candidate' ? 'Aday Değerlendirmesi' : 'İşveren Değerlendirmesi'}
              </h1>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <textarea
                    className="w-full h-48 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="İş ilanını buraya yapıştırınız.."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
                <div>
                  <textarea
                    className="w-full h-48 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="CV'yi buraya yapıştırınız"
                    value={cv}
                    onChange={(e) => setCv(e.target.value)}
                  />
                </div>
              </div>

              <div className="text-center mb-6">
                <Button
                  disabled={loading || !jobDescription || !cv}
                  onClick={analyzeJob}
                  className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {loading ? 'Analiz Ediliyor...' : 'Analiz Et'}
                </Button>
              </div>

              {error && (
                <div className="text-red-600 text-center mb-6">
                  {error}
                </div>
              )}

              {loading && <LoadingGame />}

              {analysis && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold text-blue-600 mb-4">
                        Analiz Sonucu
                      </h2>
                      <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                        {analysis.replace(letter, '')}
                      </div>
                    </CardContent>
                  </Card>

                  {letter && (
                    <Card className="relative">
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4">
                          <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-blue-600">
                              {userType === 'candidate' ? 'Niyet Mektubu' : 'Ret Mektubu'}
                            </h2>
                            <Button
                              onClick={() => copyToClipboard(letter)}
                              variant="default"
                              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2"
                            >
                              <Copy className="w-5 h-5" />
                              <span>{copied ? 'Kopyalandı!' : 'Mektubu Kopyala'}</span>
                            </Button>
                          </div>
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100 whitespace-pre-line text-gray-700 leading-relaxed">
                            {letter}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );

  return userType ? renderAnalysisForm() : renderUserTypeSelection();
};

export default JobAnalyzer;
