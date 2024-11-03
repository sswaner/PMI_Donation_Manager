
import axios from 'axios';
// Add a request interceptor
import store from '../redux/store';
import { remove_user_data } from '../redux/slices/UserData';
import * as sweetalert from '../common/SweetAlert';




axios.interceptors.request.use( function ( request )
{
    // const reduxData = store.getState();
    var reduxData = localStorage.getItem( 'userSession' );
    reduxData = JSON.parse( reduxData );

    console.log( 'Req: TokenInterceptor---E---' );
    console.log( request.url );
    if ( request.url == 'api/poll-worker/v1/upload-document' )
    {
        /* file upload */
        console.log( 'API-Type-3' );
    }
    else  // Json Data Type APIs - Secure API
    {
        console.log( 'API-Type-2' );
        request.headers[ 'Content-Type' ] = 'application/json';

        if ( reduxData?.UserData?.data != undefined && reduxData.UserData.data != null )
        {
            // request.headers[ 'Tokenkey' ] = reduxData.UserData.data.accessToken;
            request.headers[ 'Tokenkey' ] = reduxData.UserData.data.accessToken;
        }
    }
    return request;
}, function ( error )
{
    return Promise.reject( error );
} );





// Add a response interceptor
axios.interceptors.response.use( function ( response )
{
    const reduxData = store.getState();
    console.log();
    if ( response.data.status_code == 412 ) // Logout
    {
        console.log( reduxData.UserData.data );
        let usertype = reduxData.UserData.data?.userType != undefined ? reduxData.UserData.data?.userType : 'candidate';
        console.log( '---R--2---' )
        console.log( '---Logout---' );


        store.dispatch( remove_user_data() );
        // sweetalert.regularAlert( 'error', response.responseMessage );

        window.location.href = window.location.origin + '#/' + usertype + '/login';
    }



    return response;
}, async function ( error )
{
    console.log( error );

    if ( error != undefined )
    {
        return Promise.reject( error );
    }
    else
    {
        return false;
    }
} );



export default axios;