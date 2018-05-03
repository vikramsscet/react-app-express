import React from 'react';


function Table({users, removeUser}){
    if(users && Array.isArray(users)){
        return(
            <div>
            <table className="mytable">
             <tbody>   
                <tr>
                    <th>First Name</th><th>Last Name</th><th>Gender</th><th>Email</th><th>Delete</th>
                </tr>       
                <TBody users={users} removeUser={removeUser}/>
            </tbody>
            </table>
            </div>
        );
    }else{
        return(
            <div>Loding...</div>
        );
    }
}
function TBody({users, removeUser}){
    return (
        users.map(user=>{
            return <TR key={user['_id']} user={user} removeUser={removeUser}/>
        })
    );
    
}
function TR({user, removeUser}){
    return(
        <tr><td>{user.fName}</td> <td>{user.lName}</td> <td>{user.gender}</td> <td>{user.email}</td><td><button value={user['email']} onClick={removeUser}>Delete</button></td></tr>
    );
}

export default Table;