import type { PricingCell, PricingComparisonRow } from './types';

export function comparisonSection(title: string): PricingComparisonRow {
  return { kind: 'section', title };
}

export function comparisonFeature(
  label: string,
  cells: [PricingCell, PricingCell, PricingCell, PricingCell],
): PricingComparisonRow {
  return { kind: 'feature', label, cells };
}
