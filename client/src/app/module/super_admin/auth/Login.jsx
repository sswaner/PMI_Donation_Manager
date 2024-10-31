import React, { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { getMessage, getPattern } from '@common/MessageHelper';
import { constant } from '@common/Constant';

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import * as sweetalert from '@common/SweetAlert';
import * as helper from '@common/CommonHelper';
import { Outlet, NavLink, Link } from "react-router-dom";
import * as AuthService from '@service/AuthService';

import { add_user_data } from '@redux/slices/UserData';
// import { add_user_rights } from '@redux/slices/UserRights';
import { useTranslation } from 'react-i18next';

export default function Login ()
{
    const navigate = useNavigate();
    const UserData = useSelector( ( state ) => state.UserData.data );

    const userDispatch = useDispatch();

    const { register, reset, handleSubmit, watch, formState: { errors }, setValue, trigger, getValues } = useForm();
    const { t, i18n } = useTranslation();

    const changeLanguage = ( e, lan = "en" ) =>
    {
        e.preventDefault();
        i18n.changeLanguage( lan );
    }

    useEffect( () =>
    {
        // userDispatch( add_user_data( { name: 'ojash' } ) );
        helper.setTitle( 'Login' );
        console.log( 'login page' );

        setValue( 'username', 'shawnswaner@gmail.com' );
        setValue( 'password', '123456' );

        helper.addBodyclass( '' );

    }, [] )


    useEffect( () =>
    {
        if ( UserData != null )
        {
            let type = UserData.userType;
            navigate( '/admin/account' );
        }

    }, [ UserData ] );


    const onSubmit = data =>
    {
        helper.loader_show();
        console.log( "data => ", data )

        let requestData = {
            user_name: data.username,
            password: data.password,
        }

        if ( data.username.trim() == 'shawnswaner@gmail.com' && data.password.trim() == '123456' )
        {

            helper.loader_hide();
            let userdata = {
                id: 1,
                user_name: "Shawn Swaner",
                user_email: data.username,
                password: data.password,
                accessToken: 'loremlorem',
                userType: 'user',
            }

            userDispatch( add_user_data( userdata ) );

        } else
        {
            sweetalert.regularAlert( 'error', 'Username and Password did not match. Please try again' );
        }


        // helper.loader_show();
        // AuthService.check_login_credentials( requestData, ( responseData ) =>
        // {
        //     console.log( 'responseData =>', responseData );
        //     helper.loader_hide();
        //     if ( responseData.status == true )
        //     {
        //         let responseResult = responseData.data.user;
        //         let accessToken = responseData.data.key;

        //         let userdata = {
        //             id: responseResult.id,
        //             title: responseResult.title,
        //             user_group_id: responseResult.user_group.id,
        //             first_name: responseResult.first_name,
        //             last_name: responseResult.last_name,
        //             address_1: responseResult.other.address_1,
        //             address_2: responseResult.other.address_2,
        //             city: responseResult.other.city,
        //             state: responseResult.other.state,
        //             zip_code: responseResult.other.zip_code,
        //             accessToken: accessToken,
        //             email: responseResult.email,
        //             phone_no: responseResult.phone_no,
        //             status: responseResult.status,
        //             userName: responseResult.user_name,
        //             userType: 'admin',
        //         }

        //         let rights = helper.getAndCalculateRoles( responseResult.user_group.id, responseResult.permission );
        //         // console.log( rights );

        //         userDispatch( add_user_rights( rights ) );
        //         userDispatch( add_user_data( userdata ) );


        //         // navigate( "/admin/dashboard" );
        //     }
        //     else
        //     {
        //         sweetalert.regularAlert( 'error', responseData.message );
        //     }
        // } );

    }




    return <>
        <div className='app cls-app-main'>

            <main className="auth">
                <header id="auth-header" className="auth-header">
                    <h1>
                        <img src="./images/donation-logo.png" className="login-logo" alt="Logo" />
                    </h1>
                </header>

                <form className="auth-form" onSubmit={ handleSubmit( onSubmit ) } >

                    <div className="form-group">
                        <div className="form-label-group">
                            <input type="text" id="inputUser"
                                className={ "form-control " + ( errors.username ? "is-invalid" : '' ) }
                                placeholder={ t( 'page.admin.login.username' ) }
                                { ...register( "username", { required: true, pattern: getPattern( 'email' ) } ) }

                            /> <label htmlFor="inputUser">{ t( 'page.admin.login.username' ) }  </label>

                            { errors.username?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.login.username' ), 'requiredWithFieldName' ) }</div> }
                            { errors.username?.type === 'pattern' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.login.username' ), 'wrongFormat' ) }</div> }
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-label-group">
                            <input type="password" id="inputPassword" placeholder="Password"
                                className={ "form-control " + ( errors.password ? "is-invalid" : '' ) }
                                { ...register( "password", { required: true } ) }

                            /> <label htmlFor="inputPassword">{ t( 'page.admin.login.password' ) }</label>
                            { errors.password?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.login.password' ), 'requiredWithFieldName' ) }</div> }
                        </div>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-lg btn-primary btn-block" type="submit">
                            { t( 'page.admin.login.sign-in' ) }
                        </button>
                    </div>

                    {/* <div className="form-group text-center">
                    <div className="custom-control custom-control-inline custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="remember-me" /> <label className="custom-control-label" for="remember-me">Keep me sign in</label>
                    </div>
                </div> */}

                    <div className="text-center pt-3">
                        <Link className="link" onClick={ ( e ) => changeLanguage( e, 'en' ) }>English </Link>
                        <span className="mx-2">·</span>
                        <Link className="link" onClick={ ( e ) => changeLanguage( e, 'in' ) }>Indonasian</Link>
                    </div>
                </form>

                <footer className="auth-footer"> { t( 'page.admin.login.footer' ) }
                </footer>

            </main >
        </div>


    </>
}