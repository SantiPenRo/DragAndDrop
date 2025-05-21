import axios from "axios";
import React from "react";

interface User {
  user_id: number;
  name: string;
  email: string;
   images?: File[];
}

interface UsersListProps {
  users: User[];
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const UsersList = ({ users, setUser }: UsersListProps) => {

  const onSelect = async (id:number) =>{
    try {
      const res = await axios.get<User>(`http://localhost:4000/api/user/${id}`)
      console.log("",res);
      
      setUser(res.data)
    } catch (error) {
      console.log(error);
      
    }

  }


  return (
    <div>
      <h2>Lista usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>nombre</th>
            <th>email</th>
            <th>select</th>
          </tr>
        </thead>
        <tbody>
          {users.map((e) => {
            return (
              <tr key={e.user_id}>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td><button onClick={()=>onSelect(e.user_id)}>ver info</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
