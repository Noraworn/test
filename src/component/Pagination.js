import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number
}

const defaultProps = {
    initialPage: 1,
    pageSize: 4
}

class Pagination extends React.Component {
    constructor(props) {
        // console.log(props)
        super(props);
        this.state = { pager: {} };
    }

    componentWillMount() {
        // set page if items array isn't empty
        // console.log(this.props.items)
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        // console.log(page)
        var { items, pageSize } = this.props;
        var pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(items.length, page, pageSize);

        // get new page of items from items array
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({ pager: pager });

        // call change page function in parent component
        this.props.onChangePage(pageOfItems, page);
    }

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 12
        pageSize = pageSize || 12;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 12) {
            // less than 12 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 12 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 12;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        // console.log(this.state)
        var pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {/* <li className={pager.currentPage === 1 ? 'disabled' : ''} className="page-item">
                        <a className="page-link" onClick={() => this.setPage(1)}>First</a>
                    </li> */}

                    <li className={pager.currentPage === 1 ? 'disabled' : ''} className="page-item">
                        {/* <a className="page-link" onClick={() => this.setPage(pager.currentPage - 1)}> &#60;</a> */}
                        <a className="page-link" onClick={() => this.setPage(pager.currentPage - 1)}>Prev</a>
                    </li>

                    {pager.pages.map((page, index) =>
                        <li key={index} className={pager.currentPage === page ? 'active' : ''} className="page-item">
                            <a className="page-link" onClick={() => this.setPage(page)}>{page}</a>
                        </li>
                    )}

                    <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''} className="page-item">
                        {/* <a className="page-link" onClick={() => this.setPage(pager.currentPage + 1)}>&#62;</a> */}
                        <a className="page-link" onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                    </li>

                    {/* <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''} className="page-item">
                        <a className="page-link" onClick={() => this.setPage(pager.totalPages)}>Last</a>
                    </li> */}

                </ul>
            </nav>
        );
    }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;