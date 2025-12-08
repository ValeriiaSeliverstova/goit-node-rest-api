import gravatar from "gravatar";

const createAvatar = (email) => {
  return gravatar.url(email, {
    s: "250", // size (px)
    d: "identicon", // unique auto-generated avatar
    protocol: "https", // force https
  });
};

export default createAvatar;
