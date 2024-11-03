import React, { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { getMessage, getPattern } from '@common/MessageHelper';
import { constant } from '@common/Constant';

import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import * as sweetalert from '@common/SweetAlert';
import * as helper from '@common/CommonHelper';
import { Outlet, NavLink, Link } from "react-router-dom";

import * as DonationService from '@service/DonationService';
import * as AccountService from '@service/AccountService';
import * as ActivityService from '@service/ActivityService';
import * as ContactService from '@service/ContactService';

import StaticDataTableComponent from "@module/super_admin/common/datatable/StaticDataTableComponent";

import DonationAdd from "@module/super_admin/donation/DonationAdd";
import DonationEdit from "@module/super_admin/donation/DonationEdit";

import ActivityEdit from "@module/super_admin/activity/ActivityEdit";


import ContactAdd from "@module/super_admin/contact/ContactAdd";
import ContactEdit from "@module/super_admin/contact/ContactEdit";
import { useTranslation } from 'react-i18next';

export default function AccountEdit ()
{
    const { t } = useTranslation();

    const { rid } = useParams();
    const ContactTableRef = useRef();
    const ActivityTableRef = useRef();
    const DonatinTableRef = useRef();

    const [ AccountData, setAccountData ] = useState( [] );
    const [ contactList, setContactList ] = useState( [] );

    const navigate = useNavigate();

    const { register, reset, handleSubmit, watch, formState: { errors }, setValue, trigger, getValues } = useForm();

    const { register: register1, reset: reset1, handleSubmit: handleSubmit1, formState: { errors: errors1 }, setValue: setValue1, trigger: trigger1, getValues: getValues1, watch: watch1 } = useForm();


    // const { registerActivity, , handleSubmitActivity, watchActivity, formState: { errorsActivity }, setValueActivity, triggerActivity, getValuesActivity } = useForm();

    const [ DonationData, setDonationData ] = useState( [] );
    const [ ActivityData, setActivityData ] = useState( [] );
    const [ ContactData, setContactData ] = useState( [] );
    const [ AllContactList, setAllContactList ] = useState( [] );



    const [ showAddDonation, setShowAddDonation ] = useState( false );
    const [ editDonationId, seteditDonationId ] = useState( null );
    const [ showEditDonation, setShowEditDonation ] = useState( false );


    const [ editActivityId, seteditActivityId ] = useState( null );
    const [ showEditActivity, setShowEditActivity ] = useState( false );

    const [ showAddContact, setShowAddContact ] = useState( false );
    const [ editContactId, seteditContactId ] = useState( null );
    const [ showEditContact, setShowEditContact ] = useState( false );

    useEffect( () =>
    {
        // console.log( rid, 'rid' );
        helper.setTitle( 'Account Edit' );
        // getDashboardInfo();
        getAccountData();
        // getDonationData();
        // getActivityData();
        // getAllContactData();

    }, [] )

    // const getContactList = () =>
    // {
    //     helper.loader_show();
    //     ContactService.getContacts( ( responseData ) =>
    //     {
    //         helper.loader_hide();
    //         if ( responseData.length > 0 )
    //         {
    //             setContactData( responseData );
    //         }
    //         else
    //         {
    //             setContactData( [] );
    //         }
    //     } );
    // }

    // const getDonationData = () =>
    // {
    //     DonationService.getAccountWizeDonations( rid, ( responseData ) =>
    //     {
    //         if ( responseData != undefined && responseData.length > 0 )
    //         {
    //             let responseResult = responseData;
    //             setDonationData( responseResult );
    //         }
    //         else
    //         {
    //             setDonationData( [] );
    //         }
    //     } );
    // }

    // const getAllContactData = () =>
    // {
    //     helper.loader_show();
    //     ContactService.getContacts( ( responseData ) =>
    //     {
    //         helper.loader_hide();
    //         if ( responseData.length > 0 )
    //         {
    //             setAllContactList( responseData );
    //         }
    //         else
    //         {
    //             setAllContactList( [] );
    //         }
    //     } );
    // }

    const getAccountData = () =>
    {
        helper.loader_show();
        AccountService.getAccountOverview( rid, ( responseData ) =>
        {
            helper.loader_hide();
            console.log( "response => ", responseData );
            if ( responseData != undefined && responseData != '' )
            {
                let responseResult = responseData;
                setAccountData( responseResult );

                setValue( 'OrganizationName', responseResult.OrganizationName );
                setValue( 'AccountSize', responseResult.AccountSize );
                setValue( 'AccountType', responseResult.AccountType );
                setValue( 'AccountChannel', responseResult.AccountChannel );
                setValue( 'Segment', responseResult.Segment );
                setValue( 'GivingPotential', responseResult.GivingPotential );
                setValue( 'PriorDonations', responseResult.PriorDonations );
                setValue( 'AccountManagerID', responseResult.AccountManagerID );
                setValue( 'AccountLocation', responseResult.AccountLocation );
                setValue( 'ExternalSystemID', responseResult.ExternalSystemID );
                setValue( 'Notes', responseResult.Notes );
                setActivityData( responseResult.Activities );
                setDonationData( responseResult.Donations );
                setContactData( responseResult.Contacts );
            }
            else
            {
                setAccountData( [] );
            }
        } );
    }

    const editActivityProcess = ( id ) =>
    {
        seteditActivityId( id );
        setShowEditActivity( true );
    }


    const editContactProcess = ( id ) =>
    {
        seteditContactId( id );
        setShowEditContact( true );
    }


    const editDonationProcess = ( id ) =>
    {
        seteditDonationId( id );
        setShowEditDonation( true );
    }


    const ChangeDndContact = ( data, checked ) =>
    {
        data.DoNotContact = checked;
        let requestData = {
            FirstName: data.FirstName,
            LastName: data.LastName,
            OfficialEmailAddress: data.OfficialEmailAddress,
            PersonalEmailAddress: data.PersonalEmailAddress,
            OfficialPhoneNumber: data.OfficialPhoneNumber,
            Role: data.Role,
            PersonalPhoneNumber: data.PersonalPhoneNumber,
            Notes: data.Notes,

            PreferredLanguage: data.PreferredLanguage,
            ContactChannel: data.ContactChannel,
            IsActive: data.IsActive == '' ? false : true,
            DoNotContact: data.DoNotContact,

            AssociatedAccount: rid,
            ExternalSystemID: 1,
            LastContactDate: helper.formatDate( data.LastContactDate, '2' ),
            RecordCreatedBy: 1,
            RecordLastModifiedBy: 1,

        }
        // console.log( requestData, data, checked );
        helper.loader_show();
        ContactService.editContact( data.ContactID, requestData, ( responseData ) =>
        {
            helper.loader_hide();
            sweetalert.regularAlert( 'success', responseData.message );
        } );
    }


    const refreshTable = () =>
    {
        // console.log( ContactTableRef.current, ActivityTableRef.current, DonatinTableRef.current )
        getAccountData();
        // if ( ContactTableRef.current != undefined && type == 'contact' )
        // {
        //     ContactTableRef.current.reloadTable();
        // }
        // else if ( ActivityTableRef.current != undefined && type == 'activity' )
        // {
        //     ActivityTableRef.current?.reloadTable();
        // }
        // else if ( DonatinTableRef.current != undefined && type == 'donation' )
        // {
        //     DonatinTableRef.current.reloadTable();
        // }
    }




    let header = [
        {
            title: t( 'page.admin.donationList.donationDate' ),
            prop: "DonationDate",
            isSortable: true,
            cell: ( row ) => 
            {
                return (
                    <>
                        { helper.formatDate( row.DonationDate ) }
                    </>
                )
            }
        },
        {
            title: t( 'page.admin.donationList.DonationStatus' ),
            prop: "DonationStatus",
            isSortable: true,
        },
        {
            title: t( 'page.admin.donationList.DonationStatus' ),
            prop: "CampaignID",
            isSortable: false,
            cell: ( row ) => 
            {
                return (
                    <>
                        { row.CampaignID == '1' && 'Bali Education Fundraiser' }
                        { row.CampaignID == '2' && 'Sumatra Earthquake Relief' }
                    </>
                )
            }
        },
        {
            title: t( 'page.admin.donationList.InKind' ),
            prop: "InKind",
            alignment: { horizontal: 'center' },
            isSortable: true,
            cell: ( row ) => 
            {
                return (
                    <>
                        { row.InKind ? 'Yes' : 'No' }
                    </>
                )
            }
        },
        {
            title: t( 'page.admin.donationList.Designation' ),
            prop: "Designation",
            isSortable: true,
        },

        {
            title: t( 'page.admin.donationList.DonationID' ),
            prop: "DonationID",
            isSortable: false,
            alignment: { horizontal: 'center' },
            cell: ( row ) => 
            {
                return (
                    <>
                        <Link title={ t( "page.admin.donationList.edit" ) }
                            onClick={ () => { editDonationProcess( row.DonationID ) } } className="btn btn-sm btn-icon btn-outline-primary">
                            <i className='fa fa-pencil-alt'></i >
                            <span className="sr-only">{ t( "page.admin.donationList.edit" ) }</span>
                        </Link >
                    </>
                )
            }
        }
    ];


    let ActivityHeader = [
        {

            title: t( 'page.admin.activityList.DonationDate' ),
            prop: "DonationDate",
            isSortable: true,
            cell: ( row ) => 
            {
                return (
                    <>
                        { helper.formatDate( row.DonationDate ) }
                    </>
                )
            }
        },
        {
            title: t( 'page.admin.activityList.ContactID' ),
            prop: "ContactID",
            alignment: { horizontal: 'center' },

            isSortable: true,

        },
        {
            title: t( 'page.admin.activityList.CampaignID' ),
            prop: "CampaignID",
            isSortable: false,
            cell: ( row ) => 
            {
                return (
                    <>
                        { row.CampaignID == '1' && 'Bali Education Fundraiser' }
                        { row.CampaignID == '2' && 'Sumatra Earthquake Relief' }
                    </>
                )
            }
        },
        {
            title: t( 'page.admin.activityList.ActivityType' ),
            prop: "ActivityType",
            alignment: { horizontal: 'center' },
            isSortable: true,

        },
        {
            title: t( 'page.admin.activityList.Designation' ),
            prop: "Designation",
            isSortable: true,
            cell: ( row ) => 
            {
                return ( 'Admin' )
            }
        },
        {
            title: t( 'page.admin.activityList.Description' ),
            prop: "Description",
            isSortable: true,
            cell: ( row ) => 
            {
                return ( helper.cutString( row.Description, 55 ) )
            }
        },

        {
            title: t( 'page.admin.activityList.DonationID' ),
            prop: "AccountID",
            isSortable: false,
            alignment: { horizontal: 'center' },
            cell: ( row ) => 
            {
                return (
                    <>
                        <Link title={ t( "page.admin.activityList.edit" ) }
                            onClick={ () => { editActivityProcess( row.ActivityID ) } }
                            className="btn btn-sm btn-icon btn-outline-primary">
                            <i className='fa fa-pencil-alt'></i >
                            <span className="sr-only">{ t( "page.admin.activityList.edit" ) }</span>
                        </Link >
                    </>
                )
            }
        }
    ];

    let ContactHeader = [
        {
            title: t( "page.admin.contactList.DoNotContact" ),
            prop: "DoNotContact",
            isSortable: false,
            alignment: { horizontal: 'center' },
            cell: ( row ) => 
            {
                return (
                    <>
                        <input type="checkbox" key={ row.ContactID + '-' + row.DoNotContact } defaultChecked={ row.DoNotContact == 1 } onChange={ ( e ) => { ChangeDndContact( row, !row.DoNotContact ) } } />
                    </>
                )
            }
        },
        {
            title: t( "page.admin.contactList.FirstName" ),
            prop: "FirstName",
            isSortable: true,
        },
        {
            title: t( "page.admin.contactList.LastName" ),
            prop: "LastName",
            isSortable: true,
        },
        {
            title: t( "page.admin.contactList.OfficialEmailAddress" ),
            prop: "OfficialEmailAddress",
            isSortable: true,
        },
        {
            title: t( "page.admin.contactList.OfficialPhoneNumber" ),
            prop: "OfficialPhoneNumber",
            isSortable: true,
        },
        {
            title: t( "page.admin.contactList.Role" ),
            prop: "Role",
            isSortable: true,
        },
        {
            title: t( "page.admin.contactList.LastContactDate" ),
            prop: "LastContactDate",
            isSortable: true,
            cell: ( row ) => 
            {
                return (
                    <>
                        { row.LastContactDate != null ? helper.formatDate( row.LastContactDate, 1 ) : '' }
                    </>
                )
            }
        },
        {
            title: t( "page.admin.contactList.DonationID" ),
            prop: "ContactID",
            isSortable: false,
            alignment: { horizontal: 'center' },
            cell: ( row ) => 
            {
                return (
                    <>
                        <Link title={ t( "page.admin.contactList.edit" ) }
                            onClick={ () => { editContactProcess( row.ContactID ) } } className="btn btn-sm btn-icon btn-outline-primary">
                            <i className='fa fa-pencil-alt'></i >
                            <span className="sr-only">{ t( "page.admin.contactList.edit" ) }</span>
                        </Link >
                    </>
                )
            }
        }
    ];




    const onSubmitActivity = data =>
    {
        console.log( data );

        console.log( "data => ", data )

        let requestData = {
            AccountID: rid,
            ContactID: data.Contact,
            ActivityType: data.ActivityType,
            ActivityDate: helper.formatDate( new Date(), '2' ),
            CreatedBy: 1,
            Description: data.Description
        }


        helper.loader_show();
        ActivityService.addActivity( requestData, ( responseData ) =>
        {
            helper.loader_hide();

            if ( responseData != '' && responseData != undefined )
            {
                sweetalert.regularAlert( 'success', responseData.message );
                reset1();
                getAccountData();
                // navigate( '/admin/account' );
            }
            else
            {
                sweetalert.regularAlert( 'error', responseData.message );
            }
        } );
    }

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

        // OrganizationName, AccountType, AccountManagerID, RecordCreatedBy

        helper.loader_show();
        AccountService.editAccount( rid, requestData, ( responseData ) =>
        {
            helper.loader_hide();

            console.log( 'responseData =>', responseData );

            if ( responseData != '' && responseData != undefined )
            {
                // navigate( '/admin/account' );
                sweetalert.regularAlert( 'success', responseData.message );
            }
            else
            {
                sweetalert.regularAlert( 'error', responseData.message );
            }
        } );
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
                                        <span className="font-weight-bolder">{ t( 'page.admin.editAccount.title' ) }</span>
                                    </p>
                                    <button type="button" onClick={ () => navigate( '/admin/account' ) } className="btn btn-outline-primary float-right">
                                        <span className="fa fa-arrow-left  mr-1"></span>
                                        { t( 'page.admin.comman.backButton' ) }
                                    </button>
                                </div>
                            </header>



                            <div className="page-section">
                                <div className="section-block">

                                    <div className="main-card mb-3 card">
                                        <div className="card-body">
                                            {/* <h4 className="card-title">Activity Edit</h4> */ }
                                            <form id="form-accountAdd" onSubmit={ handleSubmit( onSubmit ) } >

                                                <div className="form-row">

                                                    <div className="col-md-6 col-lg-4 col-xl-3 col-sm-6">
                                                        <div className="form-group">
                                                            <label>{ t( 'page.admin.editAccount.Name' ) }<em>*</em></label>
                                                            <input maxLength="40" tabIndex="1"
                                                                id="id-Name" placeholder={ t( 'page.admin.editAccount.Name' ) } type="text"
                                                                className={ "form-control " + ( errors.OrganizationName ? "is-invalid" : '' ) }
                                                                { ...register( "OrganizationName", { required: true } ) }
                                                            />
                                                            { errors.OrganizationName?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editAccount.Name' ), 'requiredWithFieldName' ) }</div> }
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 col-lg-4 col-xl-3 col-sm-6">
                                                        <div className="form-group">
                                                            <label>{ t( 'page.admin.editAccount.accountSize' ) }</label>
                                                            <select maxLength="40" tabIndex="1"
                                                                id="id-AccountSize"
                                                                className={ "form-control " + ( errors.AccountSize ? "is-invalid" : '' ) }
                                                                { ...register( "AccountSize", { required: false } ) }
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="Large">Large</option>
                                                                <option value="Medium">Medium</option>
                                                            </select>
                                                            { errors.AccountSize?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editAccount.accountSize' ), 'requiredWithFieldName' ) }</div> }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-4 col-xl-3 col-sm-6">
                                                        <div className="form-group">
                                                            <label>{ t( 'page.admin.editAccount.accountType' ) }<em>*</em></label>
                                                            <select maxLength="40" tabIndex="1"
                                                                id="id-AccountSize"
                                                                className={ "form-control " + ( errors.AccountType ? "is-invalid" : '' ) }
                                                                { ...register( "AccountType", { required: true } ) }
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="Corporation">Corporation</option>
                                                                <option value="Retail (3rd Party Fundraising)">Retail (3rd Party Fundraising)</option>
                                                            </select>
                                                            { errors.AccountType?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editAccount.accountType' ), 'requiredWithFieldName' ) }</div> }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-4 col-xl-3 col-sm-6">
                                                        <div className="form-group">
                                                            <label>{ t( 'page.admin.editAccount.accountChannel' ) }</label>
                                                            <input maxLength="40" tabIndex="1"
                                                                id="id-AccountChannel" placeholder={ t( 'page.admin.editAccount.accountChannel' ) } type="text"
                                                                className={ "form-control " + ( errors.AccountChannel ? "is-invalid" : '' ) }
                                                                { ...register( "AccountChannel", { required: false } ) }
                                                            />
                                                            { errors.AccountChannel?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editAccount.accountChannel' ), 'requiredWithFieldName' ) }</div> }
                                                        </div>
                                                    </div>


                                                    <div className="col-md-6 col-lg-4 col-xl-3 col-sm-6">
                                                        <div className="form-group">
                                                            <label>{ t( 'page.admin.editAccount.segment' ) }</label>
                                                            <select maxLength="40" tabIndex="1"
                                                                id="id-segment"
                                                                className={ "form-control " + ( errors.Segment ? "is-invalid" : '' ) }
                                                                { ...register( "Segment", { required: false } ) }
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="Retail">Retail</option>
                                                                <option value="Energy">Energy</option>
                                                            </select>
                                                            { errors.Segment?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editAccount.segment' ), 'requiredWithFieldName' ) }</div> }
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 col-lg-4 col-xl-3 col-sm-6">
                                                        <div className="form-group">
                                                            <label>{ t( 'page.admin.editAccount.givingPotential' ) }</label>
                                                            <input maxLength="40" tabIndex="1"
                                                                id="id-GivingPotential" placeholder={ t( 'page.admin.editAccount.givingPotential' ) } type="text"
                                                                className={ "form-control " + ( errors.GivingPotential ? "is-invalid" : '' ) }
                                                                { ...register( "GivingPotential", { required: false, pattern: getPattern( 'number' ) } ) }
                                                            />
                                                            { errors.GivingPotential?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editAccount.givingPotential' ), 'requiredWithFieldName' ) }</div> }

                                                            { errors.GivingPotential?.type === 'pattern' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editAccount.givingPotential' ), 'wrongFormat' ) }</div> }
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 col-lg-4 col-xl-3 col-sm-6">
                                                        <div className="form-group">
                                                            <label> { t( 'page.admin.editAccount.priorDonations' ) }</label>
                                                            <input maxLength="40" tabIndex="1"
                                                                id="id-PriorDonations" placeholder={ t( 'page.admin.editAccount.priorDonations' ) } type="text"
                                                                className={ "form-control " + ( errors.PriorDonations ? "is-invalid" : '' ) }
                                                                { ...register( "PriorDonations", { required: false, pattern: getPattern( 'number' ) } ) }
                                                            />
                                                            { errors.PriorDonations?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editAccount.priorDonations' ), 'requiredWithFieldName' ) }</div> }

                                                            { errors.PriorDonations?.type === 'pattern' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editAccount.priorDonations' ), 'wrongFormat' ) }</div> }
                                                        </div>
                                                    </div>




                                                    <div className="col-md-6 col-lg-4 col-xl-3 col-sm-6">
                                                        <div className="form-group">
                                                            <label>{ t( 'page.admin.editAccount.primaryLocation' ) }</label>
                                                            <input maxLength="100" tabIndex="1"
                                                                id="id-AccountLocation" placeholder={ t( 'page.admin.editAccount.primaryLocation' ) } type="text"
                                                                className={ "form-control " + ( errors.AccountLocation ? "is-invalid" : '' ) }
                                                                { ...register( "AccountLocation", { required: false } ) }
                                                            />
                                                            { errors.AccountLocation?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editAccount.primaryLocation' ), 'requiredWithFieldName' ) }</div> }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-4 col-xl-3 col-sm-6">
                                                        <div className="form-group">
                                                            <label>{ t( 'page.admin.editAccount.SIKAPID' ) }</label>
                                                            <input maxLength="40" tabIndex="1"
                                                                id="id-ExternalSystemID" placeholder={ t( 'page.admin.editAccount.SIKAPID' ) } type="text"
                                                                className={ "form-control " + ( errors.ExternalSystemID ? "is-invalid" : '' ) }
                                                                { ...register( "ExternalSystemID", { required: false } ) }
                                                            />
                                                            { errors.ExternalSystemID?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editAccount.SIKAPID' ), 'requiredWithFieldName' ) }</div> }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-8 col-xl-9 col-sm-6">
                                                        <div className="form-group">
                                                            <label>{ t( 'page.admin.editAccount.notes' ) }</label>

                                                            <textarea id="id-Notes" placeholder={ t( 'page.admin.editAccount.notes' ) }
                                                                maxLength="500"
                                                                rows={ 5 }
                                                                className={ "form-control " + ( errors.Notes ? "is-invalid" : '' ) }
                                                                { ...register( "Notes", { required: false } ) }
                                                            ></textarea>
                                                            { errors.Notes?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editAccount.notes' ), 'requiredWithFieldName' ) }</div> }
                                                        </div>
                                                    </div>




                                                </div>

                                                <div className="submit-section text-right">
                                                    <button type="submit" className="btn btn-primary ml-2" tabIndex="1"
                                                        id="id-btn-accountAdd">{ t( 'page.admin.comman.updateButton' ) }</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-5" />
                            <div className="page-section">
                                <div className="section-block">
                                    <div className="category-filter">
                                        <div className="card-deck-xl">
                                            <div className="card card-fluid">
                                                <div className="card-body">
                                                    <h4 className="card-title">{ t( 'page.admin.editAccount.activityAdd' ) }</h4>
                                                    <hr />
                                                    <form id="form-accountAdd" onSubmit={ handleSubmit1( onSubmitActivity ) } >

                                                        <div className="form-row">
                                                            <div className="col-md-6 col-lg-4 col-sm-6">
                                                                <div className="form-group">
                                                                    <label>{ t( 'page.admin.editAccount.ActivityType' ) }<em>*</em></label>
                                                                    <select
                                                                        name="ActivityType"
                                                                        { ...register1( "ActivityType", { required: true } ) }
                                                                        className={ "form-control " + ( errors1.ActivityType ? "is-invalid" : '' ) }
                                                                    >
                                                                        <option value="">Select</option>
                                                                        <option value="Email">Email</option>
                                                                        <option value="Meeting">Meeting</option>
                                                                        <option value="Phone Call">Phone Call</option>
                                                                        <option value="Note">Note</option>
                                                                    </select>
                                                                    { errors1.ActivityType?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editAccount.ActivityType' ), 'requiredWithFieldName' ) }</div> }
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-lg-4 col-sm-6">
                                                                <div className="form-group">
                                                                    <label className="control-label">{ t( 'page.admin.editAccount.ContactID' ) } <em>*</em></label>
                                                                    <select { ...register1( "Contact", { required: true } ) } className={ "form-control " + ( errors1.Contact ? "is-invalid" : '' ) }>
                                                                        <option value="">Select</option>
                                                                        { ContactData.map( ( item, index ) => <option key={ index } value={ item.ContactID }>{ item.FirstName + " " + item.LastName }</option> ) }

                                                                    </select>

                                                                    { errors1.Contact?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editAccount.ContactID' ), 'requiredWithFieldName' ) }</div> }

                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 col-lg-4 col-sm-12">
                                                                <div className="form-group">
                                                                    <label>{ t( 'page.admin.editAccount.CampaignID' ) }<em>*</em></label>
                                                                    <select
                                                                        name="ActivityType"
                                                                        { ...register1( "CampainID", { required: true } ) }
                                                                        className={ "form-control " + ( errors1.CampainID ? "is-invalid" : '' ) }
                                                                    >
                                                                        <option value="">Select</option>
                                                                        <option value="1">Bali Education Fundraiser</option>
                                                                        <option value="2">Sumatra Earthquake Relief</option>
                                                                    </select>
                                                                    { errors1.CampainID?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editAccount.CampaignID' ), 'requiredWithFieldName' ) }</div> }
                                                                </div>
                                                            </div>

                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <label>{ t( 'page.admin.editAccount.Description' ) }<em>*</em></label>
                                                                    <textarea
                                                                        name="ActivityNote"
                                                                        maxLength="500"
                                                                        rows={ 3 }
                                                                        placeholder={ t( 'page.admin.editAccount.Description' ) }
                                                                        className={ "form-control " + ( errors1.Description ? "is-invalid" : '' ) }
                                                                        { ...register1( "Description", { required: true } ) }
                                                                    ></textarea>
                                                                    { errors1.Description?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editAccount.Description' ), 'requiredWithFieldName' ) }</div> }
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <button type="submit" className="btn btn-primary float-right">
                                                            { t( 'page.admin.editAccount.add' ) }
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                            <ActivityEdit ActivityId={ editActivityId } AccountId={ rid } showModal={ showEditActivity } setShowModal={ setShowEditActivity } tableReload={ refreshTable } />
                            <div className="page-section" >
                                <div className="main-card mb-3 card card-fluid" >
                                    <div className="card-body table-responsive">
                                        <h4 className="card-title">{ t( 'page.admin.editAccount.activityList' ) }</h4>
                                        <hr />
                                        <StaticDataTableComponent
                                            header={ ActivityHeader }
                                            classList={ {
                                                table: 'row-border table-hover table  w-100',
                                            } }
                                            isPerPage={ true }
                                            perPageRows={ [ 5, 10, ] }
                                            perPage={ 10 }
                                            sort={ 'CreatedTimestamp' }
                                            sortDirection={ 'desc' }
                                            staticData={ ActivityData }
                                            ref={ ActivityTableRef }
                                        />

                                    </div>
                                </div>
                            </div>

                            <hr className="my-5" />

                            <div className="page-section" >
                                <div className="section-block">
                                    <div className="row">
                                        <div className="col-12">
                                            <Link className="btn btn-outline-primary float-right"
                                                onClick={ () => setShowAddDonation( true ) }>
                                                <span className="fa fa-plus mr-1"></span>
                                                { t( 'page.admin.comman.addDonationsButton' ) }</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <DonationAdd AccountId={ rid } showModal={ showAddDonation } setShowModal={ setShowAddDonation } tableReload={ refreshTable } />
                            <DonationEdit DonationId={ editDonationId } AccountId={ rid } showModal={ showEditDonation } setShowModal={ setShowEditDonation } tableReload={ refreshTable } />

                            <div className="page-section" >
                                <div className="main-card mb-3 card card-fluid" >
                                    <div className="card-body table-responsive">
                                        <h4 className="card-title">{ t( 'page.admin.editAccount.donationList' ) }</h4>
                                        <hr />
                                        <StaticDataTableComponent
                                            header={ header }
                                            classList={ {
                                                table: 'row-border table-hover table  w-100',
                                            } }
                                            isPerPage={ true }
                                            perPageRows={ [ 5, 10, ] }
                                            perPage={ 10 }
                                            sort={ 'CreatedTimestamp' }
                                            sortDirection={ 'desc' }
                                            staticData={ DonationData }
                                            ref={ DonatinTableRef }
                                        />

                                    </div>
                                </div>
                            </div>

                            <hr className="my-5" />

                            <div className="page-section" >
                                <div className="section-block">
                                    <div className="row">
                                        <div className="col-12">
                                            <Link className="btn btn-outline-primary float-right"
                                                onClick={ () => setShowAddContact( true ) }>
                                                <span className="fa fa-plus mr-1"></span>
                                                { t( 'page.admin.comman.addContactButton' ) }</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <ContactAdd AccountId={ rid } showModal={ showAddContact } setShowModal={ setShowAddContact } tableReload={ refreshTable } />

                            <ContactEdit ContactId={ editContactId } AccountId={ rid } showModal={ showEditContact } setShowModal={ setShowEditContact } tableReload={ refreshTable } />
                            <div className="page-section" >
                                <div className="main-card mb-3 card card-fluid" >
                                    <div className="card-body table-responsive">
                                        <h4 className="card-title">{ t( 'page.admin.editAccount.contactListTitle' ) }</h4>
                                        <hr />
                                        <StaticDataTableComponent
                                            header={ ContactHeader }
                                            classList={ {
                                                table: 'row-border table-hover table  w-100',
                                            } }
                                            isPerPage={ true }
                                            perPageRows={ [ 5, 10, ] }
                                            perPage={ 10 }
                                            sort={ 'CreatedTimestamp' }
                                            sortDirection={ 'desc' }
                                            staticData={ ContactData }
                                            ref={ ContactTableRef }

                                        />

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div >
            </main >

        </>
    )
}