import Footer from "@module/super_admin/common/footer/Footer";
import Sidebar from "@module/super_admin/common/sidebar/Sidebar";
import Header from "@module/super_admin/common/header/Header";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Suspense } from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import { remove_user_data } from '@redux/slices/UserData';


export default function AdminLayout ()
{
    const userDispatch = useDispatch();
    const location = useLocation();


    const [ isLogin, setisLogin ] = useState( null );
    // const UserRights = useSelector( ( state ) => state.UserRights.rights );
    const UserData = useSelector( ( state ) => state.UserData.data );

    useEffect( () =>
    {
        if ( UserData != null && UserData?.accessToken != undefined )
        {

            setisLogin( 1 );

        }
        else
        {
            userDispatch( remove_user_data() );
            setisLogin( 2 );
        }


    }, [ UserData ] )







    return ( <>
        <div className="wrapper sup-admin app cls-app-main">


            { isLogin == '2' &&
                <Navigate to={ '/admin/login' } />
            }

            { isLogin == '1' &&
                <>
                    <Header />
                    <Sidebar />
                    <Suspense fallback={ "Loading..." }>
                        <Outlet />
                    </Suspense>
                    <Footer />
                </>
            }



        </div >
    </> );
} 