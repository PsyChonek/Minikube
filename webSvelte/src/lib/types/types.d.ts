export interface Calculation {
  input1: number;
  input2: number;
  special: number;
  operator: string;
  server: string;
  podName: string;
  result: number | string;
  time: number;
  waiting: boolean;
}
