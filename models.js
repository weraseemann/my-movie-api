const mongoose = require ('mongoose');
let movieSchema = mongoose.Schema ({
    Title: {type: String, required: true},
    DEscription: {type: String, required: true},
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String,
        Bio: String
    }, 
    Actors: [String],
    ImagePath: String,
    Featured: Boolean
});

let userSchema = mongoose.Schema ({
    Username: {type:String, required: true},
    Password: {type: String, required: true}, 
    Birthday: Date, 
    FavouriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;

