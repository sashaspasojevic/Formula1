import { useEffect, useState } from 'react';

function WikipediaImage({ wikipediaURL }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    async function fetchImageFromURL(url) {
      try {
        if (!url) {
          return;
        }

        const title = url.split('/').pop().replace(/_/g, ' ');

        const response = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=images&format=json&origin=*`
        );
        const data = await response.json();

        const pages = data.query.pages;
        const page = Object.values(pages)[0];

        if (page && page.images) {
          const images = page.images.filter(img => img.title.endsWith('.jpg') || img.title.endsWith('.png'));
          if (images.length > 0) {
            const imageTitle = images[0].title;

            const imageResponse = await fetch(
              `https://en.wikipedia.org/w/api.php?action=query&titles=${imageTitle}&prop=imageinfo&iiprop=url&format=json&origin=*`
            );
            const imageData = await imageResponse.json();

            const imagePages = imageData.query.pages;
            const imagePage = Object.values(imagePages)[0];

            if (imagePage && imagePage.imageinfo) {
              const imageUrl = imagePage.imageinfo[0].url;
              setImageUrl(imageUrl);
            }
          }
        }
      } catch (error) {
        // console.error('Error fetching image:', error);
        console.log(error);
      }
    }

    if (wikipediaURL) {
      fetchImageFromURL(wikipediaURL);
    }
  }, [wikipediaURL]);

  return (
    <div>
      {imageUrl ? <img src={imageUrl} alt="Wikipedia" /> : <p>No image found</p>}
    </div>
  );
}

export default WikipediaImage;
