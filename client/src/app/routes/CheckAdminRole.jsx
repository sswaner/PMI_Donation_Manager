import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch, } from 'react-redux';
import * as helper from '@common/CommonHelper';

// import { createHashRouter } from "react-router-dom";


export default function CheckAdminRole ( { role, children } )
{
    // const UserRights = useSelector( ( state ) => state.UserRights.rights );
    // const [ roles, setRoles ] = useState( null );
    const [ isAllowd, setIsAllowd ] = useState( null );

    useEffect( () =>
    {
        setIsAllowd( 1 );
        // if ( UserRights.length > 0 )
        // {
        //     let rightsArray = [];
        //     rightsArray = UserRights.map( item => item.key );
        //     if ( helper.hasModuleRole( [ role ], rightsArray ) )
        //     {
        //         setIsAllowd( 1 );
        //     }
        //     else
        //     {
        //         setIsAllowd( 2 );
        //     }
        // }
        // else
        // {
        //     setIsAllowd( 2 );
        // }
    }, [ role ] )




    if ( role == 'common_allow' || isAllowd == '1' )
    {
        return children;
    }
    else if ( isAllowd == '2' )
    {
        return <Navigate to={ '/admin/dashboard' } />
    }
}

