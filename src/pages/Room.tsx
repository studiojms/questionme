import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/room.scss';

type RoomParams = {
  id: string;
};

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
};

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
  }
>;

export function Room() {
  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState('');
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const params = useParams<RoomParams>();

  const roomId = params.id;

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
        };
      });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);

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
      </main>
    </div>
  );
}
