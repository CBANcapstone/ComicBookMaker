import axios from 'axios';
import history from '../history';

const GET_TEMPLATES = 'GET_TEMPLATES';

const getTemplates = templates => ({
  type: GET_TEMPLATES,
  templates
});

export const getTemplatesThunk = () => dispatch =>
  axios
    .get('/api/templates')
    .then(templates => {
      dispatch(getTemplates(templates.data));
      history.push('/templates');
    })
    .catch(err => console.log(err));

export default function(state = [], action) {
  switch (action.type) {
    case GET_TEMPLATES:
      return action.templates;
    default:
      return state;
  }
}
