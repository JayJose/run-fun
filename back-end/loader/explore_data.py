import fitdecode


def convert_lat_long(val: int):
    """Converts a value to a latitude/longitude coordinate."""
    return val / ((2 ** 32) / 360)


def parse_username_and_activityid(filename: str):
    """Parses the username and activity ID from a file name."""
    user_id, activity_id = filename.split("_")[0], filename.split("_")[1]
    if "." in activity_id:
        activity_id = activity_id.split(".")[0]
    return user_id, activity_id


data = []
with fitdecode.FitReader("data22.fit") as fit_file:
    for frame in fit_file:
        if isinstance(frame, fitdecode.records.FitDataMessage):
            # print('---- BEGIN FRAME -----')
            if frame.name == "activity":
                # print('---- BEGIN LAP -----')
                laps = []
                for field in frame.fields:
                    # print(field.name, ':', field.value)
                    laps.append([field.name, ":", field.value])
                data.append(laps)

print(data[0])

##print(convert_lat_long(402885157), convert_lat_long(-1006486069) )
