import React from 'react';

const Form = () => (
    <div className="bd-example" data-example-id="">
        <h2>Add new post</h2>
        <form>
            <div className="form-group">
                <label for="title">Title</label>
                <input type="text" className="form-control" name="title" id="title" placeholder="Post title" />
            </div>

            <div className="form-group">
                <label for="author">Author</label>
                <input type="text" className="form-control" name="author" id="author" placeholder="Author name" />
            </div>

            <div className="form-group">
                <label for="category">Category</label>
                <select className="form-control" name="category" id="category">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                </select>
            </div>
            
            <div className="form-group">
                <label for="post">body</label>
                <textarea className="form-control" name="body" id="body" rows="3"></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
)
export default Form