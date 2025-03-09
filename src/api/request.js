export async function getApiOrders() {
  const response = await fetch(
    "https://yip-online-1e647-default-rtdb.firebaseio.com/orders.json"
  );
  const responseData = await response.json();

  if (!response.ok) {
    const error = new Error(responseData.message || "Failed to fetch orders.");
    throw error;
  }

  const orders = [];

  for (const key in responseData) {
    const order = {
      id: key,
      customer: responseData[key].customer,
      items: responseData[key].items,
      totalPrice: responseData[key].totalPrice,
      status: responseData[key].status,
      timestamp: responseData[key].timestamp,
    };
    orders.push(order);
  }
  return orders;
}

export async function updateOrderStatus(orderId, newStatus) {
  const response = await fetch(
    `https://yip-online-1e647-default-rtdb.firebaseio.com/orders/${orderId}.json`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    }
  );

  if (!response.ok) {
    throw new Error(`Error ${response.status}: Failed to update order.`);
  }

  return response.json();
}
