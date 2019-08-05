import { Summary } from './summary';
import { Test } from './test';

export interface Result {
  summary: Summary;
  tests: Test[];
}
