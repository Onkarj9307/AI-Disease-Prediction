import React from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  onSuggestionClick: (symptom: string) => void;
}

const commonSymptoms = [
  "fever",
  "cough",
  "headache",
  "fatigue",
  "nausea",
  "sore throat",
  "body aches",
  "runny nose"
];

export default function SymptomSuggestions({ onSuggestionClick }: Props) {
  return (
    <div className="mt-2">
      <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
        <AlertCircle className="w-4 h-4" />
        <span>Common symptoms:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {commonSymptoms.map((symptom) => (
          <button
            key={symptom}
            type="button"
            onClick={() => onSuggestionClick(symptom)}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
          >
            {symptom}
          </button>
        ))}
      </div>
    </div>
  );
}