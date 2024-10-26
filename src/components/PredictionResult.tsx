import React from 'react';
import { Prediction } from '../types';
import { AlertTriangle, ThumbsUp, Activity } from 'lucide-react';

interface Props {
  predictions: Prediction[];
  error?: string;
}

export default function PredictionResult({ predictions, error }: Props) {
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center gap-2 text-red-700">
          <AlertTriangle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!predictions.length) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Predictions</h2>
      <div className="grid gap-6">
        {predictions.map((prediction, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-medium text-gray-900">{prediction.disease}</h3>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-600">
                  {(prediction.confidence * 100).toFixed(1)}% Confidence
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700 flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-green-600" />
                Recommendations
              </h4>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {prediction.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}