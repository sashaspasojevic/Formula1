import "./Loading.scss";
import loadingImg from "../../assets/1474.gif";

const Loading = () => {
  return (
    <div className="loading">
      <img src={loadingImg} alt='walk gif' className='loadingImg' />
    </div>
  );
};

export default Loading;
