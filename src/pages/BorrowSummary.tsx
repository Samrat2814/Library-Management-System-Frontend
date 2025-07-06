import { useGetBorrowSummaryQuery } from "@/features/borrow/borrowApi";

const BorrowSummary = () => {
  const {
    data: response,
    isLoading,
    isError,
  } = useGetBorrowSummaryQuery();

  // Extract the actual data array
  const borrowSummary = response?.data ?? [];

  if (isLoading)
    return <p className="text-center mt-4">Loading summary...</p>;

  if (isError)
    return (
      <p className="text-red-600 text-center mt-4">
        Failed to load borrow summary. Please try again.
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">📊 Borrow Summary</h2>

      {borrowSummary.length ? (
        <div className="overflow-x-auto rounded shadow">
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">📖 Title</th>
                <th className="p-3 text-left">📚 ISBN</th>
                <th className="p-3 text-left">📦 Total Borrowed</th>
                <th className="p-3 text-left">📦 Due Date</th>
              </tr>
            </thead>
            <tbody>
              {borrowSummary.map((item, idx) => (
                <tr
                  key={item.book._id + idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-3">{item.book.title}</td>
                  <td className="p-3">{item.book.isbn}</td>
                  <td className="p-3">{item.totalQuantity}</td>
                  <td className="p-3">{item.book.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No borrow summary available yet.
        </p>
      )}
    </div>
  );
};

export default BorrowSummary;
