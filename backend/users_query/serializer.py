from rest_framework import serializers, fields
from rest_framework.serializers import PrimaryKeyRelatedField

from . models import UserQuery, Medicine, Appointment, Prescription

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
        read_only_fields = ('user',)

    # def validate_user(self, user):
    #     """
    #     Validate authenticated user
    #     """

    #     if user != self.context['request'].user:
    #         raise serializers.ValidationError('You can not create post replies for other users')
    #     return user
    
class MedicineSerializer(serializers.ModelSerializer):
    # queryset = Medicine.objects.all()
    class Meta:
        model = Medicine
        fields = '__all__'


class PrescriptionSerializer(serializers.ModelSerializer):
    
    medicine = MedicineSerializer(many=True, read_only=False)
    class Meta:
        model = Prescription
        fields = ('id','medicine','description','prescribed_date')

    def create(self, validate_data):
        medicine_data = validate_data.pop('medicine')
        prescription = Prescription.objects.create(**validate_data)
        med_list = []
        for medicine_details in medicine_data:
            med_list.append(Medicine.objects.create(**medicine_details))
        prescription.medicine.add(*med_list)
        return prescription

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'
        read_only_fields = ('user',)
