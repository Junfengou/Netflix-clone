import axios from "axios";

//Passing in a base url in the create method
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

//for example
// instance.get('/foo-bar');
//  will look like requesting...
//   https://api.themoviedb.org/3/foo-bar

export default instance;