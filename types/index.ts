export type TFileContent = { drowser: { metrics: any, cases: any[] } }

export type TDrowserReport = {
  drowser: {
    metrics: Record<string, any>
    cases: TContentCase[]
  }
}

export type TContentCase = {
  id: string
  time: string
  cases: TContentSubCase[]
}

export type TContentSubCase = {
  id: string
  name: string
  actual: string
  exceptation: string
  status: string
  timestamp: string
}

export type DataPoint =  {
  x: string;
  y: number;
}

export type DataSet = {
  id: string;
  data: DataPoint[];
}

export type MonthCount  = {
  name: string;
  count: number;
}

export type MonthValue = {
  id: string;
  value: number;
}