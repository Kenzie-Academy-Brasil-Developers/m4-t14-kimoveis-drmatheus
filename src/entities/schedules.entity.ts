import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { RealEstate, User } from "./";

@Entity("schedule")
export class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => RealEstate)
  @JoinColumn()
  realEstate: RealEstate;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}
