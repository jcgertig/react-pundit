import { toPolicyObject } from 'react-pundit';

import PostPolicy from './PostPolicy';

export default toPolicyObject([new PostPolicy()]);
