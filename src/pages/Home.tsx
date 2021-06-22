import googleIconImg from '../assets/images/google-icon.svg';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';

import '../styles/auth.scss';

export function Home() {
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
          <button className="create-room">
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
