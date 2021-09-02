export const getRetinaImageUrl = (src) => {
  if (src.indexOf(`@2x`) !== -1 || src.indexOf(`/_retina`) !== -1) {
    return src;
  }
  const slashPosition = src && src.lastIndexOf(`/`);
  const retinaImagePath =
    slashPosition &&
    [src.slice(0, slashPosition), `/_retina`, src.slice(slashPosition)].join(
      ``,
    );
  return retinaImagePath && retinaImagePath.indexOf(`@2x`) !== -1
    ? retinaImagePath
    : retinaImagePath.replace(`.jpg`, `@2x.jpg`);
};

export const getMobileImageUrl = (src) => {
  if (src.indexOf(`@2x`) !== -1 || src.indexOf(`/_retina`) !== -1) {
    return src;
  }
  const slashPosition = src && src.lastIndexOf(`/`);
  const mobileImagePath =
    slashPosition &&
    [src.slice(0, slashPosition), `/_mobile`, src.slice(slashPosition)].join(
      ``,
    );
  return mobileImagePath && mobileImagePath.indexOf(`@2x`) !== -1
    ? mobileImagePath
    : mobileImagePath.replace(`.jpg`, `@2x.jpg`);
};
