import styles from './MainPage.module.scss'
import {useEffect, useState} from "react";
import Track from "../../components/Track/Track.jsx";
import {Input} from "@mui/material";


const runSearch = (query, array) => {

    if (!query) return array;

    return array.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.artists.toLowerCase().includes(query.toLowerCase())
    );
}
const MainPage = () => {
    const [data, setData] = useState([])
    const [query, setQuery] = useState('')


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('data.json');
            const data = await response.json()
            console.log(data)
            setData(data)
        }

        fetchData()

    }, []);

    const handleChange = ({target}) => {
        const query = target.value
        setQuery(query)
    }

    if (data.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <div className={styles.search}>
            <Input onChange={handleChange} className={styles.input} placeholder={'Поиск треков'}/>
            <div className={styles.list}>
                {runSearch(query,data).map((item, index) => <Track key={index} track={item}/>)}

            </div>
        </div>
    );
};

export default MainPage;