"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { FiTrash2, FiFilter } from "react-icons/fi";
import Link from "next/link";
import CounterOfferModal from '../Modal/CounterOfferModal';
import debounce from 'lodash/debounce';

interface Offering {
  offering_id: string;
  property_id: string;
  user_email: string;
  phone: string;
  status: string;
  offerPrice: number;
  downPayment: number;
  loanTerm: number;
  created_at: string;
  type: string; // 'offer' or 'counteroffer'
}

const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const OfferingTable = () => {
  const { data: session } = useSession();
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCounterModalOpen, setIsCounterModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offering | null>(null);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minDownPayment: '',
    maxDownPayment: '',
    term: 'all', // 'all', '15', '30'
  });
  const [localFilters, setLocalFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minDownPayment: '',
    maxDownPayment: '',
    term: 'all',
  });
  
  // Add this to check user role
  const userRole = session?.roles || "buyer";
  const isAgent = userRole === "agent" || userRole === "admin";

  // Debounce the filter updates
  const debouncedSetFilters = useCallback(
    debounce((newFilters) => {
      setFilters(newFilters);
    }, 300),
    []
  );

  // Update filters when local filters change
  useEffect(() => {
    debouncedSetFilters(localFilters);
  }, [localFilters]);

  useEffect(() => {
    if (session?.user?.email) {
      fetchOfferings();
    }
  }, [session]);

  const fetchOfferings = async () => {
    try {
      const response = await fetch(`/api/crud/offerings?email=${session?.user?.email}`);
      if (!response.ok) throw new Error('Failed to fetch offerings');
      const data = await response.json();
      console.log("Fetched offerings:", data); // Debugging line to check fetched data
      setOfferings(data.offerings);
    } catch (error) {
      toast.error('Failed to load offerings');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectOffer = async (offeringId: string, propertyId : string) => {
    try {
     const response = await fetch(`/api/crud/offerings?offeringId=${offeringId}&propertyId=${propertyId}`, {
      method: 'DELETE',
    });

      if (!response.ok) {
        throw new Error('Failed to reject offering');
      }

      toast.success('Offering rejected successfully');
      // Refresh the offerings list
      fetchOfferings();
    } catch (error) {
      toast.error('Failed to reject offering');
      console.error('Error:', error);
    }
  };

  const handleAcceptOffer = async (offeringId: string, propertyId: string) => {
    try {
      const response = await fetch(`/api/crud/offerings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          offering_id: offeringId,
          property_id: propertyId,
          status: 'approved'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to accept offering');
      }

      toast.success('Offering accepted successfully');
      // Refresh the offerings list
      fetchOfferings();
    } catch (error) {
      toast.error('Failed to accept offering');
      console.error('Error:', error);
    }
  };

  const getStatusStyle = (status: string, type?: string) => {
    // Handle counter offer statuses
    if (type === 'counteroffer') {
      switch (status.toLowerCase()) {
        case 'rejected':
          return 'bg-red-100 text-red-800';
        case 'approved':
          return 'bg-green-100 text-green-800';
        default:
          return 'bg-blue-100 text-blue-800';
      }
    }

    // Handle regular offer statuses
    switch (status.toLowerCase()) {
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOfferings = offerings.filter(offering => {
    const meetsMinPrice = !filters.minPrice || offering.offerPrice >= Number(filters.minPrice);
    const meetsMaxPrice = !filters.maxPrice || offering.offerPrice <= Number(filters.maxPrice);
    const meetsMinDown = !filters.minDownPayment || offering.downPayment >= Number(filters.minDownPayment);
    const meetsMaxDown = !filters.maxDownPayment || offering.downPayment <= Number(filters.maxDownPayment);
    const meetsTerm = filters.term === 'all' || offering.loanTerm === Number(filters.term);

    return meetsMinPrice && meetsMaxPrice && meetsMinDown && meetsMaxDown && meetsTerm;
  });

  // Add this helper function to determine if actions should be shown
  const shouldShowActions = (offering: Offering, isAgent: boolean) => {
    if (isAgent) {
      // Sellers/agents can't act on counter offers
      return offering.type !== 'counteroffer';
    } else {
      // Buyers can only act on counter offers
      return offering.type === 'counteroffer';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-gray-100 rounded-lg p-4">
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
      <div className="flex items-center gap-2 mb-4">
        <FiFilter className="text-gray-500" />
        <h3 className="font-semibold text-gray-700">Filter Offerings</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Price Range</p>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={localFilters.minPrice}
              onChange={(e) => setLocalFilters(prev => ({ ...prev, minPrice: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              value={localFilters.maxPrice}
              onChange={(e) => setLocalFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Down Payment Range</p>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={localFilters.minDownPayment}
              onChange={(e) => setLocalFilters(prev => ({ ...prev, minDownPayment: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              value={localFilters.maxDownPayment}
              onChange={(e) => setLocalFilters(prev => ({ ...prev, maxDownPayment: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Loan Term</p>
          <select
            value={localFilters.term}
            onChange={(e) => setLocalFilters(prev => ({ ...prev, term: e.target.value }))}
            className="w-full px-3 py-2 border rounded-md text-sm"
          >
            <option value="all">All Terms</option>
            <option value="5">5 Years</option>
            <option value="10">10 Years</option>
            <option value="15">15 Years</option>
            <option value="20">20 Years</option>
            <option value="30">30 Years</option>
          </select>
        </div>
      </div>
    </div>
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Property ID
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Buyer Email
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Offer Details
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            {(isAgent || (!isAgent && filteredOfferings.some(o => o.type === 'counteroffer'))) && (
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredOfferings.length === 0 ? (
            <tr>
              <td colSpan={
  (isAgent || (!isAgent && filteredOfferings.some(o => o.type === 'counteroffer'))) ? 6 : 5
} className="px-6 py-8 text-center text-gray-500 bg-white">
                <p className="text-lg font-medium">No offerings match your filters</p>
                <p className="text-sm mt-1">Try adjusting your filter criteria</p>
              </td>
            </tr>
          ) : (
            filteredOfferings.map((offering, index) => (
              <tr 
                key={offering.offering_id} 
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-gray-100 transition-colors duration-150`}
              >
               <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 underline text-center">
                  <Link href={`/property-details/${offering.property_id}`} target="_blank" rel="noopener noreferrer">
                    {offering.property_id.substring(0, 8)}...
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {offering.user_email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <span className={`px-3 py-1 rounded-full font-medium ${getStatusStyle(offering.status, offering.type)} inline-block`}>
                    {offering.type === 'counteroffer' 
                      ? offering.status.toLowerCase() === 'rejected'
                        ? 'Counter Rejected'
                        : offering.status.toLowerCase() === 'approved'
                        ? 'Counter Accepted'
                        : 'Counter Offer'
                      : offering.status.charAt(0).toUpperCase() + offering.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  ${offering.offerPrice.toLocaleString()} • ${offering.downPayment.toLocaleString()} down • {offering.loanTerm} years
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {new Date(offering.created_at).toLocaleDateString()}
                </td>
                {shouldShowActions(offering, isAgent) && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center gap-2">
                    {isAgent ? (
                      // Seller/Agent actions for non-counter offers
                      <>
                        <button
                          onClick={() => handleAcceptOffer(offering.offering_id, offering.property_id)}
                          className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => {
                            setSelectedOffer(offering);
                            setIsCounterModalOpen(true);
                          }}
                          className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer"
                        >
                          Counter Offer
                        </button>
                        <button
                          onClick={() => handleRejectOffer(offering.offering_id, offering.property_id)}
                          className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer flex items-center"
                        >
                          <FiTrash2 className="mr-1" />
                          Reject
                        </button>
                      </>
                    ) : (
                      // Buyer actions for counter offers
                      <>
                        <button
                          onClick={() => handleAcceptOffer(offering.offering_id, offering.property_id)}
                          className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer"
                        >
                          Accept Counter
                        </button>
                        <button
                          onClick={() => handleRejectOffer(offering.offering_id, offering.property_id)}
                          className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer"
                        >
                          Decline Counter
                        </button>
                      </>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {selectedOffer && (
        <CounterOfferModal
          isOpen={isCounterModalOpen}
          onClose={() => {
            setIsCounterModalOpen(false);
            setSelectedOffer(null);
          }}
          originalOffer={selectedOffer}
        />
      )}
    </div>
  );
};

export default OfferingTable;