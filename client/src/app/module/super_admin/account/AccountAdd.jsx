import React, { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { getMessage, getPattern } from '@common/MessageHelper';
import { constant } from '@common/Constant';

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import * as sweetalert from '@common/SweetAlert';
import * as helper from '@common/CommonHelper';
import { Outlet, NavLink, Link } from "react-router-dom";


import * as AccountService from '@service/AccountService';
import { useTranslation } from 'react-i18next';

export default function AccountList ()
{
    const { t } = useTranslation();

    const navigate = useNavigate();

    const { register, reset, handleSubmit, watch, formState: { errors }, setValue, trigger, getValues } = useForm();

    useEffect( () =>
    {
        helper.setTitle( 'Account List' );
        // getDashboardInfo();
    }, [] )


    const onSubmit = data =>
    {
        console.log( "data => ", data )

        let requestData = {
            OrganizationName: data.OrganizationName,
            GivingPotential: data.GivingPotential,
            PriorDonations: data.PriorDonations,
            AccountLocation: data.AccountLocation,
            AccountManagerID: 1,
            ExternalSystemID: data.ExternalSystemID,
            Notes: data.Notes,
            Segment: data.Segment,
            AccountChannel: data.AccountChannel,
            AccountType: data.AccountType,
            AccountSize: data.AccountSize,
            RecordCreatedBy: 1,
            RecordLastModifiedBy: 1,
        }

        helper.loader_show();
        AccountService.addAccount( requestData, ( responseData ) =>
        {
            helper.loader_hide();

            console.log( 'responseData =>', responseData );

            if ( responseData.AccountID != '' && responseData.AccountID != undefined )
            {
                navigate( '/admin/account/edit/' + responseData.AccountID );
                sweetalert.regularAlert( 'success', responseData.message );
            }
            else
            {
                sweetalert.regularAlert( 'error', responseData.message );
            }
        } );
    }

    const onBackPress = () =>
    {
        navigate( -1 )
    }

    return (
        <>
            <main className="app-main">
                <div className="wrapper">
                    <div className="page">
                        <div className="page-inner">
                            <header className="page-title-bar">
                                <div className="d-flex justify-content-between">
                                    <p className="lead">
                                        <span className="font-weight-bolder">{ t( 'page.admin.addAccount.title' ) }</span>
                                    </p>
                                    <button type="button" onClick={ () => onBackPress() } className="btn btn-outline-primary float-right">
                                        <span className="fa fa-arrow-left  mr-1"></span>
                                        { t( 'page.admin.comman.backButton' ) }
                                    </button>

                                </div>
                            </header>

                            <div className="page-section">
                                <div className="section-block">

                                    <div className="main-card mb-3 card">
                                        <div className="card-body">
                                            <form id="form-accountAdd" onSubmit={ handleSubmit( onSubmit ) } >

                                                <div className="form-row">

                                                    <div className="col-md-6 col-lg-4 col-xl-3 col-sm-6">
                                                        <div className="form-group">
                                                            <label>{ t( 'page.admin.addAccount.Name' ) }<em>*</em></label>
                                                            <input maxLength="40" tabIndex="1"
                                                                id="id-Name" placeholder={ t( 'page.admin.addAccount.Name' ) } type="text"
                                                                className={ "form-control " + ( errors.OrganizationName ? "is-invalid" : '' ) }
                                                                { ...register( "OrganizationName", { required: true } ) }
                                                            />
                                                            { errors.OrganizationName?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addAccount.Name' ), 'requiredWithFieldName' ) }</div> }
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 col-lg-4 col-xl-3 col-sm-6">
                                                        <div className="form-group">
                                                            <label>{ t( 'page.admin.addAccount.accountSize' ) }</label>
                                                            <select maxLength="40" tabIndex="1"
                                                                id="id-AccountSize"
                                                                className={ "form-control " + ( errors.AccountSize ? "is-invalid" : '' ) }
                                                                { ...register( "AccountSize", { required: false } ) }
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="Large">Large</option>
                                                                <option value="Medium">Medium</option>
                                                            </select>
                                                            { errors.AccountSize?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addAccount.accountSize' ), 'requiredWithFieldName' ) }</div> }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-4 col-xl-3 col-sm-6">
                                                        <div className="form-group">
                                                            <label>{ t( 'page.admin.addAccount.accountType' ) }<em>*</em></label>
                                                            <select maxLength="40" tabIndex="1"
                                                                id="id-AccountSize"
                                                                className={ "form-control " + ( errors.AccountType ? "is-invalid" : '' ) }
                                                                { ...register( "AccountType", { required: true } ) }
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="Corporation">Corporation</option>
                                                                <option value="Retail (3rd Party Fundraising)">Retail (3rd Party Fundraising)</option>
                                                            </select>
                                                            { errors.AccountType?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addAccount.accountType' ), 'requiredWithFieldName' ) }</div> }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-4 col-xl-3 col-sm-6">
                                                        <div className="form-group">
                                                            <label>{ t( 'page.admin.addAccount.accountChannel' ) }</label>
                                                            <input maxLength="40" tabIndex="1"
                                                                id="id-AccountChannel" placeholder={ t( 'page.admin.addAccount.accountChannel' ) } type="text"
                                                                className={ "form-control " + ( errors.AccountChannel ? "is-invalid" : '' ) }
                                                                { ...register( "AccountChannel", { required: false } ) }
                                                            />
                                                            { errors.AccountChannel?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addAccount.accountChannel' ), 'requiredWithFieldName' ) }</div> }
                                                        </div>
                                                    </div>


                                                    <div className="col-md-6 col-lg-4 col-xl-3 col-sm-6">
                                                        <div className="form-group">
                                                            <label>{ t( 'page.admin.addAccount.segment' ) }</label>
                                                            <select maxLength="40" tabIndex="1"
                                                                id="id-segment"
                                                                className={ "form-control " + ( errors.Segment ? "is-invalid" : '' ) }
                                                                { ...register( "Segment", { required: false } ) }
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="Retail">Retail</option>
                                                                <option value="Energy">Energy</option>
                                                            </select>
                                                            { errors.Segment?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addAccount.segment' ), 'requiredWithFieldName' ) }</div> }
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 col-lg-4 col-xl-3 col-sm-6">
                                                        <div className="form-group">
                                                            <label>{ t( 'page.admin.addAccount.givingPotential' ) }</label>
                                                            <input maxLength="40" tabIndex="1"
                                                                id="id-GivingPotential" placeholder={ t( 'page.admin.addAccount.givingPotential' ) } type="text"
                                                                className={ "form-control " + ( errors.GivingPotential ? "is-invalid" : '' ) }
                                                                { ...register( "GivingPotential", { required: false, pattern: getPattern( 'number' ) } ) }
                                                            />
                                                            { errors.GivingPotential?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addAccount.givingPotential' ), 'requiredWithFieldName' ) }</div> }

                                                            { errors.GivingPotential?.type === 'pattern' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addAccount.givingPotential' ), 'wrongFormat' ) }</div> }
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 col-lg-4 col-xl-3 col-sm-6">
                                                        <div className="form-group">
                                                            <label> { t( 'page.admin.addAccount.priorDonations' ) }</label>
                                                            <input maxLength="40" tabIndex="1"
                                                                id="id-PriorDonations" placeholder={ t( 'page.admin.addAccount.priorDonations' ) } type="text"
                                                                className={ "form-control " + ( errors.PriorDonations ? "is-invalid" : '' ) }
                                                                { ...register( "PriorDonations", { required: false, pattern: getPattern( 'number' ) } ) }
                                                            />
                                                            { errors.PriorDonations?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addAccount.priorDonations' ), 'requiredWithFieldName' ) }</div> }

                                                            { errors.PriorDonations?.type === 'pattern' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addAccount.priorDonations' ), 'wrongFormat' ) }</div> }
                                                        </div>
                                                    </div>




                                                    <div className="col-md-6 col-lg-4 col-xl-3 col-sm-6">
                                                        <div className="form-group">
                                                            <label>{ t( 'page.admin.addAccount.primaryLocation' ) }</label>
                                                            <input maxLength="100" tabIndex="1"
                                                                id="id-AccountLocation" placeholder={ t( 'page.admin.addAccount.primaryLocation' ) } type="text"
                                                                className={ "form-control " + ( errors.AccountLocation ? "is-invalid" : '' ) }
                                                                { ...register( "AccountLocation", { required: false } ) }
                                                            />
                                                            { errors.AccountLocation?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addAccount.primaryLocation' ), 'requiredWithFieldName' ) }</div> }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-4 col-xl-3 col-sm-6">
                                                        <div className="form-group">
                                                            <label>{ t( 'page.admin.addAccount.SIKAPID' ) }</label>
                                                            <input maxLength="40" tabIndex="1"
                                                                id="id-ExternalSystemID" placeholder={ t( 'page.admin.addAccount.SIKAPID' ) } type="text"
                                                                className={ "form-control " + ( errors.ExternalSystemID ? "is-invalid" : '' ) }
                                                                { ...register( "ExternalSystemID", { required: false } ) }
                                                            />
                                                            { errors.ExternalSystemID?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addAccount.SIKAPID' ), 'requiredWithFieldName' ) }</div> }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-8 col-xl-9 col-sm-6">
                                                        <div className="form-group">
                                                            <label>{ t( 'page.admin.addAccount.notes' ) }</label>

                                                            <textarea id="id-Notes" placeholder={ t( 'page.admin.addAccount.notes' ) }
                                                                maxLength="500"
                                                                rows={ 5 }
                                                                className={ "form-control " + ( errors.Notes ? "is-invalid" : '' ) }
                                                                { ...register( "Notes", { required: false } ) }
                                                            ></textarea>
                                                            { errors.Notes?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addAccount.notes' ), 'requiredWithFieldName' ) }</div> }
                                                        </div>
                                                    </div>




                                                </div>

                                                <div className="submit-section text-right">
                                                    <button type="submit" className="btn btn-primary ml-2" tabIndex="1"
                                                        id="id-btn-accountAdd">{ t( 'page.admin.addAccount.add' ) }</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}