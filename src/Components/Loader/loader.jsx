import useStoreGlobal from "../../store/useStoreGlobal";
const Loader = () => {
  const loader = useStoreGlobal((state) => state.loader);
  return (
    <>
      {loader && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default Loader;
