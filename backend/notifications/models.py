from django.db import models
from django.conf import settings

class Notification(models.Model):
    title = models.CharField(max_length=255)
    message = models.TextField()
    viewed = models.BooleanField(default=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def add_notification(self, message):
        notification = Notification(user=self.user, message=message)
        notification.save()

    def read_notification(self):
        self.viewed = True

    def unread_notification(self):
        self.viewed = False

    def __str__(self):
        return self.title
