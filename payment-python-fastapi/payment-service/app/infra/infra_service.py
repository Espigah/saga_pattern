import asyncio
from app.message_broker import producer


INTERVAL = 3


class Scope:
    def __init__(self, enable, timeout):
        self.enable = enable
        self.timeout = timeout


class Broker(Scope):
    def produce(self, value):
        print(value)
        pass
    #    producer.sendInfra({
    #    where: "DELIVERY_SERVICE",
    #    who: "BROKER",
    #    what: "ENABLE",
    #    value: value,
    #  });},


class Database(Scope):
    def produce(self, value):
        print(value)
        pass
     #   producer.sendInfra({
     #   where: "DELIVERY_SERVICE",
     #   who: "DATABASE",
     #   what: "ENABLE",
     #   value: value,
     # });},


broker = Broker(True, 0)
database = Database(True, 0)


def _toggle(data):
    if (data.enable):
        data.produce(False)

    data.enable = False

    def rollback():
        data.produce(True)
        data.enable = True

    async def asyncFunc(loop):
        loop.call_later(INTERVAL, rollback)
        await asyncio.sleep(INTERVAL)

    loop = asyncio.get_event_loop()
    loop.run_until_complete(asyncFunc(loop))


def is_broker_enable():
    return broker.enable


def is_database_enable():
    return database.enable


def disable_broker():
    _toggle(broker)


def disable_database():
    _toggle(database)
