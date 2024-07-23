import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddBookmark = () => {
    const [bookmark, setBookmark] = useState({
        title: '',
        url: '',
    })
    const { title, url } = bookmark;
    const navigate = useNavigate();

    const onTextChange = e => {
        const copy = { ...bookmark };
        copy[e.target.name] = e.target.value;
        setBookmark(copy);
        console.log(bookmark);
    }
    const onSubmitClick = async () => {
        await axios.post('/api/bookmarks/addbookmark', bookmark);
        navigate('/mybookmarks')
    }
    return (
        <div className="container" style={{ marginTop: "80px" }}>
            <main role="main" className="pb-3">
                <div className="row" style={{ minHeight: "80vh" }} >
                    <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                        <h3>Add a Bookmark:</h3>
                        <input type="text" onChange={onTextChange} name="title" placeholder="Title" value={title} />
                        <br />
                        <input type="text" onChange={onTextChange} name="url" placeholder="Url" value={url} />
                        <br />
                        <button onClick={onSubmitClick} className="btn btn-primary">Add</button>

                    </div>
                </div>
            </main>
        </div>

    )
}
export default AddBookmark;