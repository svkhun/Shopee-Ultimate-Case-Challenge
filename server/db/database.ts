/**
 * Enterprise Repository Layer for Smart COD Reliability System
 * Architecture: Clean Data Access Object with In-Memory / PostgreSQL Dual Support
 */

import { 
  Buyer, 
  Order, 
  ScoreLog, 
  RiskTier 
} from "../domain/models";

// In-Memory Thread-Safe Storage Singleton for Zero-Configuration Run
class InMemoryDatabase {
  private buyers: Map<string, Buyer> = new Map();
  private orders: Map<string, Order> = new Map();
  private scoreLogs: ScoreLog[] = [];

  constructor() {
    this.seedInitialBuyers();
  }

  private seedInitialBuyers() {
    const initialBuyers: Buyer[] = [
      {
        id: "b1000000-0000-0000-0000-000000000001",
        externalBuyerId: "BUYER-LOW-001",
        fullName: "Somchai Sukjai (Verified Regular)",
        phoneNumber: "+66812345678",
        email: "somchai.s@example.com",
        currentReliabilityScore: 88.0,
        riskTier: RiskTier.LOW_RISK,
        consecutiveFailedCodCount: 0,
        totalCompletedOrders: 34,
        totalFailedOrders: 0,
        createdAt: new Date("2025-01-10"),
        updatedAt: new Date("2026-09-01"),
      },
      {
        id: "b2000000-0000-0000-0000-000000000002",
        externalBuyerId: "BUYER-MED-002",
        fullName: "Kanya Wongsuwan (Occasional Delay)",
        phoneNumber: "+66898765432",
        email: "kanya.w@example.com",
        currentReliabilityScore: 64.0,
        riskTier: RiskTier.MEDIUM_RISK,
        consecutiveFailedCodCount: 0,
        totalCompletedOrders: 12,
        totalFailedOrders: 2,
        createdAt: new Date("2025-06-15"),
        updatedAt: new Date("2026-08-20"),
      },
      {
        id: "b3000000-0000-0000-0000-000000000003",
        externalBuyerId: "BUYER-HIGH-003",
        fullName: "Anan Promthep (Frequent Refusal)",
        phoneNumber: "+66845556677",
        email: "anan.p@example.com",
        currentReliabilityScore: 42.0,
        riskTier: RiskTier.HIGH_RISK,
        consecutiveFailedCodCount: 1,
        totalCompletedOrders: 5,
        totalFailedOrders: 4,
        createdAt: new Date("2026-01-05"),
        updatedAt: new Date("2026-09-15"),
      },
      {
        id: "b4000000-0000-0000-0000-000000000004",
        externalBuyerId: "BUYER-REPEAT-004",
        fullName: "Vichai Chokdee (Repeated Chronic Returns)",
        phoneNumber: "+66861112233",
        email: "vichai.c@example.com",
        currentReliabilityScore: 18.0,
        riskTier: RiskTier.REPEATED_HIGH_RISK,
        consecutiveFailedCodCount: 3,
        totalCompletedOrders: 2,
        totalFailedOrders: 7,
        createdAt: new Date("2026-03-20"),
        updatedAt: new Date("2026-09-25"),
      },
    ];

    for (const b of initialBuyers) {
      this.buyers.set(b.id, b);
      this.buyers.set(b.externalBuyerId, b); // index by both id & external ID
    }
  }

  // --- Buyer Repository Methods ---

  public async findBuyerByIdOrExternal(id: string): Promise<Buyer | null> {
    const buyer = this.buyers.get(id);
    return buyer ? { ...buyer } : null;
  }

  public async saveBuyer(buyer: Buyer): Promise<Buyer> {
    buyer.updatedAt = new Date();
    this.buyers.set(buyer.id, { ...buyer });
    this.buyers.set(buyer.externalBuyerId, { ...buyer });
    return { ...buyer };
  }

  public async createBuyer(input: {
    externalBuyerId: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    initialScore?: number;
  }): Promise<Buyer> {
    const id = `b-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const score = input.initialScore ?? 80.0;
    const tier = score >= 80 ? RiskTier.LOW_RISK : RiskTier.MEDIUM_RISK;

    const newBuyer: Buyer = {
      id,
      externalBuyerId: input.externalBuyerId,
      fullName: input.fullName,
      phoneNumber: input.phoneNumber,
      email: input.email,
      currentReliabilityScore: score,
      riskTier: tier,
      consecutiveFailedCodCount: 0,
      totalCompletedOrders: 0,
      totalFailedOrders: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this.saveBuyer(newBuyer);
  }

  // --- Order Repository Methods ---

  public async findOrderByIdOrNumber(orderRef: string): Promise<Order | null> {
    const order = this.orders.get(orderRef);
    return order ? { ...order } : null;
  }

  public async saveOrder(order: Order): Promise<Order> {
    order.updatedAt = new Date();
    this.orders.set(order.id, { ...order });
    this.orders.set(order.orderNumber, { ...order });
    return { ...order };
  }

  public async createOrder(orderData: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<Order> {
    const id = `ord-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newOrder: Order = {
      ...orderData,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this.saveOrder(newOrder);
  }

  // --- Score Logs / Audit Trail Methods ---

  public async appendScoreLog(log: Omit<ScoreLog, "id" | "createdAt">): Promise<ScoreLog> {
    const entry: ScoreLog = {
      ...log,
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date(),
    };

    this.scoreLogs.unshift(entry);
    return entry;
  }

  public async getScoreLogsByBuyer(buyerId: string): Promise<ScoreLog[]> {
    return this.scoreLogs.filter((l) => l.buyerId === buyerId);
  }
}

// Global Singleton Instance
export const db = new InMemoryDatabase();
