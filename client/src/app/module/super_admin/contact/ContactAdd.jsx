import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Modal from 'react-bootstrap/Modal';
import * as sweetalert from '@common/SweetAlert';
import { getMessage, getPattern } from '@common/MessageHelper';

import * as helper from '@common/CommonHelper';

import * as ContactService from '@service/ContactService';

import { useTranslation } from 'react-i18next';

export default function ContactAdd ( { AccountId, showModal, setShowModal, tableReload } )
{
    const { t } = useTranslation();

    // const [ show, setShow ] = useState( false );
    const [ isChecked, setIsChecked ] = useState( false );
    const [ donationType, setDonationType ] = useState( 'solicited' );

    // const { register, handleSubmit, formState: { errors } } = useForm();
    const { register, reset, handleSubmit, watch, formState: { errors }, setValue, trigger, getValues } = useForm();

    useEffect( () =>
    {
        helper.setTitle( 'Contact Add' );
    }, [] );

    const handleClose = () => setShowModal( false );
    // const handleShow = () => setShowModal( true );

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
            AssociatedAccount: AccountId,
            ContactChannel: data.ContactChannel,
            IsActive: data.IsActive == '' ? false : true,
            DoNotContact: data.DoNotContact == '' ? false : true,
            ExternalSystemID: 1,
            LastContactDate: helper.formatDate( new Date(), '2' ),
            RecordCreatedBy: 1,
            RecordLastModifiedBy: 1,
        }

        helper.loader_show();
        ContactService.addContact( requestData, ( responseData ) =>
        {
            helper.loader_hide();


            if ( responseData.contactID != '' && responseData.contactID != undefined )
            {
                reset();
                tableReload();
                sweetalert.regularAlert( 'success', responseData.message );
                handleClose();
            }
            else
            {
                sweetalert.regularAlert( 'error', responseData.message );
            }
        } );


    };

    return (
        <>

            <Modal show={ showModal } onHide={ handleClose }
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                    <Modal.Title>{ t( 'page.admin.addContact.title' ) }</Modal.Title>
                    <button className="btn " onClick={ handleClose }>
                        <span className="fa fa-times"></span>
                    </button>
                </Modal.Header>
                <Modal.Body className='has-custom-scroll'>
                    <form onSubmit={ handleSubmit( onSubmit ) }>
                    <div className="form-row">

<div className="col-lg-4 col-md-6">
    <div className="form-group">
        <label htmlFor="FirstName">{ t( 'page.admin.addContact.firstName' ) }<em>*</em></label>
        <input
            { ...register( "FirstName", { required: true } ) }
            className={ "form-control " + ( errors.FirstName ? "is-invalid" : '' ) }
            placeholder={ t( 'page.admin.addContact.firstName' ) }
            maxLength="40"
            tabIndex="3"
        />

        { errors.FirstName?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addContact.firstName' ), 'requiredWithFieldName' ) }</div> }

    </div>
</div>
<div className="col-lg-4 col-md-6">
    <div className="form-group">
        <label htmlFor="LastName">{ t( 'page.admin.addContact.LastName' ) }<em>*</em></label>
        <input
            type="text"
            { ...register( "LastName", { required: true } ) }
            className={ "form-control " + ( errors.LastName ? "is-invalid" : '' ) }
            placeholder={ t( 'page.admin.addContact.LastName' ) }
            maxLength="40"
            tabIndex="3"
        />

        { errors.LastName?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage(t( 'page.admin.addContact.LastName' ), 'requiredWithFieldName' ) }</div> }

    </div>
</div>

<div className="col-lg-4 col-md-12">
    <div className="form-group">
        <label htmlFor="Role">{ t( 'page.admin.addContact.Role' ) }<em>*</em></label>
        <input
            type="text"
            { ...register( "Role", { required: true } ) }
            className={ "form-control " + ( errors.Role ? "is-invalid" : '' ) }
            placeholder={ t( 'page.admin.addContact.Role' ) }
            maxLength="40"
            tabIndex="3"
        />

        { errors.Role?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addContact.Role' ), 'requiredWithFieldName' ) }</div> }

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
            { t( 'page.admin.addContact.DoNotContact' ) }
        </label>
        { errors.DoNotContact?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addContact.DoNotContact' ), 'requiredWithFieldName' ) }</div> }
    </div>
</div>


<div className="col-md-6">
    <div className="form-group">
        <label htmlFor="amount"> { t( 'page.admin.addContact.OfficialEmailAddress' ) }<em>*</em></label>
        <input
            { ...register( "OfficialEmailAddress", { required: true, pattern: getPattern( 'email' ) } ) }
            className={ "form-control " + ( errors.OfficialEmailAddress ? "is-invalid" : '' ) }
            placeholder={ t( 'page.admin.addContact.OfficialEmailAddress' ) }
            maxLength="50"
            tabIndex="1"

        />

        { errors.OfficialEmailAddress?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addContact.OfficialEmailAddress' ), 'requiredWithFieldName' ) }</div> }
        { errors.OfficialEmailAddress?.type === 'pattern' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addContact.OfficialEmailAddress' ), 'wrongFormat' ) }</div> }

    </div>
</div>

<div className="col-md-6">
    <div className="form-group">
        <label htmlFor="amount">{ t( 'page.admin.addContact.PersonalEmailAddress' ) }<em>*</em></label>
        <input
            { ...register( "PersonalEmailAddress", { required: true, pattern: getPattern( 'email' ) } ) }
            className={ "form-control " + ( errors.PersonalEmailAddress ? "is-invalid" : '' ) }
            placeholder={ t( 'page.admin.addContact.PersonalEmailAddress' ) }
            maxLength="50"
            tabIndex="1"

        />

        { errors.PersonalEmailAddress?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addContact.PersonalEmailAddress' ), 'requiredWithFieldName' ) }</div> }
        { errors.PersonalEmailAddress?.type === 'pattern' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addContact.PersonalEmailAddress' ), 'wrongFormat' ) }</div> }

    </div>
</div>



<div className="col-md-6">
    <div className="form-group">
        <label htmlFor="OfficialPhoneNumber">{ t( 'page.admin.addContact.OfficialPhoneNumber' ) }<em>*</em></label>
        <input
            { ...register( "OfficialPhoneNumber", { required: true } ) }
            className={ "form-control " + ( errors.OfficialPhoneNumber ? "is-invalid" : '' ) }
            placeholder={ t( 'page.admin.addContact.OfficialPhoneNumber' ) }
            maxLength="15"
            tabIndex="2"
        />

        { errors.OfficialPhoneNumber?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addContact.OfficialPhoneNumber' ), 'requiredWithFieldName' ) }</div> }

    </div>
</div>

<div className="col-md-6">
    <div className="form-group">
        <label htmlFor="PersonalPhoneNumber">{ t( 'page.admin.addContact.PersonalPhoneNumber' ) }<em>*</em></label>
        <input
            { ...register( "PersonalPhoneNumber", { required: true } ) }
            className={ "form-control " + ( errors.PersonalPhoneNumber ? "is-invalid" : '' ) }
            placeholder={ t( 'page.admin.addContact.PersonalPhoneNumber' ) }
            maxLength="15"
            tabIndex="2"
        />

        { errors.PersonalPhoneNumber?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addContact.PersonalPhoneNumber' ), 'requiredWithFieldName' ) }</div> }

    </div>
</div>

{/**/ }
<div className="col-md-6">
    <div className="form-group">
        <label className="control-label"> Preferred Language </label>
        <select className={ "form-control " + ( errors.PreferredLanguage ? "is-invalid" : '' ) }

            { ...register( "PreferredLanguage", { required: true } ) }
        >
            <option value="">Select</option>
            <option value="Bahasa Indonesia">Bahasa Indonesia</option>
            <option value="Indonesian">Indonesian</option>
            <option value="English">English</option>

        </select>

        { errors.PreferredLanguage?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( 'Preferred Language', 'requiredWithFieldName' ) }</div> }
    </div>
</div>
<div className="col-md-6">
    <div className="form-group">
        <label className="control-label">{ t( 'page.admin.addContact.ContactChannel' ) }</label>
        <select className={ "form-control " + ( errors.ContactChannel ? "is-invalid" : '' ) }

            { ...register( "ContactChannel", { required: true } ) }
        >
            <option value="">Select</option>
            <option value="Email">Email</option>
            <option value="Call">Call</option>


        </select>

        { errors.ContactChannel?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addContact.ContactChannel' ), 'requiredWithFieldName' ) }</div> }
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
            { t( 'page.admin.addContact.IsActive' ) }
        </label>
        { errors.IsActive?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addContact.IsActive' ), 'requiredWithFieldName' ) }</div> }
    </div>
</div>
<div className="col-md-12">
    <div className="form-group">
        <label htmlFor="Notes">{ t( 'page.admin.addContact.Notes' ) }<em>*</em></label>
        <textarea
            { ...register( "Notes", { required: true } ) }
            className={ "form-control " + ( errors.Notes ? "is-invalid" : '' ) }
            placeholder={ t( 'page.admin.addContact.Notes' ) }
            maxLength="500"
            rows="4"
            tabIndex="4"
        ></textarea>

        { errors.Notes?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addContact.Notes' ), 'requiredWithFieldName' ) }</div> }

    </div>
</div>
</div>
                        <Modal.Footer className='p-0'>

                            <button type="submit" className="btn btn-primary">
                            { t( 'page.admin.comman.add' ) }
                            </button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}