import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { uuid } from 'uuidv4';
import IUserTokenRepository from '../IUserTokensRepository';

class FakeUserTokensRepository implements IUserTokenRepository {
  private usersTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    const now = new Date();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: now,
      updated_at: now,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.usersTokens.find(item => item.token === token);
    return userToken;
  }
}

export default FakeUserTokensRepository;
