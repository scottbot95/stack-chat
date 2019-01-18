import axios from 'axios';
import pkg from '../../package.json';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : pkg.homepage;

export default axios.create({
  baseURL
});
