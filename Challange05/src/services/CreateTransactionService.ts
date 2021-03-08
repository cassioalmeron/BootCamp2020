import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDto {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDto): Transaction {
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (value > balance.total)
        throw Error('There are not balance to this outcame transaction!');
    }

    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
