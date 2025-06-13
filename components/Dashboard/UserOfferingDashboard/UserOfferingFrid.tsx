"use client";
import React, {useEffect, useState} from "react";
import {StatCards} from "../StatCards";
import {ActivityGraph} from "../ActivityGraph";
import {UsageRadar} from "../UsageRadar";
import {ReferralDetail} from "../ReferralDetail";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {ListingForm} from "../ListingForm";
import OfferingsTable from "../OfferingTable";
import Collapsible from "../Collapsible";
import PropertiesTable from "../PropertiesTable";

export const UserOfferingGrid = () => {
    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/login");
        }
    });

    const [referralData,
        setReferralData] = useState < any[] > ([]);
    const [loading,
        setLoading] = useState < boolean > (true);

    useEffect(() => {
        const fetchReferralData = async() => {
            try {
                setLoading(true);
                const referral_code = session.data
                    ?.referral_code;
                if (!referral_code) 
                    return;
                
                const response = await fetch(`/api/crud/dashboard/getReferralData?referral_code=${referral_code}`);
                const result = await response.json();
                setReferralData(result.referredPersons || []);
            } catch (error) {
                console.error("Error fetching referral data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (session.status === "authenticated") {
            fetchReferralData();
        }
    }, [session]);

    if (session.status === "loading" || loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div
                    className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="px-4 grid gap-3 grid-cols-12 load">

            <div className="col-span-12 mt-8">
                <h2 className="text-xl font-semibold mb-2">Offerings</h2>
                <OfferingsTable />
            </div>

        </div>
    );
};
