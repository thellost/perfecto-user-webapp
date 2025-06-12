"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiTrash2 } from "react-icons/fi";

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
}

export const OfferingTable = () => {
  const { data: session } = useSession();
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const getStatusStyle = (status: string) => {
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-gray-100 rounded-lg p-4">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Property ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Buyer Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Offer Details
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {offerings.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-gray-500 bg-white">
                <p className="text-lg font-medium">No offerings received yet</p>
                <p className="text-sm mt-1">Offerings for your properties will appear here</p>
              </td>
            </tr>
          ) : (
            offerings.map ((offering, index) => (
              <tr 
                key={offering.offering_id} 
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-gray-100 transition-colors duration-150`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {offering.property_id.substring(0, 8)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {offering.user_email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-3 py-1 rounded-full font-medium ${getStatusStyle(offering.status)}`}>
                    {offering.status.charAt(0).toUpperCase() + offering.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${offering.offerPrice.toLocaleString()} • ${offering.downPayment.toLocaleString()} down • {offering.loanTerm} years
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(offering.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {/* Add counter offer logic here */}}
                    className="text-blue-600 hover:text-blue-900 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors duration-200"
                  >
                    Counter Offer
                  </button>
                  <button
                    onClick={() => handleRejectOffer(offering.offering_id, offering.property_id)}
                    className="ml-2 text-red-600 hover:text-red-900 px-4 py-2 rounded-md hover:bg-red-50 transition-colors duration-200"
                  >
                    <FiTrash2 className="inline-block mr-1" />
                    Reject Offer
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OfferingTable;