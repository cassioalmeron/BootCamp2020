import { Entity, Column } from 'typeorm';
import EntityBase from '@shared/infra/typeorm/EntityBase';

@Entity('users')
class User extends EntityBase {
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
