from pickle import FALSE
from django.db import models
from django.forms import BooleanField


# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return self.vin

class Technician(models.Model):
    name = models.CharField(max_length=50)
    employee_number = models.PositiveSmallIntegerField(unique=True)
   
    def __str__(self):
        return f"{self.name} ID#{self.employee_number}"  

class Service(models.Model):
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=50)
    date = models.DateField( max_length=20)
    time = models.TimeField( max_length=20)
    reason = models.CharField(max_length= 100)
    technician = models.ForeignKey(
        Technician,
        related_name= "services",
        on_delete=models.PROTECT
    )
    is_vip = models.BooleanField(default=False)
    is_finished = models.BooleanField(default=False)    
    
    def __str__(self):
        return f"{self.customer}--->{self.reason}"

