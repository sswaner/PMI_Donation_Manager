import axios from '@common/Interceptors';
// import { constant } from '@common/Constant';

export function getAccounts ( callback )
{
    axios.get( '/accounts' )
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

export function addAccount ( requestData, callback )
{

    axios.post( '/accounts', requestData, { crossdomain: true } )
        .then( response =>
        {

            if ( response.status == 201 || response.status == 200 )
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

export function editAccount ( id, requestData, callback )
{

    axios.put( '/accounts/' + id, requestData, { crossdomain: true } )
        .then( response =>
        {

            if ( response.status == 201 || response.status == 200 )
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

export function getAccountById ( account_id, callback )
{
    axios.get( '/accounts/' + account_id )
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



export function getAccountOverview ( account_id, callback )
{
    axios.get( '/accounts/overview/' + account_id )
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


