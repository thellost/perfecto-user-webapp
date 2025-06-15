import { NextResponse } from 'next/server';
import { fetchReferredPersonsFromDatabase, logErrorToDatabase } from '../../db';
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const referral_code = searchParams.get('referral_code');

    if (!referral_code) {
        return NextResponse.json({ error: 'referral_code parameter is required' }, { status: 400 });
    }

    try {
        

        // In a real-world scenario, fetch data from a database here
        // Example:
        const referredPersons = await fetchReferredPersonsFromDatabase(referral_code);
        if (!referredPersons) {
            return NextResponse.json({ error: 'No referred persons found for this referral code' });
        }
        return NextResponse.json({ referral_code, referredPersons });
    } catch (error) {
        
        logErrorToDatabase(error as Error, 'getReferralData');
        return NextResponse.json(
            
            { error: 'Failed to fetch referred persons', details: (error as Error).message },
            { status: 500 }
        );
    }
}