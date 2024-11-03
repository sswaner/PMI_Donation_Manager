import React, { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { getMessage, getPattern } from '@common/MessageHelper';
import { constant } from '@common/Constant';

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import * as sweetalert from '@common/SweetAlert';
import * as helper from '@common/CommonHelper';
import { Outlet, NavLink, Link } from "react-router-dom";
import * as DashboardService from '@service/DashboardService';

import { add_user_data } from '@redux/slices/UserData';

export default function Dashboard ()
{
    const [ dashboardData, setDashboardData ] = useState( null );
    useEffect( () =>
    {
        helper.setTitle( 'Dashboard' );
        getDashboardInfo();
    }, [] )


    const getDashboardInfo = () =>
    {
        // helper.loader_show();
        // DashboardService.getDashboardInfo( ( responseData ) =>
        // {
        //     helper.loader_hide();
        //     if ( responseData.status )
        //     {
        //         setDashboardData( responseData.data );
        //     }
        // } )
    }
    return <>
        Dashboard

    </>
}