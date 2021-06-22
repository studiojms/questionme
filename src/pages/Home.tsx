import { useHistory } from 'react-router-dom';

import googleIconImg from '../assets/images/google-icon.svg';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  async function goToNewRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
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
          <button className="create-room" onClick={goToNewRoom}>
            <img src={googleIconImg} alt="Google Logo" />
            Create a room with Google
          </button>
          <div className="separator">or join an existing room</div>
          <form>
            <input type="text" placeholder="Type the room code" />
            <Button type="submit">Join room</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
