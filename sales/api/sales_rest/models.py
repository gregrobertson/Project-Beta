from django.db import models

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin 


class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return self.name

 
class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=15, unique=True)

    def __str__(self):
        return self.name


class SalesHistory(models.Model):               
    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="saleshistory",
        on_delete=models.PROTECT,
    )

    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="saleshistory",
        on_delete=models.PROTECT,
    )

    customer = models.ForeignKey(
        Customer,
        related_name="saleshistory",
        on_delete=models.PROTECT,
    )
    
    price = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.sales_person}, {self.automobile}'