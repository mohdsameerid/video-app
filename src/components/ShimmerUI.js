const ShimmerUI = () => {
  return (
    <div className="flex flex-wrap mx-11 px-3">
      {Array(8)
        .fill("")
        .map(() => (
          <div className="m-3 p-3 h-56 w-56 bg-gray-200 rounded-lg"></div>
        ))}
    </div>
  );
};
export default ShimmerUI;
