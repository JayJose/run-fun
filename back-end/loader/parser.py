from datetime import datetime
import fitdecode
import json


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


# lat/long fields
coords = [
    "position_lat",
    "position_long",
    "start_position_lat",
    "start_position_long",
    "end_position_lat",
    "end_position_long",
]
names = ["activity", "lap", "record"]


# begin file parsing
filename = "data22.fit"  # "johnjosephmurray@gmail.com_75518480300.fit"
data = {}
# username, activity_id = parse_username_and_activityid(filename)
data["username"] = "jb"  # username
data["activity_id"] = 69  # activity_id
data["lap"] = []
data["record"] = []

with fitdecode.FitReader(filename) as fit_file:
    for frame in fit_file:
        if isinstance(frame, fitdecode.records.FitDataMessage) and frame.name in [
            "lap",
            "record",
        ]:
            obj = {}  # initialize empty object
            for field in frame.fields:
                if isinstance(field.value, datetime):
                    v = field.value.strftime("%Y-%m-%d %H:%M:%S")
                elif field.name in coords:
                    v = convert_lat_long(field.value)
                else:
                    v = field.value
                obj[field.name] = v
            data[frame.name].append(obj)

        elif isinstance(frame, fitdecode.records.FitDataMessage) and frame.name in [
            "activity"
        ]:
            obj = {}  # initialize empty object
            for field in frame.fields:
                if isinstance(field.value, datetime):
                    v = field.value.strftime("%Y-%m-%d %H:%M:%S")
                elif field.name in coords:
                    v = convert_lat_long(field.value)
                else:
                    v = field.value
                obj[field.name] = v
            data.update(obj)

with open("sample.json", "w") as outfile:
    outfile.write(json.dumps(data))

# load data to mongodb
