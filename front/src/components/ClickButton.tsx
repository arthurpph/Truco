import { useState } from 'react';
import clickSound from '../assets/clicksound.mp3';

interface ClickButtonProps {
    name: string;
    defaultStyles?: string; 
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ClickButton: React.FC<ClickButtonProps> = ({ name, defaultStyles, onClick }) => {
    const clickSoundAudio = new Audio(clickSound);
    const [isOpaque, setIsOpaque] = useState(false);

    const playClickSound = () => {
        clickSoundAudio.play();
    }

    const toggleOpacity = () => {
        setIsOpaque(!isOpaque);
    };

    return (
        <button onClick={(event) => { playClickSound(); toggleOpacity(); onClick?.(event); }} className={defaultStyles}>
            {name}
        </button>
    );
}

export default ClickButton