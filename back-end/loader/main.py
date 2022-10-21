from parser import parser
from utils import get_files, set_path


def main():

    p = set_path(dir=".")
    files = get_files(path=p, dir="data")
    for file in list(files)[0:1]:
        parser(str(file))


if __name__ == "__main__":
    main()
