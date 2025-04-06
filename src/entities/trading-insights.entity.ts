import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from "typeorm";

@Entity({ name: "trading_insights" })
export class TradingInsightsEntity {
  @PrimaryGeneratedColumn()
  analysis_id: number;

  @Column("integer")
  timeframe_hours: number;

  @Index()
  @Column({ type: "text" })
  token_subject: string;

  @Column({ type: "text" })
  full_output: string;

  @Column({ type: "jsonb" })
  analysis_extract: Record<string, any>;

  @Index()
  @Column({ type: "text" })
  llm_provider: string;

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date;
}
