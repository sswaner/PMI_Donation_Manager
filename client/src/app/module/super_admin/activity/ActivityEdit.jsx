import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Modal from 'react-bootstrap/Modal';
import * as sweetalert from '@common/SweetAlert';
import { getMessage, getPattern } from '@common/MessageHelper';

import * as helper from '@common/CommonHelper';

import * as ContactService from '@service/ContactService';
import * as ActivityService from '@service/ActivityService';
import { useTranslation } from 'react-i18next';

export default function ActivityEdit ( { ActivityId, AccountId, showModal, setShowModal, tableReload } )
{

    const { t } = useTranslation();

    const { register: register1, reset: reset1, handleSubmit: handleSubmit1, formState: { errors: errors1 }, setValue: setValue1, trigger: trigger1, getValues: getValues1, watch: watch1 } = useForm();
    const [ ActivityData, setActivityData ] = useState( [] );

    const [ ContactData, setContactData ] = useState( [] );




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
                setContactData( responseData );
                getActivityDetails();
            }
            else
            {
                setContactData( [] );
            }
        } );
    }

    const getActivityDetails = () =>
    {
        helper.loader_show();
        ActivityService.getActivityDetails( ActivityId, ( responseData ) =>
        {
            helper.loader_hide();
            // reset1();
            console.log( responseData );
            if ( responseData[ 'AccountID' ] != '' )
            {
                setActivityData( responseData );
                setValue1( 'ActivityType', responseData.ActivityType );
                setValue1( 'Contact', responseData.ContactID );
                setValue1( 'CampainID', responseData.CampainID );
                setValue1( 'Description', responseData.Description );
            }
            else
            {
                setActivityData( [] );
            }
        } );
    }
    const handleClose = () => setShowModal( false );


    const onSubmitActivity = data =>
    {
        let requestData = {
            AccountID: AccountId,
            ContactID: data.Contact,
            ActivityType: data.ActivityType,
            ActivityDate: helper.formatDate( new Date(), '2' ),
            CreatedBy: 1,
            Description: data.Description,
            CampainID: data.CampainID
        }


        helper.loader_show();
        ActivityService.editActivity( ActivityId, requestData, ( responseData ) =>
        {
            helper.loader_hide();

            if ( responseData != '' && responseData != undefined )
            {
                setShowModal( false );
                reset1();
                sweetalert.regularAlert( 'success', responseData.message );
                tableReload();
            }
            else
            {
                sweetalert.regularAlert( 'error', responseData.message );
            }
        } );
    }



    return (
        <>

            <Modal show={ showModal } onHide={ handleClose }
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                    <Modal.Title>{ t( 'page.admin.editAccount.activityEditTitle' ) }</Modal.Title>
                    <button className="btn" onClick={ handleClose }>
                        <span className="fa fa-times"></span>
                    </button>
                </Modal.Header>
                <Modal.Body className='has-custom-scroll'>
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