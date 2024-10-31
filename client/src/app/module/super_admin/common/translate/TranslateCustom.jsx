import React, { useEffect, useState } from 'react';
import * as helper from '@common/CommonHelper';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { Outlet, NavLink, Link } from "react-router-dom";

export default function TranslateCustom ()
{
    const [ openDropDown, setopenDropDown ] = useState( false );

    const { t, i18n } = useTranslation();


    const changeLanguage = ( lan = "en" ) =>
    {
        // console.log( i18n );
        i18n.changeLanguage( lan );
        setopenDropDown( false )

    }


    return ( <ul className="header-nav nav">
        <li className="nav-item dropdown  ">
            <button
                type="submit"
                className=" btn btn-outline-primary "
                onClick={ () => setopenDropDown( !openDropDown ) }
            >
                <h6  ><span className="oi oi-globe mr-1"></span>{ i18n.language == "en" ? 'English' : 'Indonasian' }</h6>
            </button>
            <div className={ "dropdown-menu dropdown-menu-rich dropdown-menu-right " + ( openDropDown ? 'd-block' : '' ) } >
                <div className="dropdown-arrow" />
                {/* <h6 className="dropdown-header stop-propagation">
                    <span>
                        Languages
                    </span>
                </h6> */}
                <div className=" perfect-scrollbar">
                    <button type="button" className="dropdown-item " onClick={ () => changeLanguage( 'en' ) }>
                        {/* <div className="user-avatar">
                            <img src="/images/avatars/profile.png" alt="" />
                        </div> */}
                        <div className="dropdown-item-body">
                            <p className="text"> English </p>
                        </div>
                    </button>
                    <button type="button" className="dropdown-item " onClick={ () => changeLanguage( 'in' ) }>
                        {/* <div className="user-avatar rounded">
                            <img src="/images/avatars/profile.png" alt="" />
                        </div> */}
                        <div className="dropdown-item-body">
                            <p className="text"> Indonasian </p>
                        </div>
                    </button>

                </div>

            </div>
        </li>
    </ul > );
}