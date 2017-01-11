import os
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from models import Result

from app import app, db

Migrate = Migrate(app, db)
manager = Manager(app)

#def make_shell_context():
#    return dict(app=app, db=db, Result=Result)

manager.add_command('db', MigrateCommand)
#manager.add_command("shell", Shell(make_context=make_shell_context))

if __name__ == '__main__':
    manager.run()
