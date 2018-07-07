from django.db import models
from django.conf import settings
from users_query.models import UserQuery
from django.utils import timezone

class Notification(models.Model):
    title = models.CharField(max_length=255)
    message = models.TextField()
    viewed = models.BooleanField(default=False)
    created = models.DateTimeField(editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    query = models.ForeignKey(UserQuery, on_delete=models.CASCADE)
    
    def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()
        return super(Notification, self).save(*args, **kwargs)

    def add_notification(self, title, message):
        notification = Notification(user=self.user, title=title, message=message)
        notification.save()

    def read_notification(self):
        self.viewed = True

    def unread_notification(self):
        self.viewed = False

    def __str__(self):
        return self.title
