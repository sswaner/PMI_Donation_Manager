import { useEffect, useState } from "react";
import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
// import * as helper from '@common/CommonHelper';
import { remove_user_data } from '@redux/slices/UserData';
import { useTranslation } from 'react-i18next';

export default function Sidebar ()
{
    const { t } = useTranslation();

    const userDispatch = useDispatch();

    const UserData = useSelector( ( state ) => state.UserData.data );
    const UserMobileMenu = useSelector( ( state ) => state.UserMobileMenu.data );
    const [ openDropDown, setopenDropDown ] = useState( false );

    const logout = () =>
    {

        userDispatch( remove_user_data() );
        navigate( '/admin/login' );

    }

    return ( <>
        <aside className={ "app-aside app-aside-expand-md app-aside-light " + ( UserMobileMenu ? 'show' : '' ) } >

            <div className="aside-content">

                <header className="aside-header d-block d-md-none">

                    <button className="btn-account" type="button" onClick={ () => { setopenDropDown( !openDropDown ) } }>
                        <span className="user-avatar user-avatar-lg">
                            <img src="./images/avatars/profile.png" alt="" /></span> <span className="account-icon">
                            <span className="fa fa-caret-down fa-lg"></span>
                        </span>
                        <span className="account-summary">
                            <span className="account-name">{ UserData.user_name }</span>
                            <span className="account-description">{ UserData.userType }</span>
                        </span>
                    </button>

                    <div id="dropdown-aside" className={ "dropdown-aside collapse " + ( openDropDown ? 'show' : '' ) }>

                        <div className="pb-3">
                            <Link className="dropdown-item" onClick={ () => logout() }>
                                <span className="dropdown-icon oi oi-account-logout"></span> Logout
                            </Link>
                        </div>
                    </div>
                </header>

                <div className="aside-menu overflow-hidden ps">

                    <nav id="stacked-menu" className="stacked-menu stacked-menu-has-collapsible">

                        <ul className="menu">

                            <li className="menu-item ">
                                <NavLink to="/admin/account" className="menu-link">
                                    <span className="menu-icon fa fa-users"></span>
                                    <span className="menu-text">
                                        { t( 'page.admin.comman.sidebar.AccountManagement' ) }
                                    </span>
                                </NavLink>
                            </li>

                        </ul>
                    </nav>
                </div>

            </div>
        </aside >
    </> )
}