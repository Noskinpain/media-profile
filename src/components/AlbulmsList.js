import React from 'react'
import { useFetchAlbumsQuery } from '../store'
import Skeleton from "./Skeleton"
import Button from "./Button"
import ExpandablePanel from "./ExpandablePanel"
import { useAddAlbumMutation } from '../store'

const AlbulmsList = ({user}) => {
   const {data, error, isLoading} = useFetchAlbumsQuery(user)
   const [addAlbum, results] = useAddAlbumMutation()

//    console.log(data, error, isLoading)

const handleAddAlbum = () => {
  addAlbum(user)
}
let content;
if(isLoading){
    content = <Skeleton times={3}/>
}
else if(error){
    content = <div>Error loading albums.</div>
} else{
    content = data.map((album) => {
        const header = <div>{album.title}</div>
        return <ExpandablePanel key={album.id} header={header}>
          list of photos in the album
        </ExpandablePanel>
    })
}

  return (
    <div>
    <div>Albulms for {user.name}
        <Button onClick = {handleAddAlbum}>
            +Add Album
        </Button>
    </div>
     <dov>
        {content}
     </dov>
    </div>
  )
}

export default AlbulmsList