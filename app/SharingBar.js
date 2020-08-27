import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { uuidGenerate } from './store/userReducer';
import { v4 as uuidv4 } from 'uuid';
import {
    FacebookShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    FacebookMessengerShareButton,

    FacebookMessengerIcon,
    FacebookIcon,
    WhatsappIcon,
    TelegramIcon,
} from "react-share";
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ShareBar(props) {
    const [open, setOpen] = useState(false);
    const [uuidState, setUuid] = useState('');
    const dispatch = useDispatch();
    const id = props.id;

    function onClickUuidCreator(event) {
        event.preventDefault();
        const uuid = uuidv4();
        setOpen(!open);
        setUuid(uuid);
        const uuidObj = {
            uuid: uuid,
            poolId: id
        }
        dispatch(uuidGenerate(uuidObj));
    }

    return (
        <>
            <Container>
                <Button
                    onClick={onClickUuidCreator}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    className="float-right"
                >
                    share pool
                    </Button>
                <Collapse in={open}>
                    <div id="example-collapse-text" className="float-right">
                        <Container>
                            <Row>
                                <Col>

                                    <FacebookMessengerShareButton
                                        className="network__share-button"
                                        url={`${window.location.origin}/${uuidState}`}
                                        title={'Let\'s connect to my shopping pool!'}
                                    >
                                        <FacebookMessengerIcon size={32} />
                                    </FacebookMessengerShareButton>
                                </Col>
                                <Col>
                                    <WhatsappShareButton
                                        className="network__share-button"
                                        url={`${window.location.origin}/${uuidState}`}
                                        title={'Let\'s connect to my shopping pool!'}
                                    >
                                        <WhatsappIcon size={32} />
                                    </WhatsappShareButton>
                                </Col>
                                <Col>
                                    <FacebookShareButton
                                        className="network__share-button"
                                        url={`${window.location.origin}/${uuidState}`}
                                        title={'Let\'s connect to my shopping pool!'}
                                    >
                                        <FacebookIcon size={32} />
                                    </FacebookShareButton>
                                </Col>
                                <Col>
                                    <TelegramShareButton
                                        className="network__share-button"
                                        url={`${window.location.origin}/${uuidState}`}
                                        title={'Let\'s connect to my shopping pool!'}
                                    >
                                        <TelegramIcon size={32} />
                                    </TelegramShareButton>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Collapse>
            </Container>
        </>
    )
} 