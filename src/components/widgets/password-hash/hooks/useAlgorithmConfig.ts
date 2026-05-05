import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Algorithm } from '../types';
import { getAlgorithmConfig, getParameterWarnings } from '../lib/algorithmUtils';

export function useAlgorithmConfig(selectedAlgorithm: Algorithm) {
  const [parameters, setParameters] = useState<Record<string, number>>({});

  const algorithmConfig = useMemo(() => getAlgorithmConfig(selectedAlgorithm), [selectedAlgorithm]);

  useEffect(() => {
    if (algorithmConfig) {
      const initialParams: Record<string, number> = {};
      Object.keys(algorithmConfig.parameters).forEach((key) => {
        initialParams[key] = algorithmConfig.parameters[key].default;
      });
      setParameters(initialParams);
    }
  }, [algorithmConfig]);

  const handleParameterChange = useCallback((paramKey: string, value: number) => {
    setParameters((prev) => ({ ...prev, [paramKey]: value }));
  }, []);

  const warnings = useMemo(
    () => getParameterWarnings(selectedAlgorithm, parameters),
    [selectedAlgorithm, parameters],
  );

  return { algorithmConfig, parameters, warnings, handleParameterChange };
}
