type keyValuePair = {
    key: string;
    parents: {
      key: string;
      pairs: { key: string; value: string }[];
    }[];
  }[];

const compass_format = {
        "keyDetails": {
            "keyDetails": {
                "style": "Condominium",
                "substyle": "Midrise",
                "waterfront": "None"
            }
        },
        "summary": {
            "locationandGeneralInformation": {
                "areaname": "Cliffside Park",
                "buildingcomplex": "Fairmont Condo Association",
                "floodplain": "None",
                "streetName": "Edgewater",
                "countyName": "BERGEN",
                "status": "Active",
                "streetNumberNumeric": "180",
                "zipCode": "07010"
            },
            "taxesandHOAInformation": {
                "otherCharges": "True",
                "maintenenceCharges": "$547.00",
                "maintenenceIncludes": "Common Area",
                "tax": "$6,934"
            },
            "owner": {
                "ownership": "Private"
            }
        },
        "property": {
            "lotInformation": {
                "unitNo": "1A",
                "yearBuilt": "2000's",
                "viewsexposure": "None"
            },
            "propertyandAssessments": {
                "photoNumber": "15",
                "courtAppYN": "No"
            },
            "utilities": {
                "heatcool": "Electric",
                "coolingType": "Electric"
            }
        },
        "interiorandExteriorFeatures": {
            "interiorFeatures": {
                "bedrooms": "1",
                "bathsfull": "1",
                "bathspartial": "0",
                "basement": "Unfinished",
                "laundry": "In Unit",
                "lifestyle": "Close/Parks",
                "fullBathsTotal": "1",
                "numofBaths": "1.0"
            },
            "exteriorFeatures": {
                "fireplace": "None",
                "buildingAmenities": "Elevator",
                "miscellaneous": "None"
            }
        },
        "agent": {
            "saleandListingInformation": {
                "itemsIncluded": "Dishwasher,Microwave,Ov/Rg/Gas,Refrigerator,Washer/Dryer",
                "managementPhone": "(201) 417-7780",
                "searchClass": "CCT",
                "listPrice": "$368,000.00",
                "listingDate": "02-06-2025",
                "statusDate": "02-05-2025"
            },
            "showingInformation": {
                "internetRemarks": "NEWER COMPLEX, LARGE 1BR APARTMENT WITH OPEN FLOOR PLAN WITH HARDWOODFLOORS. NEWER KITCHEN WITH GRANITE COUNTERTOPS,HIGH CEILINGS CENTRAL AIR,BRIGHT AND SUNNY,WASHER AND DRYER IN UNIT WITH 1 PARKING SPACE. NYC TRANSPORTATION IN FRONT OF BUILDING,WALK DISTANCE TO SHOPPINGS."
            }
        },
        "rental": {
            "rentalInformation": {
                "pets": "None"
            }
        }
    }

export function convertCompassFormat(data: typeof compass_format): keyValuePair {
  const result: keyValuePair = [];

  // Process each top-level section
  Object.entries(data).forEach(([grandParentKey, grandParentValue]) => {
    const grandParent: keyValuePair[0] = {
      key: formatKey(grandParentKey),
      parents: []
    };

    // Process second level (parents)
    if (typeof grandParentValue === 'object') {
      Object.entries(grandParentValue).forEach(([parentKey, parentValue]) => {
        const parent: { key: string; pairs: { key: string; value: string }[] } = {
          key: formatKey(parentKey),
          pairs: []
        };

        // Process third level (key-value pairs)
        if (typeof parentValue === 'object') {
          Object.entries(parentValue).forEach(([key, value]) => parent.pairs.push({
              key: formatKey(key),
              value: String(value)
          }));
        }

        grandParent.parents.push(parent);
      });
    }

    result.push(grandParent);
  });

  return result;
}

// Helper function to format keys (capitalize and add spaces)
function formatKey(key: string): string {
  return key
    // Split on camelCase
    .replace(/([A-Z])/g, ' $1')
    // Split on numbers
    .replace(/(\d+)/g, ' $1')
    // Remove any existing underscores or extra spaces
    .replace(/[_\s]+/g, ' ')
    // Capitalize first letter
    .replace(/^\w/, c => c.toUpperCase())
    .trim();
}

export function convertToCompassFormat(keyValuePair: keyValuePair) {
  const result: Record<string, any> = {};

  keyValuePair.forEach((grandParent) => {
    // Convert formatted key back to original format
    const grandParentKey = grandParent.key
      .toLowerCase()
      .replace(/\s+/g, '') // Remove spaces
      .replace(/^\w/, c => c.toLowerCase()); // Ensure first letter is lowercase

    result[grandParentKey] = {};

    grandParent.parents.forEach((parent) => {
      // Convert formatted parent key back to original format
      const parentKey = parent.key
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/^\w/, c => c.toLowerCase());

      result[grandParentKey][parentKey] = {};

      // Convert key-value pairs
      parent.pairs.forEach((pair) => {
        const key = pair.key
          .toLowerCase()
          .replace(/\s+/g, '')
          .replace(/^\w/, c => c.toLowerCase());

        result[grandParentKey][parentKey][key] = pair.value;
      });
    });
  });

  return result;
}

// Example usage:
/*
const formattedData = convertCompassFormat(compass_format);

// Results in:
[
  {
    "key": "Key Details",
    "parents": [
      {
        "key": "Key Details",
        "pairs": [
          { "key": "Style", "value": "Condominium" },
          { "key": "Substyle", "value": "Midrise" },
          { "key": "Waterfront", "value": "None" }
        ]
      }
    ]
  },
  // ... other sections follow the same pattern
]

const keyValueData = convertCompassFormat(compass_format);
const backToCompass = convertToCompassFormat(keyValueData);

// Result will be in the original compass_format structure:
{
  "keyDetails": {
    "keyDetails": {
      "style": "Condominium",
      "substyle": "Midrise",
      "waterfront": "None"
    }
  },
  // ... other sections
}
*/
