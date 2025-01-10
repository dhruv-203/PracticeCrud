export type Invoice = {
  id: string;
  name: string;
  email: string;
  phone: string;
  amount: number;
  status: string;
  created_at: string;
};

export enum FilterOptions {
  All = "all",
  Pending = "pending",
  Paid = "paid",
}

export enum SortOptions {
  Newest = "DateAsc",
  Oldest = "DateDesc",
  LowToHighAmount = "AmountAsc",
  HighToLowAmount = "AmountDesc",
}
