import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useAuth } from '../context/AuthContext';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string>();
  const { login, register } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      setError(undefined);
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
    }
  };

  const handleRegister = async (email: string, password: string, name: string) => {
    try {
      setError(undefined);
      await register(email, password, name);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {isLogin ? (
        <LoginForm
          onLogin={handleLogin}
          onSwitchToRegister={() => setIsLogin(false)}
          error={error}
        />
      ) : (
        <RegisterForm
          onRegister={handleRegister}
          onSwitchToLogin={() => setIsLogin(true)}
          error={error}
        />
      )}
    </div>
  );
}