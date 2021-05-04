import format from "date-fns/format";
const now = format(Date.now(), "yyyy-MM-dd'T'k:mm");
export const formDefaultValues = {
  title: "",
  start: now,
  end: "",
  description: "",
  groupId: "",
  users: [],
};
