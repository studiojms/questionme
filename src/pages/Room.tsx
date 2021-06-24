import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import '../styles/room.scss';

type RoomParams = {
  id: string;
};

export function Room() {
  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState('');
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);

  async function handleSendQuestion(e: FormEvent) {
    e.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('You must be logged in');
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    try {
      await database.ref(`rooms/${roomId}/questions`).push(question);

      setNewQuestion('');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="QuestionMe" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Room {title}</h1>
          {questions.length > 0 && <span>{questions.length} question(s)</span>}
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="What would you like to ask?"
            value={newQuestion || ''}
            onChange={e => setNewQuestion(e.target.value)}
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                To ask a question, <button>login</button>
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Ask Question
            </Button>
          </div>
        </form>

        <div className="question-list">
          {questions.map(question => {
            return <Question key={question.id} author={question.author} content={question.content} />;
          })}
        </div>
      </main>
    </div>
  );
}
