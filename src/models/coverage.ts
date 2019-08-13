import { CoverageItem } from './coverageItem';
import { CoverageSummary } from './coverageSummary';

export interface Coverage {
  coverage: CoverageItem[];
  summary: CoverageSummary;
}
