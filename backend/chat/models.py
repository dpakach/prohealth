from django.db import models
from user_profile.models import User
# Create your models here.
class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='user', related_name='from_user', db_index=True)
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='recipient', related_name='to_user', db_index=True)
    timestamp = models.DateTimeField('timestamp', auto_now_add=True, editable=False, db_index=True)
    body = models.TextField('body')

    def __str__(self):
        return str(self.id)
    
    def character(self):
        return len(self.body)
    
    def notify_ws_client(self):
        notification = {'text':'%s' % self.id}
        Group('%s' % self.recipient.id).send(notification)
        Group('%s' % self.user.id).send(notification)

    def save(self, *args, **kwargs):
        new = self.id
        self.body = self.body.strip()
        super(Message, self).save(*args,**kwargs)
        if new is None:
            self.notify_ws_client()
    
    class Meta:
        app_label = 'chat'
        verbose_name = 'message'
        verbose_name_plural = 'messages'
        ordering = ('-timestamp',)