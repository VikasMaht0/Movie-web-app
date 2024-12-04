import axios from "axios";

const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTM1OTI3OGUxYWUxZGVhNzFiNWU1NTRjNmU5MTc4NiIsIm5iZiI6MTcyODMxNzQ3MS41NjgyNDMsInN1YiI6IjY3MDQwNDQyMThhOGI0OWQzMjEzYTM5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r6LAIBeaIeZFQK0i7CkCHMGzi6CpqeqK0pYzv_rBcSc'
      },
});

export default instance;