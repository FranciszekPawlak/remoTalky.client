import format from "date-fns/format";
import "style/eventInTable.css";
import VideocamIcon from "@material-ui/icons/Videocam";

export const EventInTable = ({ event }) => {
  return (
    <div className="event-container">
      <div>
        <span>Title</span>
        {event.title && <span>{event.title}</span>}
      </div>
      <div>
        <span>Description</span>
        {event.description && <span>{event?.description}</span>}
      </div>
      <div>
        <span>Begin</span>
        {event.start && (
          <span>{format(new Date(event.start), "kk:mm dd.MM.uu")}</span>
        )}
      </div>
      <div>
        <span>End</span>
        {event.end && (
          <span>{format(new Date(event.end), "kk:mm dd.MM.uu")}</span>
        )}
      </div>
      <div className="group">
        <span>Group Video Call</span>
        {event.group && <span>{event.group?.name}</span>}
        {event.group?._id && (
          <a
            target="_blank"
            rel="noreferrer"
            href={`/videoCall/${event.group._id}`}
          >
            <VideocamIcon />
          </a>
        )}
      </div>
      <div className="users">
        <span>Users</span>
        <div>
          {event.users &&
            event.users?.map((item) => (
              <span key={item?._id}>{item?.username}</span>
            ))}
        </div>
      </div>
      <div>
        <span>Creator</span>
        {event.creator && <span>{event.creator?.username}</span>}
      </div>
    </div>
  );
};
