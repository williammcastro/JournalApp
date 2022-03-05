import React from 'react'

export const JournalEntry = (value) => {
    // console.log(value)
    return (
        <div className='journal__entry pointer'>

            <div key={value}
                className='journal__entry-picture'
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://addons-media.operacdn.com/media/CACHE/images/themes/05/144705/1.0-rev1/images/0993404e-79e0-4052-923d-89236e7c102f/ce42ef837a89c852c000eafd63cd0763.jpg)'

                }}
            ></div>

            <div className='journal__entry-body'>
                <p className='journal__entry-title'>
                    Un nuevo dia
                </p>
                <p className='journal__entry-content'>
                    Loren impsum asdfa asdlfk adsfl kq ewroiqlkjgs slkjh sdfg sflkjh 
                </p>

            </div>

            <div className='journal__entry-date-box'>
                <span>Monday</span>
                <h4>28</h4>
            </div>
        </div>
    )
}
