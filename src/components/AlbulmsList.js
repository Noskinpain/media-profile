import React from 'react'
import { useFetchAlbumsQuery } from '../store'
import Skeleton from "./Skeleton"
import Button from "./Button"
import { useAddAlbumMutation } from '../store'
import AlbumListItem from './AlbumListItem'

const AlbulmsList = ({user}) => {
   const {data, error, isLoading} = useFetchAlbumsQuery(user)
   const [addAlbum, results] = useAddAlbumMutation()
// console.log(results)
//    console.log(data, error, isLoading)

const handleAddAlbum = () => {
  addAlbum(user)
}
let content;
if(isLoading){
    content = <Skeleton className="h-10 w-full" times={3}/>
}
else if(error){
    content = <div>Error loading albums.</div>
} else{
    content = data.map((album) => {
       return <AlbumListItem key={album.id} album={album}/>
    })
}

  return (
    <div>
    <div className='m-2 flex flex-row items-center justify-between'>
      <h3 className='text-lg font-bold'>Albulms for {user.name}</h3>
        <Button loading={results.isLoading} onClick = {handleAddAlbum}>
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