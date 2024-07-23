import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Home = () => {

    const [isLoading, setIsLoading] = useState(true);

    const [topBookmark, setTopBookmark] = useState([]);
    const { url, count } = topBookmark

    useEffect(() => {
        const getTopFive = async () => {
            setIsLoading(true);
            const { data } = await axios.get('/api/bookmarks/gettopfive');
            setTopBookmark(data);
            setIsLoading(false);
            console.log(data);
        }
        getTopFive();
    }, []);

    return (

        <div className="container" style={{ marginTop: "80px" }} >
            <main role="main" className="pb-3"><div>
                <h1>Welcome to the React Bookmark Application.</h1>
                {isLoading && <div className="spinner-border text-secondary align-center" role="status"></div>}
                <h3>Top 5 most bookmarked links</h3>
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Url</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topBookmark.map(t =>
                            <tr key={t.id} style={{ backgroundColor: "#f8f9fa", borderRadius: "15px" }} >
                                <td><a href={t.url} target="_blank">{t.url}</a></td>
                                <td>{t.count}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            </main>
        </div>



    )

}


export default Home;