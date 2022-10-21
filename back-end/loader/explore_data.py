import fitdecode
from datetime import datetime


def convert_lat_long(val):
    """Converts a value to a latitude/longitude coordinate."""
    try:
        return int(val) / ((2 ** 32) / 360)
    except:
        return val


def parse_username_and_activityid(filename: str):
    """Parses the username and activity ID from a file name."""
    user_id, activity_id = filename.split("_")[0], filename.split("_")[1]
    if "." in activity_id:
        activity_id = activity_id.split(".")[0]
    return user_id, activity_id


coords = [
    "position_lat",
    "position_long",
    "start_position_lat",
    "start_position_long",
    "end_position_lat",
    "end_position_long",
]
names = ["activity", "lap", "record"]
data = []
with fitdecode.FitReader("data22.fit") as fit_file:
    objs = []
    for frame in fit_file:
        if (
            isinstance(frame, fitdecode.records.FitDataMessage)
            and frame.name == "activity"
        ):
            obj = {}  # initialize empty object
            for field in frame.fields:
                if isinstance(field.value, datetime):
                    v = field.value.strftime("%Y-%m-%d %H:%M")
                elif field.name in coords:
                    v = convert_lat_long(field.value)
                else:
                    v = field.value
                obj[field.name] = v
            objs.append(obj)
        data.append(objs)

print(data[0][-1])
