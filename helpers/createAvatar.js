import gravatar from "gravatar";

const createAvatar = (email) => {
  return gravatar.url(email);
};

export default createAvatar;
