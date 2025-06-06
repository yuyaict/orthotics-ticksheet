
export interface ServiceItem {
  id: string;
  code: string;
  name: string;
  blueFlagRights: string;
  cgcode: string;
  credit: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  totalCredit: number;
}

export interface Patient {
  hn: string;
  insuranceType: string;
}
