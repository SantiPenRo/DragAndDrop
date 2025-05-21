import React from 'react'

interface Image {
    user_id: number;
    image_id: number;
    filename: string;
}

interface DragAndDropProps {
    images: Image[]
}

export const DragAndDrop:React.FC<DragAndDropProps> =  ({images}) => {
  return (
    <div>
        <h3>DragAndDrop</h3>
        {images.map(e=>(
            <div key={e.image_id}>Hola</div>
        ))}
    </div>
  )
}
