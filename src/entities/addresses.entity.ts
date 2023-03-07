import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("adresses")
export class Address {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 45 })
  street: string;

  @Column({ length: 8 })
  zipCode: string;

  @Column({ length: 7, nullable: true })
  number: string;

  @Column({ length: 20 })
  city: string;

  @Column({ length: 2 })
  state: string;
}
