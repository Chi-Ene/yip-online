import Spinner from "../ui/Spinner";
import Button from "../ui/Button";

export default function OrderList({
  orders,
  isLoading,
  error,
  isLoadingOrderId,
  onHandleStatusUpdate,
  updateError,
}) {
  return (
    <tbody>
      {isLoading && (
        <tr>
          <td colSpan="6">
            <div className="flex items-center justify-center py-6">
              <Spinner />
            </div>
          </td>
        </tr>
      )}

      {error && (
        <tr>
          <td
            colSpan="6"
            className="text-center text-red-600 font-semibold text-xl py-4"
          >
            {error}
          </td>
        </tr>
      )}

      {orders.map((order) => (
        <tr key={order.id} className="hover:bg-purple-300">
          <td className="md:py-4">{order.id}</td>
          <td className="md:py-4 px-4 font-medium">{order.customer}</td>
          <td className="md:py-4">{order.items.join(", ")}</td>
          <td>${order.totalPrice}</td>
          <td
            className={`font-semibold md:py-4 capitalize ${
              order.status === "pending" ? "text-red-500" : "text-green-500"
            }`}
          >
            {order.status}
          </td>
          <td className="md:py-4">
            {new Date(order.timestamp).toLocaleString()}
          </td>
          <td className="md:py-4">
            {order.status === "pending" && (
              <Button
                disabled={isLoadingOrderId === order.id}
                onClick={() => onHandleStatusUpdate(order.id)}
              >
                {isLoadingOrderId === order.id
                  ? "Updating..."
                  : "Mark as Complete"}
              </Button>
            )}
            {updateError[order.id] && (
              <p className="text-red-500 text-sm mt-1">
                {updateError[order.id]}
              </p>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
}
