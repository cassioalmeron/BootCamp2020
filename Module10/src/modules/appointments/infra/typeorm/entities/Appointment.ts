import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import EntityBase from '../../../shared/EntityBase';
import User from './User';

@Entity('appointments')
class Appointment extends EntityBase {
  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('time with time zone')
  date: Date;
}

export default Appointment;
