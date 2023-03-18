const CommentData = [
  {
    name: "Mohd Samir",
    comment: "This is Main Comment and .",
    replies: [
      {
        name: "Mohd Samir",
        comment: "This is Main Comment and .",
        replies: [
          {
            name: "Mohd Samir",
            comment: "This is Main Comment and .",
            replies: [
              {
                name: "Mohd Samir",
                comment: "This is Main Comment and .",
                replies: [],
              },
            ],
          },
          {
            name: "Mohd Samir",
            comment: "This is Main Comment and .",
            replies: [
              {
                name: "Mohd Samir",
                comment: "This is Main Comment and .",
                replies: [],
              },
            ],
          },
        ],
      },
    ],
  },
  { name: "Mohd Samir", comment: "This is Main Comment and .", replies: [] },
  {
    name: "Mohd Samir",
    comment: "This is Main Comment and .",
    replies: [
      {
        name: "Mohd Samir",
        comment: "This is Main Comment and .",
        replies: [],
      },
    ],
  },
  { name: "Mohd Samir", comment: "This is Main Comment and .", replies: [] },
  { name: "Mohd Samir", comment: "This is Main Comment and .", replies: [] },
  {
    name: "Mohd Samir",
    comment: "This is Main Comment and .",
    replies: [
      {
        name: "Mohd Samir",
        comment: "This is Main Comment and .",
        replies: [
          {
            name: "Mohd Samir",
            comment: "This is Main Comment and .",
            replies: [],
          },
        ],
      },
    ],
  },
];

const Comment = ({ data }) => {
  //   const { name, comment, replies } = data;
  //   console.log(name);
  return (
    <div className="flex p-2 my-2 bg-gray-100 rounded-lg">
      <img
        className="h-12 w-12 rounded-lg"
        alt="Logo"
        src="https://thumbs.dreamstime.com/b/user-icon-trendy-flat-style-isolated-grey-background-user-symbol-user-icon-trendy-flat-style-isolated-grey-background-123663238.jpg"
      />
      <div>
        <h1>{data.name}</h1>
        <p>{data.comment}</p>
      </div>
    </div>
  );
};

const CommentList = ({ comments }) => {
  return comments.map((comment, idx) => (
    <div key={idx}>
      <Comment data={comment} />
      <div className="pl-3 border border-l-black ml-5">
        <CommentList comments={comment.replies} />
      </div>
    </div>
  ));
};

const CommentContainer = () => {
  return (
    <div className="my-2 p-2 ">
      <h1 className="font-semibold">Comment:</h1>
      <CommentList comments={CommentData} />
    </div>
  );
};
export default CommentContainer;
