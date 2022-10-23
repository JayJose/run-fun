def convert_lat_long(val):
    """Converts a value to a latitude/longitude coordinate."""
    try:
        return int(val) / ((2 ** 32) / 360)
    except:
        return val


def parse_username_and_activityid(filename: str):
    """Parses the username and activity ID from a file name."""
    try:
        user_id, activity_id = filename.split("_")[0], filename.split("_")[1]
        if "." in activity_id:
            activity_id = activity_id.split(".")[0]
        return user_id.replace("data/", ""), activity_id
    except:
        return "null_user_id", "null_activity_id"


def set_path(dir: str):
    """Sets the path"""
    from pathlib import Path

    return Path(dir)


def get_files(path, dir):
    """Get a list of files within a specified directory"""
    p = path / dir
    return p.glob("*.fit")
