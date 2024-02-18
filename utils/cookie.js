
const cookie = (props) => {
    const { response } = props;
    const token = response.headers['set-cookie'].split(';')[0].split('=')[1];
    localStorage.setItem('token', token);
}

export default cookie