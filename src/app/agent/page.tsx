"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getRecordById } from "@/core/requests/agentRequests";
import { formatCurrency } from "@/core/helpers/helperFunctions";

const page = () => {
  const { data: session } = useSession();

  const { data: agentOverview, isLoading: agentOverviewLoading } = useQuery({
    queryKey: ["agentOverviewRec"],
    queryFn: () => getRecordById(session?.user?.id),
    refetchOnWindowFocus: false,
  });

  return (
    <div className='card shadow rounded'>
      <div className='card-header bg-white'>
        <h5 className='mb-0'>Overview</h5>
      </div>

      <div className='card-body'>
        <div className='row'>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>{agentOverview?.totalCustomerCount}</p>
              <p className='mb-0 text-muted'>Customer Count</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>{agentOverview?.totalSaleOrderCount}</p>
              <p className='mb-0 text-muted'>Sales Count</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>
                {formatCurrency(agentOverview?.totalAgentCommission)}
              </p>
              <p className='mb-0 text-muted'>Total Commission Earned</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>
                {formatCurrency(agentOverview?.totalPaidCommission)}
              </p>
              <p className='mb-0 text-muted'>Total Commission Paid</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
