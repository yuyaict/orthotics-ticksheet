
export interface ServiceItem {
  id: string;
  code: string;
  name: string;
  blueFlagRights: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Patient {
  hn: string;
  insuranceType: string;
}
