import { Col, Container, Row } from 'react-bootstrap';
import './App.css'
import {FormularioCreate} from './components/FormularioCreate.tsx';
import { Info } from './components/Info.tsx';
import { UsersList } from './components/UsersList.tsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  name: string,
  email: string
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User|undefined>(undefined);
  
  console.log("users: ", users);
  console.log("user: ", user);
  

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        let res = await axios.get<User[]>("http://localhost:4000/api")
        setUsers(res.data);
        setUser(res.data[0])
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
            <FormularioCreate setUsers={setUser} users={users} />
          </div>
          </Col>        
          <Col>
          <div>
            <Info />
          </div>
          </Col>
        </Row>        
      </Container>
    </section>
  )
}

export default App
