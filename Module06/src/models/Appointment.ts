import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import ModelBase from './ModelBase';
import User from './User';

@Entity('appointments')
class Appointment extends ModelBase {
  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('time with time zone')
  date: Date;
}

export default Appointment;
