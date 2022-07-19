;
// import jsSHA from "jssha";
//*params fetcher is an Object
//*return an Object with basic fetch processor & setter
function fetcherGenerator( fetcher = {} ){
    if( typeof fetcher !== 'object' )fetcher = {};
    fetcher.url = '';
    fetcher.option = undefined;
    fetcher._shift = Array.prototype.shift;
    fetcher._dataFn = function( originData ){
        return originData;
    };

    fetcher.getAPIData = function(){
        let afterAction = fetcher._shift.call( arguments );
        let args = arguments;
        let fn = fetcher._dataFn;
        const url = fetcher.url;
        const option = fetcher.option;

        fetch( url, option )
        .then( res => res.json() )
        .then( data => {
            let formatData = fn( data );
            afterAction( ...args, formatData );
        })
        .catch( errMsg => console.warn(errMsg) );
    };
    fetcher.setOption = function(
        AppID = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF', 
        AppKey = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF'){
        // let GMTString = new Date().toGMTString();
        // let ShaObj = new jsSHA( 'SHA-1', 'TEXT' );
        // ShaObj.setHMACKey( AppKey, 'TEXT' );
        // ShaObj.update( 'x-date: ' + GMTString );
        // let HMAC = ShaObj.getHMAC( 'B64' );
        // let Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", options="x-date", signature="' + HMAC + '"';
        // fetcher.option = { 'Authorization' : Authorization, 'X-Date' : GMTString }; 
        fetcher.option = {};
    };
    fetcher.setUrl = function( fn ){
        fetcher.url = fn(...arguments);
    };
    fetcher.setDataMiddleHandler = function( fn ){
        fetcher._dataFn = fn;
    };

    return fetcher;
}
export default fetcherGenerator;