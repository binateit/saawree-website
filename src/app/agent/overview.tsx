import { formatCurrency } from "@/core/helpers/helperFunctions";
import { AgentRecord } from "@/core/models/agentModel";
import React from "react";

const overview = ({ overview }: { overview: AgentRecord | undefined }) => {
  return (
    <div className='card shadow rounded'>
      <div className='card-header bg-white'>
        <h5 className='mb-0'>Overview</h5>
      </div>

      <div className='card-body'>
        <div className='row'>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>{overview?.totalCustomerCount}</p>
              <p className='mb-0 text-muted'>Customer Count</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>{overview?.totalSaleOrderCount}</p>
              <p className='mb-0 text-muted'>Sales Count</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>
                {formatCurrency(overview?.totalAgentCommission)}
              </p>
              <p className='mb-0 text-muted'>Total Commission Earned</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>
                {formatCurrency(overview?.totalPaidCommission)}
              </p>
              <p className='mb-0 text-muted'>Total Commission Paid</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default overview;
