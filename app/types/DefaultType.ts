export type City = {
    city: string | '',
    city_ascii: string | '',
    state_id: string | '',
    state_name: string | '',
    county_fips: number | 0,
    county_name: string | '',
    lat: number | 0,
    lng: number | 0,
    population: number | 0,
    density: number | 0,
    source: string | '',
    military: string | '',
    incorporated: string | '',
    timezone: string | '',
    ranking: number | 0,
    zips: number | 0,
    id: number | 0
}

export type User = {
    name?: string,
    phone_number?: string,
    email: string,
    roles: string,
    hashed_password: string,
    full_address?: string,
    referral_code?: string
}

export type SearchList = {
    data: City[]
}

export type TaxRecord = {
    year: number,
    amount: number
}
export type PublicRecords = {
    taxAbleValue: {
        addition: string,
        land: string
    },
    taxes: TaxRecord[]
}

export type School = {
    rating: number,
    name: string,
    type: string,
    gradesFrom: number,
    gradesTo: number,
    distance: number
}

export interface UserState {
  isOn: boolean
  user: {
    user:string,
    role:string
  }
}
export type Properties = {
    name: string | '';
    image: string | '';
    price: number;
    address: string | '';
    state: string | '';
    beds: string | '';
    baths: string | '';
    sqft: string | '';
    comingSoon: string | '';
    monthlyPayment: string | '';
    downPayment: number;
    terms: number;
    _id: string | '',
    schools: School[],
    propertyListingDetails: string[] | '',
    amenities: string[] | '',
    buildingInfo: string | '',
    propertyHistory: string | '',
    homeFacts: string[] | '',
    latitude: number | 0,
    longitude: number | 0,
    description: string | '',
    propertyInformation: string | '',
    propertyImages: string[] | '',
    publicRecords: PublicRecords,
    wishlisted: boolean

}
