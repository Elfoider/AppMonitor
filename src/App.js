import React, {useEffect, useState} from 'react';
import Main from '@modules/main/Main';
import Login from '@modules/login/Login';
import {useWindowSize} from '@app/hooks/useWindowSize';
import {calculateWindowSize} from '@app/utils/helpers';
import {useDispatch, useSelector} from 'react-redux';
import {setWindowSize} from '@app/store/reducers/ui';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import app from '@app/utils/Firebase';

import './App.scss';

const auth = getAuth(app);

const App = () => {
    const [User, setUser] = useState(null);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(true);
        } else {
            setUser(false);
        }
    });
    const windowSize = useWindowSize();
    const screenSize = useSelector((state) => state.ui.screenSize);
    const dispatch = useDispatch();

    useEffect(() => {
        const size = calculateWindowSize(windowSize.width);
        if (screenSize !== size) {
            dispatch(setWindowSize(size));
        }
    }, [windowSize]);

    return User ? <Main /> : <Login />;
};

export default App;
