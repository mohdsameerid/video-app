const LiveChatMessage = ({ name, comments }) => {
  
  return (
    <div className="  ">
      <div className="flex items-center p-2 pr-8 shadow-sm">
        <img
          className="h-9 w-9 rounded-lg"
          alt="Logo"
          src="https://thumbs.dreamstime.com/b/user-icon-trendy-flat-style-isolated-grey-background-user-symbol-user-icon-trendy-flat-style-isolated-grey-background-123663238.jpg"
        />

        <h1 className="font-semibold mx-2">{name}</h1>
        <p>{comments}</p>
      </div>
    </div>
  );
};
export default LiveChatMessage;
