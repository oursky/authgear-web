import { useCallback, useEffect, useState } from 'react';
import type { Algorithm, SaltEncoding } from '../types';
import { generateAlgorithmSalt } from '../lib/hashingService';
import { calculateSaltByteLength, getFallbackSalt } from '../lib/saltUtils';
import { validateSalt } from '../lib/validation';

interface Args {
  selectedAlgorithm: Algorithm;
  parameters: Record<string, number>;
  saltEncoding: SaltEncoding;
}

export function useSaltManagement({ selectedAlgorithm, parameters, saltEncoding }: Args) {
  const [saltInput, setSaltInput] = useState('');
  const [validationError, setValidationError] = useState('');

  const saltByteLength = calculateSaltByteLength(saltInput, saltEncoding, selectedAlgorithm);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const initialSalt = await generateAlgorithmSalt(selectedAlgorithm, parameters, saltEncoding);
        if (!cancelled) setSaltInput(initialSalt);
      } catch (error) {
        console.error('Error generating initial salt:', error);
        if (!cancelled) setSaltInput(getFallbackSalt(selectedAlgorithm));
      }
    };
    run();
    return () => {
      cancelled = true;
    };
    // Intentionally omit `parameters` to mirror source widget (avoid loop on cost change)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAlgorithm, saltEncoding]);

  const handleSaltChange = useCallback(
    (value: string) => {
      setSaltInput(value);
      if (validationError) setValidationError('');
    },
    [validationError],
  );

  const handleGenerateSalt = useCallback(async () => {
    try {
      const newSalt = await generateAlgorithmSalt(selectedAlgorithm, parameters, saltEncoding);
      setSaltInput(newSalt);
      setValidationError('');
    } catch (error) {
      console.error('Error generating salt:', error);
    }
  }, [selectedAlgorithm, parameters, saltEncoding]);

  const validateSaltInput = useCallback(
    (hasAttemptedSubmit: boolean) => {
      if (hasAttemptedSubmit) {
        const validation = validateSalt(saltInput);
        setValidationError(validation.message);
        return validation.isValid;
      }
      return true;
    },
    [saltInput],
  );

  return {
    saltInput,
    saltByteLength,
    validationError,
    handleSaltChange,
    handleGenerateSalt,
    validateSaltInput,
  };
}
