export interface TagGroupState {
  name: string;
  quantity: number;
  tags: TagState[];
}

export interface TagState {
  name: string;
  value: string;
  quantity: number;
  price: number;
}

export interface PortionState {
  name: string;
  price: number;
}

export interface OrderState {
  productId: string;
  quantity: number;
  portion: PortionState;
  tagsGroups: TagGroupState[];
  price: number;
}