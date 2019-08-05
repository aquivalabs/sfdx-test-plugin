import { ApexClass } from './apexClass';
import { Attributes } from './attributes';

export interface Test {
  attributes: Attributes;
  Id: string;
  QueueItemId: string;
  StackTrace: string;
  Message: string;
  AsyncApexJobId: string;
  MethodName: string;
  Outcome: string;
  ApexClass: ApexClass;
  RunTime: number;
  FullName: string;
}
