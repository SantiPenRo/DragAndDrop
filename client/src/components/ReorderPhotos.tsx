
import React, { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableImage } from './SortableImage';
import axios from 'axios';

interface Image {
    user_id:number;
    image_id:number;
    filename:string;
}

interface ImageDragListProps {
    images: Image[];
}

// Componente principal que contiene la lógica de ordenamiento
export const ImageDragList: React.FC<ImageDragListProps> = ({user, setUser}) => {
    console.log("lista", user);

    const [images, setImages] = useState([]);

    useEffect(()=>{
        if(user){
            setImages(user.images);
        }
    },[user])

  const sensors = useSensors(useSensor(PointerSensor));

  
  const handleDragEnd = (event: DragEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = images.findIndex((img) => img.image_id === active.id);
      const newIndex = images.findIndex((img) => img.image_id === over?.id);

      setImages((imgs) => arrayMove(imgs, oldIndex, newIndex));
      saveImages()
    }
  };

const saveImages = async() => {
    try {
        await axios.post('http://localhost:4000/api/user')
    } catch (error) {
        
    }
  }
  

  return (
    <>
    <h3>Lista</h3>
    {user && 
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
         <SortableContext
       items={images?.map((img) => img.image_id)}
      strategy={horizontalListSortingStrategy}
         >
       <div style={{ display: 'flex', flexDirection: 'row' }}>
         {images?.map((image) => (
           <SortableImage key={image.image_id} id={image.image_id} src={image.filename} />
             ))}
          </div>
            </SortableContext>
         </DndContext>
    }
    </>
    );
};