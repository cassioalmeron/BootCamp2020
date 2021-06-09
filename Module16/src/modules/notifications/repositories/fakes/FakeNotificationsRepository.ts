import ICreateNotificationsDTO from '@modules/notifications/dtos/ICreateNotificationsDTO';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import { ObjectID } from 'mongodb';
import Notification from '../../infra/typeorm/schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create(data: ICreateNotificationsDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(
      notification,
      {
        id: new ObjectID(),
      },
      data,
    );

    this.notifications.push(notification);

    return notification;
  }
}

export default NotificationsRepository;
