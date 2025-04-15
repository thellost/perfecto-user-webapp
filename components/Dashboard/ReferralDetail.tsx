"use client"
import React, {useEffect, useState} from "react";
import {FiArrowUpRight, FiDollarSign, FiMoreHorizontal} from "react-icons/fi";
import {FaRegCheckCircle} from "react-icons/fa";
import {RxCrossCircled} from "react-icons/rx";

export const ReferralDetail = ({referral_code} : {
    referral_code: string | undefined;
}) => {

    // State to hold referral data and loading status The useState hook is used to
    // manage the state of the component
    const [referralData,
        setReferralData] = useState < any[] > ([]);
    const [loading,
        setLoading] = useState < boolean > (true);

    useEffect(() => {
        const fetchReferralData = async() => {
            try {
                setLoading(true);
                const response = await fetch("/api/crud/dashboard/getReferralData?referral_code=" + referral_code);
                const data = await response.json();
                setReferralData(data.referredPersons || []);
            } catch (error) {
                console.error("Error fetching referral data:", error);
            } finally {
                setLoading(false);
            }
        };
        if (referral_code != undefined) {
            fetchReferralData();
        }
    }, []);

    return (
        <div className="col-span-12 p-4 rounded border border-stone-300">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-1.5 font-medium">
                    <FiDollarSign/>
                    Recent Referrals
                </h3>
                <button className="text-sm text-violet-500 hover:underline">
                    See all
                </button>
            </div>

            {loading
                ? (
                    <div className="flex justify-center items-center h-32">
                        <div
                            className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )
                : (
                    <table className="w-full table-auto">
                        <TableHead/>
                        <tbody>
                            {referralData.length === 0
                                ? (
                                    <tr className="text-sm text-stone-500">
                                        <td colSpan={5} className="text-center p-4">No referrals found</td>
                                    </tr>
                                )
                                : null}
                            {referralData.map((referral, index) => (<TableRow
                                key={index}
                                email={referral.referred_user_email}
                                name={referral.name || "N/A"}
                                joinDate={new Date(referral.created_at).toLocaleDateString()}
                                hasPurchasedHouse={referral.hasPurchasedHouse || ""}
                                order={index + 1}/>))}
                        </tbody>
                    </table>
                )}
        </div>
    );
};

const TableHead = () => {
    return (
        <thead>
            <tr className="text-sm font-normal text-stone-500">
                <th className="text-start p-1.5">Email</th>
                <th className="text-start p-1.5">Name</th>
                <th className="text-start p-1.5">Join Date</th>
                <th className="text-start p-1.5">Purchased</th>
                <th className="w-8"></th>
            </tr>
        </thead>
    );
};

const TableRow = ({email, name, joinDate, hasPurchasedHouse, order} : {
    email: string;
    name: string;
    joinDate: string;
    hasPurchasedHouse: string;
    order: number;
}) => {
    return (
        <tr
            className={order % 2
            ? "bg-stone-100 text-sm"
            : "text-sm"}>
            <td className="p-1.5">
                <a href="#" className="text-violet-600 underline flex items-center gap-1">
                    {email}
                    <FiArrowUpRight/>
                </a>
            </td>
            <td className="p-1.5">{name}</td>
            <td className="p-1.5">{joinDate}</td>
            <td className="p-1.5">
                {hasPurchasedHouse === ""
                    ? (<RxCrossCircled className="text-xl text-red-500"/>)
                    : (<FaRegCheckCircle className="text-xl text-green-500"/>)}
            </td>
            <td className="w-8">
                <button
                    className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8">
                    <FiMoreHorizontal/>
                </button>
            </td>
        </tr>
    );
};
