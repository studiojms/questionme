import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

type RoomCodeProps = {
  code: string;
};

export function RoomCode({ code }: RoomCodeProps) {
  function copyToomCodeToClipboard() {
    if ('clipboard' in navigator) {
      navigator.clipboard.writeText(code);
    }
  }
  return (
    <button className="room-code" onClick={copyToomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Room #{code}</span>
    </button>
  );
}
