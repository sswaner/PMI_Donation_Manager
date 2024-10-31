import { useEffect } from "react";
import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
// import * as helper from '@common/CommonHelper';
import { show_mobile_menu, hide_mobile_menu } from '@redux/slices/UserMobileMenu';
import { useSelector, useDispatch } from 'react-redux';


export default function Footer ()
{
    const userDispatch = useDispatch();
    const UserMobileMenu = useSelector( ( state ) => state.UserMobileMenu.data );

    return ( <>
        <div className={ "aside-backdrop " + ( UserMobileMenu ? 'show' : '' ) } onClick={ () => { userDispatch( hide_mobile_menu() ) } }></div>
    </> )
}