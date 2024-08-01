
import { useEffect, useState } from 'react';
import Carousel from './Carousel';
import { getAllFilms } from '../../api.tsx';
import { Film } from '../../types.tsx';



export function HomeContent() {

    const [carouselFilms, setCarouselFilms] = useState<Film[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                // fetch only a limited number of films
                const allFilms = await getAllFilms();
                setCarouselFilms(allFilms.slice(0, 10)); // get 10 films
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        }

        fetchData();
    }, []);


    return (
        <>
            {/* Carousel */}
            <Carousel films={carouselFilms} />

        </>
    );


}