import React from 'react';
import {
    EmailShareButton, 
    FacebookShareButton,
    WhatsappShareButton,
    VKShareButton,
    FacebookMessengerShareButton,

    FacebookIcon,
    WhatsappIcon,
    VKIcon,
    EmailIcon,
} from "react-share";

export default function ShareBar(props) {
    const id = props.id;

    return (
        <div id='share_bar'>
            <EmailShareButton
                className="network__share-button"
                url={`${window.location.origin}/${id}`}
                title={'Let\'s connect to my shopping pool!'}
            >
                <EmailIcon size={32} />
            </EmailShareButton>

            <WhatsappShareButton
                className="network__share-button"
                url={`${window.location.origin}/${id}`}
                title={'Let\'s connect to my shopping pool!'}
            >
                <WhatsappIcon size={32} />
            </WhatsappShareButton>

            <FacebookShareButton
                className="network__share-button"
                url={`${window.location.origin}/${id}`}
                title={'Let\'s connect to my shopping pool!'}
            >
                <FacebookIcon size={32} />
            </FacebookShareButton>

            <VKShareButton
                className="network__share-button"
                url={`${window.location.origin}/${id}`}
                title={'Let\'s connect to my shopping pool!'}
            >
                <VKIcon size={32} />
            </VKShareButton>

        </div>
    )
} 