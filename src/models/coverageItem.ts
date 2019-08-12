export interface CoverageItem {
  id: string;
  name: string;
  totalLines: number;
  lines?: string[];
  totalCovered: number;
  coveredPercent: number;
}
