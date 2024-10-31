import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useParams } from "react-router-dom";

import * as sweetalert from '@common/SweetAlert';

import { getMessage } from '@common/MessageHelper';
import * as helper from '@common/CommonHelper';

import * as DonationService from '@service/DonationService';
import * as ContactService from '@service/ContactService';
import { useTranslation } from 'react-i18next';


export default function DonationEdit ( { DonationId, AccountId, showModal, setShowModal, tableReload } )
{
    const { t } = useTranslation();

    // const { rid } = useParams();

    // const [AccountId, setAccountId] = useState(null);
    // const [ show, setShow ] = useState( false );
    // const [ isChecked, setIsChecked ] = useState( false );

    // const [ donationType, setDonationType ] = useState( [] );
    const [ contactList, setContactList ] = useState( [] );

    const { register, reset, handleSubmit, watch, formState: { errors }, setValue } = useForm();

    useEffect( () =>
    {
        if ( showModal )
        {

            getContactList();
        }

    }, [ showModal ] );

    const handleClose = () => setShowModal( false );
    // const handleShow = () => setShowModal( true );

    const getDonationData = () =>
    {
        DonationService.getDonationsById( DonationId, ( responseData ) =>
        {
            console.log( "response => ", responseData );
            if ( responseData )
            {
                // setAccountId( responseData.AccountID );
                setValue( 'doneraccount', responseData.doneraccount );
                setValue( 'Campaign', responseData.CampaignID );
                setValue( 'Amount', responseData.Amount );
                setValue( 'donationType', responseData.DonationStatus );

                const formattedDate = helper.formatDate( responseData.DonationDate );
                setValue( 'DonationDate', formattedDate );
                setValue( 'Currency', responseData.Currency );
                setValue( 'donationdesignation', responseData.Designation );
                setValue( 'source', responseData.DonationSource );
                setValue( 'ExternalSystemID', responseData.ExternalSystemID );
                setValue( 'Contact', responseData.ContactID );
                setValue( 'InKind', responseData.InKind );
                setValue( 'donation_notes', responseData.Notes );
                setDonationType( responseData.DonationStatus );
            }
        } );
    }

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
            getDonationData();
            // getDonationData();

        } );
    }


    // const handleRadioChange = ( event ) =>
    // {
    //     setDonationType( event.target.value );
    // };

    const onSubmit = ( data ) =>
    {
        console.log( data );
        let requestData = {

            AccountID: AccountId,
            ContactID: data.Contact,
            CampaignID: data.Campaign,
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
            RecordLastModifiedBy: 1,
        }

        console.log( requestData );
        helper.loader_show();

        DonationService.editDonations( DonationId, requestData, ( responseData ) =>
        {

            helper.loader_hide();

            console.log( 'responseData =>', responseData );

            if ( responseData && responseData.message )
            {
                reset();

                handleClose();
                sweetalert.regularAlert( 'success', responseData.message );
                tableReload();
            } else
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
                    <Modal.Title>{ t( 'page.admin.editDonations.editDonation' ) }</Modal.Title>
                    <button className="btn " onClick={ handleClose }>
                        <span className="fa fa-times"></span>
                    </button>
                </Modal.Header>
                <Modal.Body className='has-custom-scroll'>
                    <form onSubmit={ handleSubmit( onSubmit ) }>
                        <div className="form-row">

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label> { t( 'page.admin.editDonations.Campaign' ) }<em>*</em></label>
                                    <select className={ "form-control " + ( errors.Campaign ? "is-invalid" : '' ) }

                                        { ...register( "Campaign", { required: true } ) }
                                    >
                                        <option value="">Select</option>
                                        <option value="1">Bali Education Fundraiser</option>
                                        <option value="2">Sumatra Earthquake Relief</option>
                                    </select>

                                    { errors.Campaign?.type == 'required' && <div className="invalid-feedback error-msg">{ getMessage( 'Select', 'requiredWithFieldName' ) }</div> }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Amount">{ t( 'page.admin.editDonations.Amount' ) }<em>*</em></label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        { ...register( "Amount", {
                                            required: true,
                                            pattern: {
                                                value: /^\d+(\.\d{1,2})?$/,
                                                message: "Amount must be a valid number with up to two decimal places"
                                            }
                                        } ) }
                                        className={ "form-control " + ( errors.Amount ? "is-invalid" : '' ) }
                                        placeholder={ t( 'page.admin.editDonations.Amount' ) }
                                        maxLength="10"
                                        tabIndex="1"
                                    />
                                    { errors.Amount?.type == 'required' &&
                                        <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editDonations.Amount' ), 'requiredWithFieldName' ) }</div> }
                                    { errors.Amount?.type == 'pattern' &&
                                        <div className="invalid-feedback error-msg">{ errors.Amount.message }</div> } {/* Display pattern error */ }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>{ t( 'page.admin.editDonations.donationType' ) }</label>
                                    <div>
                                        <input
                                            type="radio"
                                            id="Solicited"
                                            { ...register( "donationType", { required: true } ) }
                                            value="Solicited"
                                        // checked={ donationType == 'Solicited' }
                                        // onChange={ handleRadioChange }
                                        />
                                        <label htmlFor="Solicited" className="ml-2">{ t( 'page.admin.editDonations.donationTypeDrop.Solicited' ) }</label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            id="Committed"
                                            { ...register( "donationType", { required: true } ) }
                                            value="Committed"
                                        // checked={ donationType == 'Committed' }
                                        // onChange={ handleRadioChange }
                                        />
                                        <label htmlFor="Committed" className="ml-2">{ t( 'page.admin.editDonations.donationTypeDrop.Committed' ) }</label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            id="Received"
                                            { ...register( "donationType", { required: true } ) }
                                            value="Received"
                                        // checked={ donationType == 'Received' }
                                        // onChange={ handleRadioChange }
                                        />
                                        <label htmlFor="Received" className="ml-2">{ t( 'page.admin.editDonations.donationTypeDrop.Received' ) }</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="control-label">{ t( 'page.admin.editDonations.DonationDate' ) }<em>*</em></label>
                                    <input type="date" { ...register( "DonationDate", { required: true } ) } className={ "form-control " + ( errors.DonationDate ? "is-invalid" : '' ) } />

                                    { errors.DonationDate?.type == 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editDonations.DonationDate' ), 'requiredWithFieldName' ) }</div> }

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="control-label">{ t( 'page.admin.editDonations.Currency' ) }<em>*</em></label>
                                    <select { ...register( "Currency", { required: true } ) } className={ "form-control " + ( errors.Currency ? "is-invalid" : '' ) }>
                                        <option value="">{ t( 'page.admin.editDonations.CurrencyDrop.Select' ) }</option>
                                        <option value="IDR">{ t( 'page.admin.editDonations.CurrencyDrop.IDR' ) }</option>
                                    </select>

                                    { errors.Currency?.type == 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editDonations.Currency' ), 'requiredWithFieldName' ) }</div> }

                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="donationdesignation">{ t( 'page.admin.editDonations.donationdesignation' ) }<em>*</em></label>
                                    <input
                                        { ...register( "donationdesignation", { required: true } ) }
                                        className={ "form-control " + ( errors.donationdesignation ? "is-invalid" : '' ) }
                                        placeholder={ t( 'page.admin.editDonations.donationdesignation' ) }
                                        maxLength="40"
                                        tabIndex="2"
                                    />

                                    { errors.donationdesignation?.type == 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editDonations.donationdesignation' ), 'requiredWithFieldName' ) }</div> }

                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="source">{ t( 'page.admin.editDonations.source' ) }<em>*</em></label>
                                    <input
                                        { ...register( "source", { required: true } ) }
                                        className={ "form-control " + ( errors.source ? "is-invalid" : '' ) }
                                        placeholder={ t( 'page.admin.editDonations.source' ) }
                                        maxLength="40"
                                        tabIndex="3"
                                    />

                                    { errors.source?.type == 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editDonations.source' ), 'requiredWithFieldName' ) }</div> }

                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="ExternalSystemID">{ t( 'page.admin.editDonations.ExternalSystemID' ) }<em>*</em></label>
                                    <input
                                        { ...register( "ExternalSystemID", { required: true } ) }
                                        className={ "form-control " + ( errors.ExternalSystemID ? "is-invalid" : '' ) }
                                        placeholder={ t( 'page.admin.editDonations.ExternalSystemID' ) }
                                        maxLength="40"
                                        tabIndex="3"
                                    />

                                    { errors.ExternalSystemID?.type == 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editDonations.ExternalSystemID' ), 'requiredWithFieldName' ) }</div> }

                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">{ t( 'page.admin.editDonations.Contact' ) }<em>*</em></label>
                                    <select
                                        { ...register( "Contact", { required: true } ) }
                                        className={ "form-control " + ( errors.Contact ? "is-invalid" : '' ) }>
                                        <option value="">{ t( 'page.admin.editDonations.ContactDrop.Select' ) }</option>
                                        { contactList.map( ( item ) => <option value={ item.ContactID }>{ item.FirstName + " " + item.LastName }</option> ) }

                                    </select>

                                    { errors.Contact?.type == 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editDonations.Contact' ), 'requiredWithFieldName' ) }</div> }

                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group form-check">
                                    <input
                                        type="checkbox"
                                        className={ "form-check-input " }
                                        id="InKind"
                                        { ...register( "InKind", {} ) }
                                    // checked={ isChecked }
                                    // onChange={ handleCheckboxChange }
                                    />
                                    <label className="" htmlFor="InKind">
                                        { t( 'page.admin.editDonations.InKind' ) }
                                    </label>
                                    {/* {errors.InKind?.type == 'required' && <div className="invalid-feedback error-msg">{getMessage('Check Box', 'requiredWithFieldName')}</div>} */ }

                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="donation_notes">{ t( 'page.admin.editDonations.donation_notes' ) }<em>*</em></label>
                                    <textarea
                                        { ...register( "donation_notes", { required: true } ) }
                                        className={ "form-control " + ( errors.donation_notes ? "is-invalid" : '' ) }
                                        placeholder={ t( 'page.admin.editDonations.donation_notes' ) }
                                        maxLength="500"
                                        tabIndex="4"
                                        rows={ "4" }
                                    ></textarea>

                                    { errors.donation_notes?.type == 'required' && <div className="invalid-feedback error-msg">{ getMessage( t( 'page.admin.editDonations.donation_notes' ), 'requiredWithFieldName' ) }</div> }

                                </div>
                            </div>


                        </div>
                        <Modal.Footer className='p-0'>

                            <button type="submit" className="btn btn-primary">
                                <span className=" "></span> { t( 'page.admin.comman.updateButton' ) }
                            </button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}