import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Define la estructura de cada imagen
interface ImageItem {
  id: string;
  src: string;
}


// Componente de imagen individual que se puede arrastrar
export const SortableImage: React.FC<ImageItem> = ({ id, src }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
    margin: '0 10px',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <img src={`http://localhost:4000/users/${src}`} alt={`Imagen ${id}`} width={100} height={100} />
    </div>
  );
};