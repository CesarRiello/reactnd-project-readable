import React from 'react';

const Post = () => (
    <div className="bd-example" data-example-id="">
        <h2>title</h2>
        
        <div className="form-group">
            content
        </div>
        
        <div className="form-group">
            data
        </div>
        
        <div className="form-group">
            rank
        </div>

        <div className="container">
        <div class="row">
           
            <div class="col-md-2">
                <button type="button" className="btn btn-primary "> <span>👍</span> </button>
            </div>
            <div class="col-md-2">
                <button type="button" className="btn btn-primary "> <span>👎</span> </button>
            </div>
            <div class="col-md-4">
                <button type="button" className="btn btn-primary btn-block">Edit</button>
            </div>
            <div class="col-md-4">
                <button type="button" className="btn btn-danger btn-block">Delete</button>
            </div>

        </div>
        </div>
                        
    </div>
)
export default Post