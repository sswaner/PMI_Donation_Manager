import React, { useState, useEffect } from 'react';

import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import Modal from 'react-bootstrap/Modal';

import * as sweetalert from '@common/SweetAlert';
import { getMessage, getPattern } from '@common/MessageHelper';

import * as helper from '@common/CommonHelper';

import * as ContactService from '@service/ContactService';

import { useTranslation } from 'react-i18next';


export default function ContactEdit ( { ContactId, AccountId, showModal, setShowModal, tableReload } )
{

    const { t } = useTranslation();

    // const [ show, setShow ] = useState( false );
    const [ ContactData, setContactData ] = useState( [] );

    const { register, reset, handleSubmit, watch, formState: { errors }, setValue, trigger, getValues } = useForm();


    useEffect( () =>
    {
        if ( showModal )
        {
            getContactData();
        }
        // helper.setTitle( 'Contact Edit' );
    }, [ showModal ] );

    const handleClose = () => setShowModal( false );

    const getContactData = () =>
    {
        ContactService.getAccountWizeContact( ContactId, ( responseData ) =>
        {
            console.log( "response => ", responseData );
            if ( responseData != undefined && responseData != '' )
            {
                let responseResult = responseData;
                setContactData( responseResult );

                setValue( 'FirstName', responseResult.FirstName );
                setValue( 'LastName', responseResult.LastName );
                setValue( 'OfficialEmailAddress', responseResult.OfficialEmailAddress );
                setValue( 'PersonalEmailAddress', responseResult.PersonalEmailAddress );
                setValue( 'OfficialPhoneNumber', responseResult.OfficialPhoneNumber );
                setValue( 'Role', responseResult.Role );
                setValue( 'PersonalPhoneNumber', responseResult.PersonalPhoneNumber );
                setValue( 'PreferredLanguage', responseResult.PreferredLanguage );
                setValue( 'ContactChannel', responseResult.ContactChannel );
                setValue( 'IsActive', responseResult.IsActive );
                setValue( 'DoNotContact', responseResult.DoNotContact );

                setValue( 'Notes', responseResult.Notes );
            }
            else
            {
                setContactData( [] );
            }
        } );
    }


    const onSubmit = ( data ) =>
    {

        console.log( "data => ", data )


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
            DoNotContact: data.DoNotContact == '' ? false : true,

            AssociatedAccount: AccountId,
            ExternalSystemID: 1,
            LastContactDate: helper.formatDate( ContactData.LastContactDate, '2' ),
            RecordCreatedBy: 1,
            RecordLastModifiedBy: 1,

        }

        helper.loader_show();
        ContactService.editContact( ContactId, requestData, ( responseData ) =>
        {
            helper.loader_hide();
            reset();
            sweetalert.regularAlert( 'success', responseData.message );
            handleClose();
            tableReload();
        } );


    };

    return (
        <>

            <Modal show={ showModal } onHide={ handleClose }
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                    <Modal.Title>{ t( 'page.admin.editContact.title' ) }</Modal.Title>
                    <button className="btn " onClick={ handleClose }>
                        <span className="fa fa-times"></span>
                    </button>
                </Modal.Header>
                <Modal.Body className='has-custom-scroll'>
                    <form onSubmit={ handleSubmit( onSubmit ) }>
                        <div className="form-row">

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="FirstName">{ t( 'page.admin.editContact.firstName' ) }<em>*</em></label>
                                    <input
                                        { ...register( "FirstName", { required: true } ) }
                                        className={ "form-control " + ( errors.FirstName ? "is-invalid" : '' ) }
                                        placeholder={ t( 'page.admin.editContact.firstName' ) }
                                        maxLength="40"
                                        tabIndex="3"
                                    />

                                    { errors.FirstName?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editContact.firstName' ), 'requiredWithFieldName' ) }</div> }

                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="LastName">{ t( 'page.admin.editContact.LastName' ) }<em>*</em></label>
                                    <input
                                        type="text"
                                        { ...register( "LastName", { required: true } ) }
                                        className={ "form-control " + ( errors.LastName ? "is-invalid" : '' ) }
                                        placeholder={ t( 'page.admin.editContact.LastName' ) }
                                        maxLength="40"
                                        tabIndex="3"
                                    />

                                    { errors.LastName?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage(t( 'page.admin.editContact.LastName' ), 'requiredWithFieldName' ) }</div> }

                                </div>
                            </div>

                            <div className="col-lg-4 col-md-12">
                                <div className="form-group">
                                    <label htmlFor="Role">{ t( 'page.admin.editContact.Role' ) }<em>*</em></label>
                                    <input
                                        type="text"
                                        { ...register( "Role", { required: true } ) }
                                        className={ "form-control " + ( errors.Role ? "is-invalid" : '' ) }
                                        placeholder={ t( 'page.admin.editContact.Role' ) }
                                        maxLength="40"
                                        tabIndex="3"
                                    />

                                    { errors.Role?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editContact.Role' ), 'requiredWithFieldName' ) }</div> }

                                </div>
                            </div>


                            <div className="col-md-12">
                                <div className="form-group form-check">
                                    <input
                                        type="checkbox"
                                        className={ "form-check-input " + ( errors.DoNotContact ? "is-invalid" : '' ) }
                                        id="DoNotContact"
                                        { ...register( "DoNotContact", {} ) }

                                    />
                                    <label className="" htmlFor="DoNotContact">
                                        { t( 'page.admin.editContact.DoNotContact' ) }
                                    </label>
                                    { errors.DoNotContact?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editContact.DoNotContact' ), 'requiredWithFieldName' ) }</div> }
                                </div>
                            </div>


                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="amount"> { t( 'page.admin.editContact.OfficialEmailAddress' ) }<em>*</em></label>
                                    <input
                                        { ...register( "OfficialEmailAddress", { required: true, pattern: getPattern( 'email' ) } ) }
                                        className={ "form-control " + ( errors.OfficialEmailAddress ? "is-invalid" : '' ) }
                                        placeholder={ t( 'page.admin.editContact.OfficialEmailAddress' ) }
                                        maxLength="50"
                                        tabIndex="1"

                                    />

                                    { errors.OfficialEmailAddress?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editContact.OfficialEmailAddress' ), 'requiredWithFieldName' ) }</div> }
                                    { errors.OfficialEmailAddress?.type === 'pattern' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editContact.OfficialEmailAddress' ), 'wrongFormat' ) }</div> }

                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="amount">{ t( 'page.admin.editContact.PersonalEmailAddress' ) }<em>*</em></label>
                                    <input
                                        { ...register( "PersonalEmailAddress", { required: true, pattern: getPattern( 'email' ) } ) }
                                        className={ "form-control " + ( errors.PersonalEmailAddress ? "is-invalid" : '' ) }
                                        placeholder={ t( 'page.admin.editContact.PersonalEmailAddress' ) }
                                        maxLength="50"
                                        tabIndex="1"

                                    />

                                    { errors.PersonalEmailAddress?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editContact.PersonalEmailAddress' ), 'requiredWithFieldName' ) }</div> }
                                    { errors.PersonalEmailAddress?.type === 'pattern' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editContact.PersonalEmailAddress' ), 'wrongFormat' ) }</div> }

                                </div>
                            </div>



                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="OfficialPhoneNumber">{ t( 'page.admin.editContact.OfficialPhoneNumber' ) }<em>*</em></label>
                                    <input
                                        { ...register( "OfficialPhoneNumber", { required: true } ) }
                                        className={ "form-control " + ( errors.OfficialPhoneNumber ? "is-invalid" : '' ) }
                                        placeholder={ t( 'page.admin.editContact.OfficialPhoneNumber' ) }
                                        maxLength="15"
                                        tabIndex="2"
                                    />

                                    { errors.OfficialPhoneNumber?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editContact.OfficialPhoneNumber' ), 'requiredWithFieldName' ) }</div> }

                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="PersonalPhoneNumber">{ t( 'page.admin.editContact.PersonalPhoneNumber' ) }<em>*</em></label>
                                    <input
                                        { ...register( "PersonalPhoneNumber", { required: true } ) }
                                        className={ "form-control " + ( errors.PersonalPhoneNumber ? "is-invalid" : '' ) }
                                        placeholder={ t( 'page.admin.editContact.PersonalPhoneNumber' ) }
                                        maxLength="15"
                                        tabIndex="2"
                                    />

                                    { errors.PersonalPhoneNumber?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editContact.PersonalPhoneNumber' ), 'requiredWithFieldName' ) }</div> }

                                </div>
                            </div>

                            {/**/ }
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label"> { t( 'page.admin.editContact.PreferredLanguage' ) } </label>
                                    <select className={ "form-control " + ( errors.PreferredLanguage ? "is-invalid" : '' ) }

                                        { ...register( "PreferredLanguage", { required: true } ) }
                                    >
                                        <option value="">Select</option>
                                        <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                                        <option value="Indonesian">Indonesian</option>
                                        <option value="English">English</option>

                                    </select>

                                    { errors.PreferredLanguage?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editContact.PreferredLanguage' ), 'requiredWithFieldName' ) }</div> }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">{ t( 'page.admin.editContact.ContactChannel' ) }</label>
                                    <select className={ "form-control " + ( errors.ContactChannel ? "is-invalid" : '' ) }

                                        { ...register( "ContactChannel", { required: true } ) }
                                    >
                                        <option value="">Select</option>
                                        <option value="Email">Email</option>
                                        <option value="Call">Call</option>


                                    </select>

                                    { errors.ContactChannel?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editContact.ContactChannel' ), 'requiredWithFieldName' ) }</div> }
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group form-check">
                                    <input
                                        type="checkbox"

                                        id="IsActive"
                                        className={ "form-check-input " + ( errors.IsActive ? "is-invalid" : '' ) }
                                        { ...register( "IsActive", {} ) }

                                    />
                                    <label className="" htmlFor="IsActive">
                                        { t( 'page.admin.editContact.IsActive' ) }
                                    </label>
                                    { errors.IsActive?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editContact.IsActive' ), 'requiredWithFieldName' ) }</div> }
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="Notes">{ t( 'page.admin.editContact.Notes' ) }<em>*</em></label>
                                    <textarea
                                        { ...register( "Notes", { required: true } ) }
                                        className={ "form-control " + ( errors.Notes ? "is-invalid" : '' ) }
                                        placeholder={ t( 'page.admin.editContact.Notes' ) }
                                        maxLength="500"
                                        rows="4"
                                        tabIndex="4"
                                    ></textarea>

                                    { errors.Notes?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editContact.Notes' ), 'requiredWithFieldName' ) }</div> }

                                </div>
                            </div>
                        </div>
                        <Modal.Footer className='p-0'>

                            <button type="submit" className="btn btn-primary">
                            { t( 'page.admin.comman.updateButton' ) }
                            </button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}