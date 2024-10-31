import React, { useEffect, useState } from 'react';

import { Outlet, NavLink, Link } from "react-router-dom";
import * as helper from '@common/CommonHelper';
import { remove_user_data } from '@redux/slices/UserData';
// import { remove_user_rights } from '@redux/slices/UserRights';
import { show_mobile_menu, hide_mobile_menu } from '@redux/slices/UserMobileMenu';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import TranslateCustom from "@module/super_admin/common/translate/TranslateCustom";

export default function Header ()
{
    const navigate = useNavigate();
    const userDispatch = useDispatch();
    const UserData = useSelector( ( state ) => state.UserData.data );
    const UserMobileMenu = useSelector( ( state ) => state.UserMobileMenu.data );
    const { t } = useTranslation();

    const [ openDropDown, setopenDropDown ] = useState( false );

    useEffect( () =>
    {
        // i18n.changeLanguage( 'in' );
    }, [] )

    const logout = () =>
    {
        // userDispatch( remove_user_rights() );
        userDispatch( remove_user_data() );
        navigate( '/admin/login' );

    }

    const showHideMobileMenu = () =>
    {
        if ( UserMobileMenu )
        {
            userDispatch( hide_mobile_menu() );
        }
        else
        {
            userDispatch( show_mobile_menu() );
        }

    }

    return ( <>
        <div id="overlay">
            <div className="cv-spinner">
                <span className="spinner"></span>
            </div>
        </div>
        <header className="app-header app-header-dark" >
            <div className="top-bar">
                <div className="top-bar-brand">

                    {/* <button className="hamburger hamburger-squeeze mr-2" type="button"
                        aria-label="toggle aside menu"><span className="hamburger-box"><span
                            className="hamburger-inner"></span></span></button> */}
                    <Link to="/admin/account">
                        <img src="./images/donation-logo.png" className="header-logo" alt="Logo" />
                    </Link>
                </div>
                <div className="top-bar-list">
                    <div className="top-bar-item px-2 d-md-none d-lg-none d-xl-none">
                        <button className="hamburger hamburger-squeeze mr-2" type="button"
                            onClick={ () => { showHideMobileMenu(); } }
                            aria-label="toggle aside menu"><span className="hamburger-box"><span
                                className="hamburger-inner"></span></span></button>
                        <Link to="/">
                            <img src="./images/donation-logo.png" className="header-logo" alt="Logo" />
                        </Link>
                    </div>
                    <div className="top-bar-item top-bar-item-right px-0 d-none d-sm-flex">
                        <TranslateCustom />

                        <div className="dropdown d-none d-md-flex">
                            <button className="btn-account" type="button" onClick={ () => setopenDropDown( !openDropDown ) }>
                                <span className="user-avatar user-avatar-md">
                                    <img src="./images/avatars/profile.png" alt="" />
                                </span>
                                <span className="account-summary pr-lg-4 d-none d-lg-block">
                                    <span className="account-name">{ UserData.user_name }</span>
                                    <span className="account-description">{ UserData.userType }</span>
                                </span>
                            </button>
                            <div className={ "dropdown-menu " + ( openDropDown ? 'd-block' : '' ) } >
                                <div className="dropdown-arrow d-lg-none" x-arrow=""></div>
                                <div className="dropdown-arrow ml-3 d-none d-lg-block"></div>
                                <h6 className="dropdown-header d-none d-md-block d-lg-none"> { UserData.userType }</h6>

                                <Link className="dropdown-item" onClick={ () => logout() } >
                                    <span className="dropdown-icon oi oi-account-logout"></span> { t( 'page.admin.comman.header.logout' ) }
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div >
        </header >
    </> )
}







