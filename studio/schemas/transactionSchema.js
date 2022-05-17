export const transactionSchema = {
  name: 'transactions',
  title: 'Transactions',
  type: 'document',
  fields: [
    {
      name: 'txnHash',
      title: 'Transaction Hash',
      type: 'string',
    },
    {
      name: 'fromAddress',
      title: 'From (Wallet Address)',
      type: 'string',
    },
    {
      name: 'toAddress',
      title: 'Transactions',
      type: 'string',
    },
    {
      name: 'amount',
      title: 'Amount',
      type: 'string',
    },
    {
      name: 'timestamp',
      title: 'Timestamp',
      type: 'datetime',
    },
  ],
}
