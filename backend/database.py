from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv
import pymysql
from sqlalchemy.exc import OperationalError

load_dotenv()

#SQLALCHEMY_DATABASE_URL = os.getenv(
#    "SQLALCHEMY_DATABASE_URL"
#)
SQLALCHEMY_DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "mysql+pymysql://root:randomrootpassword@localhost:3306/fastapidemo"
)

try:
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    # Test the connection
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
        connection.commit()
except OperationalError as e:
    print(f"Error connecting to the database: {e}")
    print("Please make sure:")
    print("1. MySQL is running")
    print("2. The database 'fastapidemo' exists")
    print("3. The username and password in .env are correct")
    raise

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() 