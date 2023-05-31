import axios from 'axios';

export default axios.create({
    baseURL: 'https://collegeaid-backend.herokuapp.com/api'
});