import MainPage from "./pages/MainPage/MainPage.jsx";

import styles from "./global.module.scss"
import Playbar from "./components/Playbar/Playbar.jsx";

const App = () => {
    return (
        <div className={styles.wrapper}>
            <MainPage/>
            <Playbar/>
        </div>
    );
};

export default App;