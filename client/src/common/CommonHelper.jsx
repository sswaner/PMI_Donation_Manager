import { constant } from './Constant';
import moment from 'moment-timezone';


/*
 * Set Title Tag and Add Page class
 */
export const setTitle = ( title = "", type = "1" ) =>
{
  let usertype = 'Admin';
  if ( type == 2 )
  {
    usertype = 'Candidate';
  }
  else if ( type == 3 )
  {
    usertype = 'User';
  }
  document.title = title + " | " + usertype + ' | ' + constant.SITE_NAME;
  document.getElementById( 'root' ).classList.value = title.toLowerCase().split( ' ' ).join( '-' );
}




/*
 * Finds Array Containes The String Or Not
 */
export const findArrayContainString = ( string, stringArray ) =>
{
  if ( stringArray.includes )
  {
    return stringArray.includes( string );
  }
  for ( let i = 0; i < stringArray.length; i++ )
  {
    if ( stringArray[ i ] === string )
    {
      return true;
    }
  }
  return false;
}




/*
 * Show Ajax Loader
 */
export const loader_show = () =>
{
  let div = document.getElementById( 'overlay' );
  if ( div )
  {
    document.getElementById( 'overlay' ).style.display = 'block';

  }
}



/*
 * Hide Ajax Loader
 */
export const loader_hide = () =>
{
  let div = document.getElementById( 'overlay' );
  if ( div )
  {
    document.getElementById( 'overlay' ).style.display = 'none';

  }
}




/*
 * Cut String
 */
export const cutString = ( string, limit = 35 ) =>
{
  const out = string.length > limit ? string.substring( 0, limit ) + "..." : string;
  return <span title={ string }>{ out }</span>;
}


/*
 * Cut String
 */



export const convertToDictList = ( inputList, dynamicKey ) =>
{
  let resultDict = {};

  inputList.forEach( item =>
  {
    let keyValue = item[ dynamicKey ];

    if ( !( keyValue in resultDict ) )
    {
      resultDict[ keyValue ] = [];
    }

    resultDict[ keyValue ].push( {
      ...item
    } );
  } );

  return resultDict;
}


/*
 * Formate Date
 */
export const formatDate = ( date, type = '1', tz = false ) =>
{

  if ( type == '1' )
  {
    if ( tz == false )
    {
      return moment( date ).format( constant.DATE_FORMAT );
    }
    return moment.utc( date ).tz( constant.TIME_ZONE ).format( constant.DATE_FORMAT );

  }
  else if ( type == '2' )
  {
    if ( tz == false )
    {
      return moment( date ).format( constant.DATE_TIME_FORMAT );
    }
    return moment.utc( date ).tz( constant.TIME_ZONE ).format( constant.DATE_TIME_FORMAT );

  }
}


// generate Random key
export const generateRandomKey = ( customPrefix = "", customPostfix = "", length = 4, ) =>
{
  // Define the character set
  const characters = "0123456789";

  // Create an empty string to store the key
  let key = "";

  // Loop for the desired length of the key
  for ( let i = 0; i < length; i++ )
  {
    // Generate a random index within the character set
    const randomIndex = Math.floor( Math.random() * characters.length );

    // Extract the character at the random index and append it to the key
    key += characters.charAt( randomIndex );
  }

  // Return the generated key
  if ( customPrefix != '' )
  {
    key = customPrefix + key;
  }
  if ( customPostfix != '' )
  {
    key = key + customPostfix;
  }
  return key;
}



export const checkDuplicateArray = ( array ) =>
{
  const checkSet = new Set( array );
  return !( checkSet.size === array.length );
}


export const sortArrayByKey = ( dataArray, sort_key ) =>
{
  dataArray.sort( ( a, b ) =>
  {
    if ( a[ sort_key ].toLowerCase() < b[ sort_key ].toLowerCase() ) return -1;
    if ( a[ sort_key ].toLowerCase() > b[ sort_key ].toLowerCase() ) return 1;
    return 0;
  } )
  return dataArray;
}

