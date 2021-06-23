import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/auth.scss';

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(e: FormEvent) {
    e.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div className="page-auth">
      <aside>
        <img src={illustrationImg} alt="QA Illustration" />
        <strong>Create live Q&amp;A rooms</strong>
        <p>Talk to your audience, live</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="QuestionMe" />
          <h2>Create a new room</h2>
          <form onSubmit={handleCreateRoom}>
            <input type="text" placeholder="Room name" value={newRoom} onChange={e => setNewRoom(e.target.value)} />
            <Button type="submit">Create room</Button>
          </form>
          <p>
            Want to join an existing room? <Link to="/">Click here</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
