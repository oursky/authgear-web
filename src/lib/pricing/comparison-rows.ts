import type { OnceCoreRow, PricingCell, PricingComparisonRow } from './types';

export function comparisonSection(title: string): PricingComparisonRow {
  return { kind: 'section', title };
}

export function comparisonFeature(
  label: string,
  cells: [PricingCell, PricingCell, PricingCell, PricingCell],
): PricingComparisonRow {
  return { kind: 'feature', label, cells };
}

export function onceCoreSection(title: string): OnceCoreRow {
  return { kind: 'section', title };
}

export function onceCoreFeature(label: string, value: PricingCell | string): OnceCoreRow {
  return { kind: 'feature', label, value };
}
