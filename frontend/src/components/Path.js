  // for local and prod testing build paths (connects us to the backend)
  const app_name = 'ssu-planner'     // prod server
  // const app_name = 'ssu-testing'        // testing server
  exports.buildPath =
  function buildPath(route)
  {
    // check if we are on a server
    if (process.env.NODE_ENV === 'production')
    {
        return 'https://' + app_name + '.herokuapp.com' + route;
    }
    // else, we are working locally
    else
    {
        return 'http://localhost:8080' + route;
    }
  }
