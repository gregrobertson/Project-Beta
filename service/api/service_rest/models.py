from django.db import models


# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=20)

class Technician(models.Model):
    name = models.CharField(max_length=50)
    employee_number = models.PositiveSmallIntegerField(unique=True)
    

class Service(models.Model):
    customer = models.CharField(max_length=50)
    date = models.DateField( auto_now=False, auto_now_add=False)
    time = models.TimeField( auto_now=False, auto_now_add=False)
    reason = models.CharField(max_length= 100)
    technician = models.ForeignKey(
        Technician,
        related_name= "technician",
        on_delete=models.PROTECT
    )
    is_vip = models.BooleanField(default=False)
    vin = models.ForeignKey(
        AutomobileVO,
        related_name= "vin",
        on_delete=models.PROTECT
    )


