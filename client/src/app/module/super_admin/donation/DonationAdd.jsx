import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

import Modal from 'react-bootstrap/Modal';

import * as sweetalert from '@common/SweetAlert';

import { getMessage, getPattern } from '@common/MessageHelper';
import * as helper from '@common/CommonHelper';

import * as DonationService from '@service/DonationService';

import * as ContactService from '@service/ContactService';

import { useTranslation } from 'react-i18next';


export default function DonationAdd ( { AccountId, showModal, setShowModal, tableReload } )
{
    const { t } = useTranslation();


    // const [ show, setShow ] = useState( false );
    // const [ isChecked, setIsChecked ] = useState( false );
    // const [ donationType, setDonationType ] = useState( 'solicited' );
    const [ contactList, setContactList ] = useState( [] );

    // const { register, handleSubmit, formState: { errors } } = useForm();
    const { register, reset, handleSubmit, watch, formState: { errors }, setValue, trigger, getValues } = useForm();

    useEffect( () =>
    {
        if ( showModal )
        {
            getContactList();
        }

    }, [ showModal ] );





    const getContactList = () =>
    {
        helper.loader_show();
        ContactService.getAccountContacts( AccountId, ( responseData ) =>
        {
            helper.loader_hide();
            if ( responseData.length > 0 )
            {
                setContactList( responseData );
            }
            else
            {
                setContactList( [] );
            }
        } );
    }

    const handleClose = () => setShowModal( false );
    // const handleShow = () => setShowModal( true );
    // const handleCheckboxChange = () =>
    // {
    //     setIsChecked( !isChecked );
    // };
    // const handleRadioChange = ( event ) =>
    // {
    //     setDonationType( event.target.value );
    // };
    const onSubmit = ( data ) =>
    {
        console.log( "data123", data );
        let requestData = {
            AccountID: AccountId,
            ContactID: data.Contact,
            CampaignID: 1,
            Amount: data.Amount,
            Currency: data.Currency,
            DonationDate: data.DonationDate,
            DonationStatus: data.donationType,
            DonationSource: data.source,
            Designation: data.donationdesignation,
            Notes: data.donation_notes,
            InKind: data.InKind,
            PendingAmount: 0,
            AccountManagerID: 1,
            ExternalSystemID: data.ExternalSystemID,
            RecordCreatedBy: 1,

        }
        console.log( requestData );
        helper.loader_show();
        DonationService.addDonations( requestData, ( responseData ) =>
        {
            helper.loader_hide();

            console.log( 'responseData =>', responseData );

            if ( responseData && responseData.message )
            {
                handleClose();
                tableReload();
                sweetalert.regularAlert( 'success', responseData.message );
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
                    <Modal.Title>{ t( 'page.admin.comman.addDonationsButton' ) }</Modal.Title>
                    <button className="btn " onClick={ handleClose }>
                        <span className="fa fa-times"></span>
                    </button>
                </Modal.Header>
                <Modal.Body className='has-custom-scroll'>
                    <form onSubmit={ handleSubmit( onSubmit ) }>
                        <div className="form-row">

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">{ t( 'page.admin.addDonations.Campaign' ) }</label>
                                    <select className={ "form-control " + ( errors.Campaign ? "is-invalid" : '' ) }

                                        { ...register( "Campaign", { required: true } ) }
                                    >
                                        <option value="">Select</option>
                                        <option value="1">Bali Education Fundraiser</option>
                                        <option value="2">Sumatra Earthquake Relief</option>
                                    </select>

                                    { errors.Campaign?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( 'Campaign', 'requiredWithFieldName' ) }</div> }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Amount">{ t( 'page.admin.addDonations.Amount' ) }<em>*</em></label>
                                    <input
                                        { ...register( "Amount", { required: true, pattern: { value: /^[0-9]+$/, message: "Amount must be a number" } } ) }
                                        className={ "form-control " + ( errors.Amount ? "is-invalid" : '' ) }
                                        placeholder={ t( 'page.admin.addDonations.Amount' ) }
                                        maxLength="10"
                                        tabIndex="1"

                                    />

                                    { errors.Amount?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addDonations.Amount' ), 'requiredWithFieldName' ) }</div> }

                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>{ t( 'page.admin.addDonations.donationType' ) }</label>
                                    <div>
                                        <input
                                            type="radio"
                                            id="Solicited"
                                            { ...register( "donationType", { required: true } ) }
                                            value="Solicited"
                                            defaultChecked={ true }
                                        // checked={ donationType === 'Solicited' }
                                        // onChange={ handleRadioChange }
                                        />
                                        <label htmlFor="Solicited" className="ml-2">{ t( 'page.admin.addDonations.donationTypeDrop.Solicited' ) }</label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            id="Committed"
                                            { ...register( "donationType", { required: true } ) }
                                            value="Committed"
                                        // checked={ donationType === 'Committed' }
                                        // onChange={ handleRadioChange }
                                        />
                                        <label htmlFor="Committed" className="ml-2">{ t( 'page.admin.addDonations.donationTypeDrop.Committed' ) }</label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            id="Received"
                                            { ...register( "donationType", { required: true } ) }
                                            value="Received"
                                        // checked={ donationType === 'Received' }
                                        // onChange={ handleRadioChange }
                                        />
                                        <label htmlFor="Received" className="ml-2">{ t( 'page.admin.addDonations.donationTypeDrop.Received' ) }</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="control-label">{ t( 'page.admin.addDonations.DonationDate' ) }<em>*</em></label>
                                    <input type="date" { ...register( "DonationDate", { required: true } ) } className={ "form-control " + ( errors.DonationDate ? "is-invalid" : '' ) } />

                                    { errors.DonationDate?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addDonations.DonationDate' ), 'requiredWithFieldName' ) }</div> }

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="control-label">{ t( 'page.admin.addDonations.Currency' ) }</label>
                                    <select { ...register( "Currency", { required: true } ) } className={ "form-control " + ( errors.Currency ? "is-invalid" : '' ) }>
                                        <option value="">Select</option>
                                        <option value="IDR">IDR</option>
                                    </select>

                                    { errors.Currency?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addDonations.Currency' ), 'requiredWithFieldName' ) }</div> }

                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="donationdesignation">{ t( 'page.admin.addDonations.donationdesignation' ) }<em>*</em></label>
                                    <input
                                        { ...register( "donationdesignation", { required: true } ) }
                                        className={ "form-control " + ( errors.donationdesignation ? "is-invalid" : '' ) }
                                        placeholder={ t( 'page.admin.addDonations.donationdesignation' ) }
                                        maxLength="40"
                                        tabIndex="2"
                                    />

                                    { errors.donationdesignation?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addDonations.donationdesignation' ), 'requiredWithFieldName' ) }</div> }

                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="source">{ t( 'page.admin.addDonations.source' ) }<em>*</em></label>
                                    <input
                                        { ...register( "source", { required: true } ) }
                                        className={ "form-control " + ( errors.source ? "is-invalid" : '' ) }
                                        placeholder={ t( 'page.admin.addDonations.source' ) }
                                        maxLength="40"
                                        tabIndex="3"
                                    />

                                    { errors.source?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addDonations.source' ), 'requiredWithFieldName' ) }</div> }

                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="ExternalSystemID">{ t( 'page.admin.addDonations.ExternalSystemID' ) }<em>*</em></label>
                                    <input
                                        { ...register( "ExternalSystemID", { required: true } ) }
                                        className={ "form-control " + ( errors.ExternalSystemID ? "is-invalid" : '' ) }
                                        placeholder={ t( 'page.admin.addDonations.ExternalSystemID' ) }
                                        maxLength="40"
                                        tabIndex="3"
                                    />

                                    { errors.ExternalSystemID?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addDonations.ExternalSystemID' ), 'requiredWithFieldName' ) }</div> }

                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">{ t( 'page.admin.addDonations.Contact' ) }</label>
                                    <select { ...register( "Contact", { required: true } ) } className={ "form-control " + ( errors.Contacty ? "is-invalid" : '' ) }>
                                        <option value="">Select</option>
                                        { contactList.map( ( item, index ) => <option key={ index } value={ item.ContactID }>{ item.FirstName + " " + item.LastName }</option> ) }

                                    </select>

                                    { errors.Contact?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addDonations.Contact' ), 'requiredWithFieldName' ) }</div> }

                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group form-check">
                                    <input
                                        type="checkbox"
                                        { ...register( "InKind" ) }
                                        className={ "form-check-input " }
                                        id="InKind"
                                    // checked={ isChecked }
                                    // onChange={ handleCheckboxChange }
                                    />
                                    <label className="" htmlFor="InKind">
                                        { t( 'page.admin.addDonations.InKind' ) }
                                    </label>
                                    {/* {errors.InKind?.type == 'required' && <div className="invalid-feedback error-msg">{getMessage('Check Box', 'requiredWithFieldName')}</div>} */ }

                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="donation_notes">{ t( 'page.admin.addDonations.donation_notes' ) }<em>*</em></label>
                                    <textarea
                                        { ...register( "donation_notes", { required: true } ) }
                                        className={ "form-control " + ( errors.donation_notes ? "is-invalid" : '' ) }
                                        placeholder={ t( 'page.admin.addDonations.donation_notes' ) }
                                        maxLength="500"
                                        tabIndex="4"
                                        rows={ "4" }
                                    ></textarea>

                                    { errors.donation_notes?.type === 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.addDonations.donation_notes' ), 'requiredWithFieldName' ) }</div> }


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