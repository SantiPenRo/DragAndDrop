import { Col, Container, Row } from 'react-bootstrap';
import './App.css'
import {FormularioCreate} from './components/FormularioCreate.tsx';
import { Info } from './components/Info.tsx';
import { UsersList } from './components/UsersList.tsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  user_id:number;
  name: string;
  email: string;
  images?: File[];
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User|undefined>(undefined);
  
  console.log("users: ", users);
  console.log("user: ", user);
  

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const res = await axios.get<User[]>("http://localhost:4000/api")
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
    
  },[])
  

  return (
    <section>
      <Container fluid="xl">
          <div className='d-flex flex-column align-items-center'>
            <h1>drag & drop</h1>
          </div>
        <Row>
          <Col>
          <div className='d-flex flex-column'>
            <FormularioCreate setUsers={setUsers} users={users} />
            < UsersList users={users} setUser={setUser} />
          </div>
          </Col>        
          <Col>
          <div>
            <Info user={user} setUser={setUser}/>
          </div>
          </Col>
        </Row>        
      </Container>
    </section>
  )
}

export default App
