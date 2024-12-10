import { Column, Entity } from 'typeorm';

@Entity({ name: 'org' })
export class Org {
  @Column({ type: 'varchar' })
  orgId: string;

  @Column({ type: 'varchar' })
  orgName: string;
}
