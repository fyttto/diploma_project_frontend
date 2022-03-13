const getImage = (road, name) => {
  const path = `./../assets/img/${road}}/${name}.png`;
  const modules = import.meta.globEager('./../assets/img/*/*.png');
  return modules[path].default;
};

export default getImage;
