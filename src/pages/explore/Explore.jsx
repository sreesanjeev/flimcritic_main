import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import { MultiSelect } from "react-multi-select-component";

import Card from "../../components/Card"
import { CardSkeleton } from "../../components/Skeleton";
import fetchData from '../../hooks/FetchData'
import '../home/home.css'
import Header from "../../components/header";

function Explore(){
    const { mediaType } = useParams();
    const [pageNum, setPageNum] = useState(1);
    const [filter, setFilter] = useState("popularity.desc");
    const [lang, setLang] = useState("ta");
    const [selected, setSelected] = useState([]);
    const options = useSelector((state) => state.home.genres);

    // Format selected genres for the query parameter
    const genreIds = selected.map(genre => genre.value).join(",");

    const { data, loading } = fetchData(
        `/discover/${mediaType}?page=${pageNum}&sort_by=${filter}&with_original_language=${lang}&with_genres=${genreIds}`
    );

    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if (!loading && data) {
            setItems((prevItems) => [...prevItems, ...data?.results]);
        }
    }, [data, loading]);

    const fetchMore = () => {
        setPageNum((prev) => prev + 1);
        if (data && data.results.length < data.total_results) {
            setHasMore(true);
        } else {
            setHasMore(false);
        }
    };

    useEffect(() => {
        // Reset items and page number when any filter changes
        setItems([]);
        setPageNum(1);
    }, [mediaType, filter, selected, lang]);

    return (
        <div>
            <Header />
            <div className="explore_heading">{`Explore ${mediaType}`}</div>
            <div style={{ width: '90%', display: 'flex', justifyContent: 'space-between', margin: '1rem auto' }}>
                <div className="explore_selector">
                    <MultiSelect
                        style={{ border: 'none', borderRadius: '10px', padding: '1rem' }}
                        hasSelectAll={false}
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select genre"
                        className="selector"
                    />
                    <select name="filter" id="filter" style={{ padding: '0.6rem' }} onChange={(e) => setFilter(e.target.value)}>
                        <option value="popularity.desc">Popularity Descending</option>
                        <option value="popularity.asc">Popularity Ascending</option>
                        <option value="vote_average.desc">Rating Descending</option>
                        <option value="vote_average.asc">Rating Ascending</option>
                        <option value="primary_release_date.desc">Release Date Descending</option>
                        <option value="primary_release_date.asc">Release Date Ascending</option>
                        <option value="original_title.asc">Title (A-Z)</option>
                    </select>

                    <select name="lang" id="lang" style={{ padding: '0.6rem' }} onChange={(e) => setLang(e.target.value)}>
                        <option value="ta">Tamil</option>
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="te">Telugu</option>
                        <option value="kn">Kannada</option>
                        <option value="ml">Malayalam</option>
                    </select>
                </div>
            </div>

            <InfiniteScroll
                dataLength={items.length}
                next={fetchMore}
                hasMore={hasMore}
                loader={<CardSkeleton />}
                className="colwise"
            >
                {items?.map((result, i) => <Card result={result} mediaType={mediaType} key={i} />)}
            </InfiniteScroll>

            {(!loading && items.length === 0) && <div className="resultNotFound">Sorry, results not found</div>}
        </div>
    );
}

export default Explore;
