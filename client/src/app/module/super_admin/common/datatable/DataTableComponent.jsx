import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from "prop-types";

import
{
    DatatableWrapper,
    Filter,
    Pagination,
    PaginationOptions,
    TableBody,
    TableHeader,
    TableRow,
} from 'react-bs-datatable';

import { Table } from 'react-bootstrap';



// import { animateScrollTo } from '../../../../common/CommonHelper';

/*
* Function: MyDataTable
* Author: Ojash
* Description:  CustomeDatatable

*/
const DataTableComponent = React.forwardRef( ( Props, ref ) =>
{
    // console.log( Props );
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
    const [ openColumn, setOpenColumn ] = useState( null )






    let start = data.length > 0 ? ( ( currentPage - 1 ) * perPage ) : 0;
    let endIndex = totalRowsFilterd;
    let filterd = totalRowsFilterd;

    React.useImperativeHandle( ref, () => ( {
        reloadTable,
    } ) );

    const fetchResult = ( response ) =>
    {
        setIsLoader( false );
        if ( response.status )
        {
            setData( response.data.data );
            setTotalRows( response.data.recordsTotal );
            setTotalRowsFilterd( response.data.recordsFiltered );
        }
    }

    const reloadTable = () =>
    {
        setOpenColumn( null );
        console.log( 'table called' );
        //     scrollTop: "0",
        //     duration: 1000
        // } );

        setIsLoader( true );
        if ( Props?.advancefilter != undefined )
        {
            Props.fetchList( start, perPage, sort, sortDirection, filter, Props?.advancefilter, fetchResult );
            // Props.fetchList( sort, sortDirection, currentPage, perPage, encodeURI( filter ), Props?.advancefilter, fetchResult );

        }
        else
        {
            Props.fetchList( start, perPage, sort, sortDirection, filter, '', fetchResult );
            // Props.fetchList( sort, sortDirection, currentPage, perPage, encodeURI( filter ), fetchResult );
        }

    };
    // console.log( sort,
    //     currentPage,
    //     perPage,
    //     sortDirection,
    //     filter,
    //     Props?.advancefilter,
    //     Props?.bykey );
    useMemo( () => reloadTable(), [
        sort,
        currentPage,
        perPage,
        sortDirection,
        filter,
        Props?.advancefilter,
        Props?.bykey
        // Props.header,
    ] )



    // useEffect( () =>
    // {
    //     var getData = setTimeout( () =>
    //     {
    //         reloadTable()
    //         // if ( filter.length > 3 || filter.length == 0 )
    //         // {
    //         // }
    //     }, 800 )

    //     return () => clearTimeout( getData )
    // }, [ filter ] )


    const handleFilterChange = search =>
    {
        setCurrentPage( 1 );
        setFilter( search );
    };
    const handleSort = ( sortOrder, column ) =>
    {
        setSort( column );
        setSortDirection( sortOrder );
    };
    const handlePageChange = page =>
    {

        setCurrentPage( page );
    };
    const handlePerRowsChange = ( newPerPage, page ) =>
    {
        setCurrentPage( 1 );
        setPerPage( newPerPage );
    };


    return (
        <>
            <div className="section-block custom-datatable-component" style={ { position: 'relative' } }>
                <div className={ 'table_loader ' + ( isLoader ? 'show' : '' ) }
                >
                    <div className="tblLoader"></div>
                </div>
                <DatatableWrapper
                    body={ data }

                    headers={ Props.header }
                    paginationOptionsProps={ {
                        initialState: {
                            rowsPerPage: perPage,
                            options: perPageRows

                        }
                    } }

                >
                    <div className="row w-100 align-items-center">

                        { Props?.isPerPage != false &&
                            <div className="col-xl-10 col-md-7 d-flex flex-col justify-content-start align-items-center mb-2">
                                <PaginationOptions

                                    classes={ {
                                        formControl: "form-control",
                                        formGroup: "form-group",
                                        formText: "mb-1"
                                    } }
                                    controlledProps={ {
                                        filteredDataLength: 0,
                                        onRowsPerPageChange: ( e ) => { handlePerRowsChange( e, currentPage ) },
                                        rowsPerPage: perPage,
                                        rowsPerPageOptions: perPageRows


                                    } }
                                />
                            </div>

                        }
                        { Props?.isSearch != false && <div className="col-xl-2 col-md-5 d-flex ">
                            <Filter
                                classes={ {
                                    inputGroup: 'form-group float-right cust-search' + ( Props?.classList?.searchInput != undefined ? Props?.classList?.searchInput : "" ),
                                    clearButton: 'd-none ' + ( Props?.classList?.searchClearClass != undefined ? Props?.classList?.searchClearClass : "" )
                                } }
                                placeholder={ Props?.searchText != undefined ? Props?.searchText : 'Search  ' }
                                controlledProps={ {
                                    filter: filter,
                                    onFilterChange: ( e ) => { handleFilterChange( e ) }
                                } }
                            />
                        </div> }
                    </div>
                    <div className="table-responsive">
                        <Table className={ ( Props?.classList?.table || "row-border  hover table  nowrap w-100" ) }>
                            <TableHeader
                                controlledProps={ {
                                    filteredDataLength: 0,

                                    onSortChange: ( e ) =>
                                    {
                                        console.log( e );
                                        handleSort( e.order, e.prop )
                                    },
                                    sortState: {
                                        order: sortDirection,
                                        prop: sort
                                    }
                                } }
                            />
                            { Props?.subdata == undefined && <TableBody
                                rowProps={ ( row ) =>
                                {
                                    if ( row?.className != undefined )
                                    {

                                        return ( {
                                            className: row?.className
                                        } )
                                    }
                                } } /> }
                            { Props.subdata &&
                                <TableBody>

                                    {
                                        data.length > 0 ?
                                            data.map( ( row, rowIdx ) => (
                                                row.isLoading ? (
                                                    <tr key={ rowIdx }><td colSpan={ Props.headers.length }>Loading...</td></tr>
                                                ) : (
                                                    <React.Fragment key={ rowIdx }>
                                                        <TableRow
                                                            classes={ { tr: 'header-level' } }
                                                            onRowClick={ ( row ) =>
                                                            {
                                                                if ( rowIdx == openColumn )
                                                                {
                                                                    setOpenColumn( null );

                                                                }
                                                                else
                                                                {
                                                                    setOpenColumn( rowIdx );
                                                                }
                                                                // Props?.onRowClick( row )
                                                            } }
                                                            rowData={ row }
                                                            rowIdx={ rowIdx } />
                                                        { openColumn == rowIdx &&
                                                            <tr className="sub-level tbody-tr">
                                                                <td colSpan={ 5 } className="p-0">
                                                                    { Props?.SubElement( row ) }
                                                                    {/* <div className="table-toggle ">

                                                                </div> */}
                                                                </td>
                                                            </tr> }

                                                    </React.Fragment>
                                                )
                                            ) )
                                            :
                                            // colSpan={ Props?.headers.length }
                                            <tr ><td >No Data Found</td></tr>


                                    }
                                </TableBody> }
                        </Table>
                    </div>
                    <div className="table-pagination">
                        <div className="row">
                            <div className={ Props?.classList?.counter || "col-lg-8 col-12" }>
                                <div className="form-group">
                                    <label className='font-sm'>Showing { start } to { endIndex } of { filterd } entries</label>
                                </div>
                            </div>
                            <div className={ Props?.classList?.pagination || "col-lg-4 col-12 d-flex flex-col justify-content-center justify-content-md-end align-items-end" }>
                                <Pagination
                                    classes={ {} }
                                    controlledProps={ {
                                        currentPage: currentPage,
                                        maxPage: Math.ceil( totalRowsFilterd / perPage ),
                                        onPaginationChange: ( e ) => { handlePageChange( e ) }
                                    } }
                                />
                            </div>
                        </div>

                    </div>
                </DatatableWrapper>

            </div >

        </>
    )
} );


DataTableComponent.propTypes = {
    header: PropTypes.array.isRequired,
    fetchList: PropTypes.func.isRequired,
    classList: PropTypes.object.isRequired,
    tableClass: PropTypes.string,
    perPageRows: PropTypes.array,
    perPage: PropTypes.any,
    sort: PropTypes.string,
    searchEnable: PropTypes.bool,
    sortDirection: PropTypes.string
};



export default DataTableComponent;
