export type PhotoGallery = Array<Photo>

type Photo = {
  image: {
    url: string,
  }
}

// takes in a list of yext images and return a list of image urls
export const PhotoGallery = (gallery?: PhotoGallery) => {
  if (gallery == null) {
    return {}
  }

  let imageArray = new Array<string>();

  for (const photo of gallery) {
    imageArray.push(photo.image.url)
  }

  return {
    image: imageArray
  };
}

// takes in a single yext image
export const Photo = (photo?: Photo) => {
  return photo && {
    image: photo.image.url
  };
}
