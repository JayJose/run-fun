def parser(file):
    """Parse a .FIT file into a dictionary."""

    from datetime import datetime
    import fitdecode
    import json

    from utils import convert_lat_long, parse_username_and_activityid

    # lat/long fields
    coords = [
        "position_lat",
        "position_long",
        "start_position_lat",
        "start_position_long",
        "end_position_lat",
        "end_position_long",
    ]

    data = {}
    username, activity_id = parse_username_and_activityid(file)
    data["username"] = username
    data["activity_id"] = activity_id
    data["lap"] = []
    data["record"] = []

    with fitdecode.FitReader(file) as fit_file:
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

    with open(f"{activity_id}.json", "w") as outfile:
        outfile.write(json.dumps(data))


# load data to mongodb
# import pymongo

# client = pymongo.MongoClient("mongodb://localhost:27017/")
# database = client["runDb"]
# collection = mydb["runs"]

# x = mycol.insert_one(data)
