from django.db import models


# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.vin

class Technician(models.Model):
    name = models.CharField(max_length=50)
    employee_number = models.PositiveSmallIntegerField(unique=True)
   
    def __str__(self):
        return f"{self.name} ID#{self.employee_number} "  

class Service(models.Model):
    customer = models.CharField(max_length=50)
    date = models.CharField( max_length=20)
    time = models.CharField( max_length=20)
    reason = models.CharField(max_length= 100)
    technician = models.ForeignKey(
        Technician,
        related_name= "services",
        on_delete=models.PROTECT
    )
    is_vip = models.BooleanField(default=False)
    vin = models.ForeignKey(
        AutomobileVO,
        related_name= "services",
        on_delete=models.PROTECT
    ) 
    def __str__(self):
        return f"{self.customer}--->{self.reason}"

