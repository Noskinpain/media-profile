import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers, addUser } from "../store"
import Skeleton from "./Skeleton"
import Button from "./Button"

const UsersList = () => {

const [isLoadingUsers, setIsLoadingUsers] = useState(false)
const [isLoadingError, setIsLoadingError] = useState(null)
const [isCreatingUser, setIsCreatingUser] = useState(false)
const [creatingUserError, setCreatingUserError] = useState(null)
    const dispatch = useDispatch()
const { data} = useSelector((state) => {
    return state.users
})
    useEffect(() => {
    setIsLoadingUsers(true)
     dispatch(fetchUsers())
     .unwrap()
     .catch((err) => {
     setIsLoadingError(err)
     })
     .finally(() => {
   setIsLoadingUsers(false)
     })

     
    },[dispatch])

    const handleAddUser = () => {
        setIsCreatingUser(true)
        dispatch(addUser())
        .unwrap()
        .catch((err) => {
            setCreatingUserError(err)
        })
        .finally(() => setIsCreatingUser(false))
    }
    if(isLoadingUsers){
        return <Skeleton times={6} className="h-10 w-full"/>
    }
    if(isLoadingError){
        return <div>error loading data</div>
    }

    const renderedUsers = data.map((user) => {
        return <div key={user.id} className="mb-2 border rounded">
            <div className="flex p-2 justify-between items-center cursor-pointer">
                {user.name}
            </div>
        </div>
    })
  return (
    <div>
        <div className="flex flex-row justify-between m-3">
            <h1 className="m-2 text-xl">Users</h1>
           {
            isCreatingUser ? "creating user..." :
            <Button onClick = {handleAddUser}>+ Add User</Button>
            }
            {creatingUserError && "error creating user"}
        </div>
        {renderedUsers}</div>
  )
}
//npm run start:server
export default UsersList