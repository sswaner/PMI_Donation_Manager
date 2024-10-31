import axios from '@common/Interceptors';
// import { constant } from '@common/Constant';

export function getAccountWizeDonations ( account_id, callback )
{
    axios.get( '/donations/account/' + account_id )
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

export function addDonations ( requestData, callback )
{

    axios.post( '/donations', requestData, { crossdomain: true } )
        .then( response =>
        {

            let res = response.data;
            if ( response.status )
            {
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


export function editDonations ( id, requestData, callback )
{

    axios.put( '/donations/' + id, requestData, { crossdomain: true } )
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

export function getDonationsById ( id, callback )
{
    axios.get( '/donations/' + id )
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


