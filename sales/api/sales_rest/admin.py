from django.contrib import admin

from .models import SalesPerson, SalesHistory, Customer

@admin.register(SalesPerson)
class SalesPersonAdmin(admin.ModelAdmin):
    pass


@admin.register(SalesHistory)
class SalesHistoryAdmin(admin.ModelAdmin):
    pass

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass




# Register your models here.
