import { useCallback, useState } from 'react';
import type { Algorithm, HashResult, SaltEncoding } from '../types';
import { hashArgon2id, hashBcrypt, hashPBKDF2, hashScrypt } from '../lib/hashingService';
import { validatePassword } from '../lib/validation';

interface Args {
  selectedAlgorithm: Algorithm;
  parameters: Record<string, number>;
  saltInput: string;
  saltEncoding: SaltEncoding;
  hashEncoding: SaltEncoding;
}

export function useHashGeneration({
  selectedAlgorithm,
  parameters,
  saltInput,
  saltEncoding,
  hashEncoding,
}: Args) {
  const [password, setPassword] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<HashResult | null>(null);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({ password: '', salt: '' });
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const handlePasswordChange = useCallback(
    (value: string) => {
      setPassword(value);
      setResult(null);
      if (hasAttemptedSubmit) {
        const validation = validatePassword(value);
        setValidationErrors((prev) => ({ ...prev, password: validation.message }));
      }
    },
    [hasAttemptedSubmit],
  );

  const handleSaltChange = useCallback(
    (value: string) => {
      setResult(null);
      if (hasAttemptedSubmit) {
        setValidationErrors((prev) => ({
          ...prev,
          salt: value.trim() ? '' : 'Please enter a salt or generate one',
        }));
      }
    },
    [hasAttemptedSubmit],
  );

  const validateForm = useCallback(() => {
    const passwordValidation = validatePassword(password);
    const saltValidation = {
      isValid: saltInput.trim() !== '',
      message: saltInput.trim() ? '' : 'Please enter a salt or generate one',
    };
    setValidationErrors({
      password: passwordValidation.message,
      salt: saltValidation.message,
    });
    return passwordValidation.isValid && saltValidation.isValid;
  }, [password, saltInput]);

  const handleGenerate = useCallback(async () => {
    setHasAttemptedSubmit(true);
    if (!validateForm()) return;

    setIsGenerating(true);
    setError('');
    setResult(null);

    try {
      const options = {
        ...parameters,
        salt: saltInput,
        saltEncoding,
        ...(!['argon2id', 'scrypt'].includes(selectedAlgorithm) && { hashEncoding }),
      };

      let hashResult: HashResult;
      switch (selectedAlgorithm) {
        case 'argon2id':
          hashResult = await hashArgon2id(password, options);
          break;
        case 'scrypt':
          hashResult = await hashScrypt(password, options);
          break;
        case 'bcrypt':
          hashResult = await hashBcrypt(password, options);
          break;
        case 'pbkdf2':
          hashResult = await hashPBKDF2(password, options);
          break;
        default:
          throw new Error(`Unsupported algorithm: ${selectedAlgorithm}`);
      }
      setResult(hashResult);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred during hash generation';
      setError(message);
    } finally {
      setIsGenerating(false);
    }
  }, [password, parameters, saltInput, saltEncoding, hashEncoding, selectedAlgorithm, validateForm]);

  return {
    password,
    isGenerating,
    result,
    error,
    validationErrors,
    hasAttemptedSubmit,
    showAdditionalInfo,
    handlePasswordChange,
    handleSaltChange,
    handleGenerate,
    setShowAdditionalInfo,
    setResult,
  };
}
