from .db import Base, engine, SessionLocal
from . import models


def run():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    if db.query(models.Tribe).count() == 0:
        db.add_all([
            models.Tribe(name="Climate Action Coalition", description="Fighting climate change", location="Global"),
            models.Tribe(name="Tech for Good", description="Tech solutions for social impact", location="San Francisco"),
        ])
    if db.query(models.Cause).count() == 0:
        db.add_all([
            models.Cause(name="Clean Water for Rural Communities", mission="Water solutions", funding_goal=100000, funds_raised=75000, supporters_count=342, category="Water & Sanitation", urgency="High", location="East Africa"),
            models.Cause(name="Digital Literacy Program", mission="Digital skills", funding_goal=80000, funds_raised=45000, supporters_count=189, category="Education", urgency="Medium", location="Multiple Cities"),
        ])
    db.commit()
    db.close()


if __name__ == "__main__":
    run()


