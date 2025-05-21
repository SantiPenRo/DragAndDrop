import axios from 'axios';
import React, { useRef, useState } from 'react'

interface User{
  user_id?: number;
  name: string;
  email: string;
}

interface FormularioCreateProps {
  setUsers:  React.Dispatch<React.SetStateAction<User[]>>;
  users: User[];
} 

const initialValues:User = {name:"", email:""}

export const FormularioCreate: React.FC<FormularioCreateProps> = ({setUsers, users}) => {
  const [data, setData] = useState<User>(initialValues);
  const [files, setFiles] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement|null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setData(prev => ({...prev, [name]:value}))
  }

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) =>{
    // estructuras "array-like" (como FileList, NodeList)
    // Tu estado espera un array de archivos (File[]), pero e.target.files devuelve un FileList, que no es lo mismo que un array. Aunque se parece, FileList no tiene métodos como .map(), .push(), etc.
    const selectedFiles = e.target.files;
    if(selectedFiles){
      setFiles(Array.from(selectedFiles))
    }
  }

  const onSubmit = async(e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const newFormData = new FormData()
      newFormData.append("data", JSON.stringify(data));
      for(const elem of files){
        newFormData.append("file",elem)
      }

      const res = await axios.post('http://localhost:4000/api/create', newFormData)

      setUsers([...users, {...data, user_id:res.data.user_id}])
      setData(initialValues)
      if(fileInputRef.current){
        fileInputRef.current.value='';
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
        <form>
            <h2>FormularioCreate</h2>
            <div>
              <label htmlFor="">nombre</label>
              <input 
                type="text" 
                name='name'
                onChange={handleChange}
                value={data.name}
              />
            </div>
            <div>
              <label htmlFor="">email</label>
              <input 
                type="text" 
                name='email'
                onChange={handleChange}
                value={data.email}
              />
            </div>
            <div>
              <input 
                ref={fileInputRef}
                type="file" 
                onChange={handleFiles}
                multiple
              />
            </div>
            <button onClick={onSubmit}>aceptar</button>
        </form>
    </div>
  )
}
