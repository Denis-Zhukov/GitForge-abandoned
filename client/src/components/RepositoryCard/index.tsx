import React, {useState} from 'react';
import PropTypes from 'prop-types';
import s from './style.module.scss';

interface Props {
    name: string
    languages: string[]
}


const RepositoryCard: React.FC<Props> = ({name, languages}) => {
    const [rotation, setRotation] = useState("");

    const handleMouseMove = (e: any) => {
        const card = e.currentTarget;
        const centerX = card.offsetWidth / 2;
        const centerY = card.offsetHeight / 2;
        const mouseX = e.pageX - card.offsetLeft;
        const mouseY = e.pageY - card.offsetTop;
        const percentX = (mouseX - centerX) / centerX;
        const percentY = (mouseY - centerY) / centerY;
        const maxRotation = 10;
        const rotationX = percentY * maxRotation;
        const rotationY = -percentX * maxRotation;
        const rotationStyle = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

        setRotation(rotationStyle);
    };

    const handleMouseLeave = () => {
        setRotation("");
    };

    return (
        <div
            className={s.repositoryCard}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{transform: rotation}}
        >
            <div className={s.content}>
                <h3 className={s.name}>{name}</h3>
                <p className={s.description}>Desc</p>
                <div className={s.languages}>{languages && 'Unknown'}</div>
            </div>
        </div>
    );
};

RepositoryCard.propTypes = {
    name: PropTypes.string.isRequired,
};

export default RepositoryCard;