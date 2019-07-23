import React                 from 'react';
import { connect, Provider } from 'react-redux';
import store                 from './store';
import configure             from './useSynchronisedStore';

configure(store);

const dispatchToProps = (dispatch) => ({
    incrementClick: () => dispatch({ type: 'increment_clicks' }),
});

const stateToProps = (state) => ({
    clickCount: state.clickCount,
});

const AppContent = connect(stateToProps, dispatchToProps)(({ clickCount, incrementClick }) => {
    return (
        <div>
            <div>
                Clicked { clickCount }
            </div>
            <button type='button' onClick={ () => incrementClick() }>
                Increment
            </button>
        </div>
    );
});

function App() {
    return (
        <Provider store={ store }>
            <AppContent />
        </Provider>
    );
}

export default App;
