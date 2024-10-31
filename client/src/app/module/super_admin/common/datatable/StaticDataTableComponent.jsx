import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";

import
{
    DatatableWrapper,
    Filter,
    Pagination,
    PaginationOptions,
    TableBody,
    TableHeader,
    useDatatableWrapper,
} from 'react-bs-datatable';

import { Table } from 'react-bootstrap';



function TableFilteredMessage ()
{
    const { currentPageState, rowsPerPageState, filteredDataLength, onPaginationChange } = useDatatableWrapper();

    let start = filteredDataLength > 0 ? ( ( currentPageState - 1 ) * rowsPerPageState + 1 ) : 0;
    let endIndex = Math.min( currentPageState * rowsPerPageState, filteredDataLength );
    let filterd = filteredDataLength;
    return <>Showing { start } to { endIndex } of { filterd } entries</>;
}

/*
* Function: MyDataTable
* Author: Ojash
* Description:  CustomeDatatable

*/
const StaticDataTableComponent = React.forwardRef( ( Props, ref ) =>
{
    const [ data, setData ] = useState( [] );
    const [ totalRows, setTotalRows ] = useState( 0 );
    const [ totalRowsFilterd, setTotalRowsFilterd ] = useState( 0 );
    const [ perPage, setPerPage ] = useState( Props?.perPage || 25 );
    const [ perPageRows, setPerPageRows ] = useState( Props?.perPageRows || [ 5, 10, 20, 25 ] );
    const [ currentPage, setCurrentPage ] = useState( 1 );
    const [ sortDirection, setSortDirection ] = useState( Props?.sortDirection || 'desc' );
    const [ sort, setSort ] = useState( Props?.sort || 'created_at' );
    const [ filter, setFilter ] = useState( '' );
    const [ isLoader, setIsLoader ] = useState( false );

    useEffect( () =>
    {
        console.log( Props?.staticData )
        if ( Props?.staticData == undefined )
        {
            reloadTable()
        }
        else
        {
            setData( Props?.staticData )
            setTotalRows( Props?.staticData.length );
            setTotalRowsFilterd( Props?.staticData.length );
        }
    }, [ Props?.staticData ] )

    React.useImperativeHandle( ref, () => ( {
        reloadTable,
    } ) );


    // useEffect( () =>
    // {
    //     if ( Props?.staticData == undefined )
    //     {
    //         reloadTable()
    //     }
    //     else
    //     {
    //         setData( Props?.staticData )
    //         setTotalRows( Props?.staticData.length );
    //         setTotalRowsFilterd( Props?.staticData.length );
    //     }
    // }, [ Props?.staticData ] )


    const fetchResult = ( response ) =>
    {
        setIsLoader( false );
        if ( response.responseCode == 980000 )
        {
            if ( Props?.filterFunction != undefined )
            {
                let resultArray = response.results.filter( Props.filterFunction );
                setData( resultArray );

            }
            else
            {
                setData( response.results );
            }
            setTotalRows( response.totalPages );
            setTotalRowsFilterd( response.totalSize );
        }
    }

    const reloadTable = () =>
    {
        setIsLoader( true );
        Props.fetchList( ...Props.fetchListParams, fetchResult );
    };
    return (
        <>
            <div className="section-block custom-datatable-component static-datatable-component" style={ { position: 'relative' } }>
                <div className={ 'table_loader ' + ( isLoader ? 'show' : '' ) }
                >
                    <div className="tblLoader"></div>
                </div>
                <DatatableWrapper
                    body={ data }
                    headers={ Props.header }
                    sortProps={ {
                        initialState: {
                            order: sortDirection,
                            prop: sort
                        }
                    } }
                    paginationOptionsProps={ {
                        initialState: {
                            rowsPerPage: perPage,
                            options: perPageRows

                        }
                    } }
                >
                    { Props?.isPerPage != false &&
                        <div className="row w-100 align-items-center">
                            <div className="col-xl-10 col-md-7 d-flex flex-col justify-content-start align-items-center mb-2">
                                <PaginationOptions classes={ { formControl: "form-control" } } />
                            </div>
                            { Props?.isSearch != false && <div className="col-xl-2 col-md-5 d-flex">
                                <Filter

                                    classes={ {
                                        inputGroup: 'form-group float-right cust-search  ' + ( Props?.classList?.searchInput != undefined ? Props?.classList?.searchInput : "" ),
                                        clearButton: ( Props?.classList?.searchClearClass != undefined ? Props?.classList?.searchClearClass : "" )
                                    } }
                                    placeholder={ Props?.searchText != undefined ? Props?.searchText : 'Search  ' }

                                />
                            </div> }
                        </div> }
                    <div className="table-responsive">
                        <Table className={ "table-striped " + ( Props?.classList?.table || "row-border  hover table  nowrap w-100" ) }>
                            <TableHeader />

                            <TableBody
                                rowProps={ ( row ) =>
                                {
                                    if ( row?.className != undefined )
                                    {

                                        return ( {
                                            className: row?.className
                                        } )

                                    }

                                } } />
                        </Table>
                    </div>
                    { Props?.removePagination == undefined && <div className="table-pagination">
                        <div className="row">
                            <div className="col-lg-8 col-12">
                                <div className="form-group">
                                    <label className='font-sm'><TableFilteredMessage /></label>
                                </div>
                            </div>
                            { data.length > 0 && <div className="col-lg-12 col-12 d-flex flex-col justify-content-center justify-content-md-end align-items-end">
                                <Pagination paginationRange={ 3 }
                                />
                            </div> }
                        </div>

                    </div> }
                </DatatableWrapper >

            </div >

        </>
    )
} );


StaticDataTableComponent.propTypes = {
    header: PropTypes.array.isRequired,
    classList: PropTypes.object.isRequired,
    tableClass: PropTypes.string,
    perPageRows: PropTypes.array,
    perPage: PropTypes.any,
    sort: PropTypes.string,
    searchEnable: PropTypes.bool,
    sortDirection: PropTypes.string
};



export default StaticDataTableComponent;
