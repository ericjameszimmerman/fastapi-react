from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError

from config import get_settings

settings = get_settings()

try:
    engine = create_engine(settings.database_url)
    # Test the connection
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
        connection.commit()
except OperationalError as e:
    print(f"Error connecting to the database: {e}")
    print("Please make sure:")
    print("1. MySQL is running")
    print(f"2. The database '{settings.mysql_database}' exists")
    print("3. The database credentials in .env are correct")
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

def create_default_user():
    from models import User
    from auth.auth_handler import get_password_hash
    
    db = SessionLocal()
    try:
        # Check if default user already exists
        default_user = db.query(User).filter(User.username == "factory").first()
        if not default_user:
            default_user = User(
                username="factory",
                email="factory@example.com",
                hashed_password=get_password_hash("factory123"),
                is_active=True
            )
            db.add(default_user)
            db.commit()
            print("Created default factory user:")
            print("Username: factory")
            print("Password: factory123")
        else:
            print("Default factory user already exists")
    except Exception as e:
        print(f"Error creating default user: {e}")
        db.rollback()
    finally:
        db.close() 