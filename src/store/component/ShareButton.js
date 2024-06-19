import React from 'react';

const ShareButton = ({ title, url }) => {
    const handleShare = async () => {
        try {
            await navigator.share({ title: title, url: url });
        } catch (error) {
            console.error('Error sharing content', error);
        }
    };

    return (
        <>
            <button
                className='bg-gray-300 py-3 px-5 rounded-full dark:bg-slate-400-800'
                onClick={handleShare}
            >
                Share
                <i className='pi-share-alt pi ms-2'></i>
            </button>
        </>
    );
};

export default ShareButton;