export const addBodyclass = ( className ) =>
{
  document.getElementsByTagName( 'body' )[ 0 ].setAttribute( "class", className );

}

export const saveSessionInfo = ( data ) =>
{
  var get_login_token = data.key;
  localStorage.setItem( 'currentUserBT', JSON.stringify( data ) );
  localStorage.setItem( 'access_token_bt', get_login_token );
  localStorage.setItem( 'admin_user_id_bt', data.user.id );
  // localStorage.setItem( 'admin_user_first_name_st', data.user.first_name || data.user.legal_name );
  // localStorage.setItem( 'admin_user_last_name_st', data.user.last_name || data.user.surname );

  // this.cookieService.set( 'admin_user_id_st', data.user.id, 5, '/' );
  // this.cookieService.set( 'access_token_st', get_login_token, 5, '/' );
  // this.cookieService.set( 'admin_user_first_name_st', data.user.first_name, 5, '/' );
  // this.cookieService.set( 'admin_user_last_name_st', data.user.last_name, 5, '/' );

  // this.cookieService.set( 'admin_designation', 'data.user.designation.name', 1, '/ ' );
  // this.headerService.set_global_information();
}

export const removeSessionInfo = () =>
{
  console.log( 'logout process called' );
  // this.generalService.removeBodyCommonClass();
  localStorage.removeItem( 'currentUserBT' );
  localStorage.removeItem( 'access_token_bt' );
  localStorage.removeItem( 'admin_user_id_bt' );
  localStorage.removeItem( 'rp' );

  // this.cookieService.deleteAll( '/' );
}



export const setStorageWithExpiry = ( key, value, expiryTimeInMilliseconds = 86400000 ) =>
{
  const now = new Date();
  const expiry = now.getTime() + expiryTimeInMilliseconds;
  const dataObj = {
    value: value,
    expiry: expiry
  };
  localStorage.setItem( key, JSON.stringify( dataObj ) );
}


export const getStorageWithExpiry = ( key ) =>
{
  const dataStr = localStorage.getItem( key );
  if ( !dataStr )
  {
    return null;
  }
  const dataObj = JSON.parse( dataStr );
  const now = new Date();
  if ( now.getTime() > dataObj.expiry )
  {
    // Expired data, remove it from storage
    localStorage.removeItem( key );
    return null;
  }
  return dataObj.value;
}


export const getAndCalculateRoles = ( group_id, permissions ) =>
{
  // let actiontypes = [ 'Create', 'Update', 'Delete', 'View' ];
  return permissions.map( ( item ) =>
  {
    return item.sub_module.map( ( subitem ) =>
    {
      let permission = subitem.permission.filter( perm => (
        perm.user_group_selection_status == '1'
      ) ).map( ( per ) => per.action_type )

      if ( permission.length > 0 )
      {
        // let obj1 = [ subitem.unique_key ] = permission;
        // return obj1;
        return { key: subitem.unique_key, permissions: permission }

      }
    } )
  } ).flat().filter( item => item != undefined );


}


export const hasModuleRole = ( args, rights ) =>
{
  // return true;
  // console.log( module_name, rights )
  // if ( rights.find( ( element ) => element == module_name ) )
  // {
  //   return true;
  // }
  for ( let index = 0; index < args.length; index++ )
  {
    if ( rights.find( ( element ) => element == args[ index ] ) )
    {
      return true;
    }
  }

  return false;
}



export const hasUserRights = ( module_name, rights, args ) =>
{
  // return true;

  if (
    rights.length <= 0
  )
  {
    return false;
  }

  let modules = rights.find( ( item ) => item.key == module_name );
  // console.log( module_name, modules, rights );

  if (
    modules == undefined ||
    modules?.permissions == undefined ||
    modules.permissions.length <= 0
  )
  {
    return false;
  }

  for ( let index = 0; index < args.length; index++ )
  {
    if ( modules.permissions.find( ( element ) => element == args[ index ] ) )
    {
      return true;
    }
  }
  return false;
}


















