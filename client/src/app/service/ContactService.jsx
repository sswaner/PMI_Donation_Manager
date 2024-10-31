import axios from '@common/Interceptors';
// import { constant } from '@common/Constant';

export function getContacts ( callback )
{
    axios.get( '/contacts' )
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

export function getAccountContacts ( account_id, callback )
{
    axios.get( '/accounts/' + account_id + '/contacts' )
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

export function addContact ( requestData, callback )
{

    axios.post( '/contacts', requestData, { crossdomain: true } )
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


export function editContact ( contactID, requestData, callback )
{

    axios.put( '/contacts/' + contactID, requestData, { crossdomain: true } )
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

export function getAccountWizeContact ( account_id, callback )
{
    axios.get( '/contacts/' + account_id )
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
