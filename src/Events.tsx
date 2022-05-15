import React from 'react';
import {useWsSubscription} from "./WsSubscriptionProvider";

const Events = () => {
    const events = useWsSubscription();

    const texts = events.map((event) => {
        return (<p>{event}</p>);
    })

    return (<div style={{overflowWrap: 'break-word', maxWidth: "80%"}}>
        <h3># Events: {events?.length}</h3>
        {texts}
    </div>);
}

export default Events;
