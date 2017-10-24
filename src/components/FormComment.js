import React from 'react';

const FormComment = () => (
    <div className="bd-example" data-example-id="">
        <h2>Add new Comment</h2>
        <form>
          
            <div className="form-group">
                <label for="author">Author</label>
                <input type="text" className="form-control" id="author" placeholder="Author name" />
            </div>
  
            <div className="form-group">
                <label for="body">Comment</label>
                <textarea className="form-control" id="body" name="body" rows="3"></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary">Add</button>
        </form>
    </div>
)
export default FormComment