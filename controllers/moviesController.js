const express = require('express');
const bodyParser = require('body-parser');

const DUMMY_MOVIES = [
    {
      id: "m1",
      title: "The Pianist",
      description: "A Polish-Jewish musician struggles to survive the destruction of the Warsaw ghetto of World War II.",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BOWRiZDIxZjktMTA1NC00MDQ2LWEzMjUtMTliZmY3NjQ3ODJiXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg"
    },
    {
      id: "m2",
      title: "The Lord of the Rings: The Fellowship of the Ring",
      description: "A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey to Mount Doom to destroy the ring.",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg"
    },
    {
      id: "m3",
      title: "The Dark Knight",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg"
    },
    {
      id: "m4",
      title: "Forrest Gump",
      description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg"
    },
    {
      id: "m5",
      title: "The Shawshank Redemption",
      description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg"
    },
    {
      id: "m6",
      title: "Inception",
      description: "A thief who enters the dreams of others to steal their secrets gets a chance to redeem himself after being offered a task considered impossible: to implant an idea into someone's mind.",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg"
    },
    {
      id: "m7",
      title: "Gladiator",
      description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg"
    },
    {
      id: "m8",
      title: "Schindler's List",
      description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/3/38/Schindler%27s_List_movie.jpg"
    },
    {
      id: "m9",
      title: "The Matrix",
      description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg"
    },
    {
      id: "m10",
      title: "The Godfather",
      description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg"
    },
    {
      id: "m11",
      title: "Star Wars: Episode IV - A New Hope",
      description: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg"
    },
    {
      id: "m12",
      title: "Jurassic Park",
      description: "During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg"
    },
    {
      id: "m13",
      title: "Titanic",
      description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BOTdjM2RhNzAtN2IzYS00ODI4LWE3MDEtMTFkMjUyNjZhZDQ5XkEyXkFqcGdeQXVyNTgzMzU5MDI@._V1_.jpg"
    },
    {
      id: "m14",
      title: "Avatar",
      description: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_FMjpg_UX1000_.jpg"
    },
    {
      id: "m15",
      title: "The Silence of the Lambs",
      description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/8/86/The_Silence_of_the_Lambs_poster.jpg"
    },
    {
      id: "m16",
      title: "Indiana Jones and the Raiders of the Lost Ark",
      description: "Archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before the Nazis.",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BNTU2ODkyY2MtMjU1NC00NjE1LWEzYjgtMWQ3MzRhMTE0NDc0XkEyXkFqcGdeQXVyMjM4MzQ4OTQ@._V1_FMjpg_UX1000_.jpg"
    },
    {
      id: "m17",
      title: "Back to the Future",
      description: "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/d/d2/Back_to_the_Future.jpg"
    },
    {
      id: "m18",
      title: "E.T. the Extra-Terrestrial",
      description: "A troubled child summons the courage to help a friendly alien escape Earth and return to his home world.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/6/66/E_t_the_extra_terrestrial_ver3.jpg"
    },
    {
      id: "m19",
      title: "The Lion King",
      description: "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/3/3d/The_Lion_King_poster.jpg"
    },
    {
      id: "m20",
      title: "The Shining",
      description: "A family heads to an isolated hotel where an evil spiritual presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg"
    }
  ];

exports.getMovies = async (req, res, next) => {
    if (DUMMY_MOVIES.length === 0){
        console.log('no movies');
        return res.status(404).json({ message: 'No movies found' });
    }
    
    res.status(200).json({
        message: 'List of movies found',
        movies: DUMMY_MOVIES
    });

};

exports.getMovieById = async (req, res, next) => {
    const movieId = req.params.movieId
    console.log('id:', req)
    const selectedMovie = DUMMY_MOVIES.find(movie => movie.id === movieId)
    if (!selectedMovie){
        return res.status(404).json({message: 'No movie corresponding to that id. Try another id.'})
    }
    res.status(200).json({
        message: 'Movie found successfully',
        movie: selectedMovie
    })

};


exports.addMovie = async (req, res, next) => {
    const title = req.body.title
    const description = req.body.description 
    const imageUrl = req.body.imageUrl

    const newMovie = {
        id: `m${DUMMY_MOVIES.length + 1}`,
        title: title,
        description: description,
        imageUrl: imageUrl
    }

    DUMMY_MOVIES.push(newMovie)

    res.status(200).json({
        message: 'New movie successfully added.',
        newMovie: newMovie
    })

};

exports.deleteMovie = (req, res, next) => {
    const movieId = req.params.movieId;

    const removeMovie = (array, idToRemove) => {
        const indexToRemove = array.findIndex(movie => movie.id === idToRemove);
        if (indexToRemove !== -1) {
            array.splice(indexToRemove, 1);
        };
        return array
    };

    removeMovie(DUMMY_MOVIES, movieId);

    res.status(200).json({
        message: 'Movie successfully deleted',
        movies: DUMMY_MOVIES
    })

};

exports.editMovie = (req, res, next) => {
    const movieId = req.params.movieId;

    
    const title = req.body.title
    const description = req.body.description 
    const imageUrl = req.body.imageUrl

    const indexToUpdate = DUMMY_MOVIES.findIndex(movie => movie.id === movieId);

    DUMMY_MOVIES[indexToUpdate].title = title;
    DUMMY_MOVIES[indexToUpdate].description = description;
    DUMMY_MOVIES[indexToUpdate].imageUrl = imageUrl;
    
    res.status(200).json({
        message: 'The movie was successfully updated',
        movie: DUMMY_MOVIES[indexToUpdate]
    })

};