const ShimmerUI = () => {
  return (
    <div className="flex flex-wrap mx-5 px-3">
      {Array(10)
        .fill("")
        .map(() => (
          <div className="m-3 p-3 h-56 w-56 bg-gray-200"></div>
        ))}
    </div>
  );
};
export default ShimmerUI;
