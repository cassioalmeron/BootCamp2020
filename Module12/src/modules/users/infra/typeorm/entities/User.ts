import { Entity, Column } from 'typeorm';
import EntityBase from '@shared/infra/typeorm/EntityBase';
import { Exclude, Expose } from 'class-transformer';

@Entity('users')
class User extends EntityBase {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    return this.avatar
      ? `${process.env.APP_API_URL}/files/${this.avatar}`
      : null;
  }
}

export default User;
