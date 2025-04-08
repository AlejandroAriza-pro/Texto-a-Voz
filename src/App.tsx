import React, { useState, useRef } from 'react';
import { Volume2, StopCircle, Globe2, FileText } from 'lucide-react';

function App() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('es-ES');
  const [isPlaying, setIsPlaying] = useState(false);
  const speechSynthesis = window.speechSynthesis;
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const handleSpeak = () => {
    if (text.trim() === '') return;

    // Stop any ongoing speech
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.onend = () => setIsPlaying(false);
    utteranceRef.current = utterance;
    
    setIsPlaying(true);
    speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">Convertidor de Texto a Voz</h1>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Globe2 className="w-5 h-5 text-gray-600" />
                <label className="block text-sm font-medium text-gray-700">
                  Idioma
                </label>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="es-ES">Español</option>
                <option value="en-US">English</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Texto para convertir
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Escribe o pega el texto aquí..."
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleSpeak}
                className={`flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {isPlaying ? (
                  <>
                    <StopCircle className="w-5 h-5 mr-2" />
                    Detener
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5 mr-2" />
                    Reproducir
                  </>
                )}
              </button>
              {isPlaying && (
                <button
                  onClick={handleStop}
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <StopCircle className="w-5 h-5 mr-2" />
                  Detener
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;