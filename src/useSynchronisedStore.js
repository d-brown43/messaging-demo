import BroadcastChannel from 'broadcast-channel';

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const tabId = uuidv4();

const channel = new BroadcastChannel('demo');

export default (store) => {
    let isUpdatingFromMessages = false;

    store.subscribe(() => {
        const state = store.getState();
        if (!isUpdatingFromMessages) {
            channel.postMessage(JSON.stringify({
                newState: state,
            }));
        }
    });

    channel.addEventListener('message', (message) => {
        const parsed = JSON.parse(message);
        if (parsed.type === 'request-initial' && parsed.tabId !== tabId) {
            channel.postMessage(JSON.stringify({
                tabId,
                newState: store.getState(),
            }));
        } else {
            isUpdatingFromMessages = true;
            store.dispatch({
                type: 'replace_state',
                payload: parsed.newState,
            });
            isUpdatingFromMessages = false;
        }
    });

    channel.postMessage(JSON.stringify({
        type: 'request-initial',
        tabId,
    }));
};
