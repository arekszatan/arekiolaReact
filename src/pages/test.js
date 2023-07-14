import React, { useEffect, useState } from "react"

const Test = () => {
    const [users, setUsers] = useState([])

    // const fetchUserData = () => {
    //     fetch(" http://127.0.0.1:8000/api/")
    //         .then(response => {
    //             console.log(response)
    //             return response.json()
    //         })
    //         .then(data => {
    //             console.log(data)
    //             setUsers(data)
    //         })
    // }
    //
    // useEffect(() => {
    //     fetchUserData()
    // }, [])

    return (
        <div>
            {users.length > 0 && (
                <ul>
                    {users.map(user => (
                        <li>{user.task}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Test;
