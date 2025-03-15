// src/components/ReferralDashboard.js
import React from 'react';
import { Table, Card } from 'antd';
import Footer from '../../components/Footer/Footer';

const ReferralDashboard = () => {
  // Sample data for the referral table
  const referralData = [
    { key: '1', referralCode: 'ABC123', usersSignedUp: 5 },
    { key: '2', referralCode: 'DEF456', usersSignedUp: 3 },
    { key: '3', referralCode: 'GHI789', usersSignedUp: 8 },
  ];

  // Columns configuration for the table
  const columns = [
    {
      title: 'Referral Code',
      dataIndex: 'referralCode',
      key: 'referralCode',
    },
    {
      title: 'Users Signed Up',
      dataIndex: 'usersSignedUp',
      key: 'usersSignedUp',
    },
  ];

  return (
    <div className="flex  justify-center min-h-screen bg-gray-100">
      <div className="w-full px-16 py-8">
        <h2 className="text-2xl font-bold mb-4">Referral Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {referralData.map((referral, index) => (
            <Card
              key={referral.key}
              className={`rounded-lg shadow-md p-4 ${index % 2 === 0 ? 'bg-blue-200' : 'bg-green-200'}`}
              title={`Referral Code: ${referral.referralCode}`}
            >
              <p className="text-lg font-medium text-gray-800">Users Signed Up: {referral.usersSignedUp}</p>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Table dataSource={referralData} columns={columns} pagination={false} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReferralDashboard;
