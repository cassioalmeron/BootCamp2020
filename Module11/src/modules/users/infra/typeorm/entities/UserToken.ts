import { Entity, Column, Generated } from 'typeorm';
import EntityBase from '@shared/infra/typeorm/EntityBase';

@Entity('user_tokens')
class UserToken extends EntityBase {
  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  user_id: string;
}

export default UserToken;
