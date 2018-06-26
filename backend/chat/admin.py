from django.contrib import  admin
from . models import Message
# Register your models here.


class MessageAdmin(admin.ModelAdmin):
    readonly_fields = ('timestamp',)
    search_fields  = ('id','body','user_username','recipient_username')
    list_display = ('id','user','recipient','timestamp','character')
    list_display_links = ('id',)
    list_filter = ('user','recipient')
    date_hierarchy = 'timestamp'

admin.site.register(Message, MessageAdmin)