import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {DateTime} from 'luxon';
import {getAuth, signOut} from 'firebase/auth';
import {Dropdown} from '@components';
import app from '../../../../utils/Firebase';

const auth = getAuth(app);

const UserDropdown = () => {
    const history = useHistory();
    const user = useSelector((state) => state.auth.currentUser);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const logOut = (event) => {
        event.preventDefault();
        setDropdownOpen(false);
        signOut(auth);
        history.push('/login');
    };

    const navigateToProfile = (event) => {
        event.preventDefault();
        setDropdownOpen(false);
        history.push('/profile');
    };

    return (
        <Dropdown
            isOpen={dropdownOpen}
            onChange={(open) => setDropdownOpen(open)}
            className="user-menu"
            menuContainerTag="ul"
            buttonTemplate={
                <img
                    src={user.picture || '/img/default-profile.png'}
                    className="user-image img-circle elevation-2"
                    alt="User"
                />
            }
            menuTemplate={
                <>
                    <li className="user-header bg-primary">
                        <img
                            src={user.picture || '/img/default-profile.png'}
                            className="img-circle elevation-2"
                            alt="User"
                        />
                        <p>
                            {user.email}
                            <small>
                                <span>Member since </span>
                                <span>
                                    {DateTime.fromISO(user.createdAt).toFormat(
                                        'dd LLL yyyy'
                                    )}
                                </span>
                            </small>
                        </p>
                    </li>
                    <li className="user-footer">
                        <button
                            type="button"
                            className="btn btn-default btn-flat"
                            onClick={navigateToProfile}
                        >
                            Perfil
                        </button>
                        <button
                            type="button"
                            className="btn btn-default btn-flat float-right"
                            onClick={logOut}
                        >
                            Logout
                        </button>
                    </li>
                </>
            }
        />
    );
};

export default UserDropdown;
