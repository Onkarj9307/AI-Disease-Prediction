import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { PatientRecord } from '../types';

interface Props {
  records: PatientRecord[];
}

export default function PatientDatabase({ records }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Patient Records</h2>
      
      <div className="space-y-4">
        {records.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No records found</p>
        ) : (
          records.map((record) => (
            <div 
              key={record.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{record.patientName}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(record.checkupDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(record.checkupDate).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <p><strong>Symptoms:</strong> {record.symptoms}</p>
                <div className="mt-2">
                  <strong>Diagnosis:</strong>
                  <ul className="list-disc list-inside mt-1">
                    {record.diagnosis.map((d, i) => (
                      <li key={i}>
                        {d.disease} ({(d.confidence * 100).toFixed(1)}% confidence)
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}