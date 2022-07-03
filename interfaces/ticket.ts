import { Portion } from "./product";

export interface Ticket {
  id: string;
  couponId: string;
  totalAmount: string;
  orderType: string;
  status: string;
  storeId: string;
  scheduledDate: string;
  createdAt: string;
  updatedAt: string;
  ticketItems: TicketItem[];
}

export interface TicketMutation {
  id?: string;
  customerAddressId: string | undefined;
  couponId?: string;
  totalAmount?: string;
  orderType: string;
  status?: string;
  storeId: number;
  scheduledDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TicketItem {
  id: number;
  quantity: number;
  portion: Portion;
  tags: TicketTag[];
  totalAmount: string;
  product: Product;
}

export interface TicketTagGroup {
  id: number;
  max: number;
  min: number;
  name: string;
  tags: TicketTag[];
  hidden: boolean;
}

export interface TicketTag {
  id: number;
  name: string;
  price: number;
  ratio?: number;
  value: string;
  quantity?: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  portions: Portion[];
  tags: TicketTag[];
  image: string;
  createdAt: string;
  updatedAt: string;
}