import React, { useState } from 'react';
import { PatientData } from '../types';
import { Send, Loader2 } from 'lucide-react';
import SymptomSuggestions from './SymptomSuggestions';

interface Props {
  onSubmit: (data: PatientData) => Promise<void>;
  isLoading: boolean;
}

export default function PatientForm({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = useState<PatientData>({
    patientName: '',
    symptoms: '',
    age: 0,
    gender: '',
    medicalHistory: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSymptomSuggestion = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms
        ? `${prev.symptoms}, ${symptom}`
        : symptom
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            required
            value={formData.patientName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700">
            Symptoms
          </label>
          <textarea
            id="symptoms"
            name="symptoms"
            required
            value={formData.symptoms}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Describe your symptoms in detail..."
          />
          <SymptomSuggestions onSuggestionClick={handleSymptomSuggestion} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              required
              min="0"
              max="150"
              value={formData.age || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700">
            Medical History
          </label>
          <textarea
            id="medicalHistory"
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Any relevant medical history..."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Get Prediction
          </>
        )}
      </button>
    </form>
  );
}