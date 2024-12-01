import { Package } from 'lucide-react';

export default function OrderSummary({ order }) {
  const subtotal = order.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      <div className="flow-root">
        <ul className="-my-4 divide-y divide-gray-200">
          {order.map((item) => (
            <li key={item.id} className="flex py-4">
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
              </div>
              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>{item.name}</h3>
                    <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500">Qty {item.quantity}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">Subtotal</dt>
          <dd className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="flex items-center text-sm text-gray-600">
            <Package className="w-4 h-4 mr-2" />
            Shipping
          </dt>
          <dd className="text-sm font-medium text-gray-900">${shipping.toFixed(2)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">Tax</dt>
          <dd className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">Total</dt>
          <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
        </div>
      </dl>
    </div>
  );
}