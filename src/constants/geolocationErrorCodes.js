const ERROR_CODES = {
    PERMISSION_DENIED: { code: 0, description: "User denied the request for Geolocation"},
    POSITION_UNAVAILABLE: { code: 1, description: "Location information is unavailable"},
    TIMEOUT: { code: 2, description: "The request to get user location timed out"},
    UNKNOWN_ERROR: { description: "An unknown error occurred"}
};

export function getErrorDescriptionByCode(code) {
    let error;
    for (var e in ERROR_CODES) {
        if (ERROR_CODES[e].code === code) error = ERROR_CODES[e];
    }    
    return error !== undefined ? error.description : ERROR_CODES.UNKNOWN_ERROR.description;
}