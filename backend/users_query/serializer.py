from rest_framework import serializers, fields
from rest_framework.serializers import PrimaryKeyRelatedField

from . models import UserQuery, Medicine, Appointment, File

class UserQuerySerializer(serializers.ModelSerializer):
    """ helps to serialize the data realted to UserQuery Model"""

    # def validate(self, data):
    #     if data['age_of_patient'] > 100 or data['age_of_patient']<0:
    #         raise serializers.ValidationError("Age might not be feasible")
    #     elif data['weight_of_patient']<1 or data['weight_of_patient']>150:
    #         raise serializers.ValidationError("Weght might not be feasible")
    #     return data
    
    class Meta:
        model = UserQuery
        fields = '__all__'
        read_only_fields = ('user', )
    
    
class MedicineSerializer(serializers.ModelSerializer):

    class Meta:
        model = Medicine
        fields = '__all__'
        read_only_fields = ('query',)


class AppointmentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Appointment
        fields = '__all__'
        read_only_fields = ('query',)


class FileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = File
        fields = '__all__'
        read_only_fields = ('query',)
