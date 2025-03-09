import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApiOrders, updateOrderStatus } from "../../api/request";
import { setOrders, getOrders, updateOrder } from "./orderSlice";
import OrderList from "./OrderList";
import Select from "../ui/Select";

const sortOptions = [
  { value: "", label: "Select options" },
  { value: "date", label: "Date" },
  { value: "price", label: "Price" },
];

const filterOptions = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];

export default function OrderTable() {
  const dispatch = useDispatch();
  const orders = useSelector(getOrders);

  const [localOrders, setLocalOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoadingOrderId, setIsLoadingOrderId] = useState(null);
  const [statusError, setStatusError] = useState({}); // Track errors for each orderId
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      setIsLoading(true);
      try {
        const data = await getApiOrders();
        dispatch(setOrders(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrders();
  }, [dispatch]);

  useEffect(() => {
    if (orders.length) {
      setLocalOrders(orders);
    }
  }, [orders]);

  // Update Order Status
  const handleStatusUpdate = useCallback(
    async (orderId) => {
      setIsLoadingOrderId(orderId);
      setStatusError((prev) => ({ ...prev, [orderId]: null }));

      try {
        await updateOrderStatus(orderId, "completed");
        dispatch(updateOrder({ orderId, newStatus: "completed" }));

        // Update localOrders only after a successful update
        setLocalOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: "completed" } : order
          )
        );
      } catch (err) {
        setStatusError((prev) => ({
          ...prev,
          [orderId]: "Failed to update status. Please try again.",
        }));
        console.log(err.message);
      } finally {
        setIsLoadingOrderId(null);
      }
    },
    [dispatch, setLocalOrders]
  );

  const filteredOrders = useMemo(() => {
    if (filter === "all") return localOrders;
    return localOrders.filter((order) => order.status === filter);
  }, [localOrders, filter]);

  const sortedOrders = useMemo(() => {
    return filteredOrders.slice().sort((a, b) => {
      if (sortBy === "date")
        return new Date(b.timestamp) - new Date(a.timestamp);
      if (sortBy === "price") return b.totalPrice - a.totalPrice;
      return 0;
    });
  }, [filteredOrders, sortBy]);

  return (
    <div className="relative border border-gray-400 overflow-hidden shadow-md rounded-lg md:px-16 pt-6">
      <h1 className="font-bold text-purple-950 uppercase text-3xl">
        Restaurant Orders
      </h1>
      <div className="flex items-center justify-between flex-row py-4 sm:pl-2">
        <div>
          <span className="font-bold">Filter</span>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            options={filterOptions}
          />
        </div>
        <div>
          <span className="font-bold">Sort By</span>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={sortOptions}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-700">
          <thead className="text-purple-950 uppercase">
            <tr>
              <th>Order ID</th>
              <th className="px-4">Customer Name</th>
              <th>Items Ordered</th>
              <th>Total Price</th>
              <th>Status </th>
              <th>Order Timestamp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <OrderList
            orders={sortedOrders}
            error={error}
            isLoading={isLoading}
            isLoadingOrderId={isLoadingOrderId}
            onHandleStatusUpdate={handleStatusUpdate}
            updateError={statusError}
          />
        </table>
      </div>
    </div>
  );
}
