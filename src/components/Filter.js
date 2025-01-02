import logo from '../assets/logo.png';
import './components.css';
import { useNavigate } from 'react-router-dom';

function Filter() {
    const navigate = useNavigate();

    return (
        <div className="filter-container">
            <div className="filter-wrapper">
                <h1 className="filter-title">Filter Based on Your Preference</h1>
                <div className="filter-buttons">
                    <button 
                        className="filter-button" 
                        onClick={() => navigate('/explore/movie')}
                    >
                        Movies
                    </button>
                    <button 
                        className="filter-button" 
                        onClick={() => navigate('/explore/tv')}
                    >
                        TV Shows
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Filter;
