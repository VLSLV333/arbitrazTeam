import ReadyImage from '../../UI/ReadyImage';
import car from '../../assets/carO.webp';

function LeftPart() {
  return (
    <div className=" col-12 col-sm-6">
      <ReadyImage src={car} height={400} alt="car" />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae
        suscipit accusantium excepturi quidem quod nisi sapiente praesentium,
        adipisci blanditiis et at facere natus fuga, similique aut impedit
        consequatur eaque corrupti.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae
        suscipit accusantium excepturi quidem quod nisi sapiente praesentium,
        adipisci blanditiis et at facere natus fuga, similique aut impedit
        consequatur eaque corrupti.
      </p>
    </div>
  );
}
export default LeftPart;
