import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, Unique } from "typeorm";

@Entity({ name: "trading_insights" })
@Unique(["token_subject", "llm_provider", "timeframe_hours"])
export class TradingInsightsEntity {
  @PrimaryGeneratedColumn()
  analysis_id: number;

  @Column("integer")
  timeframe_hours: number;

  @Column({ type: "text" })
  token_name: string;

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
