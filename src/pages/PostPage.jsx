import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostPage.css';
import { supabase } from '../../supabase.js';

function PostPage() {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tag, setTags] = useState('');
    const [is_public, setis_public] = useState(true);
    const [imageFile, setImageFile] = useState(null); // real file
    const [imagePreview, setImagePreview] = useState(''); // for showing


    const validate = () => {
        if (!title.trim()) { alert('Title is required'); return false; }
        if (!author.trim()) { alert('Author is required'); return false; }
        if (!body.trim()) { alert('Body is required'); return false; }
        return true;
    };

    const handleImageChange = (e) => {
        const f = e.target.files?.[0] || null;
        setImageFile(f);
        setImagePreview(f ? URL.createObjectURL(f) : '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        let image_url = null;

        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (imageFile) {

            const ext = imageFile.name.split('.').pop() || 'png';
            const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from('posts')
                .upload(fileName, imageFile);

            if (uploadError) {
                console.error(uploadError);
                alert('Image upload failed');
                return;
            }

            const { data: publicUrlData } = supabase
                .storage
                .from('posts')
                .getPublicUrl(uploadData.path);

            image_url = publicUrlData.publicUrl;
        }

        const post = {
            title,
            user_id: user.id,
            body,
            tags: tag.split(',').map(t => t.trim()).filter(Boolean),
            is_public,
            image_url
        };

        const { data, error } = await supabase
            .from('posts')
            .insert([post])
            .select();

        if (error) {
            console.error('supabase insert error:', error);
            alert('Failed to create post');
            return;
        }
        
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
                            onChange={handleImageChange}
                        />
                        {imagePreview && <img src={imagePreview} alt='Preview' className='image-preview' />}
                    </div>

                    <div className='form-row'>
                        <label>Visibility</label>
                        <div className='radio-group'>
                            <label>
                                <input
                                type='radio'
                                name='visibility'
                                value='public'
                                checked={is_public === true}
                                onChange={() => setis_public(true)}
                                />
                                Public
                            </label>
                            <label>
                                <input
                                type='radio'
                                name='visibility'
                                value='private'
                                checked={is_public === false}
                                onChange={() => setis_public(false)}
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