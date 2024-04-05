const mongoose = require ('mongoose');
let movieSchema = mongoose.Schema ({
    title: {type: String, required: true},
    description: {type: String, required: true},
    genre: {
        name: String,
        description: String
    },
    director: {
        name: String,
        bio: String
    }, 
    actors: [String],
    imagePath: String,
    featured: Boolean
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

