import { PatientData, ApiResponse } from '../types';
import { diseases } from './mockData';


const API_URL = 'https://api.llamaapi.net/chat/completions';
const API_KEY = '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';

function calculateConfidence(symptoms: string, disease: typeof diseases[0]): number {
  const patientSymptoms = symptoms.toLowerCase().split(/[,.]/).map(s => s.trim());
  const matchingSymptoms = disease.symptoms.filter(symptom => 
    patientSymptoms.some(ps => ps.includes(symptom))
  );
  return matchingSymptoms.length / disease.symptoms.length;
}

function analyzeSymptomsAndPredict(data: PatientData): ApiResponse {
  const predictions = diseases
    .map(disease => ({
      disease: disease.name,
      confidence: calculateConfidence(data.symptoms, disease),
      recommendations: disease.recommendations
    }))
    .filter(prediction => prediction.confidence > 0)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);

  if (predictions.length === 0) {
    return {
      predictions: [{
        disease: "Unrecognized Condition",
        confidence: 0.3,
        recommendations: [
          "Consult a healthcare professional",
          "Keep monitoring your symptoms",
          "Maintain a symptom diary",
          "Consider telemedicine consultation"
        ]
      }]
    };
  }

  return { predictions };
}

export async function predictDisease(data: PatientData): Promise<ApiResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  try {
    return analyzeSymptomsAndPredict(data);
  } catch (error) {
    console.error('Prediction error:', error);
    return {
      predictions: [],
      error: 'Failed to analyze symptoms. Please try again later.',
    };
  }
}