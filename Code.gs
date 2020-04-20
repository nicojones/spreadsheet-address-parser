const REGION = 'es'; // Change the country region where the searches are performed.
const LANGUAGE = 'es'; // Change the language of the addresses
const API_KEY = 'abcdefghijklmnopqrstuvwxyz'; // Set your StaticMaps API Key if you want a link to a static preview.

const RETURN_COORDINATES = true; // or false;
const RETURN_GOOGLEMAPS_URL = true; // or false;
const RETURN_STATICMAPS_IMAGE = false; // or false;
const RETURN_FULLADDRESS = true; // or false;
const RETURN_POSTCODE = true; // or false


/**
 * Parses the current Address on Google and returns a formatted one
 *
 * @param {address} string The address that you want to parse (to validate with Google)
 * @param {zipCode} string If the postcode is in a separate column, pass the cell along to verify that the resulting address belongs to that zip code.
 *
 * @parseAddress
 */
function parseAddress(address, postcode) {  
  postcode = postcode || false;
  
  var resultMessage = 'valid';
  
  
  if (!address) {
    return 'no address';
  }

  var apiKey = 'key=' + API_KEY;
  var map = Maps.newGeocoder();
  if (REGION) {
    map = map.setRegion(REGION);
  }
  if (LANGUAGE) {
    map = map.setLanguage(LANGUAGE);
  }
  
  map = map.geocode(address);
  
  var googleMapsUrl = 'https://www.google.com/maps?q=';
    
  var isValid = Boolean(map.results.length);
  if (!isValid) {
    return 'invalid address';
  }
  
  var google_postcode = 0;
  
  if (map.results[0].address_components && map.results[0].address_components.length) {
    var comp = map.results[0].address_components;
    var length = comp.length;
    // return [JSON.stringify(comp)];
    for (var i = 0; i < length; ++i) {
      if (comp[i].types[0] === "postal_code") {
        google_postcode = comp[i].long_name;
      }
      
      // Check if the postcode matches the given one (if any was given)...
      if (postcode && comp[i] && comp[i].types && comp[i].types.length && comp[i].types[0] === "postal_code") {
        if (comp[i].long_name !== (postcode + '')) {
          resultMessage = '!! zip mismatch: ' + comp[i].long_name + ' vs ' + postcode
        }
        break;
      }
    }
  }
  
  // Unused results
  // var googleCode = (map.results[0].plus_code || {}).global_code || 'no_code';
 
  var resultArray = [];
  
  if (RETURN_COORDINATES) {
    var coordinates = map.results[0].geometry.location.lat + ',' + map.results[0].geometry.location.lng;
    resultArray.push(coordinates);
  }
  ///////////////////////////////
    
  if (RETURN_POSTCODE) {
    resultArray.push(google_postcode);
  }
  ///////////////////////////////
  
  if (RETURN_FULLADDRESS) {
    var fullAddress = map.results[0].formatted_address;
    resultArray.push(fullAddress);
  }
  /////////////////////////////
  
  if (API_KEY && RETURN_STATICMAPS_IMAGE) {
    var mapUrl = Maps.newStaticMap().addMarker(fullAddress).setZoom(13).getMapUrl() + '&' + apiKey;
    resultArray.push(API_KEY);
  }
  ///////////////////////////
  
  if(RETURN_GOOGLEMAPS_URL) {
    var fullGoogleMapsUrl = googleMapsUrl + encodeURI(fullAddress);
    resultArray.push(fullGoogleMapsUrl);
  }
  ////////////////////////////////
  
  return [resultArray];
}
