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

import { add_user_data } from '@redux/slices/UserData';
import StaticDataTableComponent from "@module/super_admin/common/datatable/StaticDataTableComponent";
import { useTranslation } from 'react-i18next';

export default function AccountList ()
{
    const [ AccountsData, setAccountsData ] = useState( [] );
    const { t } = useTranslation();

    useEffect( () =>
    {
        helper.setTitle( 'Account List' );
        getAccountList();
        // getDashboardInfo();
    }, [] )



    const getAccountList = () =>
    {
        AccountService.getAccounts( ( responseData ) =>
        {
            if ( responseData != undefined && responseData.length > 0 )
            {
                let responseResult = responseData;

                setAccountsData( responseResult );
            }
            else
            {
                setAccountsData( [] );
            }
        } );
    }



    let header = [
        {
            title: t( 'page.admin.account.organizationName' ),
            prop: "OrganizationName",
            isSortable: true,
        },
        {
            title: t( 'page.admin.account.accountType' ),
            prop: "AccountType",
            isSortable: true,
        },
        {
            title: t( 'page.admin.account.accountSize' ),
            prop: "AccountSize",
            isSortable: true,
        },
        {
            title: t( 'page.admin.account.givingPotential' ),
            prop: "GivingPotential",
            isSortable: true,
        },
        {
            title: t( 'page.admin.account.segment' ),
            prop: "Segment",
            isSortable: true,
        },
        {
            title: t( 'page.admin.account.accountLocation' ),
            prop: "AccountLocation",
            isSortable: true,
        },

        {
            title: t( 'page.admin.account.action' ),
            prop: "AccountID",
            isSortable: false,
            alignment: { horizontal: 'center' },
            cell: ( row ) => 
            {
                return (
                    <>
                        <Link title={ t( 'page.admin.account.edit' ) }
                            to={ "/admin/account/edit/" + row.AccountID } className="btn btn-sm btn-icon btn-outline-primary">
                            <i className='fa fa-pencil-alt'></i >
                            <span className="sr-only">{ t( 'page.admin.account.edit' ) }</span>
                        </Link >
                    </>
                )
            }
        }
    ];

    return (
        <>
            <main className="app-main">
                <div className="wrapper">
                    <div className="page">
                        <div className="page-inner">
                            <header className="page-title-bar">
                                <div className="d-flex justify-content-between">
                                    <p className="lead">
                                        <span className="font-weight-bolder">{ t( 'page.admin.account.title' ) }</span>
                                    </p>
                                    <NavLink to={ "/admin/account/add" } className="btn btn-outline-primary float-right">
                                        <span className="fa fa-plus mr-1"></span>
                                        { t( 'page.admin.comman.addButton' ) }
                                    </NavLink>
                                </div>
                            </header>
                            { AccountsData.length > 0 &&
                                <div className="page-section" >
                                    <div className="main-card mb-3 card card-fluid" >
                                        <div className="card-body table-responsive">
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
                                                staticData={ AccountsData }
                                            />

                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}