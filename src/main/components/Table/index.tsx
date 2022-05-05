import ITransaction from "../../interfaces/ITransaction";

type Props = {
  transactionsToShow: () => ITransaction[];
  selectedOption?: string;
};
const Table = ({ transactionsToShow, selectedOption }: Props) => {
  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>Nr</th>
          <th>ID</th>
          <th>Bank Account</th>
          <th>Description</th>
          <th>Active</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactionsToShow().length === 0 ? (
          <tr>
            <td colSpan={6}>
              You don't have any transactions with {selectedOption}
            </td>
          </tr>
        ) : (
          <>
            {transactionsToShow().map((transaction, index) => (
              <tr key={transaction.id} className="transaction_table-item">
                <td>{index + 1}</td>
                <td>{transaction.id}</td>
                <td>{transaction.bank.name}</td>
                <td>{transaction.description}</td>
                {transaction.isActive ? <td>Yes</td> : <td>No</td>}
                <td>£{transaction.amount.toFixed(2)}</td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
};
export default Table;
