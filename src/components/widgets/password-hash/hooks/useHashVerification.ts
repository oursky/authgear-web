import { useCallback, useState } from 'react';
import type { Algorithm } from '../types';
import { verifyPassword } from '../lib/hashingService';
import { parseAlgorithmFromHash } from '../lib/algorithmUtils';
import { validateCandidatePassword, validateEncodedHash } from '../lib/validation';

export interface VerificationResult {
  isValid: boolean;
  algorithm: Algorithm | 'unknown';
}

export function useHashVerification() {
  const [encodedHash, setEncodedHash] = useState('');
  const [candidatePassword, setCandidatePassword] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState('');
  const [showSupportedFormats, setShowSupportedFormats] = useState(false);

  const parseAlgorithm = useCallback((hash: string) => parseAlgorithmFromHash(hash), []);

  const handleEncodedHashChange = useCallback((value: string) => {
    setEncodedHash(value);
    setError('');
    setVerificationResult(null);
  }, []);

  const handleCandidatePasswordChange = useCallback((value: string) => {
    setCandidatePassword(value);
    setError('');
    setVerificationResult(null);
  }, []);

  const validateForm = useCallback(() => {
    const hashValidation = validateEncodedHash(encodedHash);
    const passwordValidation = validateCandidatePassword(candidatePassword);
    if (!hashValidation.isValid) {
      setError(hashValidation.messageKey);
      return false;
    }
    if (!passwordValidation.isValid) {
      setError(passwordValidation.messageKey);
      return false;
    }
    return true;
  }, [encodedHash, candidatePassword]);

  const handleVerify = useCallback(async () => {
    if (!validateForm()) return;
    setIsVerifying(true);
    setError('');
    setVerificationResult(null);
    try {
      const algorithm = parseAlgorithm(encodedHash);
      if (!algorithm) throw new Error('Unable to determine algorithm from hash format');
      const isValid = await verifyPassword(candidatePassword, encodedHash, algorithm);
      setVerificationResult({ isValid, algorithm });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes('verification') || message.includes('does not match')) {
        setVerificationResult({
          isValid: false,
          algorithm: parseAlgorithm(encodedHash) ?? 'unknown',
        });
      } else {
        setError(message);
      }
    } finally {
      setIsVerifying(false);
    }
  }, [encodedHash, candidatePassword, parseAlgorithm, validateForm]);

  return {
    encodedHash,
    candidatePassword,
    isVerifying,
    verificationResult,
    error,
    showSupportedFormats,
    handleEncodedHashChange,
    handleCandidatePasswordChange,
    handleVerify,
    setShowSupportedFormats,
  };
}
