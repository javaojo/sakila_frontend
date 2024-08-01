import Slider from 'react-slick';
import { Film } from '../../types.tsx';
import '../../assets/css/Carousel.css';
import {Link} from "react-router-dom";

const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
};

interface CarouselProps {
    films: Film[];
}

function Carousel({ films }: CarouselProps) {
    return (
        <Slider {...carouselSettings}>

            {films.map(film => (

                <div key={film.id} className="carousel-slide">
                    <div className="carousel-image-container">

                        <img src={'https://via.placeholder.com/1200x500.png?text=.'} className="carousel-image" loading="lazy"/>

                        <div className="carousel-overlay">

                            <Link to={`/films/${film.id}`}><h2>{film.title}</h2></Link>
                            <p>{film.description}</p>
                            <span className="carousel-year">({film.releaseYear})</span>

                        </div>

                    </div>
                </div>

            ))}

        </Slider>
    );
}


export default Carousel;