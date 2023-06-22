import React from 'react';

import './Pagination.css';

const Pagination = ({ totalPosts, postsPerPages, setCurrentPages, currentPages }) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPages); i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            {pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentPages(page)}
                        className={page === currentPages ? 'active' : ''}
                    >
                        {page}
                    </button>
                );
            })}
        </div>
    );
};

export default Pagination;
