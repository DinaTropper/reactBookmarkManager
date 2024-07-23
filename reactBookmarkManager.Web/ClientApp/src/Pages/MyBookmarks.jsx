import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { produce } from 'immer';
import { useAuth } from '../AuthorizationContext.jsx';
import { useNavigate } from 'react-router-dom';
import BookmarkRow from '../components/BookmarkRow.jsx';

const MyBookmarks = () => {

    const [bookmarks, setBookmarks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [titleNew, setTitleNew] = useState();
    const [isEditClicked, setIsEditClicked] = useState(false);
    const { user } = useAuth();

    const { title, url } = bookmarks;

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        getBookmarks();
        setIsLoading(false);
    }, []);

    const getBookmarks = async () => {
        const { data } = await axios.get('/api/bookmarks/getmine');
        setBookmarks(data);
    }

    const onEditClick = (id) => {
        console.log(bookmarks);
        setIsEditClicked(!isEditClicked);
        const bookmark = bookmarks.find(b => b.id === id);
        setTitleNew(bookmark.title);

    }
    const onTextChange = (e, id) => {
        const nextState = produce(bookmarks, draftBookmarks => {
            const bookmark = draftBookmarks.find(b => b.id === id);
            bookmark.title = e.target.value;
        });
        setBookmarks(nextState);
        console.log("changing text")
    }

    const onUpdateClick = async (title, id) => {
        await axios.post('/api/bookmarks/updatebookmark', { title, id });
        getBookmarks();
        setIsEditClicked(false);
        navigate('/mybookmarks');
    }

    const onCancelClick = (id) => {
        const nextState = produce(bookmarks, draftBookmarks => {
            const bookmark = draftBookmarks.find(b => b.id === id);
            bookmark.title = titleNew;
        });
        setBookmarks(nextState);
        setIsEditClicked(!isEditClicked)
    }

    const onDeleteClick = async (id) => {
        console.log("i just pressed delete")
        await axios.post(`/api/bookmarks/deletebookmark?id=${id}`);
        getBookmarks();
        navigate('/mybookmarks');
    }

    return (
        <div className="container" style={{ marginTop: "80px" }}>
            <main role="main" className="pb-3">
                <div style={{ marginTop: "20px" }} >
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Welcome back {user.firstName} {user.lastName}</h1>
                            <a className="btn btn-primary btn-block" href="/addbookmark">Add Bookmark</a>
                        </div>
                    </div>
                    {isLoading && <div className="spinner-border text-secondary" role="status"></div>}
                    <div className="row" style={{ marginTop: "20px" }}>
                        <table className="table table-hover table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Url</th>
                                    <th>Edit/Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookmarks.map(b => (
                                    <BookmarkRow
                                        key={b.id}
                                        bookmark={b}
                                        onTextChange={e => onTextChange(e, b.id)}
                                        isEditClicked={isEditClicked}
                                        onEditClick={() => onEditClick(b.id)}
                                        onUpdateClick={() => onUpdateClick(b.title, b.id)}
                                        onCancelClick={() => onCancelClick(b.id)}
                                        onDeleteClick={() => onDeleteClick(b.id)}>
                                    </BookmarkRow>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default MyBookmarks;