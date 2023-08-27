import React from 'react'

export const UserCard = ({item}) => {
    let role="User";
    if(item.isDoctor===true){
        role="Doctor"
    }
  return (
    <div className="card w-2 my-4 item">
      <div className="card-body">
       <h3> {item.name}</h3>
        <p className="card-text">
          <strong>Email:</strong> {item.email}
        </p>
        <p className="card-text">
          <strong>{role}</strong>
        </p>
      </div>
    </div>
  )
}
