import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { withAuth0 } from '@auth0/auth0-react';


function Profile() {
    const { user, isAuthenticated } = useAuth0();
    console.log(user)
    return (
        <>

            {isAuthenticated &&
                <>
                    {/* <LogoutButton /> */}
                    <div> Your email :{user.email} </div>
                    <div>Hello {user.name}</div>
                    <div>this is your profile picture 
                        <img src={user.picture} alt="d" />
                    </div>

                </>
            }

        </>

    );
}

export default withAuth0(Profile);