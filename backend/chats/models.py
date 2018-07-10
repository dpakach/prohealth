from django.db import models
from django.conf import settings
from users_query.models import UserQuery

class Message(models.Model):
    message = models.TextField()
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sent_to')
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sent_by')
    query = models.ForeignKey(UserQuery, on_delete=models.CASCADE)
    read = models.BooleanField(default=False)
    date_time = models.DateTimeField(editable=False)

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()
        return super(Chat, self).save(*args, **kwargs)

    def read_message(self):
        self.read = True

    def unread_message(self):
        self.read = False

    def __str__(self):
        return self.sender + "to" + self.receiver + "on" + self.date_time


    