import axios from '@common/Interceptors';

// export function addActivityDetails ( account_id, callback )
// {
//     axios.get( 'api/donations/account/' + account_id )
//         .then( response =>
//         {
//             if ( response.status == 200 )
//             {
//                 let res = response.data;
//                 callback( res );
//             }
//             else
//             {
//                 callback( 'error' );
//             }

//         } )
//         .catch( function ( error )
//         {
//             console.error( error );
//         } )
// }

export function getActivityDetails ( id, callback )
{

    axios.get( '/activities/' + id, { crossdomain: true } )
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


export function addActivity ( requestData, callback )
{

    axios.post( '/activities', requestData, { crossdomain: true } )
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

export function editActivity ( activityID, requestData, callback )
{

    axios.put( '/activities/' + activityID, requestData, { crossdomain: true } )
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


export function getAllActivity ( callback )
{

    axios.get( '/activities', { crossdomain: true } )
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



