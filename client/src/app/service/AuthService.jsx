import axios from '@common/Interceptors';
// import { constant } from '@common/Constant';

export function getRoles ( callback )
{
    axios.get( '/social-profiles' )
        .then( response =>
        {
            if ( response.status == 200 )
            {
                let res = response.data;
                callback( res );
            }
            else
            {
                callback( 'error' );
            }

        } )
        .catch( function ( error )
        {
            console.error( error );
        } )
}

export function check_login_credentials ( requestData, callback )
{

    axios.post( '/super-admin/v1/adminuser/login', requestData, { crossdomain: true } )
        .then( response =>
        {

            if ( response.status == 200 )
            {
                let res = response.data;
                callback( res );
            }
            else
            {
                callback( 'error' );
            }

        } )
        .catch( function ( error )
        {
            console.error( error );
        } )
}

export function get_user_profile ( callback )
{

    axios.get( '/super-admin/secure/v1/adminuser/profile', )
        .then( response =>
        {

            if ( response.status == 200 )
            {
                let res = response.data;
                callback( res );
            }
            else
            {
                callback( 'error' );
            }

        } )
        .catch( function ( error )
        {
            console.error( error );
        } )
}