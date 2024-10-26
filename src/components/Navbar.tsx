import React from 'react';
import { Database, Pill, Phone, Activity } from 'lucide-react';

interface Props {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: Props) {
  const navItems = [
    { id: 'predict', label: 'Predict', icon: Activity },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'medicine', label: 'Medicine', icon: Pill },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600">HealthPredict</span>
          </div>

          <div className="flex items-center">
            <div className="flex gap-4">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => onNavigate(id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium
                    ${activeSection === id 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}