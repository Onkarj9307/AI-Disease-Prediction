import React, { useState } from 'react';
import { Stethoscope } from 'lucide-react';
import Navbar from './Navbar';
import PatientForm from './PatientForm';
import PredictionResult from './PredictionResult';
import PatientDatabase from './PatientDatabase';
import { predictDisease } from '../api/llamaApi';
import { PatientData, ApiResponse, PatientRecord } from '../types';

export default function MainApp() {
  const [activeSection, setActiveSection] = useState('predict');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [records, setRecords] = useState<PatientRecord[]>([]);

  const handleSubmit = async (data: PatientData) => {
    setIsLoading(true);
    try {
      const response = await predictDisease(data);
      setResult(response);
      
      if (response.predictions.length > 0) {
        const newRecord: PatientRecord = {
          id: Date.now().toString(),
          patientName: data.patientName,
          checkupDate: new Date().toISOString(),
          symptoms: data.symptoms,
          diagnosis: response.predictions
        };
        
        setRecords(prev => [...prev, newRecord]);
      }
    } catch (error) {
      setResult({
        predictions: [],
        error: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onNavigate={setActiveSection}
        activeSection={activeSection}
      />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {activeSection === 'predict' && (
          <>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Stethoscope className="w-12 h-12 text-blue-600" />
                <h1 className="text-4xl font-bold text-gray-900">AI Disease Predictor</h1>
              </div>
              <p className="text-lg text-gray-600">
                Enter your symptoms and medical information for AI-powered disease prediction
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-[2fr,3fr]">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Patient Information</h2>
                <PatientForm onSubmit={handleSubmit} isLoading={isLoading} />
              </div>

              <div className="space-y-6">
                {result && (
                  <PredictionResult 
                    predictions={result.predictions} 
                    error={result.error} 
                  />
                )}
              </div>
            </div>
          </>
        )}

        {activeSection === 'database' && (
          <PatientDatabase records={records} />
        )}

        {activeSection === 'medicine' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Medicine Information</h2>
            <p className="text-gray-600">Medicine information section coming soon...</p>
          </div>
        )}

        {activeSection === 'contact' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
            <p className="text-gray-600">Contact information section coming soon...</p>
          </div>
        )}
      </main>

      <footer className="mt-12 text-center text-sm text-gray-500 pb-8">
        <p>This tool is for informational purposes only and should not replace professional medical advice.</p>
      </footer>
    </div>
  );
}