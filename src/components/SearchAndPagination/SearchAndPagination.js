import React, { useState } from 'react';
import './SearchAndPagination.css'
const SearchAndPagination = ({ onSearch, onPageChange, currentPage }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const handlePageChange = (newPage) => {
        onPageChange(newPage);
    };

    return (
        <div className={'sap'}>
            <form onSubmit={handleSearchSubmit}>
                <input type="text" value={searchTerm} onChange={handleSearchChange} />
                <button type="submit">Search</button>
            </form>

            <div>
                <div className="buttons">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Previous Page
                    </button>

                    <button onClick={() => handlePageChange(currentPage + 1)}>
                        Next Page
                    </button>
                </div>

                <span> Page {currentPage}</span>
            </div>
        </div>
    );
};

export default SearchAndPagination;