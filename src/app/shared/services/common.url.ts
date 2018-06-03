// const api = 'http://localhost:8888/hireman_backend/public/api/';
const api = 'http://api.code-review.grassbusinesslabs.tk/api/';

export const COMMON_URL = {
  auth: {
    login: api + 'login',
    logout: api + 'user/logout',
    userInfo: api + 'users'
  },
  user: {
    startWorking: api + 'projects/',
    create: api + 'user/register',
    update: api + 'user/update'
  },
  trello: {
    projects: api + 'projects',
    myProjects: api + 'projects/my',
    trelloLists:'/trello_tasks',
    myTasks:api + 'my_tasks/',
    createTask:'create_trello_task',
    setKey: api + 'user/trello_authorization'

  },
  userSkill: {
    index: api + 'user-skill',
    create: api + 'user-skill',

  },
  skill: {
    index: api + 'skill',
  }
};
