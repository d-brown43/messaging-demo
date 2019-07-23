import { createStore } from 'redux';

const rootReducer = (previousState, action) => {
    switch (action.type) {
        case 'increment_clicks':
            return {
                ...previousState,
                clickCount: previousState.clickCount + 1,
            };
        case 'replace_state':
            return action.payload;
        default:
            return previousState;
    }
};

export default createStore(rootReducer, { clickCount: 0 });
