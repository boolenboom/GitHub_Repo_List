;
import fetcherGenerator from './APIFetcher.js';
import eventChannel from './eventChannel.js';
let factoryStrategies = {
    PTXData:function( originObj, [THEME, CATEGORY, BASEURL] ){
        //mount object
        let mountObj = originObj;
        //Url type
        let theme=THEME || 'Tourism' ,category=CATEGORY || 'Activity' ,otherParameters='';
        //Query
        let $top = 50,$skip = 0;
        let $select='',$filter = '',$orderby='',$spatialFilter = '';
        let $format = 'JSON';

        let base= BASEURL || 'https://ptx.transportdata.tw/MOTC/v2/';
        //Auth key
        // let AppID = 'eb78cef36689451a8aab0db192c90462';
        // let AppKey = 'BcSgzENVt1N5FxsK0SOjFiAU3eA';
        //initial setting
        mountObj.setUrl( paramsCombineToUrl );
        mountObj.setHeader( /*AppID, AppKey*/ );
        mountObj.setDataMiddleHandler( APIDataFormatToFrontEndData );

        //custom methods
        function ParamsCombineToQuery( setting ){
            let combination = '';
            for (const key in setting) {
                combination += setting[key] ? key + '=' + setting[key] + '&' : '';
            }
            return combination;
        }
        function paramsCombineToUrl(){
            let OP = otherParameters ? '/' + otherParameters : '';
            let combination = base + theme + '/' + category + OP + 
                '?' + ParamsCombineToQuery( {$top, $skip, $select, $filter, $orderby, $spatialFilter, $format} );
            return combination;
        }
        function APIDataFormatToFrontEndData( originData ){
            function truthyPushArray( dataArr ){
                let truthyArr = [];
                dataArr.forEach(el=>{
                    if(el!==undefined)truthyArr.push(el);
                });
                return truthyArr;
            }
            let havePictureData = originData.filter( data=>{
                return data.Picture?.PictureUrl1 !== undefined || data?.Picture == undefined;
            });
            let mapObj = havePictureData.map(item=>{
                return {
                    ID: item?.ActivityID || item?.RestaurantID || item?.ScenicSpotID,
                    Name: item?.ActivityName || item?.RestaurantName || item?.ScenicSpotName || '',
                    Address: item?.Address || item?.City,
                    Description: item?.Description || '',
                    Organizer: item?.Organizer || '',
                    Phone: String( item.Phone ).split( '、' )[0] || '',
                    OpenTime: item?.OpenTime || String( item.StartTime ).split('T')[0] + '~' + String( item.EndTime ).split('T')[0],
                    ClassTags: truthyPushArray( [item?.Class1, item?.Class2, item?.Class3] ),
                    WebsiteUrl: item?.WebsiteUrl || '',
                    MapUrl: item?.MapUrl || '',
                    PictureUrl: truthyPushArray( [item.Picture?.PictureUrl1, item.Picture?.PictureUrl2, item.Picture?.PictureUrl3] ) || '',
                    PictureDescri: truthyPushArray( [item.Picture?.PictureDescription1, item.Picture?.PictureDescription2, item.Picture?.PictureDescription3] ) || '',
                    Category: category
                }
            });
            return mapObj;
        }

        //mount to API
        mountObj._dataFn = APIDataFormatToFrontEndData;
        mountObj.getCategory = function(){
            return category;
        }
        mountObj.setUrlType = function( {THEME, CATEGORY} ){
            theme = THEME || theme;
            category = CATEGORY || category;
            mountObj.setUrl( paramsCombineToUrl );
        }
        mountObj.setQuery = function( {top, skip, select, format, filter} ){
            $top = top || $top;
            $skip = skip || $skip;
            $select = select || $select;
            $format = format || $format;
            $filter = filter || $filter;
            mountObj.setUrl( paramsCombineToUrl );
        }

        //decorate methods
        let originFn = mountObj.getAPIData;
        mountObj.getAPIData = function( channelNameHierarchy, listenFn ){
            const channelName = channelNameHierarchy.split('-')[0];
            const listenName = channelNameHierarchy.split('-')[1];

            eventChannel.channel( channelName ).listen( listenName, listenFn );
            let boundFn = eventChannel.channel( channelName ).trigger.bind( eventChannel );
            originFn( boundFn, listenName );
        }

        return mountObj;
    },
    gitHubRepo:function( originObj ){
        let base = 'https://api.github.com';
        let mountObj = originObj;

        function convertDataForm( originData ){
            if(!originData?.map){
                let el = originData;
                return {
                    id: el.id,
                    username: el.owner?.login || el?.login || '',
                    avatarurl: el.owner?.avatar_url || el?.avatar_url || '' ,
                    userurl: el.owner?.html_url || el?.html_url || '',
                    reponame: el?.name || '',
                    fullname: el?.full_name || '',
                    repourl: el?.html_url || '',
                    desc: el?.description || 'this repository has no description.',
                    stars: el?.stargazers_count || 0,
                    watch: el?.watchers_count || 0,
                    forks: el?.forks_count || 0,
                    size: el?.size || 0,
                    languageRatio: el?.languages_url || '',
                    mainLanguage: el?.language || 'no language',
                }
            }
            let mapData = originData.map(el=>{
                return {
                    id: el.id,
                    username: el.owner?.login || el?.login || '',
                    avatarurl: el.owner?.avatar_url || el?.avatar_url || '' ,
                    userurl: el.owner?.html_url || el?.html_url || '',
                    reponame: el?.name || '',
                    fullname: el?.full_name || '',
                    repourl: el?.html_url || '',
                    desc: el?.description || 'this repository has no description.',
                    stars: el?.stargazers_count || 0,
                    watch: el?.watchers_count || 0,
                    forks: el?.forks_count || 0,
                    size: el?.size || 0,
                    languageRatio: el?.languages_url || '',
                    mainLanguage: el?.language || 'no language',
                }
            })
            return mapData;
        }

        mountObj._dataFn = convertDataForm;
        mountObj.getData = function( requsetString, paramSetting, listenFn ){
            function inputVaildation(){
                try {
                    let isNotMirror = false;
                    let stringParams = String(requsetString)
                    .split('{')
                    .filter(el=>el.includes('}'))
                    .map(el=>el.slice(0,el.indexOf('}')));
    
                    stringParams.forEach(check=>{
                        isNotMirror = paramSetting[check] == undefined ? true : false;
                    })
    
                    if(isNotMirror) throw new Error('參數有未匹配的值');
                    return true;
                } catch (error) {
                    console.warn('url error, ' + error);
                    return false
                }
            }
            if(!inputVaildation())return;
            
            let paramList = Object.keys(paramSetting);
            let fixedUrl = String(requsetString);
            paramList.forEach(factor=>{
                fixedUrl = fixedUrl.replace(factor, paramSetting[factor]);
                fixedUrl = fixedUrl.replace('{','').replace('}','');
            });

            function urlcombination(){
                return base + fixedUrl;
            }
            mountObj.setUrl(urlcombination);
            
            const randomListen = fixedUrl + Math.floor(Math.random() * 50000).toString();

            console.log('ready to connect ' + urlcombination());
            eventChannel.channel( 'github_repo' ).listen( randomListen, listenFn );
            let boundFn = eventChannel.channel( 'github_repo' ).trigger.bind( eventChannel );
            mountObj.getAPIData( boundFn, randomListen );
        }

        return mountObj;
    }
}
//*params apiName is a string to assign product
//*return an Object with custom processor & setter
let APIFactory = function(){
    let apiName = Array.prototype.shift.call(arguments),
        args = arguments,
        basicFetcher = new fetcherGenerator();
    let customFetcher = factoryStrategies[apiName]( basicFetcher, args );
    return Object.create( customFetcher );
}
export default APIFactory;