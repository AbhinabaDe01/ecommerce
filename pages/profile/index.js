import { useUser } from '@auth0/nextjs-auth0/client';

import React from 'react'

const Profile = () => {

  const { user, error, isLoading } = useUser();

  if(user && user.given_name){
    return(
      <div className='profile'>
        <img src={user.picture} height={150} width={150}/>
        <h3>Name: {user.name}</h3>
        <h3>Email: {user.email}</h3>
        <h5>Nickname: {user.nickname}</h5>
        <p>Session ID: {user.sid}</p>
        <p>Updated at: {user.updated_at}</p>
      </div>
    )
  } else {
    <p>Other info</p>
  }
}

export default Profile