import React from 'react'
import { ImageDragList } from './ReorderPhotos';

interface Image {
  user_id:number;
  image_id:number;
  filename:string;
}

interface User  {
  user_id: number;
  name: string;
  email: string;
  images: Image[]
}

interface InfoProps {
  user?: User;
}

export const Info: React.FC<InfoProps> = ({user, setUser}) => {
  return (
    <div>
      <h2>Información</h2>
      <h3>Nombre: {user?.name}</h3>
      <h3>Email: {user?.email}</h3>
      <hr />
      <ImageDragList user={user} setUser={setUser}/>
    </div>


  )
}
