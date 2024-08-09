import React from 'react'
import Button from './Button'
import { GoTrashcan } from 'react-icons/go'
import ExpandablePanel from './ExpandablePanel'
import { useRemoveAlbumMutation } from '../store'


const AlbumListItem = ({album}) => {
    const [removeAlbum, results] = useRemoveAlbumMutation()
    const handleRemoveAlbum = () => {
       removeAlbum(album)
    }
    const header = <>
        <Button className="mr-2" loading={results.isLoading} onClick={handleRemoveAlbum}><GoTrashcan/></Button>
        {album.title}
        </>
  return (
    
     <ExpandablePanel key={album.id} header={header}>
      list of photos in the album
    </ExpandablePanel>
  )
}

export default AlbumListItem