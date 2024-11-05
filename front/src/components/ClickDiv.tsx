import { ReactNode, useState } from 'react';
import clickSound from '../assets/clicksound.mp3';

interface ClickDivProps {
    defaultStyles?: string; 
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    children?: ReactNode
}

const ClickDiv: React.FC<ClickDivProps> = ({ defaultStyles, onClick, children }) => {
    const clickSoundAudio = new Audio(clickSound);
    const [isOpaque, setIsOpaque] = useState(false);

    const playClickSound = () => {
        clickSoundAudio.play();
    }

    const toggleOpacity = () => {
        setIsOpaque(!isOpaque);
    };

    return (
        <div onClick={(event) => { playClickSound(); toggleOpacity(); onClick?.(event); }} className={defaultStyles}>
            {children}
        </div>
    );
}

export default ClickDiv;