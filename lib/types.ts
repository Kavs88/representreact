export interface Discount {
  id: string;
  code: string;
  description: string;
  percentage: number;
  validFrom: Date;
  validUntil: Date;
  maxUses?: number;
  isActive: boolean;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDiscountParams {
  discount: {
    code: string;
    description: string;
    percentage: number;
    validFrom: Date;
    validUntil: Date;
    maxUses?: number;
    isActive?: boolean;
  };
  userId: string;
} 