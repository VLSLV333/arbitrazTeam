import ImageTest from 'next/image';

function ReadyImage({ alt, src, height }) {
  const imageHeight = height;
  return (
    <ImageTest
      src={src}
      placeholder="blur"
      className="rounded my-3"
      alt={alt}
      style={{ objectFit: 'cover', width: '100%', height: imageHeight }}
    />
  );
}

export default ReadyImage;
