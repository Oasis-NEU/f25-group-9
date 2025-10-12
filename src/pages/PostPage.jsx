import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostPage.css'

function PostPage() {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const [tag, setTags] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [image, setImage] = useState('');

    const validate = () => {
        if (!title.trim()) { alert('Title is required'); return false; }
        if (!author.trim()) { alert('Author is required'); return false; }
        if (!body.trim()) { alert('Body is required'); return false; }
        return true;
    };

    const handleImageChange = (e) => {
        const f = e.target.files?.[0];
        if (image) URL.revokeObjectURL(image);
        setImage(f ? URL.createObjectURL(f) : '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const post = {
            title,
            author,
            body,
            tags: tag.split(',').map(t => t.trim()).filter(Boolean),
            isPublic,
            imagePreviewUrl: image || null,
            createdAt: new Date().toISOString(),
        };

        console.log('Post created:', post);

        navigate('/profile');
    };

    return (
        <>
            <div className = 'create-post'>
                <h1>My dream...</h1>

               <form onSubmit={handleSubmit}>

                    <div className='form-row'>
                        <label>Title</label>
                        <input id='post-title' type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>

                    <div className='form-row'>
                        <label>Author</label>
                        <input id='post-author' type='text' value={author} onChange={(e) => setAuthor(e.target.value)}/>
                    </div>

                    <div className='form-row'>
                        <label>Summary</label>
                        <textarea id='post-body' rows={10} value={body} onChange={(e) => setBody(e.target.value)} placeholder='e.g., It started with baby bell cheese...'/>
                    </div>

                    <div className='form-row'>
                        <label>Tags</label>
                        <input id='post-tags' type='text' value={tag} onChange={(e) => setTags(e.target.value)} placeholder='seperate with ,'/>
                    </div>

                    <div className='form-row'>
                        <label>Image</label>
                        <input
                            id='post-image'
                            type='file'
                            accept='image/*'
                            onChange={(e) => {
                                const f = e.target.files?.[0];
                                setImage(f ? URL.createObjectURL(f) : '');
                            }}
                        />
                        {image && <img src={image} alt='Preview' className='image-preview' />}
                    </div>

                    <div className='form-row'>
                        <label>Visibility</label>
                        <div className='radio-group'>
                            <label>
                                <input
                                type='radio'
                                name='visibility'
                                value='public'
                                checked={isPublic === true}
                                onChange={() => setIsPublic(true)}
                                />
                                Public
                            </label>
                            <label>
                                <input
                                type='radio'
                                name='visibility'
                                value='private'
                                checked={isPublic === false}
                                onChange={() => setIsPublic(false)}
                                />
                                Private
                            </label>
                        </div>
                    </div>

                    <div className='form-row'>
                        <button className='button' type='submit'>Post</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default PostPage