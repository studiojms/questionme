import { Link } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';

import '../styles/auth.scss';

export function NewRoom() {
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
          <form>
            <input type="text" placeholder="Room name" />
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
