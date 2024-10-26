export interface PatientData {
  patientName: string;
  symptoms: string;
  age: number;
  gender: string;
  medicalHistory: string;
}

export interface Prediction {
  disease: string;
  confidence: number;
  recommendations: string[];
}

export interface ApiResponse {
  predictions: Prediction[];
  error?: string;
}

export interface PatientRecord {
  id: string;
  patientName: string;
  checkupDate: string;
  symptoms: string;
  diagnosis: Prediction[];
}