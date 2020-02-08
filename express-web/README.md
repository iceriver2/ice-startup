## Layout

```
bin/                <= helper tools
config/             <= configurations
lib/                <= library
module/             <= container for all modules
  index.js          <= import all modules
  module_name/      <= module
    index.js        <= import routes in current module
    model/          <= model used in module
    route/          <= route used in module
```