import React from "react";
import { formatDate } from "../helpers/helperFunctions";
import { SaleOrderStatusHistory } from "../models/saleOrderModel";

// interface IOrderStatus {
//   saleOrderStatusId: number;
//   saleOrderStatusName: string;
//   statusDate: string;
// }
const OrderTracking = ({
  orderProgress,
}: {
  orderProgress: SaleOrderStatusHistory[];
}) => {
  console.log(orderProgress);
  const isOrderPlaced = orderProgress?.filter(
    (status: { saleOrderStatusId: number }) => status?.saleOrderStatusId === 1
  );

  const isCancelled = orderProgress?.filter(
    (status: { saleOrderStatusId: number }) => status?.saleOrderStatusId === 3
  );
  const isPacked = orderProgress?.filter(
    (status: { saleOrderStatusId: number }) =>
      status?.saleOrderStatusId === 4 || status?.saleOrderStatusId === 5
  );

  const isShipped = orderProgress?.filter(
    (status: { saleOrderStatusId: number }) =>
      status?.saleOrderStatusId === 6 || status?.saleOrderStatusId === 7
  );

  const isDelivered = orderProgress?.filter(
    (status: { saleOrderStatusId: number }) =>
      status?.saleOrderStatusId === 8 || status?.saleOrderStatusId === 9
  );
  return (
    <div className='card mb-3'>
      <div className='card-body'>
        <div className='d-flex justify-content-between flex-colomn-1200'>
          <div className='order-tracking completed'>
            <span className='is-complete'></span>
            <p className='main-status-label'>
              Order Created
              <br />
              <span>
                {" "}
                {(isOrderPlaced?.length || 0 > 0) &&
                  formatDate(
                    isOrderPlaced?.[0]?.statusDate as string,
                    "dd MMM yyyy"
                  )}
              </span>
            </p>
          </div>
          <div className='order-tracking completed'>
            <span className='is-complete'></span>
            <p className='main-status-label'>
              Order Confirmed
              <br />
              <span>
                {" "}
                {(isOrderPlaced?.length || 0 > 0) &&
                  formatDate(
                    isOrderPlaced?.[0]?.statusDate as string,
                    "dd MMM yyyy"
                  )}
              </span>
            </p>
          </div>
          {(isCancelled?.length || 0 > 0) && (
            <div
              className={`order-tracking ${
                isCancelled?.length || 0 > 0 ? "completed" : ""
              }`}
            >
              <span className='is-complete'></span>
              <p>
                Order Cancelled
                <br />
                <span>
                  {" "}
                  {(isCancelled?.length || 0 > 0) &&
                    formatDate(
                      isPacked?.[0]?.statusDate as string,
                      "dd MMM yyyy"
                    )}
                </span>
              </p>
            </div>
          )}
          <div
            className={`order-tracking ${
              isPacked?.length || 0 > 0 ? "completed" : ""
            }`}
          >
            <span className='is-complete'></span>
            <p
              className={`${
                isPacked?.length || 0 > 0 ? "main-status-label" : ""
              }`}
            >
              Order Packed
              <br />
              <span>
                {" "}
                {(isPacked?.length || 0 > 0) &&
                  formatDate(
                    isPacked?.[0]?.statusDate as string,
                    "dd MMM yyyy"
                  )}
              </span>
            </p>
            <div className='hoverd-details'>
              {(isPacked?.length || 0 > 0) && (
                <ul className='tracker-sublist'>
                  {isPacked
                    ?.sort(
                      (a, b) => a?.saleOrderStatusId - b?.saleOrderStatusId
                    )
                    .map((packing, index) => (
                      <li key={index}>
                        <div className='tracker-more-details'>
                          <p className='naration strong mt-0 mb-0'>
                            {packing?.saleOrderStatusName}
                          </p>
                          <p className='mt-0'>
                            {formatDate(
                              packing?.statusDate as string,
                              "dd MMM yyyy"
                            )}
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
          <div
            className={`order-tracking ${
              (isShipped?.length || 0) > 0 ? "completed" : ""
            }`}
          >
            <span className='is-complete'></span>
            <p
              className={`${
                (isShipped?.length || 0) > 0 ? "main-status-label" : ""
              }`}
            >
              Order Shipped
              <br />
              <span>
                {" "}
                {(isShipped?.length || 0 > 0) &&
                  formatDate(
                    isShipped?.[0]?.statusDate as string,
                    "dd MMM yyyy"
                  )}
              </span>
            </p>
            <div className='hoverd-details'>
              {(isShipped?.length || 0) > 0 && (
                <ul className='tracker-sublist'>
                  {isShipped
                    ?.sort(
                      (a, b) => a?.saleOrderStatusId - b?.saleOrderStatusId
                    )
                    .map((shipping, index) => (
                      <li key={index}>
                        <div className='tracker-more-details'>
                          <p className='naration strong mt-0 mb-0'>
                            {shipping?.saleOrderStatusName}
                          </p>
                          <p className='mt-0'>
                            {formatDate(
                              shipping?.statusDate as string,
                              "dd MMM yyyy"
                            )}
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
          <div
            className={`order-tracking ${
              (isDelivered?.length || 0) > 0 ? "completed" : ""
            }`}
          >
            <span className='is-complete'></span>
            <p
              className={`${
                (isDelivered?.length || 0) > 0 ? "main-status-label" : ""
              }`}
            >
              Order Delivered
              <br />
              <span>
                {(isDelivered?.length || 0) > 0 &&
                  formatDate(
                    isDelivered?.[0]?.statusDate as string,
                    "dd MMM yyyy"
                  )}
              </span>
            </p>
            <div className='hoverd-details'>
              {(isDelivered?.length || 0) > 0 && (
                <ul className='tracker-sublist'>
                  {isDelivered
                    ?.sort(
                      (a, b) => a?.saleOrderStatusId - b?.saleOrderStatusId
                    )
                    .map((deliver, index) => (
                      <li key={index}>
                        <div className='tracker-more-details'>
                          <p className='naration strong mt-0 mb-0'>
                            {deliver?.saleOrderStatusName}
                          </p>
                          <p className='mt-0'>
                            {formatDate(
                              deliver?.statusDate as string,
                              "dd MMM yyyy"
                            )}
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
