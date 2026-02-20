from channels.generic.websocket import AsyncJsonWebsocketConsumer

class NotificationConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add('notifications', self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard('notifications', self.channel_name)

    async def result_approved(self, event):
        # legacy: event type mapping
        await self.send_json({'type': 'result.approved', 'message': event.get('message')})

    async def receive_json(self, content):
        # no client messages expected
        pass
