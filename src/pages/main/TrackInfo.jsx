import { ReactComponent as Like } from 'images/like.svg';
import { Context } from 'index';
import { observer } from 'mobx-react-lite';
import AudioTimer from 'pages/main/AudioTimer';
import { useContext } from 'react';
import { Container } from "react-bootstrap";
import modalStore from 'store/modalStore';
import trackStore from "store/trackStore";

const TrackInfo = () => {
    const userStore = useContext(Context);
    const toggleLike = () => {
        if (!userStore.isAuth) {
            modalStore.showLogin(true);
        } else {
            trackStore.toggleLike();
        }            
    }

    if (!trackStore.current.id) {
        return <></>
    }

    return (
        <Container className="bg-light rounded mb-3 py-2">
            <h5>{trackStore.current.title}</h5>
            <div>
                <b>Исполнитель: </b>{trackStore.current.author}<br />
                <b>Год выхода: </b>{trackStore.current.year}<br />
            </div>
            <AudioTimer />
            <div className="d-flex mx-auto align-items-center">
                <Like role="button" onClick={toggleLike} className={"ms-auto me-2 " + (trackStore.current.isLiked ? "like-active" : "like")} />
                <div className="fs-5">{trackStore.current.likeCount}</div>
            </div>
        </Container>
    );
}

export default observer(TrackInfo);