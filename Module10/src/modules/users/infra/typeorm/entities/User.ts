import { Entity, Column } from 'typeorm';
import ModelBase from './ModelBase';

@Entity('users')
class User extends ModelBase {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;
}

export default User;
