import React, { useState, type ChangeEvent } from 'react'
import { Button } from 'react-bootstrap';

interface User{
  name: string;
  email: string;
}

interface FormularioCreateProps {
  setUsers:  React.Dispatch<React.SetStateAction<User[]>>;
  users: User[];
} 
export const FormularioCreate: React.FC<FormularioCreateProps> = ({setUsers, users}) => {
  const [data, setData] = useState<User>({name:"", email:""});

  const handleChange = (e: ChangeEvent<H>) => {
    const {name, value} = e.target;
    setData(prev => ({...prev, [name]:value}))
  }

  const onSubmit = () => {
    setUsers([...users, data])
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
            <Button onClick={onSubmit}>aceptar</Button>
        </form>
    </div>
  )
}
